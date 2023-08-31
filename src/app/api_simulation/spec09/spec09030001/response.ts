/**
 * 模擬api
 */
let resData1 = {
    'apiId': 'SPEC09030001',
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
        "liveNo": "",
        "permitDateRange": {
            "start": "",
            "end": ""
        },
        "birthday": "1967-08-15",
        "transOutAccount": [{
                "accountId": "02203000001164",
                "nickName": "台幣測試帳號01",
                "currencyCode": "TWD",
                "balance": "1001234",
                "isEmployee": "0"
            },
            {
                "accountId": "02203000002275",
                "nickName": "台幣測試帳號02",
                "currencyCode": "TWD",
                "balance": "2005678",
                "isEmployee": "0"
            },
            {
                "accountId": "02204000003389",
                "nickName": "台幣測試帳號03",
                "currencyCode": "TWD",
                "balance": "300123456",
                "isEmployee": "1"
            },
            {
                "accountId": "02203000004496",
                "nickName": "台幣測試帳號04",
                "currencyCode": "TWD",
                "balance": "4001234567",
                "isEmployee": "0"
            },
            {
                "accountId": "02203000005588",
                "nickName": "台幣測試帳號05",
                "currencyCode": "TWD",
                "balance": "50012345678",
                "isEmployee": "0"
            }
        ],
        "transInAccount": [{
                "accountId": "06101000123471",
                "nickName": "外幣測試帳號01",
                "isEmployee": "0"
            },
            {
                "accountId": "06101000124314",
                "nickName": "外幣測試帳號02",
                "isEmployee": "0"
            },
            {
                "accountId": "06101000125732",
                "nickName": "外幣測試帳號03",
                "isEmployee": "0"
            },
            {
                "accountId": "06101000126245",
                "nickName": "外幣測試帳號04",
                "isEmployee": "0"
            },
            {
                "accountId": "06101000127425",
                "nickName": "外幣測試帳號05",
                "isEmployee": "0"
            }
        ],
        "remitNature": [{
            "groupId": "C5",
            "groupName": "本國資金流出",
            "item": [{
                "code": "299ZY301",
                "name": "其他本國資金流出-押標金"
            },
            {
                "code": "299ZY302",
                "name": "其他本國資金流出-保證金"
            }]
        },
        {
            "groupId": "C6",
            "groupName": "外國資金流出",
            "item": [{
                "code": "399ZY301",
                "name": "其他外國資金流出-押標金"
            },
            {
                "code": "399ZY302",
                "name": "其他外國資金流出-保證金"
            }]
        },
        {
            "groupId": "C8",
            "groupName": "移轉支出",
            "item": [{
                "code": "530FY3XX",
                "name": "移民支出"
            }]
        }],
        "isEmployee": "0"
    }
};

let resData2 = {
    'apiId': 'SPEC09030001',
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
        "liveNo": "",
        "permitDateRange": {
            "start": "",
            "end": ""
        },
        "birthday": "1967-08-15",
        "transOutAccount": [{
                "accountId": "06101000123471",
                "nickName": "美金帳號",
                "currencyCode": "USD",
                "balance": "1000000",
                "isEmployee": "0"
            },
            {
                "accountId": "06101000124314",
                "nickName": "歐元帳號",
                "currencyCode": "EUR",
                "balance": "2000000",
                "isEmployee": "0"
            },
            {
                "accountId": "06101000125732",
                "nickName": "日元帳號",
                "currencyCode": "JPY",
                "balance": "3000000",
                "isEmployee": "0"
            },
            {
                "accountId": "06101000126245",
                "nickName": "人民幣帳號",
                "currencyCode": "CNY",
                "balance": "4000000",
                "isEmployee": "0"
            },
            {
                "accountId": "06101000127425",
                "nickName": "澳幣帳號",
                "currencyCode": "AUD",
                "balance": "5000000",
                "isEmployee": "0"
            }
        ],
        "transInAccount": [{
                "accountId": "02203000001164",
                "nickName": "台幣測試帳號01",
                "currencyCode": "TWD",
                "isEmployee": "0"
            },
            {
                "accountId": "02203000002275",
                "nickName": "台幣測試帳號02",
                "currencyCode": "TWD",
                "isEmployee": "0"
            },
            {
                "accountId": "02204000003389",
                "nickName": "台幣測試帳號03",
                "currencyCode": "TWD",
                "isEmployee": "1"
            },
            {
                "accountId": "02203000004496",
                "nickName": "台幣測試帳號04",
                "currencyCode": "TWD",
                "isEmployee": "0"
            },
            {
                "accountId": "02203000005588",
                "nickName": "台幣測試帳號05",
                "currencyCode": "TWD",
                "isEmployee": "0"
            }
        ],
        "remitNature": [{
            "groupId": "C5",
            "groupName": "本國資金流出",
            "item": [{
                "code": "299ZY301",
                "name": "其他本國資金流出-押標金"
            },
            {
                "code": "299ZY302",
                "name": "其他本國資金流出-保證金"
            }]
        },
        {
            "groupId": "C6",
            "groupName": "外國資金流出",
            "item": [{
                "code": "399ZY301",
                "name": "其他外國資金流出-押標金"
            },
            {
                "code": "399ZY302",
                "name": "其他外國資金流出-保證金"
            }]
        },
        {
            "groupId": "C8",
            "groupName": "移轉支出",
            "item": [{
                "code": "530FY3XX",
                "name": "移民支出"
            }]
        }],
        "isEmployee": "0"
    }
};

let resData3 = {
    'apiId': 'SPEC09030001',
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
export const api_response3 = resData3;
export const api_error = {
    'apiId': 'SPEC09030001',
    'token': {
        'requestId': '',
        'responseTime': '2020-06-20 18:28:31',
        'lang': 'zh_TW'
    },
    'resFlag': '1',
    'resMessage': {
        'errorCode': 'ERR09030001',
        'errorMsg': 'Test Error'
    }
};
export const api_exception = {
    'errorCode': 'ERRAAAAAAA',
    'errorMsg': 'Test Error'
};
