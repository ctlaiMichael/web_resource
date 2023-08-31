/**
 * Api Simulation: SPEC09020303-定存解除
 */
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SimulationApi } from '@simulation/simulation-api';
import { ObjectUtil } from '@util/formate/modify/object-util';
import { api_response } from './response';
// import { FieldUtil } from '@util/formate/modify/field-util';
import { PaginatorSimlationUtil } from '@simulation/util/paginator-simulation-util';
import { logger } from '@util/log-util';

export class SPEC09020303SimulateService implements SimulationApi {
    public getResponse(reqObj: ApiRequestOption) {
        let output: any = {};
        output = ObjectUtil.clone(api_response);
        return ObjectUtil.clone(output);
    }
}
