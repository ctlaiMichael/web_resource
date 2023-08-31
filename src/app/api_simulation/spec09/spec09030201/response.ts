/**
 * 模擬api
 */
let resData1 = {
    'apiId': 'SPEC09030201',
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
        "liveNo": "",
        "permitDateRange": {
            "start": "",
            "end": ""
        },
        "birthday": "1967-08-15",
        "transOutAccount": {
            "nickName": "測試301",
            "currencyCode": "USD",
            "accountId": "23108000011301",
            "balance": "79,007,065.32",
            "isEmployee": "0"
        },
        "transInAccount": {
            "nickName": "測試528",
            "currencyCode": "TWD",
            "accountId": "02204000007528",
            "balance": "62,356",
            "bookBalance": "62,356",
            "isEmployee": "0"
        },
        "transOutAmt": "41.49",
        "transInAmt": "1255",
        "exchangeRate": "30.25",
        "usdRate": "30.25",
        "transDate": "2020-09-09 11:22",
        "remitNature": {
            "code": "299ZY301",
            "name": "其他本國資金流出-押標金"
        }
    }
};

let resData2 = {
    'apiId': 'SPEC09030201',
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
    'apiId': 'SPEC09030201',
    'token': {
        'requestId': '',
        'responseTime': '2020-06-20 18:28:31',
        'lang': 'zh_TW'
    },
    'resFlag': '1',
    'resMessage': {
        'errorCode': 'ERR09030201',
        'errorMsg': 'Test Error'
    }
};
export const api_exception = {
    'errorCode': 'ERRAAAAAAA',
    'errorMsg': 'Test Error'
};
