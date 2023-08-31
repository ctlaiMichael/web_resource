/**
 * 模擬api
 */
let data = {
    'apiId': 'SPEC11040204',
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
    "resContent": {
        "unitAmt": "1100",
        "limitMaxAmt": "100000",
        "limitMinAmt": "5000",
        "profitAccountList": [{
            "accountNO": "02203000558520",
            "accountNickName": "測試帳號50"
        },
        {
            "accountNO": "02203000455820",
            "accountNickName": "測試帳號51"
        },
        {
            "accountNO": "02203000455982",
            "accountNickName": "測試帳號52"
        },
        {
            "accountNO": "02203000495230",
            "accountNickName": "測試帳號53"
        },
        {
            "accountNO": "02203000855203",
            "accountNickName": "測試帳號54"
        },
        {
            "accountNO": "02203000775820",
            "accountNickName": "測試帳號55"
        }],
        "investAccountList": [{
            "accountNO": "02203000778569",
            "fundEngCcy": "USD",
            "fundChiCcy": "美元",
            "accountNickName": "測試帳號55",
            "avlBalance": "1780000"
        },
        {
            "accountNO": "02203000685521",
            "fundEngCcy": "JPY",
            "fundChiCcy": "美元",
            "accountNickName": "測試帳號56",
            "avlBalance": "1570000"
        },
        {
            "accountNO": "02203000758842",
            "fundEngCcy": "AUD",
            "fundChiCcy": "歐元",
            "accountNickName": "測試帳號57",
            "avlBalance": "1090000"
        },
        {
            "accountNO": "02203000105589",
            "fundEngCcy": "AUD",
            "fundChiCcy": "歐元",
            "accountNickName": "測試帳號58",
            "avlBalance": "750000"
        },
        {
            "accountNO": "02203000745520",
            "fundEngCcy": "JPY",
            "fundChiCcy": "美元",
            "accountNickName": "測試帳號59",
            "avlBalance": "753000"
        },
        {
            "accountNO": "02203000985621",
            "fundEngCcy": "AUD",
            "fundChiCcy": "歐元",
            "accountNickName": "測試帳號60",
            "avlBalance": "1140000"
        },
        {
            "accountNO": "02203000675584",
            "fundEngCcy": "CNY",
            "fundChiCcy": "人民幣",
            "accountNickName": "測試帳號61",
            "avlBalance": "2510000"
        }]
    }
};

let testData = {
    'apiId': 'SPEC11040204',
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
    "resContent": {
        "unitAmt": "1100",
        "limitMaxAmt": "100000",
        "limitMinAmt": "5000",
        "profitAccountList": [{
            "accountNO": "02203000558520",
            "accountNickName": "測試帳號50"
        },
        {
            "accountNO": "02203000455820",
            "accountNickName": "測試帳號51"
        },
        {
            "accountNO": "02203000455982",
            "accountNickName": "測試帳號52"
        },
        {
            "accountNO": "02203000495230",
            "accountNickName": "測試帳號53"
        },
        {
            "accountNO": "02203000855203",
            "accountNickName": "測試帳號54"
        },
        {
            "accountNO": "02203000775820",
            "accountNickName": "測試帳號55"
        }],
        "investAccountList": [{
            "accountNO": "02203000778569",
            "fundEngCcy": "USD",
            "fundChiCcy": "美元",
            "accountNickName": "測試帳號55",
            "avlBalance": "1780000"
        },
        {
            "accountNO": "02203000778569",
            "fundEngCcy": "JPY",
            "fundChiCcy": "日元",
            "accountNickName": "測試帳號56",
            "avlBalance": "1570000"
        },
        {
            "accountNO": "02203000778569",
            "fundEngCcy": "AUD",
            "fundChiCcy": "歐元",
            "accountNickName": "測試帳號57",
            "avlBalance": "1090000"
        },
        {
            "accountNO": "02203000778569",
            "fundEngCcy": "CAD",
            "fundChiCcy": "加拿大幣",
            "accountNickName": "測試帳號58",
            "avlBalance": "750000"
        },
        {
            "accountNO": "02203000778569",
            "fundEngCcy": "CNY",
            "fundChiCcy": "人民幣",
            "accountNickName": "測試帳號59",
            "avlBalance": "753000"
        },
        {
            "accountNO": "02203000778569",
            "fundEngCcy": "HKD",
            "fundChiCcy": "港幣",
            "accountNickName": "測試帳號60",
            "avlBalance": "1140000"
        },
        {
            "accountNO": "02203000778569",
            "fundEngCcy": "SEK",
            "fundChiCcy": "瑞典幣",
            "accountNickName": "測試帳號61",
            "avlBalance": "2510000"
        }]
    }
};

let df_response = {
    'apiId': 'SPEC11040204',
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

export const api_response = { ...df_response, ...testData };
export const api_response_empty = { ...df_response, ...df_response };
export const api_error = {
    'apiId': 'SPEC11040204',
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
