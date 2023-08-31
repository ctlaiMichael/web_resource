/**
 * Api Simulation: SPEC00050102-營業日
 */
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SimulationApi } from '@simulation/simulation-api';
import { ObjectUtil } from '@util/formate/modify/object-util';
import {
    api_response,
    api_response_empty,
    api_error
} from './response';
import { DateUtil } from '@util/formate/date/date-util';

export class SPEC00050102SimulateService implements SimulationApi {

    public getResponse(reqObj: ApiRequestOption) {
        // let set_data = reqObj.getSetData();
        let output: any = {};
        output = ObjectUtil.clone(api_response);
        let nowTime = DateUtil.transDate('NOW_TIME', 'object');
        let tomorrow = DateUtil.transDate(nowTime.time, 'yyyy-MM-dd');
        output.resContent.nextDay = tomorrow;

        return ObjectUtil.clone(output);
    }


}
