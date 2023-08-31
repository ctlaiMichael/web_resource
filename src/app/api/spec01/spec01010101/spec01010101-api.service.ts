/**
 * API:  SPEC01010101-取得廣告
 */
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@api/base/api-base.service';
// -- Options -- //
import { ApiResponseOption } from '@api/base/options/api-response-option';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SPEC01010101Req } from './spec01010101-req';
import { ObjectCheckUtil } from '@util/check/object-check-util';
// -- Other Library -- //

@Injectable()
export class SPEC01010101ApiService extends ApiBaseService {
    protected serviceId = 'SPEC01010101'; // API Name

    /**
     * 取得列表資料
     * @param reqData 
     * @param option 
     */
    getData(reqData: object, option?: object): Promise<any> {
        let sendObj = new ApiRequestOption(SPEC01010101Req, {
            'reqData': reqData
        });
        // 欄位檢核
        // 修改request
        // let update_req = {};
        // sendObj.modifyRequest(update_req);

        return this.send(sendObj, option).then(
            (resObj: ApiResponseOption) => {
                let output: any = {
                    status: false,
                    msg: '',
                    error: {},
                    infoData: {},
                    data: []
                };
                // this._logger.log("resObj:", resObj);
                output.status = resObj.getStatus();
                output.msg = resObj.getErrorMsg();
                output.infoData = resObj.getData();
                output.error = resObj.getResMsg();
                let tmp_data = this._formateService.checkObjectList(output.infoData, 'rowData', 'array');
                if (tmp_data) {
                    output.data = this._modifyAdList(tmp_data);
                }

                if (!this._checkService.checkEmpty(output.data, true)) {
                    return this.returnError({
                        content: output.msg
                    }, 'EMPTY');
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

    private _modifyAdList(set_data: Array<any>) {
        let output = [];
        set_data.forEach(item => {
            if (ObjectCheckUtil.checkObject(item)) {
                let tmp_data = {
                    showText: false,
                    showLink: false,
                    id: '',
                    title: '',
                    content: '',
                    img: '',
                    url: '',
                    url_title: ''
                };
                tmp_data.id = this._formateService.checkField(item, 'id');
                tmp_data.title = this._formateService.checkField(item, 'title');
                let content = this._formateService.checkField(item, 'content');
                let reg = new RegExp(/(\\*n)/, 'g');
                tmp_data.content = content.replace(reg, '<br>');
                tmp_data.img = this._formateService.checkField(item, 'imageSource');
                tmp_data.url = this._formateService.checkField(item, 'externalLink');
                if (this._checkService.checkEmpty(tmp_data.url, true)) {
                    tmp_data.url_title = this._formateService.checkField(item, 'url_title');
                    if (!tmp_data.url_title) {
                        // 預設文字為看更多
                        tmp_data.url_title = 'BTN.MORE';
                    }
                }
                if (tmp_data.title != '' || tmp_data.content != '') {
                    tmp_data.showText = true;
                }
                if (tmp_data.url != '') {
                    tmp_data.showLink = true;
                }

                output.push(tmp_data);
            } else {
                // 非物件格式
                this._logger.error('spec01010101 rowdata error', typeof item, item);
            }
        });
        return output;
    }


}
