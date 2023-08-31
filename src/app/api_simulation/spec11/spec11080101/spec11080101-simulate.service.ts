/**
 * Api Simulation: SPEC11080101 投資交易明細
 */
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SimulationApi } from '@simulation/simulation-api';
import { ObjectUtil } from '@util/formate/modify/object-util';
import { api_response, api_response7D, api_response1M, api_responseCustom } from './response';
// import { FieldUtil } from '@util/formate/modify/field-util';
import { PaginatorSimlationUtil } from '@simulation/util/paginator-simulation-util';
import { logger } from '@util/log-util';
import { FieldUtil } from '@util/formate/modify/field-util';

export class SPEC11080101SimulateService implements SimulationApi {
    public getResponse(reqObj: ApiRequestOption) {
        let set_data = reqObj.getSetData();
        let searchType = FieldUtil.checkField(set_data, 'searchType');
        let output: any = {};
        const paginatedInfo = PaginatorSimlationUtil.getPaginatedInfo(reqObj);
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
        let output_data = PaginatorSimlationUtil.getResponse(
            output,
            paginatedInfo,
            'resContent.outputData.vecPtib08'
        );
        logger.error('simu:', output_data, output, paginatedInfo);
        return ObjectUtil.clone(output_data);
    }
}
