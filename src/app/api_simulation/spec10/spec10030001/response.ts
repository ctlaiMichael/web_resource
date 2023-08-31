/**
 * 模擬api
 */
let resData1 = {
    "apiId": "SPEC10030001",
    "token": {
        "requestId": "7ddc46700fce56f51602731840302",
        "responseTime": "2020-10-15 11:17:06",
        "lang": "zh_TW"
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    "resContent": {
        "title": "外幣放款利率",
        "dataTime": "2019/12/10",
        "rowData": [
            {
                "currencyCode": "USDOB",
                "currencyName": "美　元 OB",
                "rate": "7.55"
            },
            {
                "currencyCode": "JPY",
                "currencyName": "日　　圓",
                "rate": "3.40"
            },
            {
                "currencyCode": "HKD",
                "currencyName": "港　　幣",
                "rate": "6.10"
            },
            {
                "currencyCode": "GBP",
                "currencyName": "英　　鎊",
                "rate": "6.00"
            },
            {
                "currencyCode": "CHF",
                "currencyName": "瑞士法郎",
                "rate": "4.20"
            },
            {
                "currencyCode": "AUD",
                "currencyName": "澳　　幣",
                "rate": "7.00"
            },
            {
                "currencyCode": "USDIB",
                "currencyName": "美　元 IB",
                "rate": "7.55"
            },
            {
                "currencyCode": "SGD",
                "currencyName": "新加坡幣",
                "rate": "6.00"
            },
            {
                "currencyCode": "EUR",
                "currencyName": "歐　　元",
                "rate": "4.90"
            },
            {
                "currencyCode": "SEK",
                "currencyName": "瑞典　幣",
                "rate": "5.40"
            },
            {
                "currencyCode": "DKK",
                "currencyName": "丹麥　幣",
                "rate": "5.50"
            },
            {
                "currencyCode": "THB",
                "currencyName": "泰　　銖",
                "rate": "11.00"
            },
            {
                "currencyCode": "NZD",
                "currencyName": "紐西蘭幣",
                "rate": "7.40"
            },
            {
                "currencyCode": "ZAR",
                "currencyName": "南非　幣",
                "rate": "15.55"
            },
            {
                "currencyCode": "CNY",
                "currencyName": "人民　幣",
                "rate": "---"
            }
        ]
    }
};

let resData2 = {
    'apiId': 'SPEC10030001',
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
    'apiId': 'SPEC10030001',
    'token': {
        'requestId': '',
        'responseTime': '2020-06-20 18:28:31',
        'lang': 'zh_TW'
    },
    'resFlag': '1',
    'resMessage': {
        'errorCode': 'ERR10030001',
        'errorMsg': 'Test Error'
    }
};
export const api_exception = {
    'errorCode': 'ERRAAAAAAA',
    'errorMsg': 'Test Error'
};
