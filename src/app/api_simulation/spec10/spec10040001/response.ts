/**
 * 模擬api
 */
let resData1 = {
    'apiId': 'SPEC10040001',
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
        dataTime: "2020-06-09",
        rowData: [
            {
                currencyCode: "USD",
                currencyName: "美金",
                data: [
                    {
                        category: "一個月",
                        rate: "0.01"
                    },
                    {
                        category: "二個月",
                        rate: "0.02"
                    },
                    {
                        category: "三個月",
                        rate: "0.03"
                    },
                    {
                        category: "四個月",
                        rate: "0.04"
                    },
                    {
                        category: "五個月",
                        rate: "0.05"
                    }, {
                        category: "一個月",
                        rate: "0.01"
                    },
                    {
                        category: "二個月",
                        rate: "0.02"
                    },
                    {
                        category: "三個月",
                        rate: "0.03"
                    },
                    {
                        category: "四個月",
                        rate: "0.04"
                    },
                    {
                        category: "五個月",
                        rate: "0.05"
                    }, {
                        category: "一個月",
                        rate: "0.01"
                    },
                    {
                        category: "二個月",
                        rate: "0.02"
                    },
                    {
                        category: "三個月",
                        rate: "0.03"
                    },
                    {
                        category: "四個月",
                        rate: "0.04"
                    },
                    {
                        category: "五個月",
                        rate: "0.05"
                    }, {
                        category: "一個月",
                        rate: "0.01"
                    },
                    {
                        category: "二個月",
                        rate: "0.02"
                    },
                    {
                        category: "三個月",
                        rate: "0.03"
                    },
                    {
                        category: "四個月",
                        rate: "0.04"
                    },
                    {
                        category: "五個月",
                        rate: "0.05"
                    }, {
                        category: "一個月",
                        rate: "0.01"
                    },
                    {
                        category: "二個月",
                        rate: "0.02"
                    },
                    {
                        category: "三個月",
                        rate: "0.03"
                    },
                    {
                        category: "四個月",
                        rate: "0.04"
                    },
                    {
                        category: "五個月",
                        rate: "0.05"
                    }
                ]
            },
            {
                currencyCode: "JPY",
                currencyName: "日圓",
                data: [
                    {
                        category: "六個月",
                        rate: "0.06"
                    },
                    {
                        category: "七個月",
                        rate: "0.07"
                    },
                    {
                        category: "八個月",
                        rate: "0.08"
                    },
                    {
                        category: "九個月",
                        rate: "0.09"
                    },
                    {
                        category: "十個月",
                        rate: "0.1"
                    }
                ]
            },
            {
                currencyCode: "EUR",
                currencyName: "歐元",
                data: [
                    {
                        category: "一年",
                        rate: "0.2"
                    },
                    {
                        category: "二年",
                        rate: "0.3"
                    },
                    {
                        category: "三年",
                        rate: "0.4"
                    },
                    {
                        category: "四年",
                        rate: "0.5"
                    },
                    {
                        category: "五年",
                        rate: "0.6"
                    }
                ]
            }
        ]
    }
};

let resData2 = {
    'apiId': 'SPEC10040001',
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
    'apiId': 'SPEC10040001',
    'token': {
        'requestId': '',
        'responseTime': '2020-06-20 18:28:31',
        'lang': 'zh_TW'
    },
    'resFlag': '1',
    'resMessage': {
        'errorCode': 'ERR10040001',
        'errorMsg': 'Test Error'
    }
};
export const api_exception = {
    'errorCode': 'ERRAAAAAAA',
    'errorMsg': 'Test Error'
};
