/**
 * Api Simulation: SPEC05010101-帳戶總覽
 */
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SimulationApi } from '@simulation/simulation-api';
import { ObjectUtil } from '@util/formate/modify/object-util';
import { logger } from '@util/log-util';
import {
    api_response,
    api_response1,
    api_error,
    api_exception
} from './response';
import { FieldUtil } from '@util/formate/modify/field-util';

export class SPEC05010101SimulateService implements SimulationApi {

    public getResponse(reqObj: ApiRequestOption) {
        let output: any = {};
        output = ObjectUtil.clone(api_response1);
        return ObjectUtil.clone(output);
    }


}
