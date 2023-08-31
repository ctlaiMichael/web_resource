/**
 * 模擬api
 */
let resDataCreate = {
    'apiId': 'SPEC10090201',
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
        "action": "create",
        "settingRecord": {
            "settingTime": "2020-07-06 14:09:00",
            "email": "ghost0919@msn.com",
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
                "start": "2020-07-16",
                "end": "2020-07-20"
            }
        }
    }
};

let resDataUpdate = {
    'apiId': 'SPEC10090201',
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
        "action": "update",
        "settingRecord": {
            "settingTime": "2020-07-06 14:09:00",
            "email": "ghost0919@msn.com",
            "transInCurrency": {
                "currencyCode": "USD",
                "currencyName": "美金",
                "buyRate": "20.2000",
                "sellRate": "20.3800"
            },
            "transOutCurrency": {
                "currencyCode": "EUR",
                "currencyName": "歐元",
                "buyRate": "21.7000",
                "sellRate": "21.8900"
            },
            "referenceRate": "0.9392",
            "expectedRate": "1.0",
            "noticeDateRange": {
                "start": "2020-07-16",
                "end": "2020-07-20"
            }
        }
    }
};

let resDataDelete = {
    'apiId': 'SPEC10090201',
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
        "action": "delete"
        // "settingRecord": {
        //     "settingTime": "2020-07-06 14:09:00",
        //     "email": "ghost0919@msn.com",
        //     "transInCurrency": {
        //         "currencyCode": "USD",
        //         "currencyName": "美金",
        //         "buyRate": "20.2000",
        //         "sellRate": "20.3800"
        //     },
        //     "transOutCurrency": {
        //         "currencyCode": "EUR",
        //         "currencyName": "歐元",
        //         "buyRate": "21.7000",
        //         "sellRate": "21.8900"
        //     },
        //     "referenceRate": "0.9392",
        //     "expectedRate": "1.0",
        //     "noticeDateRange": {
        //         "start": "2020-07-16",
        //         "end": "2020-07-20"
        //     }
        // }
    }
};

let resData2 = {
    'apiId': 'SPEC10090201',
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

export const api_responseCreate = resDataCreate;
export const api_responseUpdate = resDataUpdate;
export const api_responseDelete = resDataDelete;
export const api_response2 = resData2;
export const api_error = {
    'apiId': 'SPEC10090201',
    'token': {
        'requestId': '',
        'responseTime': '2020-06-20 18:28:31',
        'lang': 'zh_TW'
    },
    'resFlag': '1',
    'resMessage': {
        'errorCode': 'ERR10090201',
        'errorMsg': 'Test Error'
    }
};
export const api_exception = {
    'errorCode': 'ERRAAAAAAA',
    'errorMsg': 'Test Error'
};
