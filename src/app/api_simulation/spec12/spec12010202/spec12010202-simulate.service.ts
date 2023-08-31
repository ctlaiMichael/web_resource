/**
 * Api Simulation: SPEC12010202-信用卡帳單查詢
 */
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SimulationApi } from '@simulation/simulation-api';
import { ObjectUtil } from '@util/formate/modify/object-util';
import {
    api_response,
    api_response_06month,
    api_response_05month,
    api_response_empty,
    api_error
} from './response';
import { FieldUtil } from '@util/formate/modify/field-util';

export class SPEC12010202SimulateService implements SimulationApi {

    public getResponse(reqObj: ApiRequestOption) {
        let set_data = reqObj.getSetData();
        let selectedMonth = FieldUtil.checkField(set_data, 'selectedMonth');
        selectedMonth = selectedMonth.replace(/[\/|\-]/g, '');
        let output: any = {};
        switch (selectedMonth) {
            case '202007':
                output = ObjectUtil.clone(api_response);
                // output = ObjectUtil.clone(api_response_empty);
                // output = ObjectUtil.clone(api_error);
                break;
            case '202006':
                // output = ObjectUtil.clone(api_response_06month);
                output = ObjectUtil.clone(api_response_empty);
                break;
            case '202005':
                output = ObjectUtil.clone(api_response_05month);
                break;
            default:
                output = ObjectUtil.clone(api_response);
                break;
        }
        return ObjectUtil.clone(output);
    }


}
