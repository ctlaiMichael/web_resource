/**
 * 模擬api
 */
let data = {
    'apiId': 'SPEC11040301',
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
        'fee': '0.25', // 原手續費率
        'ccyChi': '台幣', // 中文基金幣別
        'originalFee': '0.24', // 手續費率
        'fundName': '保德信高成長',
        'investTotalMoney': '10500', // 扣款總額
        'discountFee': '0.22', // 優惠後手續費率
        'ccyEng': 'TWD' // 英文基金幣別


        // 'fundCompId': '53',
        // 'fundCode': '5303',
        // 'fundName': '保德信高成長',
        // 'fundCcy': 'TWD',
        // 'investAccount': '02203000998570',
        // 'profitAccount': '02203000855203',
        // 'investMoney': '10000',
        // 'balance': '500000',
        // 'investType': 'single',
        // 'feed': '0.25', // 原手續費率
        // 'discountFeed': '0.31', // 優惠手續費率
        // 'investAmtTotal': '10500', // 扣款總額
        // 'termData': {
        //     'self': '1',
        //     'signAgr': '1',
        //     'termA': '1',
        //     'termB': '1',
        //     'termC': '1',
        //     'fee': '1',
        //     'usaSignNote': '1',
        //     'hanYa': '1'
        // }
    }
};

let realError = {
    "apiId": "SPEC11040301",
    "token": {
        "requestId": "25e34ae537406f691603193314373",
        "responseTime": "2020-10-20 19:28:09",
        "lang": "zh_TW"
    },
    "resFlag": "1",
    "resMessage": {
        "errorCode": "PTX9999 -客戶FATCA身份不可以申購",
        "errorMsg": "PTX9999 -客戶FATCA身份不可以申購"
    }
};

let df_response = {
    'apiId': 'SPEC11040301',
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
    'apiId': 'SPEC11040301',
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
