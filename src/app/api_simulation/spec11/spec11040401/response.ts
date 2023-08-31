/**
 * 模擬api
 */
let data = {
    'apiId': 'SPEC11040401',
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
        'license': '78984242456566',
        'fundCompId': '53',
        'fundCode': '5303',
        'fundName': '保德信高成長',
        'fundCcy': 'TWD',
        'investAccount': '02203000998570',
        'profitAccount': '02203000855203',
        'investTotalMoney': '10000',
        'balance': '500000',
        'investType': 'single',
        'feed': '0.25', // 原手續費率
        'discountFee': '0.31', // 優惠手續費率
        'termData': {
            'self': '1',
            'signAgr': '1',
            'termA': '1',
            'termB': '1',
            'termC': '1',
            'fee': '1',
            'usaSignNote': '1',
            'hanYa': '1'
        }
    }
};

let realData = {
    "apiId": "SPEC11040401",
    "token": {
        "requestId": "a1330cccb396fb401603347804470",
        "responseTime": "2020-10-22 14:22:59",
        "lang": "zh_TW"
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    "resContent": {
        "hasProfit": "N",
        "investTotalMoney": "10,010",
        "fundCcyChi": "台幣",
        "profitAccount": "",
        "postDebitBalance": "+000009324193.00",
        "accountNickName": "測試帳號894",
        "fundCcy": "TWD",
        "profitAccountNickName": "",
        "investAccount": "02203005800894",
        "license": "07309000031",
        "fundName": "元大多多基金",
        "fundAmt": "10,000",
        "discountFee": "0.10"
    }
};

let df_response = {
    'apiId': 'SPEC11040401',
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

export const api_response = { ...df_response, ...realData };
export const api_response_empty = { ...df_response, ...df_response };
export const api_error = {
    'apiId': 'SPEC11040401',
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
