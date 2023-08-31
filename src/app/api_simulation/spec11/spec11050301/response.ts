/**
 * 模擬api SPEC11050301-定期定額確認(台幣)
 */
let response = {
    apiId: "SPEC11050301",
    token: {
        "requestId": "",
        "responseTime": "2020-07-23 20:13:25",
        "lang": "zh_TW"
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    "resContent": {
        "usastaNote": "123",
        "staNote": "Y",
        "isUnverifyFund": "N",
        "isFullFund": "N"
    }
};
let data1M = {};
let dataEmpty = {
    apiId: "SPEC11050301",
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
        outputData: [
            {
                isNetTrans: "true",
                roiDataList: [

                ],
                "infoDateStr": "2020/07/17  11：13：27  AM"
            }
        ]
    }
};

let df_response = {};

export const api_response = { ...df_response, ...response };
export const api_empty = { ...df_response, ...dataEmpty };
export const api_error = {
    apiId: 'SPEC11050301',
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
