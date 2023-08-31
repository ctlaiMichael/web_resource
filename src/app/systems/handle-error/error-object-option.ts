import { ERROR_CODE_LIST } from '@conf/error/error_code';
import { ObjectCheckUtil } from '@util/check/object-check-util';
import { ObjectUtil } from '@util/formate/modify/object-util';
import { HandleErrorOptions } from './handlerror-options';
import { FieldUtil } from '@util/formate/modify/field-util';

export class ErrorObjectOption {
    private errorCodeList: object;

    /**
     * 回傳錯誤事件
     * @param set_data 
     */
    returnError(set_data: any, errorCode?: string): HandleErrorOptions {
        let output = new HandleErrorOptions();
        let app_error_code = FieldUtil.checkField(set_data, 'app_error_code');
        if (typeof errorCode != 'undefined' && app_error_code == '') {
            // 當設定的set_data不是HandleErrorOptions，且有指定errorCode (否則微罪一開始的物件)
            const tmp_obj = this.getErrorObj(errorCode);
            output = { ...output, ...tmp_obj };
        }
        let error_msg = FieldUtil.checkField(set_data, 'content');
        let error_msg2 = FieldUtil.checkField(set_data, 'msg');
        if (!ObjectCheckUtil.checkObject(set_data)) {
            set_data = {};
        }
        if (!error_msg && !error_msg2) {
            // 沒訊息內容強制指定
            set_data['content'] = FieldUtil.checkField(output, 'content');
        }
        output = { ...output, ...set_data };
        if (!!output.msg && output.msg != output.content) {
            output.content = output.msg;
        }

        return output;
    }


    /**
     * 取得error code物件
     * @param error_code 對應ERROR_CODE_LIST的key
     */
    private getErrorObj(error_code: string): object {
        let output: any = {};
        if (!!error_code && typeof error_code == 'string') {
            output = ObjectCheckUtil.checkObjectList(ERROR_CODE_LIST, error_code, 'object');
        }
        if (typeof output != 'object') {
            output = {};
        }
        return ObjectUtil.clone(output);
    }
}
