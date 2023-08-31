/**
 * Api Simulation: SPEC09020101-綜存開戶約定
 */
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SimulationApi } from '@simulation/simulation-api';
import { ObjectUtil } from '@util/formate/modify/object-util';
import { api_response, api_empty, api_error, api_exception } from './response';
// import { FieldUtil } from '@util/formate/modify/field-util';
export class SPEC09020201SimulateService implements SimulationApi {
    public getResponse(reqObj: ApiRequestOption) {
        let output: any = {};
        output = ObjectUtil.clone(api_response);
        return ObjectUtil.clone(output);
    }
}
