/**
 * 模擬api
 */
let data = {
    'apiId': 'SPEC11020102',
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
    "resContent": {
        "fundFlag": "*",
        "fundTypeName": "海外單筆產品",
        "fundType": "single",
        "atLeast": "20000",
        "lowestRevAmt": "10000",
        "highReedomAmt": "25000",
        "accountList": [
            {
                "accountID": "02203000322050",
                "accountName": "測試帳號1",
                "accountEngCcy": "CNY",
                "accountChiCcy": "人民幣",
                "creditAccountFlag": "N"
            },
            {
                "accountID": "09203000165820",
                "accountName": "測試帳號2",
                "accountEngCcy": "USD",
                "accountChiCcy": "美金",
                "creditAccountFlag": "N"
            },
            {
                "accountID": "11203000078950",
                "accountName": "測試帳號3",
                "accountEngCcy": "USD",
                "accountChiCcy": "美金",
                "creditAccountFlag": "N"
            },
            {
                "accountID": "55203000165822",
                "accountName": "測試帳號4",
                "accountEngCcy": "AUD",
                "accountChiCcy": "歐元",
                "creditAccountFlag": "N"
            },
            {
                "accountID": "02204000048523",
                "accountName": "測試帳號5",
                "accountEngCcy": "JPY",
                "accountChiCcy": "日圓",
                "creditAccountFlag": "N"
            }
        ],
        "optRowcnt": "1",
        "license": "07101000023",
        "fundEngCcy": "USA",
        "fundName": "弗羅特東南亞",
        "fundCode": "0224",
        "fundAmt": "34000.00",
        "fundUnitcnt": "1000",
        "lowestReedomAmt": "9000",
        "fundChiCcy": "美金",
        "redeemRadio": "part",
        "check_fundFlag": "*"
    }
};

let realData = {
    "apiId":"SPEC11020102",
    "token":{
       "requestId":"2ba6e9e8d4b77d351604468574994",
       "responseTime":"2020-11-04 13:42:23",
       "lang":"zh_TW"
    },
    "resFlag":"0",
    "resMessage":{
       "errorCode":"",
       "errorMsg":""
    },
    "resContent":{
       "fundChiCcy":"美金",
       "fundFlag":"",
       "fundUnitcnt":"61.9960",
       "fundAmt":"100000.00",
       "redeemRadio":"part",
       "atLeast":"1000",
       "fundName":"NN投資級公司債",
       "license":"02509000007",
       "fundCode":"3901",
       "fundTypeName":"單筆產品",
       "fundType":"single",
       "fundEngCcy":"USD",
       "optRowcnt":"1",
       "highReedomAmt":"99500",
       "accountList":[
          {
             "accountID":"03108000000744",
             "accountEngCcy":"CNY",
             "accountChiCcy":"人民幣",
             "accountName":"測試帳號744"
          },
          {
             "accountID":"03108000000744",
             "accountEngCcy":"EUR",
             "accountChiCcy":"歐元",
             "accountName":"測試帳號744"
          },
          {
             "accountID":"03108000000744",
             "accountEngCcy":"HKD",
             "accountChiCcy":"港幣",
             "accountName":"測試帳號744"
          },
          {
             "accountID":"03108000000744",
             "accountEngCcy":"JPY",
             "accountChiCcy":"日圓",
             "accountName":"測試帳號744"
          },
          {
             "accountID":"03108000000744",
             "accountEngCcy":"NZD",
             "accountChiCcy":"紐西蘭幣",
             "accountName":"測試帳號744"
          },
          {
             "accountID":"03108000000744",
             "accountEngCcy":"USD",
             "accountChiCcy":"美金",
             "accountName":"測試帳號744"
          },
          {
             "accountID":"03108000000744",
             "accountEngCcy":"ZAR",
             "accountChiCcy":"南非幣",
             "accountName":"測試帳號744"
          },
          {
             "accountID":"55108000000747",
             "accountEngCcy":"EUR",
             "accountChiCcy":"歐元",
             "accountName":""
          },
          {
             "accountID":"55108000000747",
             "accountEngCcy":"USD",
             "accountChiCcy":"美金",
             "accountName":""
          }
       ],
       "lowestReedomAmt":"500.0",
       "creditAccountFlag":"N",
       "lowestRevAmt":"500"
    }
 };

// let data = {"apiId":"SPEC11020102","token":{"requestId":"47fc38ebad9734551602049793849","responseTime":"2020-10-07 13:49:35","lang":"zh_TW"},"resFlag":"1","resMessage":{"errorCode":"OffshoreFundRedeem.ERROR_KEY_FUND12ERROR002","errorMsg":"[FUND12002] 單位數分配中，無法進行回贖。\n如果您最近才將本產品辦理異動，則此為正常狀況，請於單位數確定後再辦理回贖。\n若不是上述情況遇到此問題，請立刻與本行信託部連絡，謝謝。\n客服專線: (02)2552-3111  及信託部服務電話 (02)2356-8111"}}

/**
 * 不可做部分贖回
 */
let cantDoPart = {
    'apiId': 'SPEC11020102',
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
    "resContent": {
        "fundFlag": "*",
        "fundTypeName": "海外單筆產品",
        "fundType": "single",
        "atLeast": "20000",
        "lowestRevAmt": "10000",
        "highRedeemAmt": "50000",
        "accountList": [
            {
                "accountID": "02203000322050",
                "accountName": "測試帳號1",
                "accountEngCcy": "CNY",
                "accountChiCcy": "人民幣",
                "creditAccountFlag": "N"
            },
            {
                "accountID": "09203000165820",
                "accountName": "測試帳號2",
                "accountEngCcy": "USD",
                "accountChiCcy": "美金",
                "creditAccountFlag": "N"
            },
            {
                "accountID": "11203000078950",
                "accountName": "測試帳號3",
                "accountEngCcy": "USD",
                "accountChiCcy": "美金",
                "creditAccountFlag": "N"
            },
            {
                "accountID": "55203000165822",
                "accountName": "測試帳號4",
                "accountEngCcy": "AUD",
                "accountChiCcy": "歐元",
                "creditAccountFlag": "N"
            },
            {
                "accountID": "02204000048523",
                "accountName": "測試帳號5",
                "accountEngCcy": "JPY",
                "accountChiCcy": "日圓",
                "creditAccountFlag": "N"
            }
        ],
        "optRowcnt": "1",
        "license": "07101000023",
        "fundEngCcy": "USA",
        "fundName": "弗羅特東南亞",
        "fundCode": "0224",
        "fundAmt": "24000",
        "fundUnitcnt": "1000",
        "lowestRedeemAmt": "9000",
        "fundChiCcy": "美金",
        "redeemRadio": "all",
        "check_fundFlag": "*"
    }
};

/**
 * 信託本金 < 最低投資金額 (餘額不足)
 */
let amountNotEnough = {
    'apiId': 'SPEC11020102',
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
    "resContent": {
        "fundFlag": "*",
        "fundTypeName": "海外單筆產品",
        "fundType": "single",
        "atLeast": "20000",
        "lowestRevAmt": "10000",
        "highRedeemAmt": "50000",
        "accountList": [
            {
                "accountID": "02203000322050",
                "accountName": "測試帳號1",
                "accountEngCcy": "CNY",
                "accountChiCcy": "人民幣",
                "creditAccountFlag": "N"
            },
            {
                "accountID": "09203000165820",
                "accountName": "測試帳號2",
                "accountEngCcy": "USD",
                "accountChiCcy": "美金",
                "creditAccountFlag": "N"
            },
            {
                "accountID": "11203000078950",
                "accountName": "測試帳號3",
                "accountEngCcy": "USD",
                "accountChiCcy": "美金",
                "creditAccountFlag": "N"
            },
            {
                "accountID": "55203000165822",
                "accountName": "測試帳號4",
                "accountEngCcy": "AUD",
                "accountChiCcy": "歐元",
                "creditAccountFlag": "N"
            },
            {
                "accountID": "02204000048523",
                "accountName": "測試帳號5",
                "accountEngCcy": "JPY",
                "accountChiCcy": "日圓",
                "creditAccountFlag": "N"
            }
        ],
        "optRowcnt": "1",
        "license": "07101000023",
        "fundEngCcy": "USA",
        "fundName": "弗羅特東南亞",
        "fundCode": "0224",
        "fundAmt": "1000",
        "fundUnitcnt": "1000",
        "lowestRedeemAmt": "9000",
        "fundChiCcy": "美金",
        "redeemRadio": "part",
        "check_fundFlag": "*"
    }
};

let real_error = {
    "apiId": "SPEC11020102",
    "token": {
        "requestId": "b17fa3b33385182d1603162727076",
        "responseTime": "2020-10-20 10:58:21",
        "lang": "zh_TW"
    },
    "resFlag": "1"
}

let df_response = {
    'apiId': 'SPEC11020102',
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

// 單位數分配中,無法進行贖回 中台回應realData
let errorData = {
    "apiId": "SPEC11020101",
    "token": {
        "requestId": "a13f7995ebe903ef1603089446960",
        "responseTime": "2020-10-19 14:37:00",
        "lang": "zh_TW"
    },
    "resFlag": "1",
    "resMessage": {
        "errorCode": "FundRedeem.ERROR_KEY_FUND07ERROR005",
        "errorMsg": "FundRedeem.ERROR_KEY_FUND07ERROR005"
    }
};

export const api_response = { ...df_response, ...data };
export const api_response_empty = { ...df_response, ...df_response };
export const api_error = {
    'apiId': 'SPEC11020102',
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
