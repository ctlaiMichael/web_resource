/**
 * Api Simulation: SPEC07040001-綜定存結清取得帳號資料
 */
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SimulationApi } from '@simulation/simulation-api';
import { ObjectUtil } from '@util/formate/modify/object-util';
import {
    api_response1,
    api_response2,
    api_error
} from './response';

export class SPEC07040001SimulateService implements SimulationApi {

    public getResponse(reqObj: ApiRequestOption) {
        let output: any = {};
        output = ObjectUtil.clone(api_response1);
        return ObjectUtil.clone(output);
    }

}
