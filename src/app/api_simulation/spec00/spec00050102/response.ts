/**
 * 模擬api
 */
let data = {
    "apiId": "SPEC00050102",
    "token": {
        "requestId": "SPEC00050102",
        "responseTime": "2020-11-26 09:31:18",
        "lang": "zh_TW"
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    "resContent": {
        "serverTime": "2020-11-26 09:31:18",
        "isBusinessDay": "Y",
        "nextDay": "2020-11-27",
        "openTime": "09:31",
        "closeTime": "15:15",
        "nextdayInfo": "銀行營業時間已過，此筆將為次一營業日交易。",
        "holidayInfo": "本日非銀行營業日，此筆將為次一營業日交易。",
        "memo": ""
    }
};

let df_response = {
    "apiId": "SPEC00050102",
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
    "resContent": {}
};
// 非營業日
let notbusiness = {
    'resContent': {
        "isBusinessDay": "N",
    }
};

export const api_response = { ...df_response, ...data };
export const api_response_2 = { ...df_response, ...notbusiness };
export const api_response_empty = { ...df_response, ...df_response };
export const api_error = {
    'apiId': 'SPEC00050102',
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
