/**
 * Api Simulation: SPEC09000302-非約定轉出帳號查詢
 */
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SimulationApi } from '@simulation/simulation-api';
import { ObjectUtil } from '@util/formate/modify/object-util';
import {
    api_response,
    api_response_empty,
    api_error,
    api_exception,
    api_gateway_exception
} from './response';

export class SPEC09000302SimulateService implements SimulationApi {

    public getResponse(reqObj: ApiRequestOption) {
        // let set_data = reqObj.getSetData();
        let output: any = {};
        output = ObjectUtil.clone(api_response);
        // output = ObjectUtil.clone(api_exception);
        // output = ObjectUtil.clone(api_gateway_exception);
        return ObjectUtil.clone(output);
    }


}
