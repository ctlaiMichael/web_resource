/**
 * Api Simulation: SPEC08020101-貸款服務-本金利息明細查詢(本金)
 */
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SimulationApi } from '@simulation/simulation-api';
import { ObjectUtil } from '@util/formate/modify/object-util';
import {
    api_response,
    api_real_response,
    api_response1Y,
    api_response2Y,
    api_responseCustom
} from './response';
import { FieldUtil } from '@util/formate/modify/field-util';
import { PaginatorSimlationUtil } from '@simulation/util/paginator-simulation-util';
import { logger } from '@util/log-util';

export class SPEC08020101SimulateService implements SimulationApi {

    public getResponse(reqObj: ApiRequestOption) {
        let set_data = reqObj.getSetData();
        let searchType = FieldUtil.checkField(set_data, 'searchType');
        let output: any = {};

        const paginatedInfo = PaginatorSimlationUtil.getPaginatedInfo(reqObj);
        switch (searchType) {
            case 'toyear':
                // output = ObjectUtil.clone(api_response);
                output = ObjectUtil.clone(api_real_response);
                break;
            case '1Y':
                output = ObjectUtil.clone(api_response1Y);
                break;
            case '2Y':
                output = ObjectUtil.clone(api_response2Y);
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
