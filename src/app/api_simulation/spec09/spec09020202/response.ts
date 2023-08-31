/**
 * 模擬api SPEC09020101-綜存開戶約定
 */

let response = {
    "apiId": "SPEC09020202",
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
            "hasProFit": "",
            "hasOrderProfit": "",
            "transSaveData": "整存整付",
            "transSaveDataCode": "1",
            "transSaveAmt": "20,000",
            "rateTypeCht": "固定",
            "rateTypeCht_Code": "1",
            "autoTrunCount": "10",
            "payRateType": "到期取息",
            "autoTrunType": "本金續存",
            "AutoTrunType_Code": "1",
            "saveType": "24",
            "forWard": " success3",
        },
};
let data1M = {};
let dataEmpty = {
    apiId: "SPEC09020101",
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
    apiId: 'SPEC09020202',
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
