/**
 * Api Simulation: SPEC03020201-修改裝置綁定
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

export class SPEC03020201SimulateService implements SimulationApi {

    public getResponse(reqObj: ApiRequestOption) {
        let output: any = {};
        output = ObjectUtil.clone(api_response1);
        return ObjectUtil.clone(output);
    }

}
