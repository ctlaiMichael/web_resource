/**
 * Api Simulation: SPEC05030101-帳戶明細查詢
 */
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SimulationApi } from '@simulation/simulation-api';
import { ObjectUtil } from '@util/formate/modify/object-util';
import {
    api_response,
    api_response1M,
    api_responseCustom,
    api_response3M
} from './response';
import { FieldUtil } from '@util/formate/modify/field-util';
import { PaginatorSimlationUtil } from '@simulation/util/paginator-simulation-util';
import { logger } from '@util/log-util';

export class SPEC11070101SimulateService implements SimulationApi {

    public getResponse(reqObj: ApiRequestOption) {
        let set_data = reqObj.getSetData();
        let searchType = FieldUtil.checkField(set_data, 'searchType');
        let output: any = {};

        const paginatedInfo = PaginatorSimlationUtil.getPaginatedInfo(reqObj);
        switch (searchType) {
            case 'today':
                output = ObjectUtil.clone(api_response);
                break;
            case '3M':
                output = ObjectUtil.clone(api_response3M);
                // logger.log("into 3M getResponse");
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
        let output_data = PaginatorSimlationUtil.getResponse(output, paginatedInfo, 'resContent.rowData');
        logger.error('simu:', output_data, output, paginatedInfo);
        return ObjectUtil.clone(output_data);
    }


}
