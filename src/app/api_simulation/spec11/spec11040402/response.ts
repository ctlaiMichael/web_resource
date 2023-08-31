/**
 * 模擬api
 */
let data = {
    'apiId': 'SPEC11040402',
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
        'license': '79958595542013',
        'fundCompId': '03',
        'fundCode': '0309',
        'fundName': '景順美元儲備基金',
        'fundCcy': 'USD',
        'investAccount': '02203000556992',
        'profitAccount': '0220300058577',
        'investTotalMoney': '8000',
        'balance': '815000',
        'investType': 'single',
        'feed': '0.26', // 原手續費率
        'discountFee': '0.30', // 優惠手續費率
        'termData': {
            'self': '1',
            'signAgr': '1',
            'termA': '1',
            'termB': '1',
            'termC': '1',
            'fee': '1',
            'usaSignNote': '1',
            'hanYa': '1'
        }
    }
};

let df_response = {
    'apiId': 'SPEC11040402',
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
    'apiId': 'SPEC11040402',
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
