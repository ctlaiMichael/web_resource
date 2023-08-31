/**
 * 模擬api
 */
let data = {
    'apiId': 'SPEC11040104',
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
        "limitMaxAmt": "350000",
        "limitMinAmt": "1000",
        "profitAccountList": [{
            "accountNO": "02203000556547",
            "accountNickName": "測試帳號86"
        },
        {
            "accountNO": "02203000478595",
            "accountNickName": "測試帳號87"
        },
        {
            "accountNO": "02203000885950",
            "accountNickName": "測試帳號88"
        },
        {
            "accountNO": "02203000744598",
            "accountNickName": "測試帳號89"
        },
        {
            "accountNO": "02203000746559",
            "accountNickName": "測試帳號90"
        },
        {
            "accountNO": "02203000687442",
            "accountNickName": "測試帳號91"
        }],
        "investAccountList": [{
            "accountNO": "02203000588954",
            // "fundEngCcy": "TWD",
            // "fundChiCcy": "台幣",
            "accountNickName": "測試帳號80",
            "avlBalance": "1600000"
        },
        {
            "accountNO": "02203000466582",
            // "fundEngCcy": "TWD",
            // "fundChiCcy": "台幣",
            "accountNickName": "測試帳號81",
            "avlBalance": "1800000"
        },
        {
            "accountNO": "0220300097554",
            // "fundEngCcy": "TWD",
            // "fundChiCcy": "台幣",
            "accountNickName": "測試帳號82",
            "avlBalance": "1658000"
        },
        {
            "accountNO": "02203000778549",
            // "fundEngCcy": "TWD",
            // "fundChiCcy": "台幣",
            "accountNickName": "測試帳號83",
            "avlBalance": "1016000"
        },
        {
            "accountNO": "02203000774581",
            // "fundEngCcy": "TWD",
            // "fundChiCcy": "台幣",
            "accountNickName": "測試帳號84",
            "avlBalance": "950000"
        }]
    }
};

let df_response = {
    'apiId': 'SPEC11040104',
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
    'apiId': 'SPEC11040104',
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
