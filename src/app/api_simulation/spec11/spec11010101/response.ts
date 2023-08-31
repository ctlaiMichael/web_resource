/**
 * 模擬api
 */
let response = {
    "apiId": "SPEC11010101",
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
        "haveFundAllow": "Y",
        "totccy": "TWD",
        "totosamt": "290084884.00",
        "totPrice": "290655142.00",
        "noProc": "570.258.00",
        "apdint": "0.00",
        "baoChou": ".20",
        "intretn": ".20"
    }
};

let df_response = {
    "apiId": "SPEC11010101",
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
let empty_data: any = { ...df_response, ...{
    "resContent": {
        "haveFundAllow": "N",
        "totosamt": "",
        "totPrice": ""
    }
}};


export const api_response = { ...df_response, ...response };
export const api_empty = empty_data;
export const api_error = {
    apiId: 'SPEC11010101',
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
