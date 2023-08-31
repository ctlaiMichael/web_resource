/**
 * 模擬api
 */
let resData1 = {
    'apiId': 'SPEC10010001',
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
        title: "NTD Interest Rates",
        dataTime: "2017-06-09 14:41:28",
        rowData: [{
            id: "0",
            name: "活期存款",
            data: [{
                category: "Check deposit",
                floating: "0.000"
            },
            {
                category: "Demand deposit",
                floating: "0.080"
            },
            {
                category: "Demand salary savings deposit",
                floating: "0.200"
            },
            {
                category: "Salary savings deposit",
                floating: "0.260"
            },
            {
                category: "Securities savings deposit",
                floating: "0.010"
            },
            {
                category: "PuiiBank savings deposit",
                floating: "0.260"
            },
            {
                category: "Premium savings deposit",
                floating: "0.350"
            }]
        },
        {
            id: "1",
            name: "定期存款",
            data: [{
                id: "common",
                subName: "Common",
                subData: [{
                    category: "1 month",
                    fixed: "0.600",
                    floating: "0.600"
                },
                {
                    category: "2 months",
                    fixed: "0.600",
                    floating: "0.600"
                },
                {
                    category: "3 months",
                    fixed: "0.630",
                    floating: "0.650"
                },
                {
                    category: "4 months",
                    fixed: "0.630",
                    floating: "0.650"
                },
                {
                    category: "5 months",
                    fixed: "0.630",
                    floating: "0.650"
                },
                {
                    category: "6 months",
                    fixed: "0.770",
                    floating: "0.790"
                },
                {
                    category: "9 months",
                    fixed: "0.880",
                    floating: "0.900"
                },
                {
                    category: "1 year",
                    fixed: "1.010",
                    floating: "1.030"
                },
                {
                    category: "13~23 months",
                    fixed: "1.010",
                    floating: "1.030"
                },
                {
                    category: "2 years",
                    fixed: "1.030",
                    floating: "1.050"
                },
                {
                    category: "3 years",
                    fixed: "1.040",
                    floating: "1.060"
                }]
            },
            {
                id: "fiveMillion",
                subName: "5 million ",
                subData: [{
                    category: "1 month",
                    fixed: "0.20000",
                    floating: "0.25000"
                },
                {
                    category: "2 months",
                    fixed: "0.20000",
                    floating: "0.25000"
                },
                {
                    category: "3 months",
                    fixed: "0.25000",
                    floating: "0.30000"
                },
                {
                    category: "4 months",
                    fixed: "0.25000",
                    floating: "0.30000"
                },
                {
                    category: "5 months",
                    fixed: "0.25000",
                    floating: "0.30000"
                },
                {
                    category: "6 months",
                    fixed: "0.30000",
                    floating: "0.35000"
                },
                {
                    category: "9 months",
                    fixed: "0.30000",
                    floating: "0.35000"
                },
                {
                    category: "1 year",
                    fixed: "0.30000",
                    floating: "0.35000"
                },
                {
                    category: "13~23 months",
                    fixed: "0.30000",
                    floating: "0.35000"
                },
                {
                    category: "2 years",
                    fixed: "0.30000",
                    floating: "0.35000"
                },
                {
                    category: "3 years",
                    fixed: "0.30000",
                    floating: "0.35000"
                }]
            },
            {
                id: "fortyMillion",
                subName: "40 million",
                subData: [{
                    category: "1 month",
                    fixed: "0.35000",
                    floating: "0.40000"
                },
                {
                    category: "2 months",
                    fixed: "0.35000",
                    floating: "0.40000"
                },
                {
                    category: "3 months",
                    fixed: "0.35000",
                    floating: "0.40000"
                },
                {
                    category: "4 months",
                    fixed: "0.35000",
                    floating: "0.40000"
                },
                {
                    category: "5 months",
                    fixed: "0.35000",
                    floating: "0.40000"
                },
                {
                    category: "6 months",
                    fixed: "0.35000",
                    floating: "0.40000"
                },
                {
                    category: "9 months",
                    fixed: "0.35000",
                    floating: "0.40000"
                },
                {
                    category: "1 year",
                    fixed: "0.35000",
                    floating: "0.40000"
                },
                {
                    category: "13~23 months",
                    fixed: "0.35000",
                    floating: "0.40000"
                },
                {
                    category: "2 years",
                    fixed: "0.35000",
                    floating: "0.40000"
                },
                {
                    category: "3 years",
                    fixed: "0.35000",
                    floating: "0.40000"
                }]
            },
            {
                id: "twoHundredMillion",
                subName: "200 million",
                subData: [{
                    category: "1 month",
                    fixed: "1.35000",
                    floating: "1.40000"
                },
                {
                    category: "2 months",
                    fixed: "1.60000",
                    floating: "1.40000"
                },
                {
                    category: "3 months",
                    fixed: "1.60000",
                    floating: "1.40000"
                },
                {
                    category: "4 months",
                    fixed: "1.35000",
                    floating: "1.40000"
                },
                {
                    category: "5 months",
                    fixed: "1.35000",
                    floating: "1.40000"
                },
                {
                    category: "6 months",
                    fixed: "1.60000",
                    floating: "1.40000"
                },
                {
                    category: "9 months",
                    fixed: "1.35000",
                    floating: "1.40000"
                },
                {
                    category: "1 year",
                    fixed: "1.35000",
                    floating: "1.40000"
                },
                {
                    category: "13~23 months",
                    fixed: "1.35000",
                    floating: "1.40000"
                },
                {
                    category: "2 years",
                    fixed: "1.35000",
                    floating: "1.40000"
                },
                {
                    category: "3 years",
                    fixed: "1.35000",
                    floating: "1.40000"
                }]
            }]
        },
        {
            id: "2",
            name: "定期儲蓄存款",
            data: [{
                id: "common",
                subName: "Common",
                subData: [{
                    category: "1 year",
                    fixed: "1.050",
                    floating: "1.070"
                },
                {
                    category: "13~23 months",
                    fixed: "1.050",
                    floating: "1.070"
                },
                {
                    category: "2 years",
                    fixed: "1.070",
                    floating: "1.090"
                },
                {
                    category: "3 years",
                    fixed: "1.070",
                    floating: "1.100"
                }]
            },
            {
                id: "fiveMillion",
                subName: "5 million",
                subData: [{
                    category: "1 year",
                    fixed: "0.55000",
                    floating: "0.60000"
                },
                {
                    category: "13~23 months",
                    fixed: "0.55000",
                    floating: "0.60000"
                },
                {
                    category: "2 years",
                    fixed: "0.55000",
                    floating: "0.60000"
                },
                {
                    category: "3 years",
                    fixed: "0.55000",
                    floating: "0.60000"
                }]
            },
            {
                id: "fortyMillion",
                subName: "40 million",
                subData: [{
                    category: "1 year",
                    fixed: "0.55000",
                    floating: "0.60000"
                },
                {
                    category: "13~23 months",
                    fixed: "0.55000",
                    floating: "0.60000"
                },
                {
                    category: "2 years",
                    fixed: "0.55000",
                    floating: "0.60000"
                },
                {
                    category: "3 years",
                    fixed: "0.55000",
                    floating: "0.60000"
                }]
            },
            {
                id: "twoHundredMillion",
                subName: "200 million",
                subData: [{
                    category: "1 year",
                    fixed: "1.55000",
                    floating: "1.60000"
                },
                {
                    category: "13~23 months",
                    fixed: "1.55000",
                    floating: "1.60000"
                },
                {
                    category: "2 years",
                    fixed: "1.55000",
                    floating: "1.60000"
                },
                {
                    category: "3 years",
                    fixed: "1.55000",
                    floating: "1.60000"
                }]
            }]
        },
        {
            id: "3",
            name: "貸款定儲指數",
            data: [{
                category: "Quartely standard",
                floating: "1.06000"
            },
            {
                category: "Monthly standard",
                floating: "1.07000"
            }]
        },
        {
            id: "4",
            name: "基準利率",
            data: [{
                category: "Standard",
                floating: "2.96000"
            }]
        },
        {
            id: "5",
            name: "信用卡循環使用差別利率",
            data: [{
                category: "Min. interest",
                floating: "5.460"
            },
            {
                category: "Max. interest",
                floating: "19.710"
            }]
        }]
    }
};

let resData2 = {
    'apiId': 'SPEC10010001',
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

export const api_real_response1 = {
    "apiId": "SPEC10010001",
    "token": {
        "requestId": "ab556a456dedf6361601457323547",
        "responseTime": "2020-09-30 17:15:09",
        "lang": "zh_TW"
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    "resContent": {
        "title": "台幣利率",
        "dataTime": "2020-09-30 09:00:06",
        "rowData": [
            {
                "id": "0",
                "name": "活期存款",
                "data": [
                    {
                        "category": "支票存款"
                    },
                    {
                        "category": "活期存款",
                        "floating": "0.050"
                    },
                    {
                        "category": "活期儲蓄存款",
                        "floating": "0.120"
                    },
                    {
                        "category": "薪資轉帳活期儲蓄存款",
                        "floating": "0.220"
                    },
                    {
                        "category": "證劵戶活期儲蓄存款",
                        "floating": "0.010"
                    },
                    {
                        "category": "PukiiBank活期儲蓄存款利率",
                        "floating": "0.220"
                    },
                    {
                        "category": "優質企業薪資轉帳活期儲蓄存款",
                        "floating": "0.300"
                    }
                ]
            },
            {
                "id": "1",
                "name": "定期存款",
                "data": [
                    {
                        "id": "common",
                        "subName": "一般",
                        "subData": [
                            {
                                "category": "一個月",
                                "fixed": "0.350",
                                "floating": "0.350"
                            },
                            {
                                "category": "二個月",
                                "fixed": "0.350",
                                "floating": "0.350"
                            },
                            {
                                "category": "三個月",
                                "fixed": "0.380",
                                "floating": "0.400"
                            },
                            {
                                "category": "四個月",
                                "fixed": "0.380",
                                "floating": "0.400"
                            },
                            {
                                "category": "五個月",
                                "fixed": "0.380",
                                "floating": "0.400"
                            },
                            {
                                "category": "六個月",
                                "fixed": "0.540",
                                "floating": "0.560"
                            },
                            {
                                "category": "九個月",
                                "fixed": "0.650",
                                "floating": "0.670"
                            },
                            {
                                "category": "一年",
                                "fixed": "0.760",
                                "floating": "0.780"
                            },
                            {
                                "category": "13個月~23個月",
                                "fixed": "0.760",
                                "floating": "0.780"
                            },
                            {
                                "category": "二年",
                                "fixed": "0.780",
                                "floating": "0.800"
                            },
                            {
                                "category": "三年",
                                "fixed": "0.790",
                                "floating": "0.810"
                            }
                        ]
                    },
                    {
                        "id": "fiveMillion",
                        "subName": "500萬元 ",
                        "subData": [
                            {
                                "category": "一個月"
                            },
                            {
                                "category": "二個月"
                            },
                            {
                                "category": "三個月"
                            },
                            {
                                "category": "四個月"
                            },
                            {
                                "category": "五個月"
                            },
                            {
                                "category": "六個月"
                            },
                            {
                                "category": "九個月"
                            },
                            {
                                "category": "一年"
                            },
                            {
                                "category": "13個月~23個月"
                            },
                            {
                                "category": "二年"
                            },
                            {
                                "category": "三年"
                            }
                        ]
                    },
                    {
                        "id": "fortyMillion",
                        "subName": "4仟萬元",
                        "subData": [
                            {
                                "category": "一個月"
                            },
                            {
                                "category": "二個月"
                            },
                            {
                                "category": "三個月"
                            },
                            {
                                "category": "四個月"
                            },
                            {
                                "category": "五個月"
                            },
                            {
                                "category": "六個月"
                            },
                            {
                                "category": "九個月"
                            },
                            {
                                "category": "一年"
                            },
                            {
                                "category": "13個月~23個月"
                            },
                            {
                                "category": "二年"
                            },
                            {
                                "category": "三年"
                            }
                        ]
                    },
                    {
                        "id": "twoHundredMillion",
                        "subName": "2億元",
                        "subData": [
                            {
                                "category": "一個月"
                            },
                            {
                                "category": "二個月"
                            },
                            {
                                "category": "三個月"
                            },
                            {
                                "category": "四個月"
                            },
                            {
                                "category": "五個月"
                            },
                            {
                                "category": "六個月"
                            },
                            {
                                "category": "九個月"
                            },
                            {
                                "category": "一年"
                            },
                            {
                                "category": "13個月~23個月"
                            },
                            {
                                "category": "二年"
                            },
                            {
                                "category": "三年"
                            }
                        ]
                    }
                ]
            },
            {
                "id": "2",
                "name": "定期儲蓄存款",
                "data": [
                    {
                        "id": "common",
                        "subName": "一般",
                        "subData": [
                            {
                                "category": "一年",
                                "fixed": "0.800",
                                "floating": "0.820"
                            },
                            {
                                "category": "13個月~23個月",
                                "fixed": "0.800",
                                "floating": "0.820"
                            },
                            {
                                "category": "二年",
                                "fixed": "0.820",
                                "floating": "0.840"
                            },
                            {
                                "category": "三年",
                                "fixed": "0.820",
                                "floating": "0.850"
                            }
                        ]
                    },
                    {
                        "id": "fiveMillion",
                        "subName": "500萬元",
                        "subData": [
                            {
                                "category": "一年"
                            },
                            {
                                "category": "13個月~23個月"
                            },
                            {
                                "category": "二年"
                            },
                            {
                                "category": "三年"
                            }
                        ]
                    },
                    {
                        "id": "fortyMillion",
                        "subName": "4仟萬元",
                        "subData": [
                            {
                                "category": "一年"
                            },
                            {
                                "category": "13個月~23個月"
                            },
                            {
                                "category": "二年"
                            },
                            {
                                "category": "三年"
                            }
                        ]
                    },
                    {
                        "id": "twoHundredMillion",
                        "subName": "2億元",
                        "subData": [
                            {
                                "category": "一年"
                            },
                            {
                                "category": "13個月~23個月"
                            },
                            {
                                "category": "二年"
                            },
                            {
                                "category": "三年"
                            }
                        ]
                    }
                ]
            },
            {
                "id": "3",
                "name": "貸款定儲指數",
                "data": [
                    {
                        "category": "定儲指數(季)"
                    },
                    {
                        "category": "定儲指數(月)"
                    }
                ]
            },
            {
                "id": "4",
                "name": "基準利率",
                "data": [
                    {
                        "category": "基準利率"
                    }
                ]
            },
            {
                "id": "5",
                "name": "信用卡循環信用差別利率",
                "data": [
                    {
                        "category": "最低利率"
                    },
                    {
                        "category": "最高利率"
                    }
                ]
            }
        ]
    }
};

export const api_response1 = resData1;
export const api_response2 = resData2;
export const api_error = {
    'apiId': 'SPEC10010001',
    'token': {
        'requestId': '',
        'responseTime': '2020-06-20 18:28:31',
        'lang': 'zh_TW'
    },
    'resFlag': '1',
    'resMessage': {
        'errorCode': 'ERR10010001',
        'errorMsg': 'Test Error'
    }
};
export const api_exception = {
    'errorCode': 'ERRAAAAAAA',
    'errorMsg': 'Test Error'
};
