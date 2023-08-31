/**
 * 模擬api
 */
let data = {
    'apiId': 'SPEC12030102',
    'token': {
        'requestId': '',
        'responseTime': '',
        'lang': ''
    },
    'resFlag': '0',
    'resMessage': {
        'errorCode': '4201',
        'errorMsg': '交易成功'
    },
    'resContent': {
        "infoDate": "2020-09-23 11:16:56 AM",
        "transferDate": "109-09-23 11:16",
        "accountId": "23203001186484",
        "custId": "B121194483",
        "payAmount": "70000"
    }
};

let df_response = {
    'apiId': 'SPEC12030102',
    'token': {
        'requestId': '',
        'responseTime': '',
        'lang': ''
    },
    'resFlag': '0',
    'resMessage': {
        'errorCode': '',
        'errorMsg': ''
    },
    'resContent': {

    }
};

export const api_response = { ...df_response, ...data };
export const api_response_empty = { ...df_response, ...df_response };
export const api_error = {
    'apiId': 'SPEC12030102',
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
