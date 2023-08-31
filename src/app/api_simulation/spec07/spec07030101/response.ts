/**
 * 模擬api
 */
let resData1 = {
    'apiId': 'SPEC07030101',
    'token': {
        'requestId': '',
        'responseTime': '2020-08-24 14:28:31',
        'lang': 'zh_TW'
    },
    'resFlag': '0',
    'resMessage': {
        'errorCode': '',
        'errorMsg': ''
    },
    'resContent': {
        "accountId": "11293000122977",
        "amount": "100000",
        "rateType": "2",
        "rate": "0.795",
        "savingsRange": "12",
        "startDate": "2020-10-15",
        "endDate": "2021-10-15",
        "payCycle": "cycle1",
        "turnCount": "99",
        "finalEndDate": "轉期到結清為止",
        "turnType": "1",
        "interestAcc": "06101000124314"
    }
};

let resData2 = {
    'apiId': 'SPEC07030101',
    'token': {
        'requestId': '',
        'responseTime': '2020-07-16 18:28:31',
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
    'apiId': 'SPEC07030101',
    'token': {
        'requestId': '',
        'responseTime': '2020-06-20 18:28:31',
        'lang': 'zh_TW'
    },
    'resFlag': '1',
    'resMessage': {
        'errorCode': 'ERR07030101',
        'errorMsg': 'Test Error'
    }
};
export const api_exception = {
    'errorCode': 'ERRAAAAAAA',
    'errorMsg': 'Test Error'
};
