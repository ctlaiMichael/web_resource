/**
 * Api Simulation: SPEC09030101-外幣兌換-台轉外交易
 */
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SimulationApi } from '@simulation/simulation-api';
import { ObjectUtil } from '@util/formate/modify/object-util';
import {
    api_response1,
    api_response2,
    api_error,
    api_exception
} from './response';

export class SPEC09030101SimulateService implements SimulationApi {

    public getResponse(reqObj: ApiRequestOption) {
        let output: any = {};
        output = ObjectUtil.clone(api_response1);
        // output = ObjectUtil.clone(api_error);
        // output = ObjectUtil.clone(api_exception);
        return ObjectUtil.clone(output);
    }

}
