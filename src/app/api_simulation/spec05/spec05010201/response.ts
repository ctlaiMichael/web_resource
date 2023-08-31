/**
 * 模擬api
 */

let resData = {
    "resFlag": "0",
    "resContent": {
        "accountInfo": [
            {
                "typeId": "1",
                "typeName": "活期存款",
                "account": [
                    {
                        "nickName": "測試528",
                        "accountBalance": "62,356",
                        "accountId": "02204000007528",
                        "availableBalance": "62,356"
                    },
                    {
                        "nickName": "測試010",
                        "accountBalance": "6,356",
                        "accountId": "02203000311010",
                        "availableBalance": "6,300"
                    }
                ],
                "typeTotalBalance": "68,656"
            },
            {
                "typeId": "2",
                "typeName": "定期存款",
                "account": [
                    {
                        "nickName": "測試315",
                        "accountId": "11293000084315",
                        "availableBalance": "500,000.00"
                    },
                    {
                        "nickName": "測試805",
                        "accountId": "11293000097805",
                        "availableBalance": "200,000.00"
                    },
                    {
                        "nickName": "測試977",
                        "accountId": "11293000122977",
                        "availableBalance": "30,000.00"
                    }
                ],
                "typeTotalBalance": "730,000.00"
            }
        ],
        "totalBalance": "798,656"
    }
};


let df_response = {
    "apiId": "SPEC05010201",
    "token": {
        "requestId": "",
        "responseTime": "",
        "lang": "TW"
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    "resContent": {
        "accountInfo": [],
        "totalBalance": ""
    }
};

export const api_response = { ...df_response, ...resData };
export const api_empty = { ...df_response, ...{
    "resContent": {
        "accountInfo": [
            
            {
                "typeId": "1",
                "typeName": "活期存款",
                "typeTotalBalance": "0"
            },
            {
                "typeId": "2",
                "typeName": "定期存款",
                "account": [
                ],
                "typeTotalBalance": "0"
            }
        ],
        "totalBalance": "0.00"
    }
}};
export const api_error = {
    'apiId': 'SPEC05010201',
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
