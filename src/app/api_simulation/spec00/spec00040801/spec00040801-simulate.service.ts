/**
 * Api Simulation: SPEC00040801-貸款帳號選單查詢
 */
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SimulationApi } from '@simulation/simulation-api';
import { ObjectUtil } from '@util/formate/modify/object-util';
import {
    api_response,
    api_response_empty,
    api_error
} from './response';

export class SPEC00040801SimulateService implements SimulationApi {

    public getResponse(reqObj: ApiRequestOption) {
        // let set_data = reqObj.getSetData();
        let output: any = {};
        output = ObjectUtil.clone(api_response);
        // output = ObjectUtil.clone(api_real_response);
        // output = ObjectUtil.clone(api_error);
        return ObjectUtil.clone(output);
    }


}
