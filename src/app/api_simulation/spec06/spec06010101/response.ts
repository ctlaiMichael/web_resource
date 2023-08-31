/**
 * 模擬api
 */
let dataToday = {
    'apiId': 'SPEC10020002',
    'token': {
        'requestId': '',
        'responseTime': '',
        'lang': 'TW'
    },
    'resFlag': '0',
    'resMessage': {
        'errorCode': '',
        'errorMsg': ''
    },
    'resContent': {
        'title': "國外匯入匯款查詢",
        'rowData': [
            { 'sortId': '1', 'remitId': 'ASBFIR10800044', 'currencyCode': 'USD', 'amount': '11985', 'paidDate': '2011-08-11' },
            { 'sortId': '2', 'remitId': 'ASBFIR10800040', 'currencyCode': 'AUD', 'amount': '12995', 'paidDate': '2012-09-13' },
            { 'sortId': '3', 'remitId': 'ASBFIR10800047', 'currencyCode': 'JPY', 'amount': '100105', 'paidDate': '' },
            { 'sortId': '4', 'remitId': 'ASBFIR10800042', 'currencyCode': 'EUR', 'amount': '14125', 'paidDate': null },
            { 'sortId': '5', 'remitId': 'ASBFIR10800019', 'currencyCode': 'TWD', 'amount': '15365', 'paidDate': '2011-12-21' },
        ]
    }
};
let data7D = {
    'apiId': 'SPEC10020001',
    'token': {
        'requestId': '',
        'responseTime': '',
        'lang': 'TW'
    },
    'resFlag': '0',
    'resMessage': {
        'errorCode': '',
        'errorMsg': ''
    },
    'resContent': {
        'title': "國外匯入匯款查詢",
        "rowData": [
            { 'sortId': '1', 'remitId': 'ASBFIR10800044', 'currencyCode': 'TWD', 'amount': '50995', 'paidDate': '2011-06-26' },
            { 'sortId': '2', 'remitId': 'ASBFIR10800045', 'currencyCode': 'AUD', 'amount': '12666', 'paidDate': '2012-09-21' },
            { 'sortId': '3', 'remitId': 'ASBFIR10800052', 'currencyCode': 'USD', 'amount': '13625', 'paidDate': '2012-10-14' },
        ]
    }
};
let data1M = {
    'apiId': 'SPEC10020001',
    'token': {
        'requestId': '',
        'responseTime': '',
        'lang': 'TW'
    },
    'resFlag': '0',
    'resMessage': {
        'errorCode': '',
        'errorMsg': ''
    },
    'resContent': {
        'title': "國外匯入匯款查詢",
        'rowData': [
            { 'sortId': '1', 'remitId': 'ASBFIR10800078', 'currencyCode': 'EUR', 'amount': '14985', 'paidDate': '2010-11-10' },
            { 'sortId': '2', 'remitId': 'ASBFIR10800069', 'currencyCode': 'JPY', 'amount': '120496', 'paidDate': '2011-04-29' },
            { 'sortId': '3', 'remitId': 'ASBFIR10800075', 'currencyCode': 'USD', 'amount': '13105', 'paidDate': '2013-10-31' },
            { 'sortId': '4', 'remitId': 'ASBFIR10800071', 'currencyCode': 'CNY', 'amount': '14456', 'paidDate': '2011-09-15' },
            { 'sortId': '5', 'remitId': 'ASBFIR10800062', 'currencyCode': 'EUR', 'amount': '15596', 'paidDate': '2015-08-16' },
        ]
    }
};
let dataCustom = {
    'apiId': 'SPEC10020001',
    'token': {
        'requestId': '',
        'responseTime': '',
        'lang': 'TW'
    },
    'resFlag': '0',
    'resMessage': {
        'errorCode': '',
        'errorMsg': ''
    },
    'resContent': {
        'title': "國外匯入匯款查詢",
        'rowData': [
            { 'sortId': '1', 'remitId': 'ASBFIR10800080', 'currencyCode': 'ZAR', 'amount': '14777', 'paidDate': '110720' },
            { 'sortId': '2', 'remitId': 'ASBFIR10800085', 'currencyCode': 'CNY', 'amount': '30995', 'paidDate': '120416' },
            { 'sortId': '3', 'remitId': 'ASBFIR10800074', 'currencyCode': 'TWD', 'amount': '18952', 'paidDate': '131121' },
            { 'sortId': '4', 'remitId': 'ASBFIR10800086', 'currencyCode': 'USA', 'amount': '20152', 'paidDate': '130913' },
            { 'sortId': '5', 'remitId': 'ASBFIR10800090', 'currencyCode': 'AUD', 'amount': '15152', 'paidDate': '130717' },
        ]
    }
};

export const api_response = dataToday;
export const api_response7D = data7D;
export const api_response1M = data1M;
export const api_responseCustom = dataCustom;
