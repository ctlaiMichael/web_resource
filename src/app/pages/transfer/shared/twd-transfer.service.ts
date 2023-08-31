/**
 * 台幣轉帳
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { CheckService } from '@template/check/check.service';
import { UserCheckUtil } from '@util/check/data/user-check-util';
import { SPEC09000305ApiService } from '@api/spec09/spec09000305/spec09000305-api.service';
import { SPEC09000306ApiService } from '@api/spec09/spec09000306/spec09000306-api.service';
import { StringCheckUtil } from '@util/check/string-check-util';
import { SymbolCheckUtil } from '@util/check/word/symbol-check-util';
import { TranslateService } from '@ngx-translate/core';
import { AccountMaskUtil } from '@util/formate/mask/account-mask-util';
import { ChineseCheckUtil } from '@util/check/word/chinese-check-util';

@Injectable()

export class TwdTransferService {
    /**
     * 參數處理
     */
    // 台幣轉帳交易
    private setCacheTrans = {
        'list': 'twd-transfer-trans'
    };

    constructor(
        private _logger: Logger,
        private translate: TranslateService,
        private _formateService: FormateService,
        private _checkService: CheckService,
        private spec09000305: SPEC09000305ApiService,
        private spec09000306: SPEC09000306ApiService
    ) {
    }

    /**
     * 取得注意資訊
     */
    getNoteData() {
        let noteData = {
            title: 'POPUP.CANCEL_EDIT.TITLE',
            // content: 'POPUP.NOTE.FOREIGN_DATE'
            content: 'POPUP.NOTE.TWD_TRANS_PAYABLE'
        };
        return noteData;
    }

    /**
     * 取得頁籤設定
     */
    getBookmark(allow_notAgree?: boolean) {
        let output = [];
        // == Level 1 == //
        // --- [notAgreed] --- //
        output.push({
            id: 'notAgreed',
            name: 'TWD_TRANSFER.EDIT.NOT_AGREED', // 非約轉
            sort: 1,
            lock: (allow_notAgree == false) ? true : false
        });
        // --- [agreement] --- //
        output.push({
            id: 'agreement',
            name: 'TWD_TRANSFER.EDIT.AGREEMENT', // 約定/常用
            sort: 2,
            lock: false
        });
        return output;
    }

    /**
     * 發送確認api
     * @param reqData 請求資料
     * @param option 模式設定 (EX:背景發送)
     */
    sendConfirm(reqData?, option?: object) {
        this._logger.log("into sendData, reqData:", reqData);

        // 台幣轉帳(確認)
        return this.spec09000305.sendData(reqData, option).then(
            (sucessObj) => {
                this._logger.log("send api success, success:", sucessObj);
                // this._cacheService.save(cache_key, sucessObj, cache_option);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    /**
     * 發送交易api前 request處理
     * @param reqData 請求資料
     * @param option 模式設定 (EX:背景發送)
     */
    modifyReq(reqData?, option?: object) {
        return this.spec09000306.modifyData(reqData, option);
    }

    /**
     * 發送交易api
     * @param reqData 請求資料
     * @param option 模式設定 (EX:背景發送)
     */
    sendData(reqData?, option?: object) {
        this._logger.log("into sendData, reqData:", reqData);

        // 台幣轉帳(交易)
        return this.spec09000306.sendData(reqData, option).then(
            (sucessObj) => {
                this._logger.log("send api success, success:", sucessObj);
                // this._cacheService.save(cache_key, sucessObj, cache_option);
                return Promise.resolve(sucessObj);
            },
            (failedObj) => {
                this._logger.log("send api failed, failed:", failedObj);
                return Promise.reject(failedObj);
            }
        );
    }

    // 檢核畫面資料
    checkData(req, checkRule) {
        this._logger.log("into checkData, req:", req);
        let output = {
            status: false,
            msg: 'CHECK.EMPTY', // 候補i18n請輸入正確資料
            data: {
                outAccount: '', // 轉出帳號
                bankCode: '', // 銀行代號
                inAccount: '', // 轉入帳號
                amount: '', // 轉帳金額
                myNote: '', // 存摺備註(給自己)
                forNote: '', // 轉存附言(給對方)
                eMail: '' // 電子信箱
            },
            error_data: [], // 有錯誤將訊息塞入 (判斷欄位檢核是否全過)
            error_list: {
                outAccount: '', // 轉出帳號
                bankCode: '', // 銀行代號
                inAccount: '', // 轉入帳號
                amount: '', // 轉帳金額
                myNote: '', // 存摺備註(給自己)
                forNote: '', // 轉存附言(給對方)
                eMail: '' // 電子信箱
            }
        };
        let showMaxAmt = this._formateService.checkField(checkRule, 'showMaxAmt'); // 金額最高限制
        let avlAmount = this._formateService.checkField(checkRule, 'avlAmount'); // 帳號餘額
        let payType = this._formateService.checkField(checkRule, 'payType'); // 轉出or轉入
        // 轉出帳號
        let outAcct_msg = '';
        output.data.outAccount = this._formateService.checkField(req, 'outAccount');
        let check_outAccount = this._checkService.checkEmpty(req.outAccount);
        if (check_outAccount.status == false) {
            outAcct_msg = check_outAccount.msg;
            output.error_list.outAccount = outAcct_msg;
            output.error_data.push(output.error_list.outAccount);
        }

        // 銀行代號
        let bankCode_msg = '';
        output.data.bankCode = this._formateService.checkField(req, 'bankCode');
        let check_bankCode = this._checkService.checkEmpty(req.bankCode);
        if (check_bankCode.status == false) {
            bankCode_msg = check_bankCode.msg;
            output.error_list.bankCode = bankCode_msg;
            output.error_data.push(output.error_list.bankCode);
        }

        // 轉入帳號
        let inAcct_msg = '';
        output.data.inAccount = this._formateService.checkField(req, 'inAccount');
        let check_inAcct = this._checkService.checkActNum(req.inAccount);
        if (check_inAcct.status == false) {
            inAcct_msg = check_inAcct.msg;
            output.error_list.inAccount = inAcct_msg;
            output.error_data.push(output.error_list.inAccount);
        }

        // 若為非約定轉入（左邊tag）需檢核轉出轉入不可為一樣 (判斷帳號都補0至16位)
        // if(payType == 'notAgreed') {
        let outAccount = this._formateService.checkField(req, 'outAccount');
        let inAccount = this._formateService.checkField(req, 'inAccount');
        let zero_outAcct = AccountMaskUtil.accountAllNoFormate(outAccount); // 轉出 補至16位
        let zero_inAcct = AccountMaskUtil.accountAllNoFormate(inAccount)
        if (zero_outAcct == zero_inAcct) {
            output.error_list.inAccount = 'TWD_TRANSFER.MSG.IN_OUT_SAME';
            output.error_list.outAccount = 'TWD_TRANSFER.MSG.IN_OUT_SAME';
            output.error_data.push(output.error_list.inAccount); // 2者錯誤訊息一樣,放一組就好        
        }
        // }

        // 轉帳金額
        let amount_msg = '';
        output.data.amount = this._formateService.checkField(req, 'amount');
        let check_Amount = this._checkService.checkMoney(req.amount, {
            currency: 'TWD',
            not_zero: true
        });
        if (check_Amount.status == false) {
            amount_msg = check_Amount.msg;
            output.error_list.amount = amount_msg;
            output.error_data.push(output.error_list.amount);
        } else {
            // 檢核金額規則
            let amtRule = {
                showMaxAmt: showMaxAmt, // 金額上限
                avlAmount: avlAmount // 可用餘額
            }
            let checkAmtRule = this.checkAmtRule(req.amount, amtRule);
            if (checkAmtRule.status == false) {
                amount_msg = checkAmtRule.msg;
                output.error_list.amount = amount_msg;
                output.error_data.push(output.error_list.amount);
            }
        }

        // email
        let email_msg = '';
        output.data.eMail = this._formateService.checkField(req, 'otherMail');
        let check_email = this.checkAllEmail(req.otherMail);
        if (check_email.status == false) {
            email_msg = check_email.msg;
            output.error_list.eMail = email_msg;
            output.error_data.push(output.error_list.eMail);
        }

        // 檢核備註(給自己)
        let mynote_msg = '';
        output.data.myNote = this._formateService.checkField(req, 'myNote');
        let check_mynote = this.checkNote(req.myNote, 'myNote');
        if (check_mynote.status == false) {
            mynote_msg = check_mynote.msg;
            output.error_list.myNote = mynote_msg;
            output.error_data.push(output.error_list.myNote);
        }

        // 檢核附言(給對方)
        let fornote_msg = '';
        output.data.forNote = this._formateService.checkField(req, 'forNote');
        let check_fornote = this.checkNote(req.forNote, 'forNote');
        if (check_fornote.status == false) {
            fornote_msg = check_fornote.msg;
            output.error_list.forNote = fornote_msg;
            output.error_data.push(output.error_list.forNote);
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
     * @param type 檢查類型, 'myNote':備註(給自己) , 'forNote':附言(給對方)
     */
    private checkNote(setData, type) {
        let output = {
            status: false,
            msg: '',
            data: setData
        };
        let setLength = setData.length;
        let checkLength = 0;

        // 先檢查是否為空,為空的話不檢核(非必填)
        let checkEmpty = this._checkService.checkEmpty(setData);
        if (checkEmpty['status'] == false) {
            output.status = true;
            return output; // 非必填,沒輸入直接返回
        }

        // 檢查表情符號
        let checkEmoji = StringCheckUtil.emojiCheck(setData);
        if (checkEmoji['status'] == false) {
            output.msg = checkEmoji['msg'];
            return output;
        }

        // 檢查特殊符號
        let checkSymbol = SymbolCheckUtil.check(setData, 'twd_note');
        if (checkSymbol['status'] == false) {
            output.msg = checkSymbol['msg'];
            return output;
        }

        // 檢核簡繁體中文及難字處理
        let checkTradational = ChineseCheckUtil.checkChinese(setData, 'no_symbol');
        if (checkTradational['status'] == false) {
            output.msg = checkTradational['msg'];
            return output;
        }

        // 套用,備註(給自己)檢核規則
        if (type == 'myNote') {
            let checkEnglish = StringCheckUtil.checkEnglish(setData, 'english_number_space');
            // 輸入非英數字,其他特殊字元前面已檢核,此為輸入中文
            if (checkEnglish['status'] == false) {
                checkLength = 7;
                // 輸入英數字
            } else {
                checkLength = 16;
            }
            // 套用,附言(給對方)檢核規則
        } else {
            checkLength = 19;
        }

        // 檢核長度
        if (setLength > checkLength) {
            output['msg'] = 'ERROR.LENGTH_ERROR';
            return output;
        } else {
            output['status'] = true;
            return output;
        }
    }

    /**
     * 
     * @param amount 輸入之金額
     * @param ruleAmt 金額最高限制
     */
    private checkAmtRule(amount, ruleAmt) {
        let output = {
            status: false,
            msg: '',
            data: amount
        };
        let showMaxAmt = this._formateService.checkField(ruleAmt, 'showMaxAmt');
        let avlAmount = this._formateService.checkField(ruleAmt, 'avlAmount');
        let maxAmt_num = showMaxAmt == '' ? 0 : parseInt(showMaxAmt); // 金額最高限制
        let avlAmt_num = avlAmount == '' ? 0 : parseInt(avlAmount); // 帳號餘額
        /**
         * 沒選擇轉入帳號時,沒有回傳「最高金額上限」,因此不能去檢核金額欄位(不顯示紅框),
         * 帳號欄位自己會檢核(阻擋),帳號不可為空,流程不可繼續執行確認頁
         */ 
        if (maxAmt_num != 0) {
            if (parseInt(amount) > maxAmt_num) {
                output['msg'] = 'TWD_TRANSFER.MSG.MAX_AMT_ERROR';
                return output;
            }
        }
        if (parseInt(amount) > avlAmt_num) {
            output['msg'] = 'TWD_TRANSFER.MSG.BALANCE_NOT_ENOUGH';
            return output;
        }
        output.status = true;
        output.msg = '0';
        return output;
    }

    /**
     * 檢核email欄位,可輸入複數email,以;區隔每一筆email
     * @param allEmail 輸入之email(其他郵件)
     */
    private checkAllEmail(allEmail: string) {
        let output = {
            status: false,
            data: allEmail,
            msg: '',
            alert_msg: '',
            errorList: []
        };
        // 先檢核空值
        let checkEmpty = this._checkService.checkEmpty(allEmail);
        if (!checkEmpty.status) {
            // email欄位非必填 沒輸入直接返回
            output.status = true;
            return output;
        }
        let checkList = allEmail.split(';');
        // 檢核不可大於20筆
        if (checkList.length > 20) {
            output.msg = 'TWD_TRANSFER.MSG.TWENTY_COUNT_ERROR';
            return output;
        }
        checkList.forEach(item => {
            let checkItem = UserCheckUtil.checkEmail(item);
            if (!checkItem.status) {
                output.errorList.push(item);
            }
        });
        // 檢核成功
        if (output.errorList.length == 0) {
            output.status = true;
        } else {
            let errorListMsg = output.errorList.join();
            // 您輸入的email： XXXXXXXX格式錯誤
            this.translate.get('TWD_TRANSFER.MSG.YOUR_EMAIL_ERROR', {
                emailErrorMsg: errorListMsg
            }).subscribe((i18nval) => {
                output.msg = i18nval;
            });
        }
        return output;
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

}




