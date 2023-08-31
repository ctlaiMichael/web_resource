/**
 * 模擬api 中台回傳日期會formate格式 yyyy-MM
 */
let data = {
    'apiId': 'SPEC12010201',
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
        'rowData': [
            { 'selectedMonth': '2020-07', 'selectedMonthDesc': '2020年07月' },
            { 'selectedMonth': '2020-06', 'selectedMonthDesc': '2020年06月' },
            { 'selectedMonth': '2020-05', 'selectedMonthDesc': '2020年05月' }
        ]
    }
};

let df_response = {
    'apiId': 'SPEC12010201',
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
        'rowData': [

        ]
    }
};

export const api_response = { ...df_response, ...data };
export const api_response_empty = { ...df_response, ...df_response };
export const api_error = {
    'apiId': 'SPEC12010201',
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
