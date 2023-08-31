/**
 * API: SPEC11040101-投資標的查詢
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC11040101Req } from './spec11040101-req';
// -- Other Library -- //

@Injectable()
export class SPEC11040101ApiService extends ApiBaseService {

    protected serviceId = 'SPEC11040101';


    /**
     * 取得列表資料
     * @param reqData 條件
     */
    getData(reqData: object, option?: object): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC11040101Req, {
            'reqData': reqData
        });

        // sendObj.modifyRequest(update_req);

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    error: {},
                    infoData: {},
                    foreignFundlist: [], // 外幣標的
                    twdFundlist: [], // 台幣標的
                    allForeign: {},
                    allTwd: {}
                };
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.error = resObj.getResMsg();

                let jsonObj = resObj.getData();
                output.infoData = jsonObj;
                let custIdRisk = this._formateService.checkField(jsonObj, 'custIdRisk'); // 客戶風險等級
                let foreignFundlist = this._formateService.checkObjectList(jsonObj, 'foreignFundlist');
                // output.foreignFundlist = this.formateData(foreignFundlist);
                let foreignListData = this.formateData(foreignFundlist, custIdRisk, 'foreign');
                output.allForeign = foreignListData;
                output.foreignFundlist = foreignListData.all_list;

                let twdFundlist = this._formateService.checkObjectList(jsonObj, 'twdFundlist');
                // output.twdFundlist = this.formateData(twdFundlist);
                let twdFundData = this.formateData(twdFundlist, custIdRisk, 'twd');
                output.allTwd = twdFundData;
                output.twdFundlist = twdFundData.all_list;

                if (!this._checkService.checkEmpty(output.foreignFundlist, true)
                    && !this._checkService.checkEmpty(output.twdFundlist, true)) {
                    this._logger.log("into foreignFundlist && twdFundlist empty");
                    // 查詢期間無交易資料
                    return this.returnError({}, 'ERROR.HASNOT_FUNDCODE');
                }
                return Promise.resolve(output);
            },
            (errorObj) => {
                return Promise.reject(errorObj);
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
    private formateData(setData, custIdRisk, ccyType) {
        let all_list = {}; // 公司清單
        let fund_alllist = {}; // 基金清單
        let fund_alldata = []; // 公司清單
        setData.forEach((item, index) => {
            let group_id = this._formateService.checkField(item, 'groupID');
            let group_name = this._formateService.checkField(item, 'compName');
            let fundRisk = this._formateService.checkField(item, 'fundRisk');
            if (typeof all_list[group_id] == 'undefined') {
                all_list[group_id] = {
                    "fundCompId": group_id,
                    "fundCompName": group_name,
                    "fundData": [],
                    "source_order": index
                };
            }
            let fund_data = {
                "groupId": group_id,
                "fundId": this._formateService.checkField(item, 'fundID'),
                "fundEngCcy": this._formateService.checkField(item, 'currency'),
                "fundName": this._formateService.checkField(item, 'fundName'),
                "risk": fundRisk,
                "riskNumber": 0,
                'riskName': '',
                "hasProfit": this._formateService.checkField(item, 'hasProfit'),
                "source_order": index,
                "fundNo": '',
                "disabled": false
            };
            // fund_data.fundNo = fund_data.groupId + '' + fund_data.fundId;
            fund_data.fundNo = fund_data.fundId;
            fund_data.disabled = custIdRisk < fund_data.risk ? true : false; // 客戶風險屬性不符合
            switch (fund_data.risk) {
                case '1':
                    fund_data.riskName = 'FUND_INVEST.FUND_RISK.LEVEL1';
                    fund_data.riskNumber = 1;
                    break;
                case '2':
                    fund_data.riskName = 'FUND_INVEST.FUND_RISK.LEVEL2';
                    fund_data.riskNumber = 2;
                    break;
                case '3':
                    fund_data.riskName = 'FUND_INVEST.FUND_RISK.LEVEL3';
                    fund_data.riskNumber = 3;
                    break;
                case '4':
                    fund_data.riskName = 'FUND_INVEST.FUND_RISK.LEVEL4';
                    fund_data.riskNumber = 4;
                default:
                    this._logger.log("has not riskName");
                    fund_data.riskName = 'FUND_INVEST.FUND_RISK.NOT_FOUND';
                    fund_data.riskNumber = 0;
                    fund_data.disabled = true;
                    break;
            }
            // 上海銀行公司,標的(代號99)特規處理至第一筆 (台幣海銀代號為99)
            if (group_id == '99' && ccyType == 'twd') {
                fund_data.source_order = -1; // 強制改索引至第一筆 (標的清單)
                all_list[group_id]['source_order'] = -1; // 強制改索引至第一筆 (公司清單)
            }
            // 上海銀行公司,標的(代號98)特規處理至第一筆 (外幣海銀代號為98)
            if (group_id == '98' && ccyType == 'foreign') {
                fund_data.source_order = -1; // 強制改索引至第一筆 (標的清單)
                all_list[group_id]['source_order'] = -1; // 強制改索引至第一筆 (公司清單)
            }
            // set data
            all_list[group_id]['fundData'].push(fund_data);
            fund_alllist[fund_data.fundNo] = fund_data;
            fund_alldata.push(fund_data);
        });
        let all_data = this._formateService.transArrayFillter(all_list);
        let formateObj = { sort: 'source_order', reverse: 'ASC' };
        let formateFund = this.formateSortData(all_data, formateObj);
        this._logger.log("formateData, all_list:", all_list);
        this._logger.log("formateData, all_data:", all_data);
        this._logger.log("formateData, formateFund:", formateFund);
        // return formateFund;
        return {
            all_list: formateFund,
            fund_list: fund_alllist,
            fund_data: fund_alldata
        };
    }

    /**
     * 
     * @param setData 需處理的資料
     * @param formateObj 規格
     * formateObj: { sort: '_sort', reverse: 'DESC' }
     * => sort: 想排序之欄位，EX: remitId 帳戶編號
     * => reverse: 想排序之方式，EX: DESC 遞減  
     */
    private formateSortData(setData, formateObj) {
        let output = this._formateService.transArraySort(setData, formateObj);
        return output;
    }
}
