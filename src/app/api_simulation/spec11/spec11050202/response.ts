/**
 * 模擬api SPEC11050201-定期定額編輯(台幣)
 */
let response = {
    apiId: "SPEC11050202",
    token: {
        "requestId": "",
        "responseTime": "2020-07-23 20:13:25",
        "lang": "zh_TW"
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    "resContent": {
        "fundCode": "4955",
        "fundName": "施羅德特美國債券基金",
        "payBank": "彰化商業銀行",
        "payAccount": "02335004458592",
        "amtm": "5000",
        "applyDate": "2019-12-26",
        "fundKindFlag": "",
        "fundKind": "定期定額",
        "payDate": "6,18,28",
        "isPostPay": "Y",
        "isCardPay": "Y",
        "isFullFund": "Y",
        "isUnverifyFund": "N",
        "status01": "N",
        "status02": "Y",
        "status03": "N",
        "status04": "N",
        "status05": "N",
        "errorCount": "1",
        "statusMessage": "累計連續扣款失敗次數 1 次，如連續扣款失敗達 3 次將自動停止扣款",
        "accountList": [
            {
                "accountID": "7452059999585650",
                "amount": "520000"
            },
            {
                "accountID": "6552385457854992",
                "amount": "580000"
            },
            {
                "accountID": "7445255922344210",
                "amount": "622000"
            },
            {
                "accountID": "6559727521172041",
                "amount": "382500"
            },
            {
                "accountID": "3315822014222350",
                "amount": "384000"
            },
            {
                "accountID": "1152600854882095",
                "amount": "452300"
            },
            {
                "accountID": "7954233542201700",
                "amount": "1412500"
            },
            {
                "accountID": "3855261155970448",
                "amount": "1054120"
            }
        ]
    }
};

let response2 = {
    "apiId": "SPEC11050202",
    "token": {
        "requestId": "febd800bdfba18171602820126572",
        "responseTime": "2020-10-16 11:48:33",
        "lang": "zh_TW"
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    "resContent": {
        "statusMessage": "",
        "fundName": "摩根日本（日圓）",
        "isPostPay": "N",
        "fundCode": "0101",
        "fundKindFlag": "",
        "payDate": "01,02,04,05,08,09,10,20,28",
        // "payDate": "",
        "isCardPay": "N",
        "payAccount": "0220300444595866",
        "status04": "Y",
        "fundKind": "定期定額",
        "status02": "Y",
        "applyDate": "1080327",
        "amtm": "7000",
        "payBank": "011",
        "errorCount": "0",
        "isFullFund": "N",
        "isUnverifyFund": "N",
        "accountList": [
            {
                "accountID": "7778859545565657",
                "amount": "410000"
            },
            {
                "accountID": "6659985565240856",
                "amount": "650000"
            },
            {
                "accountID": "0220300444595866",
                "amount": "898000"
            },
            {
                "accountID": "0210455659201355",
                "amount": "692500"
            },
            {
                "accountID": "1522035788210020",
                "amount": "754000"
            },
            {
                "accountID": "8550200455255821",
                "amount": "1023300"
            },
            {
                "accountID": "75916544565224200",
                "amount": "612500"
            },
            {
                "accountID": "42455665234595523",
                "amount": "964120"
            }
        ]
    }
};

let data1M = {};
let dataEmpty = {
    apiId: "SPEC11050202",
    token: {
        requestId: "",
        responseTime: "2020-07-17 11:13:27",
        lang: "zh_TW"
    },
    resFlag: '0',
    resMessage: {
        errorCode: "",
        errorMsg: ""
    },
    resContent: {
        outputData: [
            {
                isNetTrans: "true",
                roiDataList: [

                ],
                "infoDateStr": "2020/07/17  11：13：27  AM"
            }
        ]
    }
};

let df_response = {};

export const api_response = { ...df_response, ...response2 };
export const api_empty = { ...df_response, ...dataEmpty };
export const api_error = {
    apiId: 'SPEC11050202',
    token: {
        requestId: '',
        responseTime: '2020-06-20 18:18:31',
        lang: 'zh_TW'
    },
    resFlag: '1',
    resMessage: {
        errorCode: 'ERRAAAAAAA',
        errorMsg: 'Test Error'
    }
};
export const api_exception = {
    errorCode: 'ERRAAAAAAA',
    errorMsg: 'Test Error'
};
