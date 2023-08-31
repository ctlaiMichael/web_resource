/**
 * Api Simulation: SPEC00050201-條款查詢
 */
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { SimulationApi } from '@simulation/simulation-api';
import { ObjectUtil } from '@util/formate/modify/object-util';
import {
    api_response4, // A+B+C
    api_responseAB, // A+B
    api_responseAC, // A+C
    api_responseBC, // B+C
    api_responseA, // A
    api_responseB, // B
    api_responseC, // C
    api_response9,
    api_response10,
    api_response11,
    api_response12,
    api_response13,
    api_response_empty,
    api_error
} from './response';

export class SPEC00050201SimulateService implements SimulationApi {

    public getResponse(reqObj: ApiRequestOption) {
        let set_data = reqObj.getSetData();
        // let termId = ObjectCheckUtil.checkObjectList(set_data, 'termId');
        let termId = [];
        if (set_data.hasOwnProperty('termId')) {
            termId = set_data.termId;
        }
        let output: any = {};
        let type = this.getArrayData(termId);
        switch (type) {
            case 'Fund_Terms04_A,Fund_Terms04_B,Fund_Terms04_C':
                output = ObjectUtil.clone(api_response4);
                break;
            case 'Fund_Terms04_A,Fund_Terms04_B':
                output = ObjectUtil.clone(api_responseAB);
                break;
            case 'Fund_Terms04_A,Fund_Terms04_C':
                output = ObjectUtil.clone(api_responseAC);
                break;
            case 'Fund_Terms04_B,Fund_Terms04_C':
                output = ObjectUtil.clone(api_responseBC);
                break;
            case 'Fund_Terms04_A':
                output = ObjectUtil.clone(api_responseA);
                break;
            case 'Fund_Terms04_B':
                output = ObjectUtil.clone(api_responseB);
                break;
            case 'Fund_Terms04_C':
                output = ObjectUtil.clone(api_responseC);
                break;
            case 'Fund_Terms09':
                output = ObjectUtil.clone(api_response9);
                break;
            case 'Fund_Terms10':
                output = ObjectUtil.clone(api_response10);
                break;
            case 'Fund_Terms11':
                output = ObjectUtil.clone(api_response11);
                break;
            case 'Fund_Terms12':
                output = ObjectUtil.clone(api_response12);
                break;
            case 'Fund_Terms13':
                output = ObjectUtil.clone(api_response13);
                break;
        }
        return ObjectUtil.clone(output);
    }

    private getArrayData(setData: any) {
        let output = '';
        if (setData.length == 1) {
            output = setData[0];
        } else if (setData.length == 0) {
            return output;
        } else {
            output = setData.join();
        }
        return output;
    }


}
