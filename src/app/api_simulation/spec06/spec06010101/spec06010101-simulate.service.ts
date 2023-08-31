/**
 * Api Simulation: SPEC06010101-國外匯入匯款查詢
 */
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SimulationApi } from '@simulation/simulation-api';
import { ObjectUtil } from '@util/formate/modify/object-util';
import {
    api_response,
    api_response7D,
    api_response1M,
    api_responseCustom
} from './response';
import { FieldUtil } from '@util/formate/modify/field-util';

export class SPEC06010101SimulateService implements SimulationApi {

    public getResponse(reqObj: ApiRequestOption) {
        let set_data = reqObj.getSetData();
        let searchType = FieldUtil.checkField(set_data, 'id');
        let output: any = {};
        switch (searchType) {
            case 'today':
                output = ObjectUtil.clone(api_response);
                break;
            case '7D':
                output = ObjectUtil.clone(api_response7D);
                break;
            case '1M':
                output = ObjectUtil.clone(api_response1M);
                break;
            case 'custom':
                output = ObjectUtil.clone(api_responseCustom);
                break;
            default:
                output = ObjectUtil.clone(api_response);
                break;
        }
        return ObjectUtil.clone(output);
    }


}
