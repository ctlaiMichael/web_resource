/**
 * 模擬api
 */
let resData1 = {
    'apiId': 'SPEC03030101',
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
        dataTime: "2020-08-31 16:28:31",
        rowData: [
            {
                uuid: 'CB5A28MMEM-479AEDD606FAC7BE-21C1',
                deviceName: '我的Android',
                platform: 'Android'
            },
            {
                uuid: '0987654321',
                deviceName: '我的iphone',
                platform: 'iOS'
            }
        ]
    }
};

let resData2 = {
    'apiId': 'SPEC03030101',
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
    'apiId': 'SPEC03030101',
    'token': {
        'requestId': '',
        'responseTime': '2020-08-31 16:28:31',
        'lang': 'zh_TW'
    },
    'resFlag': '1',
    'resMessage': {
        'errorCode': 'ERR03030101',
        'errorMsg': 'Test Error'
    }
};
export const api_exception = {
    'errorCode': 'ERRAAAAAAA',
    'errorMsg': 'Test Error'
};
