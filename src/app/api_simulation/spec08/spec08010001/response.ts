/**
 * 模擬api
 */
let data = {
    'apiId': 'SPEC08010001',
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
        'amount': '299956',
        'autoPayAccount': {
            'nickName': '測試1',
            'accountId': '02203003699001'
        },
        'accountId': '02203003699001',
        'intRat': '3.07000',
        'payNam': '變動年金法',
        'xPayMth': '01',
        'xPayAlw': '00',
        'xTerms': '084',
        'xInstali': '3992',
        'replayAmt': '3992',
        'xPriDay': '05',
        'xIntDay': '05',
        'lnStartDate': '2017-04-05',
        'xEndDate': '2020-04-08'
        // 'replayAmt': '10000',
        // 'lnosamt': '732991.00',
        // 'paynam': '變動年金法',
        // 'intrat': '2.43000',
        // 'xPaymth': '01',
        // 'lnStartDate': '100-05-31',
        // 'xPayalw': '12',
        // 'xEndDate': '105-05-31',
        // 'xTerms': '060',
        // 'xInstali': '14343.00',
        // 'xPriday': '31',
        // 'xAupyac': '18203000197950',
        // 'nickAupyac': '測試1',
        // 'xIntday': '31',
        // 'account': '15152000017813'
    }
};

let df_response = {
    'apiId': 'SPEC08010001',
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

export const api_real_response = {
    "apiId": "SPEC08010001",
    "token": {
        "requestId": "cd41d302d48061dc1601448408605",
        "responseTime": "2020-09-30 14:46:34",
        "lang": "zh_TW"
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    "resContent": {
        "amount": "3,141,154.00",
        "autoPayAccount": {
            "nickName": "",
            "accountId": "02204000009971"
        },
        "accountId": "32263000043727",
        "intRat": "1.50000",
        "payNam": "變動年金法",
        "xPayMth": "01",
        "xPayAlw": "00",
        "xTerms": "240",
        "xInstali": "24,341.00",
        "replayAmt": "24,341.00",
        "xPriDay": "20",
        "xIntDay": "20",
        "xEndDate": "2028-06-20",
        "lnStartDate": "2008-06-20"
    }
};
export const api_response = { ...df_response, ...data };
export const api_response_empty = { ...df_response, ...df_response };
export const api_error = {
    'apiId': 'SPEC00040101',
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
