/**
 * Api Simulation: SPEC01010101-取得廣告
 */
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SimulationApi } from '@simulation/simulation-api';
import { ObjectUtil } from '@util/formate/modify/object-util';
import {
    api_response,
    api_response_empty,
    api_error,
    api_exception
} from './response';

export class SPEC01010101SimulateService implements SimulationApi {

    public getResponse(reqObj: ApiRequestOption) {
        // let set_data = reqObj.getSetData();
        let output: any = {};
        output = ObjectUtil.clone(api_response);
        // output = ObjectUtil.clone(api_response_empty);
        // output = ObjectUtil.clone(api_error);
        // output = ObjectUtil.clone(api_exception);
        return ObjectUtil.clone(output);
    }


}
