/**
 * Api Simulation: SPEC01010101-取得廣告
 */
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SimulationApi } from '@simulation/simulation-api';
import { ObjectUtil } from '@util/formate/modify/object-util';
import {
    api_response_all,
    api_response,
    api_response_empty,
    api_error,
    api_exception
} from './response';
import { FieldUtil } from '@util/formate/modify/field-util';
import { ObjectCheckUtil } from '@util/check/object-check-util';

export class SPEC01010102SimulateService implements SimulationApi {

    public getResponse(reqObj: ApiRequestOption) {
        let set_data = reqObj.getSetData();
        let output: any = {};
        let id = FieldUtil.checkField(set_data, 'id');
        output = ObjectUtil.clone(api_response);
        if (ObjectCheckUtil.checkObject(api_response_all, id)) {
            output = {...output, ...{
                'resContent': api_response_all[id]
            }};
        }
        // output = ObjectUtil.clone(api_response_empty);
        // output = ObjectUtil.clone(api_error);
        // output = ObjectUtil.clone(api_exception);
        return ObjectUtil.clone(output);
    }


}
