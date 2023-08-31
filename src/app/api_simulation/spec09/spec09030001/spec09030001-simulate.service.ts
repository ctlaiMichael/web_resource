/**
 * Api Simulation: SPEC09030001-外幣兌換取得帳號資料
 */
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SimulationApi } from '@simulation/simulation-api';
import { ObjectUtil } from '@util/formate/modify/object-util';
import {
    api_response1,
    api_response2,
    api_response3,
    api_error
} from './response';

export class SPEC09030001SimulateService implements SimulationApi {

    public getResponse(reqObj: ApiRequestOption) {
        let output: any = {};

        if (reqObj.getSetData().transType == '1') {
            output = ObjectUtil.clone(api_response1);
            return ObjectUtil.clone(output);
        } else if (reqObj.getSetData().transType == '2') {
            output = ObjectUtil.clone(api_response2);
            return ObjectUtil.clone(output);
        }
        
    }

}
