/**
 * 模擬api
 */
let data = {
    'apiId': 'SPEC11040202',
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
            "accountNO": "0220300058577",
            "accountNickName": "測試帳號50"
        },
        {
            "accountNO": "02203000459622",
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
            "accountNO": "02203000556992",
            "fundEngCcy": "USD",
            "fundChiCcy": "美元",
            "accountNickName": "測試帳號15",
            "avlBalance": "2100000"
        },
        {
            "accountNO": "02203000452230",
            "fundEngCcy": "JPY",
            "fundChiCcy": "美元",
            "accountNickName": "測試帳號16",
            "avlBalance": "1600000"
        },
        {
            "accountNO": "02203000499857",
            "fundEngCcy": "AUD",
            "fundChiCcy": "歐元",
            "accountNickName": "測試帳號17",
            "avlBalance": "1280000"
        },
        {
            "accountNO": "02203000998570",
            "fundEngCcy": "AUD",
            "fundChiCcy": "歐元",
            "accountNickName": "測試帳號18",
            "avlBalance": "1060000"
        },
        {
            "accountNO": "02203000998859",
            "fundEngCcy": "JPY",
            "fundChiCcy": "美元",
            "accountNickName": "測試帳號19",
            "avlBalance": "1360000"
        },
        {
            "accountNO": "02203000998752",
            "fundEngCcy": "AUD",
            "fundChiCcy": "歐元",
            "accountNickName": "測試帳號20",
            "avlBalance": "960000"
        },
        {
            "accountNO": "02203000997548",
            "fundEngCcy": "CNY",
            "fundChiCcy": "人民幣",
            "accountNickName": "測試帳號19",
            "avlBalance": "3100000"
        }]
        // "highAmt": "10000",
        // "lowestAmt": "500",
        // "term": {
        //     "showNotifiCation": "<基金注意事項><br>您將申購瀚亞投資-配息基金，若本行信託帳戶符合下列條件，基金配息將以轉入再投資方式入帳：<br>若投資人之當月各基金可分配收益總金額（計算至小數第三位，四捨五入至第二位），以美元（澳幣/紐幣）計價之基金，未達100美元（澳幣/紐幣）整；以歐元計價之基金，未達50歐元整；以南非幣計價之基金，未達1,000南非幣整，則其當月之收益分配將會自動轉入該投資人之帳戶並再投資原基金。",
        //     "hasProfit": "true",
        //     "bShare": "B",
        //     "usaSignNote": "Y",
        //     "staNote": "Y",
        //     "riskDiscLosure": "A,C"
        // }
    }
};

let realData = {
    "apiId": "SPEC11040202",
    "token": {
        "requestId": "679b62d25e32cbea1603356269978",
        "responseTime": "2020-10-22 16:44:05",
        "lang": "zh_TW"
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    "resContent": {
        "profitAccountList": [
            {
                "accountNO": "02203000459622",
                "accountNickName": "測試帳號51"
            },
            {
                "accountNO": "02203000455982",
                "accountNickName": "測試帳號52"
            },
            {
                "accountNO": "02203000495230",
                "accountNickName": "測試帳號53"
            }
        ],
        "unitAmt": "1",
        "investAccountList": [
            {
                "accountNO": "05108000396339",
                "fundEngCcy": "AUD",
                "fundChiCcy": "澳幣",
                "accountNickName": "外匯活期存款",
                "avlBalance": "296.41"
            },
            {
                "accountNO": "05108000396339",
                "fundEngCcy": "CAD",
                "fundChiCcy": "加拿大幣",
                "accountNickName": "外匯活期存款",
                "avlBalance": "34.00"
            },
            {
                "accountNO": "05108000396339",
                "fundEngCcy": "CNY",
                "fundChiCcy": "人民幣",
                "accountNickName": "外匯活期存款",
                "avlBalance": "10,986,194.66"
            },
            {
                "accountNO": "05108000396339",
                "fundEngCcy": "EUR",
                "fundChiCcy": "歐元",
                "accountNickName": "外匯活期存款",
                "avlBalance": "1,638.78"
            },
            {
                "accountNO": "05108000396339",
                "fundEngCcy": "HKD",
                "fundChiCcy": "港幣",
                "accountNickName": "外匯活期存款",
                "avlBalance": "100,000,561.99"
            },
            {
                "accountNO": "05108000396339",
                "fundEngCcy": "JPY",
                "fundChiCcy": "日圓",
                "accountNickName": "外匯活期存款",
                "avlBalance": "204,614.00"
            },
            {
                "accountNO": "05108000396339",
                "fundEngCcy": "MYR",
                "fundChiCcy": "馬幣",
                "accountNickName": "外匯活期存款",
                "avlBalance": "105.26"
            },
            {
                "accountNO": "05108000396339",
                "fundEngCcy": "SEK",
                "fundChiCcy": "瑞典幣",
                "accountNickName": "外匯活期存款",
                "avlBalance": "1,715.62"
            },
            {
                "accountNO": "05108000396339",
                "fundEngCcy": "SGD",
                "fundChiCcy": "新加坡幣",
                "accountNickName": "外匯活期存款",
                "avlBalance": "175.14"
            },
            {
                "accountNO": "05108000396339",
                "fundEngCcy": "USD",
                "fundChiCcy": "美金",
                "accountNickName": "外匯活期存款",
                "avlBalance": "1,001,323.82"
            }
        ],
        "limitMaxAmt": "20000000",
        "limitMinAmt": "100"
    }
};

let df_response = {
    'apiId': 'SPEC11040202',
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
    'apiId': 'SPEC11040202',
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
