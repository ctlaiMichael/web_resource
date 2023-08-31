/**
 * 模擬api
 */
let resData1 = {
    'apiId': 'SPEC07030001',
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
        "timeDepositAccount": [
            {
                "accountId": "02203000001164",
                "nickName": "定存測試帳號01",
                "currencyCode": "TWD",
                "balance": "1001234",
                "isSetted": "0",
                "turnCount": "",
                "turnType": "",
                "interestAcc": "",
                "isCompositeAccount": "0"
            },
            {
                "accountId": "02203000002275",
                "nickName": "定存測試帳號02",
                "currencyCode": "TWD",
                "balance": "2005678",
                "isSetted": "1",
                "turnCount": "24",
                "turnType": "1",
                "interestAcc": "06101000123471",
                "isCompositeAccount": "1"
            },
            {
                "accountId": "02203000003389",
                "nickName": "定存測試帳號03",
                "currencyCode": "TWD",
                "balance": "300123456",
                "isSetted": "1",
                "turnCount": "30",
                "turnType": "2",
                "interestAcc": "",
                "isCompositeAccount": "0"
            },
            {
                "accountId": "02203000004496",
                "nickName": "定存測試帳號04",
                "currencyCode": "TWD",
                "balance": "4001234567",
                "isSetted": "0",
                "turnCount": "",
                "turnType": "",
                "interestAcc": "",
                "isCompositeAccount": "0"
            },
            {
                "accountId": "02203000005588",
                "nickName": "定存測試帳號05",
                "currencyCode": "TWD",
                "balance": "50012345678",
                "isSetted": "0",
                "turnCount": "",
                "turnType": "",
                "interestAcc": "",
                "isCompositeAccount": "1"
            }
        ],
        "interestAccount": [{
                "accountId": "06101000123471",
                "nickName": "活存測試帳號01"
            },
            {
                "accountId": "06101000124314",
                "nickName": "活存測試帳號02"
            },
            {
                "accountId": "06101000125732",
                "nickName": "活存測試帳號03"
            },
            {
                "accountId": "06101000126245",
                "nickName": "活存測試帳號04"
            },
            {
                "accountId": "06101000127425",
                "nickName": "活存測試帳號05"
            }
        ]
    }
};

let resData2 = {
    'apiId': 'SPEC07030001',
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
    'apiId': 'SPEC07030001',
    'token': {
        'requestId': '',
        'responseTime': '2020-06-20 18:28:31',
        'lang': 'zh_TW'
    },
    'resFlag': '1',
    'resMessage': {
        'errorCode': 'ERR07030001',
        'errorMsg': 'Test Error'
    }
};
export const api_exception = {
    'errorCode': 'ERRAAAAAAA',
    'errorMsg': 'Test Error'
};
