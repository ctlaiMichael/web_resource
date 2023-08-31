/**
 * 模擬api SPEC09020101-綜存開戶約定
 */

let response = {
    "apiId": "SPEC09020301",
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
            "accountId": "02203000311010",
            "accountIdNickName": "測試",
            "modifyType": "Y",
            "transDepositAmt": "50000",
            "despoitType": "3",
            "transSaveData": "整存整付",
            "rateFunction": "1",
            "payCycle": "cycle2",
            "payCycleMonth": "1",
            "savingsRange": "24",
            "takerate": "4",
            "notifyData": "1",
            "owndData": "N",
        },
};
let data1M = {};
let dataEmpty = {
    apiId: "SPEC09020301",
    token: {
        requestId: "",
        responseTime: "2020-07-17 11:13:27",
        lang: "zh_TW"
    },
    resFlag: '0',
    resMessage: {
        errorCode: "",
        errorMsg: ""
    },
    resContent: {
        
    }
};

let df_response = {};

export const api_response = { ...df_response, ...response };
export const api_empty = { ...df_response, ...dataEmpty };
export const api_error = {
    apiId: 'SPEC09020301',
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
