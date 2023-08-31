/**
 * 模擬api SPEC09020303-定存解除
 */

let response = {
    "apiId": "SPEC09020303",
    "token": {
        "requestId": "",
        "responseTime": "2020-07-07 17:07:39",
        "lang": "zh_TW"
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    "resContent": {
    }
};
let data1M = {};
let dataEmpty = {
    "apiId": "SPEC09020303",
    "token": {
        "requestId": "",
        "responseTime": "2020-07-07 17:07:39",
        "lang": "zh_TW"
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    "resContent": {
    }
};

let df_response = {};

export const api_response = { ...df_response, ...response };
export const api_empty = { ...df_response, ...dataEmpty };
export const api_error = {
    apiId: 'SPEC09020303',
    token: {
        requestId: '',
        responseTime: '2020-06-20 18:18:31',
        lang: 'zh_TW'
    },
    resFlag: '1',
    resMessage: {
        errorCode: 'ERRAAAAAAA',
        errorMsg: 'Test Error'
    }
};
export const api_exception = {
    errorCode: 'ERRAAAAAAA',
    errorMsg: 'Test Error'
};
