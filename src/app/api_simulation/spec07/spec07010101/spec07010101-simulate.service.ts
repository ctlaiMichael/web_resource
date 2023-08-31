/**
 * Api Simulation: SPEC07010101-定期存款-基本資料
 */
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SimulationApi } from '@simulation/simulation-api';
import { ObjectUtil } from '@util/formate/modify/object-util';
import {
    api_response,
    api_real_response,
    api_response_empty,
    api_error
} from './response';

export class SPEC07010101SimulateService implements SimulationApi {

    public getResponse(reqObj: ApiRequestOption) {
        // let set_data = reqObj.getSetData();
        let output: any = {};
        // output = ObjectUtil.clone(api_response);
        output = ObjectUtil.clone(api_real_response);
        return ObjectUtil.clone(output);
    }


}
