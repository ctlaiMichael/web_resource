/**
 * 模擬api
 */
let data = {
    'apiId': 'SPEC11040106',
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
        'license': '76596666584423',
        'fundCompId': '53',
        'fundCode': '5301',
        'fundName': '保德信科技島',
        'fundCcy': 'TWD',
        'investAccount': '02203000588954',
        'profitAccount': '02203000556547',
        'investMoney': '20000',
        'balance': '750000',
        'investType': 'single',
        'investDate': '2020-09-21',
        'feed': '0.11', // 原手續費率
        'discountFeed': '0.14', // 優惠手續費率
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
    'apiId': 'SPEC11040106',
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
    'apiId': 'SPEC11040106',
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
