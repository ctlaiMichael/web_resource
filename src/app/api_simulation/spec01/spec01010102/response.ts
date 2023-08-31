/**
 * 模擬api
 */
import * as AdSimulation from './advert-response';

let data1 = {
    "apiId": "SPEC01010102",
    "token": {
        "requestId": "",
        "responseTime": "2020-07-10 14:27:50",
        "lang": "zh_TW"
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    "resContent": {
        "id": "a0001",
        "imageSource": AdSimulation['advert3']
    }
};

let data2 = {
    "apiId": "SPEC01010102",
    "token": {
        "requestId": "",
        "responseTime": "2020-07-10 14:27:50",
        "lang": "zh_TW"
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    "resContent": {
        "id": "b0002",
        "imageSource": AdSimulation['advert2'],
    }
};

let data3 = {
    "apiId": "SPEC01010102",
    "token": {
        "requestId": "",
        "responseTime": "2020-07-10 14:27:50",
        "lang": "zh_TW"
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    "resContent": {
        "id": "b0003",
        "imageSource": AdSimulation['advert1'],
    }
};


let df_response = {
    'apiId': 'SPEC01010102',
    'token': {
        'requestId': '',
        'responseTime': '',
        'lang': ''
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    'resContent': {
    }
};


export const api_response_all = AdSimulation['realAdvert'];

export const api_response = { ...df_response, ...data1 };
export const api_response_empty = { ...df_response, ...df_response };
export const api_error = {
    'apiId': 'SPEC01010102',
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
    'apiId': 'SPEC01010102',
    'responseTime': '2020-06-20 18:18:31',
    'errorCode': 'ERRAAAAAAA',
    'errorMsg': 'Test Error'
};

