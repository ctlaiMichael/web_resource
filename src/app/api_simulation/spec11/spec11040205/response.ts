/**
 * 模擬api
 */
let data = {
    'apiId': 'SPEC11040205',
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
        'fee': '0.25', // 原手續費率
        'ccyChi': '台幣', // 中文基金幣別
        'originalFee': '0.24', // 手續費率
        'fundName': '保德信高成長',
        'investTotalMoney': '10500', // 扣款總額
        'discountFee': '0.22', // 優惠後手續費率
        'ccyEng': 'TWD' // 英文基金幣別

        // 'fundCompId': '02',
        // 'fundCode': '0204',
        // 'fundName': '富達美國',
        // 'fundCcy': 'USD',
        // 'investAccount': '02203000556992',
        // 'profitAccount': '0220300058577',
        // 'investMoney': '7000',
        // 'balance': '1005200',
        // 'investType': 'regular',
        // 'investDate': '04,16,29',
        // 'feed': '0.23', // 原手續費率
        // 'discountFeed': '0.26', // 優惠手續費率
        // 'investAmtTotal': '10500', // 扣款總額
        // 'termData': {
        //     'self': '1',
        //     'signAgr': '1',
        //     'termA': '1',
        //     'termB': '1',
        //     'termC': '1',
        //     'fee': '1',
        //     'usaSignNote': '1',
        //     'hanYa': '1'
        // }
    }
};

let df_response = {
    'apiId': 'SPEC11040205',
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
    'apiId': 'SPEC11040205',
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
