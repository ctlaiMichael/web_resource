/**
 * Api Simulation: SPEC10010001-台幣利率查詢
 */
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SimulationApi } from '@simulation/simulation-api';
import { ObjectUtil } from '@util/formate/modify/object-util';
import {
    api_real_response1,
    api_response1,
    api_response2,
    api_error
} from './response';

export class SPEC10010001SimulateService implements SimulationApi {

    public getResponse(reqObj: ApiRequestOption) {
        let output: any = {};
        // output = ObjectUtil.clone(api_response1);
        output = ObjectUtil.clone(api_real_response1);
        return ObjectUtil.clone(output);
    }

}
