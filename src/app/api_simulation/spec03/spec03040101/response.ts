/**
 * 模擬api
 */
let resData1 = {
    'apiId': 'SPEC03040101',
    'token': {
        'requestId': '',
        'responseTime': '2020-08-31 16:28:31',
        'lang': 'zh_TW'
    },
    'resFlag': '0',
    'resMessage': {
        'errorCode': '',
        'errorMsg': ''
    },
    'resContent': {
        userId: 'A123456789',
        bindStatus: '1',
        fastType: '2',
        fastStatus: '2',
        patternErrCount: '0'
    }
};

let resData2 = {
    'apiId': 'SPEC03040101',
    'token': {
        'requestId': '',
        'responseTime': '2020-08-31 16:28:31',
        'lang': 'zh_TW'
    },
    'resFlag': '0',
    'resMessage': {
        'errorCode': '',
        'errorMsg': ''
    },
    'resContent': {

    }
};

export const api_response1 = resData1;
export const api_response2 = resData2;
export const api_error = {
    'apiId': 'SPEC03040101',
    'token': {
        'requestId': '',
        'responseTime': '2020-08-31 16:28:31',
        'lang': 'zh_TW'
    },
    'resFlag': '1',
    'resMessage': {
        'errorCode': 'ERR03040101',
        'errorMsg': 'Test Error'
    }
};
export const api_exception = {
    'errorCode': 'ERRAAAAAAA',
    'errorMsg': 'Test Error'
};


export const api_gateway_exception = {
    "return_code": 23,
    "return_message": "Request session expired"
};
