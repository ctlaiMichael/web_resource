/**
 * API:  SPEC09000304-常用帳號查詢
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC09000304Req } from './spec09000304-req';
// -- Other Library -- //

@Injectable()
export class SPEC09000304ApiService extends ApiBaseService {
    protected serviceId = 'SPEC09000304'; // API Name

    /**
     * 取得列表資料
     * @param reqData 
     * @param option 
     */
    getData(reqData: object, option?: object, type?: string): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC09000304Req, {
            'reqData': reqData
        });

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    error: {},
                    infoData: {},
                    // 常用帳號資料
                    data: []
                };
                this._logger.log("11111resObj:", resObj);
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.infoData = resObj.getData();
                output.error = resObj.getResMsg();
                let offenAcctData = this._formateService.checkObjectList(output.infoData, 'offenAcctData');
                let formateShowData = this.formateShowImage(offenAcctData);
                output.data = formateShowData.data;
                let errorCode = this._formateService.checkField(output.error, 'errorCode');
                let errorMsg = this._formateService.checkField(output.error, 'errorMsg');
                // 判斷errorCode: '1', EX: 無辦理常用帳號
                if (errorCode == '1') {
                    return Promise.reject({
                        title: 'ERROR.TITLE',
                        content: errorMsg
                    });
                }

                if (!output.status) {
                    // 伺服器回傳錯誤
                    return this.returnError({
                        content: output.msg
                    }, 'SPEC09000304_SERVER_REP');
                }
                if (!this._checkService.checkEmpty(output.data, true)) {
                    // formate 您尚無約定轉入帳號/常用帳號。您亦可透過web網路銀行「其他服務>同戶名交易啟用/註銷」功能，啟用「同戶名交易」服務，辦理您名下各帳戶間的轉帳。
                    return this.returnError({
                        content: 'TWD_TRANSFER.MSG.TRANSINACCT_EMPTY'
                    }, 'SPEC09000304_SERVER_REP');
                }
                // if (!this._checkService.checkEmpty(output.data, true)) {
                //     this._logger.log("into EMPTY");
                //     // 查詢期間無交易資料
                //     return this.returnError({}, 'EMPTY_RANGE_API');
                // }

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

    /**
 * 判斷是否顯示圖片
 */
    private formateShowImage(setData) {
        let output = {
            status: true,
            data: []
        };
        setData.forEach(item => {
            if (typeof item['image'] != 'undefined' && item['image'] != '') {
                item['showImage'] = true;
            } else {
                item['showImage'] = false;
            }
        });
        output.data = setData;
        return output;
    }

}
