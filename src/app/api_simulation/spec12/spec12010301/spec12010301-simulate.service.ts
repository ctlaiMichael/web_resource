/**
 * Api Simulation: SPEC12010301-未出帳消費查詢
 */
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SimulationApi } from '@simulation/simulation-api';
import { ObjectUtil } from '@util/formate/modify/object-util';
import {
    api_response,
    api_response_empty,
    api_error
} from './response';

export class SPEC12010301SimulateService implements SimulationApi {

    public getResponse(reqObj: ApiRequestOption) {
        let output: any = {};
        output = ObjectUtil.clone(api_response);
        // output = ObjectUtil.clone(api_response_empty);
        // output = ObjectUtil.clone(api_error);
        return ObjectUtil.clone(output);
    }


}
