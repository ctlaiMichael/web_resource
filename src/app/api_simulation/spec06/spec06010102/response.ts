/**
 * 模擬api
 */
let dataToday = {
    'apiId': 'SPEC06010102',
    'token': {
        'requestId': '',
        'responseTime': '2020-06-20 18:18:31',
        'lang': 'zh_TW'
    },
    'resFlag': '0',
    'resMessage': {
        'errorCode': '',
        'errorMsg': ''
    },
    'resContent': {
        'remitId': 'ASBFIR10800044',
        'currencyCode': 'USD',
        'amount': '35600',
        'notifyDate': '20110811',
        'remitterName': 'WillyChen',
        'bankName': 'WELLS FARGO NA',
        'referenceId': 'F60822195260000',
        'remitterMessage': 'RFB 2011082200081174'
    }
};
let data7D = {
    'apiId': 'SPEC06010102',
    'token': {
        'requestId': '',
        'responseTime': '2020-06-20 18:18:31',
        'lang': 'zh_TW'
    },
    'resFlag': '0',
    'resMessage': {
        'errorCode': '',
        'errorMsg': ''
    },
    'resContent': {
        'remitId': 'ASBFIR10800045',
        'currencyCode': 'EUR',
        'amount': '31050',
        'notifyDate': '20190623',
        'remitterName': 'JanneChen',
        'bankName': 'WELLS FARGO NA',
        'referenceId': 'F60822145690000',
        'remitterMessage': 'RFB 2015568400081175'
    }
};
let data1M = {
    'apiId': 'SPEC06010102',
    'token': {
        'requestId': '',
        'responseTime': '2020-06-20 18:18:31',
        'lang': 'zh_TW'
    },
    'resFlag': '0',
    'resMessage': {
        'errorCode': '',
        'errorMsg': ''
    },
    'resContent': {
        'remitId': 'ASBFIR10800046',
        'currencyCode': 'JPY',
        'amount': '121050',
        'notifyDate': '20200814',
        'remitterName': 'JerryChen',
        'bankName': 'WELLS FARGO NA',
        'referenceId': 'F60824459690000',
        'remitterMessage': 'RFB 2014456900081177'
    }
};
let dataCustom = {
    'apiId': 'SPEC06010102',
    'token': {
        'requestId': '',
        'responseTime': '2020-06-20 18:18:31',
        'lang': 'zh_TW'
    },
    'resFlag': '0',
    'resMessage': {
        'errorCode': '',
        'errorMsg': ''
    },
    'resContent': {
        'remitId': 'ASBFIR10800048',
        'currencyCode': 'CNY',
        'amount': '74566',
        'notifyDate': '20181007',
        'remitterName': 'DebbyChen',
        'bankName': 'WELLS FARGO NA',
        'referenceId': 'F60844959130000',
        'remitterMessage': 'RFB 2044638900081179'
    }
};

export const api_response = dataToday;
export const api_response7D = data7D;
export const api_response1M = data1M;
export const api_responseCustom = dataCustom;
export const api_error = {
    'apiId': 'SPEC06010102',
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
