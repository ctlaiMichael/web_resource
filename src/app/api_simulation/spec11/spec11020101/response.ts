/**
 * 模擬api
 */
// let data = {
//     'apiId': 'SPEC11020101',
//     'token': {
//         'requestId': '',
//         'responseTime': '',
//         'lang': ''
//     },
//     'resFlag': '0',
//     'resMessage': {
//         'errorCode': '',
//         'errorMsg': ''
//     },
//     "resContent": {
//         "fundFlag": "*",
//         "fundTypeName": "國內單筆產品",
//         "fundType": "single",
//         "atLeast": "20000",
//         "lowestRevAmt": "10000",
//         "highRedeemAmt": "31000",
//         "accountList": [{
//             "accountID": "02203000311010",
//             "accountName": "測試帳號1"
//         },
//         {
//             "accountID": "09203000130080",
//             "accountName": "測試帳號2"
//         },
//         {
//             "accountID": "11203000082571",
//             "accountName": "測試帳號3"
//         },
//         {
//             "accountID": "55203000109729",
//             "accountName": "測試帳號4"
//         },
//         {
//             "accountID": "02204000009971",
//             "accountName": "測試帳號5"
//         }
//         ],
//         "optRowcnt": "1",
//         "license": "07101000022",
//         "fundEngCcy": "NTD",
//         "fundName": "富達東南亞",
//         "fundCode": "0202",
//         "fundAmt": "41000",
//         "fundUnitcnt": "1000",
//         "lowestRedeemAmt": "10000",
//         "fundChiCcy": "台幣",
//         "redeemRadio": "part",
//         "check_fundFlag": "*"
//     }
// };

let data = {
    "apiId": "SPEC11020101",
    "token": { "requestId": "aaf2e165d962862f1602050501443", "responseTime": "2020-10-07 14:01:23", "lang": "zh_TW" },
    "resFlag": "0",
    "resMessage": { "errorCode": "", "errorMsg": "" },
    "resContent": {
        "lowestReedomAmt": "10000.0",
        "fundFlag": "",
        "fundType": "single",
        "atLeast": "0.0",
        "lowestRevAmt": "10000.0",
        "accountList": [
            { "accountID": "02101000000107", "accountName": "" },
            { "accountID": "02203000311010", "accountName": "" },
            { "accountID": "02203003699001", "accountName": "" },
            { "accountID": "02203005800632", "accountName": "" },
            { "accountID": "02203005801604", "accountName": "" },
            { "accountID": "02203005801612", "accountName": "" },
            { "accountID": "02203005801620", "accountName": "" },
            { "accountID": "02203005802846", "accountName": "" },
            { "accountID": "03203000606037", "accountName": "" },
            { "accountID": "04203005800127", "accountName": "" },
            { "accountID": "09203000130080", "accountName": "" },
            { "accountID": "15203005800027", "accountName": "" },
            { "accountID": "02204000009971", "accountName": "" }
        ],
        "optRowcnt": "1",
        "license": "07396004759",
        "fundEngCcy": "TWD",
        "fundName": "復華全球資產證券A",
        "highReedomAmt": "90000.0",
        "fundTypeName": "國內單筆產品",
        "fundCode": "7312",
        "fundAmt": "100000.00",
        "fundUnitcnt": "10000.0000",
        "fundChiCcy": "台幣",
        "redeemRadio": "part"
    }
};

/**
 * 不可做部分贖回
 */
let cantDoPart = {
    'apiId': 'SPEC11020101',
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
        "fundTypeName": "國內單筆產品",
        "fundType": "single",
        "atLeast": "20000",
        "lowestRevAmt": "10000",
        "highRedeemAmt": "50000",
        "accountList": [{
            "accountID": "02203000311010",
            "accountName": "測試帳號1"
        },
        {
            "accountID": "09203000130080",
            "accountName": "測試帳號2"
        },
        {
            "accountID": "11203000082571",
            "accountName": "測試帳號3"
        },
        {
            "accountID": "55203000109729",
            "accountName": "測試帳號4"
        },
        {
            "accountID": "02204000009971",
            "accountName": "測試帳號5"
        }
        ],
        "optRowcnt": "1",
        "license": "07101000022",
        "fundEngCcy": "NTD",
        "fundName": "富達東南亞",
        "fundCode": "0202",
        "fundAmt": "21000",
        "fundUnitcnt": "1000",
        "lowestRedeemAmt": "10000",
        "fundChiCcy": "台幣",
        "redeemRadio": "all",
        "check_fundFlag": "*"
    }
};

/**
 * 信託本金 < 最低投資金額 (餘額不足)
 */
let amountNotEnough = {
    'apiId': 'SPEC11020101',
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
        "fundTypeName": "國內單筆產品",
        "fundType": "single",
        "atLeast": "20000",
        "lowestRevAmt": "10000",
        "highRedeemAmt": "50000",
        "accountList": [{
            "accountID": "02203000311010",
            "accountName": "測試帳號1"
        },
        {
            "accountID": "09203000130080",
            "accountName": "測試帳號2"
        },
        {
            "accountID": "11203000082571",
            "accountName": "測試帳號3"
        },
        {
            "accountID": "55203000109729",
            "accountName": "測試帳號4"
        },
        {
            "accountID": "02204000009971",
            "accountName": "測試帳號5"
        }
        ],
        "optRowcnt": "1",
        "license": "07101000022",
        "fundEngCcy": "NTD",
        "fundName": "富達東南亞",
        "fundCode": "0202",
        "fundAmt": "1000",
        "fundUnitcnt": "1000",
        "lowestRedeemAmt": "10000",
        "fundChiCcy": "台幣",
        "redeemRadio": "part",
        "check_fundFlag": "*"
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

let df_response = {
    'apiId': 'SPEC11020101',
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


// ------ amount test ---- //
// 只能全部贖回
// data.resContent = {...data.resContent, ...{
//     "redeemRadio": "all"
// }};


export const api_response = { ...df_response, ...data };
export const api_response_empty = { ...df_response, ...df_response };
export const api_error = {
    'apiId': 'SPEC11020101',
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
