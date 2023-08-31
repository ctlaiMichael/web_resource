/**
 * 模擬api SPEC09020101-綜存開戶約定
 */

let response = {
    "apiId": "SPEC09020203",
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
            "time_Acn": "02203000311010",
            "transSaveData": "整存整付",
            "transSaveAmt": "20,000",
            "deDrat": "1.31000",
            "newDepprDm": "指定到期日：24",
            "dprCnt": "2",
            "newDprAmt": "91,000",
            "newPlrAmt": "81,900",
            "accountId": "02203000541801",
            "autoTrunCount": "10",
            "newBkvAmt": "0",
            "autoTrunType": "本金續存",
            "AutoTrunType_Code": "1",
            "rateTypeCht": "固定",
            "rateTypeCht_Code": "1",
            "payRateType": "到期取息",

    }
};
let data1M = {};
let dataEmpty = {
    apiId: 'SPEC09020203',
    token: {
        requestId: '',
        responseTime: '2020-07-17 11:13:27',
        lang: 'zh_TW'
    },
    resFlag: '0',
    resMessage: {
        errorCode: '',
        errorMsg: ''
    },
    resContent: {
        outputData: [
            {
                isNetTrans: 'true',
                roiDataList: [],
                infoDateStr: '2020/07/17  11：13：27  AM'
            }
        ]
    }
};

let df_response = {};

export const api_response = { ...df_response, ...response };
export const api_empty = { ...df_response, ...dataEmpty };
export const api_error = {
    apiId: 'SPEC09020203',
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
