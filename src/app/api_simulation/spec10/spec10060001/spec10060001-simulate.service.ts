/**
 * Api Simulation: SPEC10060001-外幣匯率查詢
 */
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SimulationApi } from '@simulation/simulation-api';
import { ObjectUtil } from '@util/formate/modify/object-util';
import {
    api_response1,
    api_response2,
    api_error,
    api_exception,
    api_gateway_exception
} from './response';

export class SPEC10060001SimulateService implements SimulationApi {

    public getResponse(reqObj: ApiRequestOption) {
        let output: any = {};
        output = ObjectUtil.clone(api_response1);
        // output = ObjectUtil.clone(api_error);
        // output = ObjectUtil.clone(api_gateway_exception);
        return ObjectUtil.clone(output);
    }

}
