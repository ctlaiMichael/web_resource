/**
 * Api Simulation: SPEC00060201-OTP請求
 */
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SimulationApi } from '@simulation/simulation-api';
import { ObjectUtil } from '@util/formate/modify/object-util';
import {
    api_response,
    api_response_empty,
    api_error
} from './response';

export class SPEC00060201SimulateService implements SimulationApi {

    public getResponse(reqObj: ApiRequestOption) {
        // let set_data = reqObj.getSetData();
        let output: any = {};
        if (reqObj['funType'] == '2') {
            output = ObjectUtil.clone(api_response_empty);
        } else {
            output = ObjectUtil.clone(api_response);
        }

        return ObjectUtil.clone(output);
    }


}
