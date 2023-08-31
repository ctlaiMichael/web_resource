/**
 * 模擬api
 */
let resData1 = {
    'apiId': 'SPEC07040001',
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
        "rowData": [
            {
                "accountId": "02121000001171",
                "nickName": "定存測試帳號01",
                "combinedAcc": "02102000123433",
                "combinedAccNickname": "綜存測試帳號01",
                "currencyCode": "TWD",
                "finalBalance": "1000999",
                "principal": "1000000",
                "interestAmt": "999",
                "taxPayable": "",
                "interestPayable": ""

            },
            {
                "accountId": "02121000001172",
                "nickName": "定存測試帳號02",
                "combinedAcc": "02102000123433",
                "combinedAccNickname": "綜存測試帳號02",
                "currencyCode": "TWD",
                "finalBalance": "2000888",
                "principal": "2000000",
                "interestAmt": "888",
                "taxPayable": "",
                "interestPayable": ""
            },
            {
                "accountId": "02121000001173",
                "nickName": "定存測試帳號03",
                "combinedAcc": "02102000123433",
                "combinedAccNickname": "綜存測試帳號03",
                "currencyCode": "TWD",
                "finalBalance": "3000577",
                "principal": "3000000",
                "interestAmt": "777",
                "taxPayable": "200",
                "interestPayable": ""

            },
            {
                "accountId": "02121000001174",
                "nickName": "定存測試帳號04",
                "combinedAcc": "02102000123433",
                "combinedAccNickname": "綜存測試帳號04",
                "currencyCode": "TWD",
                "finalBalance": "4000000",
                "principal": "4000000",
                "interestAmt": "555",
                "taxPayable": "300",
                "interestPayable": "255"
            },
            {
                "accountId": "02121000001175",
                "nickName": "定存測試帳號05",
                "combinedAcc": "02102000123433",
                "combinedAccNickname": "綜存測試帳號05",
                "currencyCode": "TWD",
                "finalBalance": "5000333",
                "principal": "5000000",
                "interestAmt": "999",
                "taxPayable": "",
                "interestPayable": "666"
            }
        ]
    }
};

let resData2 = {
    'apiId': 'SPEC07040001',
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
    'apiId': 'SPEC07040001',
    'token': {
        'requestId': '',
        'responseTime': '2020-06-20 18:28:31',
        'lang': 'zh_TW'
    },
    'resFlag': '1',
    'resMessage': {
        'errorCode': 'ERR07040001',
        'errorMsg': 'Test Error'
    }
};
export const api_exception = {
    'errorCode': 'ERRAAAAAAA',
    'errorMsg': 'Test Error'
};
