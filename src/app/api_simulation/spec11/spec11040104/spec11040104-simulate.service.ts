/**
 * Api Simulation: SPEC11040104-台幣定期定額-編輯頁
 */
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SimulationApi } from '@simulation/simulation-api';
import { ObjectUtil } from '@util/formate/modify/object-util';
import {
    api_response,
    api_response_empty,
    api_error
} from './response';

export class SPEC11040104SimulateService implements SimulationApi {

    public getResponse(reqObj: ApiRequestOption) {
        // let set_data = reqObj.getSetData();
        let output: any = {};
        output = ObjectUtil.clone(api_response);
        return ObjectUtil.clone(output);
    }


}
