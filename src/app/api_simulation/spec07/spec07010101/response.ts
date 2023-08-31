/**
 * 模擬api
 */
let data = {
    "apiId": "SPEC07010101",
    "token": {
        "requestId": "",
        "responseTime": "",
        "lang": "TW"
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    'resContent': {
        'intrat': '0.87000',
        'startDate': '109-01-01',
        'endDate': '109-02-06',
        'rateType': '機動',
        'tranAcct': '23-2-03-00-1214091',
        'newConAcct': '無',
        'newAutoTrn': '本金,轉期最終到期日:109-02-01',
        'newPeriod': '到期取息',
        'newBlamt': '500000',
        'newAplAmt': '500000',
        'newCurAmt': '40000',
        "currencyCode": "USD"

    }
};

let df_response = {
    "apiId": "SPEC07010101",
    "token": {
        "requestId": "",
        "responseTime": "",
        "lang": "TW"
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    'resContent': {
    }
};
export const api_real_response = {
    "apiId": "SPEC07010101",
    "token": {
        "requestId": "524a9dcc188c8e411601450699710",
        "responseTime": "2020-09-30 15:24:47",
        "lang": "zh_TW"
    },
    "resFlag": "0",
    "resContent": {
        "intRat": "1.38000%",
        "intDateRange": {
            "start": "2013-12-03",
            "end": "2014-12-03"
        },
        "rateType": "固定",
        "newBlAmt": "50,000.00",
        "newAplAmt": "50,000.00",
        "newCurAmt": "50,000.00",
        "newConAcct": "20084",
        "newAutoTrn": "無",
        "newPeriod": "1個月",
        "tranAcct": "02-2-03-00-3699001",
        'savePeriod': '六個月',
        'autoTrnType': '本金'
    }
};
export const api_response = { ...df_response, ...data };
export const api_response_empty = { ...df_response, ...df_response };
export const api_error = {
    'apiId': 'SPEC07010101',
    'token': {
        'requestId': '',
        'responseTime': '2020-06-20 18:18:31',
        'lang': 'zh_TW'
    },
    'resFlag': '1',
    'resMessage': {
        'errorCode': 'ERRAAAAAAA',
        'errorMsg': 'Test Error'
    }
};
export const api_exception = {
    'errorCode': 'ERRAAAAAAA',
    'errorMsg': 'Test Error'
};
