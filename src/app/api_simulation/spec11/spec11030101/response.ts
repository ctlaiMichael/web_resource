/**
 * 模擬api
 */
let data = {
    "apiId": "SPEC11030101",
    "token": {
        "requestId": "",
        "responseTime": "2020-09-21 15:35:12",
        "lang": "zh_TW"
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    "resContent": {
        "fundData": [
            {
                "licenno": "07102005592",
                "fundCode": "0202",
                "fundName": "富達東南亞",
                "engCcy": "USD",
                "chiCcy": "美金",
                "osamt": "100000",
            },
            {
                "licenno": "07563005978",
                "fundCode": "0204",
                "fundName": "施羅德穩定基金",
                "engCcy": "USD",
                "chiCcy": "美金",
                "osamt": "20000"
            },
            {
                "licenno": "05692004599",
                "fundCode": "5301",
                "fundName": "保德信科技島",
                "engCcy": "TWD",
                "chiCcy": "台幣",
                "osamt": "52000"
            },
            {
                "licenno": "08520055659",
                "fundCode": "5603",
                "fundName": "元大多福",
                "engCcy": "TWD",
                "chiCcy": "台幣",
                "osamt": "112000"
            },
            {
                "licenno": "09552095231",
                "fundCode": "1207",
                "fundName": "法巴美元短期債C",
                "engCcy": "ZAR",
                "chiCcy": "巴西幣",
                "osamt": "11500"
            }
        ],
        "acctList": [{
            "accountID": "02203000541801",
            "nickName": "我的基金定期扣款帳號",
            "balance": "920000"
        },
        {
            "accountID": "05423000555958",
            "nickName": "我的基金定期扣款帳號2",
            "balance": "1020000"
        },
        {
            "accountID": "04459000445985",
            "nickName": "我的基金定期扣款帳號3",
            "balance": "1120000"
        },
        {
            "accountID": "05595000498522",
            "nickName": "我的基金定期扣款帳號4",
            "balance": "780000"
        },
        {
            "accountID": "06659000859421",
            "nickName": "我的基金定期扣款帳號5",
            "balance": "2920000"
        }]
    }
};

let errorData = {
    "apiId": "SPEC11030101",
    "token": {
        "requestId": "a8f288ea445c0f461603418514592",
        "responseTime": "2020-10-23 10:01:30",
        "lang": "zh_TW"
    },
    "resFlag": "1"
};

let df_response = {
    'apiId': 'SPEC11030101',
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
    'apiId': 'SPEC11030101',
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
