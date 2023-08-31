/**
 * Api Simulation: SPEC05030101-帳戶明細查詢
 */
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SimulationApi } from '@simulation/simulation-api';
import { ObjectUtil } from '@util/formate/modify/object-util';
import {
    api_response,
    api_response7D,
    api_response1M,
    api_responseCustom,
    api_real,
    api_real3,
    api_error,
    api_exception
} from './response';
import { FieldUtil } from '@util/formate/modify/field-util';
import { PaginatorSimlationUtil } from '@simulation/util/paginator-simulation-util';
import { logger } from '@util/log-util';

export class SPEC05030101SimulateService implements SimulationApi {

    public getResponse(reqObj: ApiRequestOption) {
        let set_data = reqObj.getSetData();
        let searchType = FieldUtil.checkField(set_data, 'searchType');
        let output: any = {};

        const paginatedInfo = PaginatorSimlationUtil.getPaginatedInfo(reqObj);
        switch (searchType) {
            case 'today':
                output = ObjectUtil.clone(api_response);
                // output = ObjectUtil.clone(api_real);
                // output = ObjectUtil.clone(api_real3);
                break;
            case '7D':
                output = ObjectUtil.clone(api_response7D);
                break;
            case '1M':
                // output = ObjectUtil.clone(api_response1M);
                // output = ObjectUtil.clone(api_error);
                output = ObjectUtil.clone(api_exception);
                break;
            case 'custom':
                output = ObjectUtil.clone(api_responseCustom);
                // output = ObjectUtil.clone(api_exception);
                break;
            default:
                output = ObjectUtil.clone(api_response);
                break;
        }
        let output_data = PaginatorSimlationUtil.getResponse(output, paginatedInfo, 'resContent.rowData');
        logger.error('simu:', output_data, output, paginatedInfo);
        return ObjectUtil.clone(output_data);
    }


}
