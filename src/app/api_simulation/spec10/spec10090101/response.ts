/**
 * 模擬api
 */
let resData1 = {
    'apiId': 'SPEC10090101',
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
        "rowData": [{
            "group": "1",
            "email": "ghost0919@msn.com",
            "settingTime": "2020-07-06 10:33:00",
            "transInCurrency": {
                "currencyCode": "USD",
                "currencyName": "美金"
            },
            "transOutCurrency": {
                "currencyCode": "EUR",
                "currencyName": "歐元"
            },
            "referenceRate": "0.9392",
            "expectedRate": "1.0",
            "noticeDateRange": {
                "start": "2020-07-06",
                "end": "2020-07-10"
            }
        },
        {
            "group": "2",
            "email": "ghost0919@msn.com",
            "settingTime": "2020-07-05 11:33:00",
            "transInCurrency": {
                "currencyCode": "USD",
                "currencyName": "美金"
            },
            "transOutCurrency": {
                "currencyCode": "EUR",
                "currencyName": "歐元"
            },
            "referenceRate": "0.9392",
            "expectedRate": "1.0",
            "noticeDateRange": {
                "start": "2020-07-01",
                "end": "2020-07-05"
            }
        },
        {
            "group": "0",
            "email": "ghost0919@msn.com",
            "settingTime": "2020-07-06 12:35:00",
            "transInCurrency": {
                "currencyCode": "USD",
                "currencyName": "美金"
            },
            "transOutCurrency": {
                "currencyCode": "EUR",
                "currencyName": "歐元"
            },
            "referenceRate": "0.9392",
            "expectedRate": "1.0",
            "noticeDateRange": {
                "start": "2020-07-07",
                "end": "2020-07-20"
            }
        }]
    }
};

let resData2 = {
    'apiId': 'SPEC10090101',
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
    'apiId': 'SPEC10090101',
    'token': {
        'requestId': '',
        'responseTime': '2020-06-20 18:28:31',
        'lang': 'zh_TW'
    },
    'resFlag': '1',
    'resMessage': {
        'errorCode': 'ERR10090101',
        'errorMsg': 'Test Error'
    }
};
export const api_exception = {
    'errorCode': 'ERRAAAAAAA',
    'errorMsg': 'Test Error'
};
