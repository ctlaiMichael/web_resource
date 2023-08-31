/**
 * 基金申購
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { CheckService } from '@template/check/check.service';
import { SPEC11040201ApiService } from '@api/spec11/spec11040201/spec11040201-api.service';
import { SPEC11040202ApiService } from '@api/spec11/spec11040202/spec11040202-api.service';
import { SPEC11040104ApiService } from '@api/spec11/spec11040104/spec11040104-api.service';
import { SPEC11040204ApiService } from '@api/spec11/spec11040204/spec11040204-api.service';
import { SPEC11040301ApiService } from '@api/spec11/spec11040301/spec11040301-api.service';
import { SPEC11040302ApiService } from '@api/spec11/spec11040302/spec11040302-api.service';
import { SPEC11040105ApiService } from '@api/spec11/spec11040105/spec11040105-api.service';
import { SPEC11040205ApiService } from '@api/spec11/spec11040205/spec11040205-api.service';
import { SPEC11040401ApiService } from '@api/spec11/spec11040401/spec11040401-api.service';
import { SPEC11040402ApiService } from '@api/spec11/spec11040402/spec11040402-api.service';
import { SPEC11040106ApiService } from '@api/spec11/spec11040106/spec11040106-api.service';
import { SPEC11040206ApiService } from '@api/spec11/spec11040206/spec11040206-api.service';
import { SPEC11040001ApiService } from '@api/spec11/spec11040001/spec11040001-api.service';
import { SPEC00050201ApiService } from '@api/spec00/spec00050201/spec00050201-api.service';
import { CacheService } from '@systems/system/cache/cache.service';
import { StringCheckUtil } from '@util/check/string-check-util';
import { SymbolCheckUtil } from '@util/check/word/symbol-check-util';
import { TranslateService } from '@ngx-translate/core';

@Injectable()

export class FundInvestService {
    /**
     * 參數處理
     */
    singleEditData = {}; // 單筆編輯暫存
    regularEditData = {}; // 定期定額編輯暫存
    termData = {}; // 條款顯示暫存
    termChecked = {}; // 條款勾選狀態暫存
    private dateCheckList = {}; // 日期檢核設定

    constructor(
        private _logger: Logger,
        private _cacheService: CacheService,
        private _formateService: FormateService,
        private _checkService: CheckService,
        private translate: TranslateService,
        private spec11040201: SPEC11040201ApiService, // 台幣單筆申購-編輯頁
        private spec11040202: SPEC11040202ApiService, // 外幣單筆申購-編輯頁
        private spec11040104: SPEC11040104ApiService, // 台幣定期定額-編輯頁
        private spec11040204: SPEC11040204ApiService, // 外幣定期定額-編輯頁
        private spec11040301: SPEC11040301ApiService, // 台幣單筆申購-確認頁
        private spec11040302: SPEC11040302ApiService, // 外幣單筆申購-確認頁
        private spec11040105: SPEC11040105ApiService, // 台幣定期定額-確認頁
        private spec11040205: SPEC11040205ApiService, // 外幣定期定額-確認頁
        private spec11040401: SPEC11040401ApiService, // 台幣單筆申購-結果頁
        private spec11040402: SPEC11040402ApiService, // 外幣單筆申購-結果頁
        private spec11040106: SPEC11040106ApiService, // 台幣定期定額-結果頁
        private spec11040206: SPEC11040206ApiService, // 外幣定期定額-結果頁
        private spec11040001: SPEC11040001ApiService,  // 基金條款相關
        private spec00050201: SPEC00050201ApiService  //  條款查詢
    ) {
        this.resetEdit();
    }

    /**
     * 取得注意資訊
     */
    getNoteData() {
        let noteData = {
            title: 'FUND_INVEST.NOTE.REMIND',
            content: 'FUND_INVEST.NOTE.REGIN_NOT'
        };
        return noteData;
    }

    /**
     * 取得頁籤設定
     */
    getBookmark() {
        let output = [];
        // == Level 1 == //
        // --- [notAgreed] --- //
        output.push({
            id: 'single',
            name: 'FUND_INVEST.EDIT.SINGLE_INVEST', // 單筆投資
            sort: 1
        });
        // --- [agreement] --- //
        output.push({
            id: 'regular',
            name: 'FUND_INVEST.EDIT.REGIN_INVEST', // 定期定額
            sort: 2
        });
        return output;
    }

    /**
     * 取得日期設定條件
     * @param set_key 日期條件編號
     */
    getDateSet(set_key: string): object {
        this._logger.log("getDateSet, set_key:", set_key);
        if (this.dateCheckList.hasOwnProperty(set_key)) {
            return this._formateService.transClone(this.dateCheckList[set_key]);
        } else {
            return {};
        }
    }

    //--------------- 暫存相關 ---------------
    // 重製編輯暫存
    resetEdit() {
        this.singleEditData = {};
        this.regularEditData = {};
    }

    // 取得單筆編輯暫存
    getSingleEdit() {
        this._logger.log("getSingleEdit, singleEditData:", this.singleEditData);
        return this.singleEditData;
    }

    // 設定單筆編輯暫存
    setSingleEdit(setData) {
        this._logger.log("setSingleEdit, setData:", setData);
        this.singleEditData = setData;
    }

    // 取得定期定額編輯暫存
    getRegularEdit() {
        this._logger.log("getRegularEdit, regularEditData:", this.regularEditData);
        return this.regularEditData;
    }

    // 設定定期定額編輯暫存
    setRegularEdit(setData) {
        this._logger.log("setRegularEdit, setData:", setData);
        this.regularEditData = setData;
    }

    // 重製條款相關暫存
    resetTerm() {
        this.termChecked = {};
        this.termData = {};
    }

    // 設定條款勾選資暫存
    setTermChecked(setData, allChecked?) {
        this._logger.log("setTermChecked, setData:", setData, allChecked);
        this.termChecked = setData;
        this.termChecked['allChecked'] = allChecked;
    }

    // 取得條款勾選暫存
    getTermChecked() {
        this._logger.log("getTermChecked, termChecked:", this.termChecked);
        return this.termChecked;
    }

    // 設定條款顯示暫存
    setTermSaveData(setData) {
        this._logger.log("setTermData, setData:", setData);
        this.termData = setData;
    }

    // 取得條款顯示暫存
    getTermSaveData() {
        this._logger.log("getTermData, termData:", this.termData);
        return this.termData;
    }

    //-------------------- 單筆 --------------------
    /**
     * 取得單筆台幣申購 編輯頁 帳號餘額相關欄位
     * @param reqData 請求
     * @param option 模式(EX: 背景發送)
     */
    getSingleTwdAcctData(reqData: object, option?: object): Promise<any> {
        this._logger.log("into getSingleTwdAcctData");
        this._logger.log("into getSingleTwdAcctData, reqData:", reqData);
        return this.spec11040201.getData(reqData, option).then(
            (sucessObj) => {
                this._logger.log("send api success, success:", sucessObj);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    /**
     * 取得 單筆台幣申購 確認頁
     * @param reqData 請求
     * @param option 模式(EX: 背景發送)
     */
    sendSingleTwdConfirm(reqData: object, option?: object): Promise<any> {
        this._logger.log("into getSingleTwdConfirm, reqData:", reqData);
        return this.spec11040301.sendData(reqData, option).then(
            (sucessObj) => {
                this._logger.log("send api success, success:", sucessObj);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    /**
     * 發送交易api前 request處理 (單筆台幣)
     * @param reqData 請求資料
     * @param option 模式設定 (EX:背景發送)
     */
    modifySingleTwd(reqData?, option?: object) {
        return this.spec11040401.modifyData(reqData, option);
    }

    /**
     * 取得 單筆台幣申購 結果頁
     * @param reqData 請求
     * @param option 模式(EX: 背景發送)
     */
    sendSingleTwdResult(reqData: object, option?: object): Promise<any> {
        this._logger.log("into getSingleTwdResult, reqData:", reqData);
        return this.spec11040401.sendData(reqData, option).then(
            (sucessObj) => {
                this._logger.log("send api success, success:", sucessObj);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    /**
     * 取得單筆外幣申購 編輯頁 帳號餘額相關欄位
     * @param reqData 請求
     * @param option 模式(EX: 背景發送)
     */
    getSingleForeignAcctData(reqData: object, option?: object): Promise<any> {
        this._logger.log("into getSingleForeignAcctData");
        this._logger.log("into getSingleForeignAcctData, reqData:", reqData);
        return this.spec11040202.getData(reqData, option).then(
            (sucessObj) => {
                this._logger.log("send api success, success:", sucessObj);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    /**
     * 取得 單筆外幣申購 確認頁
     * @param reqData 請求
     * @param option 模式(EX: 背景發送)
     */
    sendSingleForeignConfirm(reqData: object, option?: object): Promise<any> {
        this._logger.log("into getSingleForeignConfirm, reqData:", reqData);
        return this.spec11040302.sendData(reqData, option).then(
            (sucessObj) => {
                this._logger.log("send api success, success:", sucessObj);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    /**
     * 發送交易api前 request處理 (單筆外幣)
     * @param reqData 請求資料
     * @param option 模式設定 (EX:背景發送)
     */
    modifySingleForeign(reqData?, option?: object) {
        return this.spec11040402.modifyData(reqData, option);
    }

    /**
     * 取得 單筆外幣申購 結果頁
     * @param reqData 請求
     * @param option 模式(EX: 背景發送)
     */
    sendSingleForeignResult(reqData: object, option?: object): Promise<any> {
        this._logger.log("into sendSingleForeignResult, reqData:", reqData);
        return this.spec11040402.sendData(reqData, option).then(
            (sucessObj) => {
                this._logger.log("send api success, success:", sucessObj);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    //-------------------- 定期定額 --------------------
    /**
     * 取得定期定額 編輯頁 帳號餘額相關欄位
     * @param reqData 請求
     * @param option 模式(EX: 背景發送)
     */
    getReginTwdAcctData(reqData: object, option?: object): Promise<any> {
        this._logger.log("into getReginTwdAcctData");
        this._logger.log("into getReginTwdAcctData, reqData:", reqData);
        return this.spec11040104.getData(reqData, option).then(
            (sucessObj) => {
                this._logger.log("send api success, success:", sucessObj);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    /**
     * 取得 台幣定期定額 確認頁
     * @param reqData 請求
     * @param option 模式(EX: 背景發送)
     */
    sendReginTwdConfirm(reqData: object, option?: object): Promise<any> {
        this._logger.log("into getReginTwdConfirm, reqData:", reqData);
        return this.spec11040105.sendData(reqData, option).then(
            (sucessObj) => {
                this._logger.log("send api success, success:", sucessObj);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    /**
     * 發送交易api前 request處理 (定期定額台幣)
     * @param reqData 請求資料
     * @param option 模式設定 (EX:背景發送)
     */
    modifyReginTwd(reqData?, option?: object) {
        return this.spec11040106.modifyData(reqData, option);
    }

    /**
     * 取得 台幣定期定額 結果頁
     * @param reqData 
     * @param option 
     */
    sendReginTwdResult(reqData: object, option?: object): Promise<any> {
        this._logger.log("into getSingleTwdResult, reqData:", reqData);
        return this.spec11040106.sendData(reqData, option).then(
            (sucessObj) => {
                this._logger.log("send api success, success:", sucessObj);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    /**
     * 取得定期定額 編輯頁 帳號餘額相關欄位
     * @param reqData 請求
     * @param option 模式(EX: 背景發送)
     */
    getReginForeignAcctData(reqData: object, option?: object): Promise<any> {
        this._logger.log("into getReginForeignAcctData");
        this._logger.log("into getReginForeignAcctData, reqData:", reqData);
        return this.spec11040204.getData(reqData, option).then(
            (sucessObj) => {
                this._logger.log("send api success, success:", sucessObj);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    /**
     * 取得 外幣定期定額 確認頁
     * @param reqData 請求
     * @param option 模式(EX: 背景發送)
     */
    sendReginForeignConfirm(reqData: object, option?: object) {
        this._logger.log("into getReginForeignConfirm, reqData:", reqData);
        return this.spec11040205.sendData(reqData, option).then(
            (sucessObj) => {
                this._logger.log("send api success, success:", sucessObj);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    /**
     * 發送交易api前 request處理 (定期定額外幣)
     * @param reqData 請求資料
     * @param option 模式設定 (EX:背景發送)
     */
    modifyReginForeign(reqData?, option?: object) {
        return this.spec11040206.modifyData(reqData, option);
    }

    /**
     * 取得 外幣定期定額 結果頁
     * @param reqData 請求
     * @param option 模式(EX: 背景發送)
     */
    sendReginForeignResult(reqData: object, option?: object): Promise<any> {
        this._logger.log("into sendReginForeignResult, reqData:", reqData);
        return this.spec11040206.sendData(reqData, option).then(
            (sucessObj) => {
                this._logger.log("send api success, success:", sucessObj);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    //--------------- 條款相關 ---------------
    /**
     * 
     * @param reqData 請求
     * @param option 模式(EX: 背景發送)
     */
    getTermData(reqData: object, option?: object) {
        this._logger.log("into getTermData, reqData:", reqData);
        return this.spec11040001.getData(reqData).then(
            (sucessObj) => {
                this._logger.log("into getTermData, sucessObj:", sucessObj);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("into getTermData, failedObj:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    /**
     * 檢核畫面資料
     * @param req 檢查請求物件
     * @param checkRule 檢查哪一頁, 'main': 主頁, 'edit': 編輯, 'term':條款
     * @param investType 申購方式, 'single': 單筆, 'regular': 定期定額
     */
    checkData(req, checkRule, investType?) {
        this._logger.log("into checkData, req:", req);
        this._logger.log("into checkData, checkRule:", checkRule);
        let output = {
            status: false,
            msg: '請輸入正確資料', // 候補i18n
            data: {
                fundCompID: '', // 基金公司代碼
                fundCode: '', // 基金代碼
                fundCcy: '',  // 基金幣別
                investAccount: '', // 扣款帳號
                investMoney: '', // 投資金額
                profitAccount: '', // 配息入帳帳號
                investDate: '' // 每月投資日期(定期定額)
            },
            error_data: [], // 有錯誤將訊息塞入 (判斷欄位檢核是否全過)
            error_list: {
                fundCompID: '',
                fundCode: '',
                fundCcy: '',
                investAccount: '',
                investMoney: '',
                profitAccount: '',
                investDate: ''
            }
        };
        let type = this._formateService.checkField(checkRule, 'type');
        let limitMaxAmt = this._formateService.checkField(checkRule, 'limitMaxAmt');
        let limitMinAmt = this._formateService.checkField(checkRule, 'limitMinAmt');
        let fundCcy = this._formateService.checkField(checkRule, 'fundCcy');
        let avlBalance = this._formateService.checkField(checkRule, 'avlBalance');
        let checkData = {
            limitMaxAmt: limitMaxAmt,
            limitMinAmt: limitMinAmt,
            fundCcy: fundCcy,
            investType: investType,
            avlBalance: avlBalance
        };
        this._logger.log("7777777 type:", type);
        this._logger.log("7777777 limitMaxAmt:", limitMaxAmt);
        this._logger.log("7777777 limitMinAmt:", limitMinAmt);
        this._logger.log("7777777 fundCcy:", fundCcy);
        // 主控頁面 檢核基金標的
        if (type == 'main') {
            // 基金代碼
            let fundCode_msg = '';
            output.data.fundCode = this._formateService.checkField(req, 'fundCode');
            let check_fundCode = this._checkService.checkEmpty(req.fundCode);
            if (check_fundCode.status == false) {
                fundCode_msg = check_fundCode.msg;
                output.error_list.fundCode = fundCode_msg;
                output.error_data.push(output.error_list.fundCode);
            }
            // 基金公司代碼
            let fundCompID_msg = '';
            output.data.fundCompID = this._formateService.checkField(req, 'fundCompID');
            let check_fundCompID = this._checkService.checkEmpty(req.fundCompID);
            if (check_fundCompID.status == false) {
                fundCompID_msg = check_fundCompID.msg;
                output.error_list.fundCompID = fundCompID_msg;
                output.error_data.push(output.error_list.fundCompID);
            }
            // 基金幣別
            let fundCcy_msg = '';
            output.data.fundCcy = this._formateService.checkField(req, 'fundCcy');
            let check_fundCcy = this._checkService.checkEmpty(req.fundCompID);
            if (check_fundCcy.status == false) {
                fundCcy_msg = check_fundCcy.msg;
                output.error_list.fundCcy = fundCcy_msg;
                output.error_data.push(output.error_list.fundCcy);
            }
        }
        // 編輯頁檢核
        if (type == 'edit') {
            // 扣款帳號
            let investAccount_msg = '';
            output.data.investAccount = this._formateService.checkField(req, 'investAccount');
            let check_investAccount = this._checkService.checkEmpty(req.investAccount); // 扣款帳號為下拉,檢查有無值就好
            if (check_investAccount.status == false) {
                investAccount_msg = check_investAccount.msg;
                output.error_list.investAccount = investAccount_msg;
                output.error_data.push(output.error_list.investAccount);
            }
            // 信託金額
            let investMoney_msg = '';
            output.data.investMoney = this._formateService.checkField(req, 'investMoney');
            let check_investMoney = this._checkService.checkMoney(req.investMoney, {
                currency: fundCcy, check_empty: true, not_zero: true
            });
            // 檢核金額失敗
            if (check_investMoney.status == false) {
                investMoney_msg = check_investMoney.msg;
                output.error_list.investMoney = investMoney_msg;
                output.error_data.push(output.error_list.investMoney);
                // 檢核金額成功後, 檢核金額業務規則
            } else {
                let checkInvestRule = this.checkInvestMoney(req.investMoney, checkData);
                if (checkInvestRule.status == false) {
                    investMoney_msg = checkInvestRule.msg;
                    output.error_list.investMoney = investMoney_msg;
                    output.error_data.push(output.error_list.investMoney);
                }
            }
            // 配息帳號
            let profitAccount_msg = '';
            output.data.profitAccount = this._formateService.checkField(req, 'profitAccountID');
            let hasProfit = this._formateService.checkField(req, 'hasProfit');
            // 需顯示配息帳號時,才檢核
            if (hasProfit == 'Y') {
                let check_profitAccount = this._checkService.checkEmpty(req.profitAccountID);
                if (check_profitAccount.status == false) {
                    profitAccount_msg = check_profitAccount.msg;
                    output.error_list.profitAccount = profitAccount_msg;
                    output.error_data.push(output.error_list.profitAccount);
                }
            }
            // 定期定額 才檢核日期
            if (investType != 'single') {
                let investDate_msg = '';
                this._logger.log("req.investDate:", req.investDate);
                output.data.investDate = this._formateService.checkField(req, 'investDate');
                let check_investDate = this.checkInvestDate(req.investDate);
                if (check_investDate.status == false) {
                    investDate_msg = check_investDate.msg;
                    output.error_list.investDate = investDate_msg;
                    output.error_data.push(output.error_list.investDate);
                }
            }
        }
        // 若無錯誤
        if (output.error_data.length == 0) {
            output.status = true;
            output.msg = '';
        }
        return output;
    }

    /**
     * 檢核備註
     * @param setData 被檢核的資料
     */
    private checkInvestDate(setData) {
        let output = {
            status: false,
            msg: '',
            data: setData
        };

        // 先檢查是否為空
        let checkEmpty = this._checkService.checkEmpty(setData);
        if (checkEmpty['status'] == false) {
            output.msg = checkEmpty['msg'];
            return output;
        }

        // 檢查表情符號
        let checkEmoji = StringCheckUtil.emojiCheck(setData);
        if (checkEmoji['status'] == false) {
            output.msg = checkEmoji['msg'];
            return output;
        }

        // 檢查特殊符號
        let checkSymbol = SymbolCheckUtil.check(setData, 'base_symbol');
        if (checkSymbol['status'] == false) {
            output.msg = checkSymbol['msg'];
            return output;
        }

        output['status'] = true;
        return output;
    }

    /**
     * 檢核畫面條款是否都有勾選
     * @param checkedData 畫面勾選之條款
     * @param sortedTerm 依據中台回傳,哪些條款需不需檢核(顯示),true欄位須檢核
     */
    checkTermData(checkedData, sortedTerm) {
        let output = {
            status: false,
            msg: '',
            data: checkedData,
            errorArray: [],
            errorList: {
                self: '', // 基金公開說明書 01
                signAgr: '', // 基金各級別近五年費用率及報酬率揭露聲明書 02
                term4: '', // 高收益配息風險預告書 04
                fee: '', // 銷售基金通路報酬揭露表 06
                bShare: '', // 後收型基金風險預告書 09
                term10: '', // 境外基金手續費後收集別費用說明書 10
                term11: '', // 信託資金集合管理運用帳戶稅負說明書(分自然人/法人兩種) 11
                term12: '', // 信託資金集合管理運用帳戶信託管理說明書 12
                term13: '', // 金錢信託開戶及各項務務約定書 13
                usaSignNote: '', // 美國註冊基金注意事項 07
                hanYa: ''
            }
        };
        // 此次檢核欄位情況, true檢核成功
        // 塞入中台判斷欄位,需為反向,若前端該欄位false不顯示,這裡改為true不檢核直接過
        let checkRule = {
            self: false, // 基金公開說明書 01
            signAgr: false, // 基金各級別近五年費用率及報酬率揭露聲明書 02
            term4: !sortedTerm['term4'], // 高收益配息風險預告書 04
            fee: false, // 銷售基金通路報酬揭露表 06
            bShare: !sortedTerm['bShare'], // 後收型基金風險預告書 09
            term10: !sortedTerm['term10'], // 境外基金手續費後收集別費用說明書 10
            term11: !sortedTerm['term11'], // 信託資金集合管理運用帳戶稅負說明書(分自然人/法人兩種) 11
            term12: !sortedTerm['term12'], // 信託資金集合管理運用帳戶信託管理說明書 12
            term13: !sortedTerm['term13'], // 金錢信託開戶及各項務務約定書 13
            usaSignNote: !sortedTerm['usaSignNote'], // 同意簽署美國註冊基金(帶入值為true就不檢核此欄位)
        };
        // 公開說明書 01
        if (checkedData['self'] == false) {
            output.errorList.self = '未勾選基金公開說明書';
            output.errorArray.push(output.errorList.self);
        }
        // 銷售基金通路報酬揭露表 06
        if (checkedData['fee'] == false) {
            output.errorList.fee = '未勾選銷售基金通路報酬揭露表';
            output.errorArray.push(output.errorList.fee);
        }
        // 基金各級別近五年費用率及報酬率揭露聲明書 02
        if (checkedData['signAgr'] == false) {
            output.errorList.signAgr = '未勾選基金各級別近五年費用率及報酬率揭露聲明書';
            output.errorArray.push(output.errorList.signAgr);
        }
        // 高收益配息風險預告書 04
        // 若中台回應需顯示,才檢核
        if (checkRule['term4'] == false) {
            if (checkedData['term4'] == false) {
                output.errorList.term4 = '未勾選高收益配息風險預告書';
                output.errorArray.push(output.errorList.term4);
            }
        }
        // 後收型基金風險預告書 06
        if (checkRule['bShare'] == false) {
            if (checkedData['bShare'] == false) {
                output.errorList.bShare = '未勾選後收型基金風險預告書';
                output.errorArray.push(output.errorList.bShare);
            }
        }
        // 境外基金手續費後收集別費用說明書 10
        if (checkRule['term10'] == false) {
            if (checkedData['term10'] == false) {
                output.errorList.term10 = '未勾選境外基金手續費後收集別費用說明書';
                output.errorArray.push(output.errorList.term10);
            }
        }
        // 信託資金集合管理運用帳戶稅負說明書(分自然人/法人兩種) 11
        if (checkRule['term11'] == false) {
            if (checkedData['term11'] == false) {
                output.errorList.term11 = '未勾選信託資金集合管理運用帳戶稅負說明書';
                output.errorArray.push(output.errorList.term11);
            }
        }
        // 信託資金集合管理運用帳戶信託管理說明書 12
        if (checkRule['term12'] == false) {
            if (checkedData['term12'] == false) {
                output.errorList.term12 = '未勾選信託資金集合管理運用帳戶信託管理說明書';
                output.errorArray.push(output.errorList.term12);
            }
        }
        // 金錢信託開戶及各項務務約定書 13
        if (checkRule['term13'] == false) {
            if (checkedData['term13'] == false) {
                output.errorList.term13 = '未勾選金錢信託開戶及各項務務約定書';
                output.errorArray.push(output.errorList.term13);
            }
        }
        // 美國註冊基金
        // 若中台回應需顯示,才檢核
        if (checkRule['usaSignNote'] == false) {
            if (checkedData['usaSignNote'] == false) {
                output.errorList.usaSignNote = '未勾選同意簽署美國註冊基金';
                output.errorArray.push(output.errorList.usaSignNote);
            }
        }
        output.errorArray.forEach((item, index) => {
            this._logger.log("index:", index);
            // 不是最後一筆
            if (index != output.errorArray.length - 1) {
                this._logger.log("into not last item");
                output.msg += item + '<br>';
            } else {
                this._logger.log("into last item");
                output.msg += item;
            }
        });
        this._logger.log("output.msg:", output);
        // 檢核成功
        if (output.errorArray.length == 0) {
            output.status = true;
        }
        return output;
    }

    /**
     * 條款查詢 html範本
     * @param reqData 請求
     * @param option 模式
     */
    getTermHtml(reqData: object, option?: object) {
        this._logger.log("into getTermData, reqData:", reqData);
        let temp = [];
        if (reqData.hasOwnProperty('termId')) {
            temp = reqData['termId'];
        }
        let termId = this.getArrayData(temp);
        if (termId === '') {
            return Promise.reject({
                title: 'ERROR.TITLE',
                content: 'ERROR.DATA_FORMAT_ERROR'
            });
        }
        let cache_main_key = 'invest-term-html';
        let cache_sub_key = [termId];
        const cache_check = this._cacheService.getPaginatorCache(cache_main_key, {
            'sub_key': cache_sub_key
        });
        const cache_key = cache_check.cache_key;
        if (cache_check.status) {
            return Promise.resolve(cache_check.data);
        }
        let cache_option = this._cacheService.getCacheSet(cache_key);
        cache_option.groupList.push(cache_main_key);

        return this.spec00050201.getData(reqData).then(
            (sucessObj) => {
                this._logger.log("into getTermData, sucessObj:", sucessObj);
                this._cacheService.save(cache_key, sucessObj, cache_option);
                // let cache_option = this._cacheService.getCacheSet(cache_key);
                // this._cacheService.save(cache_key, sucessObj, cache_option);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("into getTermData, failedObj:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    /**
     * 檢核投資金額相關規則
     * @param value 要檢核值
     * @param checkRule 檢核相關規則
     */
    private checkInvestMoney(value, checkRule) {
        let output = {
            status: false,
            msg: '',
            data: value
        };
        let range = 0; // 金額級距
        this._logger.log("checkRule:", checkRule);
        let limitMaxAmt = checkRule['limitMaxAmt'] != '' ? parseInt(checkRule['limitMaxAmt']) : 0;
        let limitMinAmt = checkRule['limitMinAmt'] != '' ? parseInt(checkRule['limitMinAmt']) : 0;
        let avlBalance = this.formateFloatAmt(checkRule['avlBalance']);
        if (value.indexOf('.') > 0 || value.indexOf(',') > 0) {
            output.msg = 'FUND_INVEST.CHECK_DATA.INVEST_MONEY.SET_INTEGER';
            return output;
        }
        if (parseInt(value) > avlBalance || avlBalance == 0) {
            output.msg = 'FUND_INVEST.CHECK_DATA.INVEST_MONEY.BALANCE_NOT_ENOUGH';
            return output; // 您的可用餘額不足，不可進行申購
        }
        if (parseInt(value) < limitMinAmt) {
            this.translate.get('FUND_INVEST.CHECK_DATA.INVEST_MONEY.MIN_CHECK', {
                limitMinAmt: checkRule['limitMinAmt']
            }).subscribe((i18nval) => {
                output.msg = i18nval;
            });
            // output.msg = '輸入金額不得低於最低投資金額' + checkRule['limitMinAmt'];
            return output;
        }
        // 集合型基金不回傳最高金額,因此要多判斷 != 0, 才進入錯誤檢核
        if (parseInt(value) > limitMaxAmt && limitMaxAmt != 0) {
            this.translate.get('FUND_INVEST.CHECK_DATA.INVEST_MONEY.MAX_CHECK', {
                limitMaxAmt: checkRule['limitMaxAmt']
            }).subscribe((i18nval) => {
                output.msg = i18nval;
            });
            // output.msg = '輸入金額不得高於最高投資金額' + checkRule['limitMaxAmt'];
            return output;
        }
        // 台幣規則級距
        if (checkRule.fundCcy == 'TWD' || checkRule.fundCcy == 'NTD') {
            range = checkRule.investType == 'single' ? 1 : 1000;
            // 外幣規則級距
        } else {
            range = checkRule.investType == 'single' ? 1 : 10;
        }
        // 不符合金額級距
        if (parseInt(value) % range != 0) {
            this.translate.get('FUND_INVEST.CHECK_DATA.INVEST_MONEY.RANGE_ERROR', {
                errorRange: range
            }).subscribe((i18nval) => {
                output.msg = i18nval;
            });
            // output.msg = '輸入金額需為' + range + '之倍數';
            return output;
        }
        // 台幣單筆,每筆金額不可超過20,000,000 (2千萬)
        if ((checkRule.fundCcy == 'TWD' || checkRule.fundCcy == 'NTD')
            && checkRule.investType == 'single' && parseInt(value) > 20000000) {
            output.msg = 'FUND_INVEST.CHECK_DATA.INVEST_MONEY.NOT_TODAYMAX_AMT';
            return output;
        }
        // 台幣定期定額,不可超過13位整數
        this._logger.log("checkInvestMoney, range:", range);
        if ((checkRule.fundCcy == 'TWD' || checkRule.fundCcy == 'NTD')
            && checkRule.investType != 'single' && value.length > 13) {
            output.msg = 'FUND_INVEST.CHECK_DATA.INVEST_MONEY.NOT_THIRTEEN';
            return output;
        }
        output.status = true;
        return output;
    }

    private getArrayData(setData: any) {
        let output = '';
        if (setData.length == 1) {
            output = setData[0];
        } else if (setData.length == 0) {
            return output;
        } else {
            output = setData.join();
        }
        return output;
    }

    // 將金額 10,000.00 => 10000 or 10,000.25 => 10000.25
    private formateFloatAmt(setData: string) {
        let outData = 0; // 回傳formate格式
        let checkfloat = setData;
        // 無金額 0
        if (typeof setData == 'undefined' || setData == '') {
            return outData;
        }
        // 檢查小數點
        if (setData.indexOf('.') > 0) {
            let floatTemp = setData.split('.');
            // 小數位不是0 就帶原本的
            checkfloat = parseInt(floatTemp[1]) > 0 ? setData : floatTemp[0];
        }
        // 去掉千分位
        if (checkfloat.indexOf(',') > 0) {
            let checkThouSand = checkfloat.replace(/,/g, '');
            outData = checkThouSand.indexOf('.') > 0 ? parseFloat(checkThouSand) : parseInt(checkThouSand);
            return outData;
        }
        outData = checkfloat.indexOf('.') > 0 ? parseFloat(checkfloat) : parseInt(checkfloat);
        return outData
    }
}




