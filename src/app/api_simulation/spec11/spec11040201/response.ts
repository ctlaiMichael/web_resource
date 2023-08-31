/**
 * 模擬api
 */
let data = {
    'apiId': 'SPEC11040201',
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
        "limitMaxAmt": "500000",
        "limitMinAmt": "10000",
        "profitAccountList": [{
            "accountNO": "02203000599989",
            "accountNickName": "測試帳號50"
        },
        {
            "accountNO": "02203000477759",
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
            "accountNO": "02203000541801",
            // "fundEngCcy": "TWD",
            // "fundChiCcy": "台幣",
            "accountNickName": "測試帳號1",
            "avlBalance": "2500000"
        },
        {
            "accountNO": "02203000455820",
            // "fundEngCcy": "TWD",
            // "fundChiCcy": "台幣",
            "accountNickName": "測試帳號2",
            "avlBalance": "1400000"
        },
        {
            "accountNO": "0220300049752",
            // "fundEngCcy": "TWD",
            // "fundChiCcy": "台幣",
            "accountNickName": "測試帳號3",
            "avlBalance": "1558000"
        },
        {
            "accountNO": "02203000995483",
            // "fundEngCcy": "TWD",
            // "fundChiCcy": "台幣",
            "accountNickName": "測試帳號4",
            "avlBalance": "1126000"
        },
        {
            "accountNO": "02203000998570",
            // "fundEngCcy": "TWD",
            // "fundChiCcy": "台幣",
            "accountNickName": "測試帳號5",
            "avlBalance": "1180000"
        }]
        // "highAmt": "500000",
        // "lowestAmt": "10000",
        // "term": {
        //     "showNotifiCation": "<基金注意事項><br>您將申購瀚亞投資-配息基金，若本行信託帳戶符合下列條件，基金配息將以轉入再投資方式入帳：<br>若投資人之當月各基金可分配收益總金額（計算至小數第三位，四捨五入至第二位），以美元（澳幣/紐幣）計價之基金，未達100美元（澳幣/紐幣）整；以歐元計價之基金，未達50歐元整；以南非幣計價之基金，未達1,000南非幣整，則其當月之收益分配將會自動轉入該投資人之帳戶並再投資原基金。",
        //     "hasProfit": "true",
        //     "bShare": "B",
        //     "usaSignNote": "Y",
        //     "staNote": "Y",
        //     "riskDiscLosure": "A,B,C"
        // }
    }
};

let df_response = {
    'apiId': 'SPEC11040201',
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

let errorData = {
    "apiId": "SPEC11040201",
    "token": {
        "requestId": "a8f288ea445c0f461603418514592",
        "responseTime": "2020-10-23 10:01:30",
        "lang": "zh_TW"
    },
    "resFlag": "1"
};

export const api_response = { ...df_response, ...data };
export const api_response_empty = { ...df_response, ...df_response };
export const api_error = {
    'apiId': 'SPEC11040201',
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
