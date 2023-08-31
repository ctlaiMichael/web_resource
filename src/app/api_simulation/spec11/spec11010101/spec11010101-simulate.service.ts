/**
 * Api Simulation: SPEC11010101-投資理財總覽
 */
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SimulationApi } from '@simulation/simulation-api';
import { ObjectUtil } from '@util/formate/modify/object-util';
import { logger } from '@util/log-util';
import {
    api_response
    , api_empty
    , api_error
    , api_exception
} from './response';

export class SPEC11010101SimulateService implements SimulationApi {
    public getResponse(reqObj: ApiRequestOption) {
        let output = ObjectUtil.clone(api_response);
        // let output = ObjectUtil.clone(api_empty);
        // let output = ObjectUtil.clone(api_error);
        // let output = ObjectUtil.clone(api_exception);
        return ObjectUtil.clone(output);
    }
}
