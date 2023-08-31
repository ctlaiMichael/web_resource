/**
 * 模擬api SPEC11050201-定期定額編輯(台幣)
 */

// let response = {

//     apiId: "SPEC11050201",
//     token: {
//         "requestId": "",
//         "responseTime": "2020-07-23 20:13:25",
//         "lang": "zh_TW"
//     },
//     "resFlag": "0",
//     "resMessage": {
//         "errorCode": "",
//         "errorMsg": ""
//     },
//     "resContent": {
//         "strTotalNoproc": "-888,115",
//         "riskData": [{
//             "engName": "conservative",
//             "chiName": "保守型比例",
//             "value": "27.63"
//         },
//         {
//             "engName": "aggressive",
//             "chiName": "積極型比例",
//             "value": "18.31"
//         },
//         {
//             "engName": "moderate",
//             "chiName": "穩健型比例",
//             "value": "54.06"
//         }],
//         "currencyData": [{
//             "engName": "TWD",
//             "chiName": "台幣比例",
//             "value": "57.83"
//         },
//         {
//             "engName": "JPY",
//             "chiName": "日圓比例",
//             "value": "1.00"
//         },
//         {
//             "engName": "EUR",
//             "chiName": "歐元比例",
//             "value": "2.68"
//         },
//         {
//             "engName": "AUD",
//             "chiName": "澳幣比例",
//             "value": "0.51"
//         },
//         {
//             "engName": "USD",
//             "chiName": "美金比例",
//             "value": "30.54"
//         }],
//         "regionData": [{
//             "engName": "others",
//             "chiName": "其他比例",
//             "value": "4.32"
//         },
//         {
//             "engName": "fixedIncomeFund",
//             "chiName": "固定收益型比例",
//             "value": "50.12"
//         },
//         {
//             "engName": "balancedFund",
//             "chiName": "平衡型比例",
//             "value": "2.89"
//         },
//         {
//             "engName": "equityFund",
//             "chiName": "股票型比例",
//             "value": "18.09"
//         },
//         {
//             "engName": "currencyFund",
//             "chiName": "貨幣型比例",
//             "value": "24.58"
//         }],
//         "strTotalTotosamt": "13,426,562",
//         "showCcyList": true,
//         "strTotalTotprice": "12,538,447",
//         "sumupInfo": [{
//             "noProc": "-888,115.00",
//             "totsAmt": "13,358,600.00",
//             "totChiCcy": "台幣",
//             "totPrice": "12,470,485.00",
//             "apdint": ".00",
//             "intAmt": "-888,115.00",
//             "rate": "1.0000",
//             "intretn": "-6.65",
//             "baoChou": "-6.65",
//             "totEngCcy": "TWD"
//         },
//         {
//             "noProc": "-13,411.00",
//             "totsAmt": "1,235,419.00",
//             "totChiCcy": "美金",
//             "totPrice": "1,222,008.00",
//             "apdint": ".00",
//             "intAmt": "-13,411.00",
//             "rate": "29.9900",
//             "intretn": "-1.09",
//             "baoChou": "-1.09",
//             "totEngCcy": "USD"
//         },
//         {
//             "noProc": "0.00",
//             "totsAmt": "1,100,150,000.00",
//             "totChiCcy": "日圓",
//             "totPrice": "1,100,150,000.00",
//             "apdint": ".00",
//             "intAmt": ".00",
//             "rate": ".2888",
//             "intretn": ".00",
//             "baoChou": "0.00",
//             "totEngCcy": "JPY"
//         },
//         {
//             "noProc": "0.00",
//             "totsAmt": "30,000,000.00",
//             "totChiCcy": "歐元",
//             "totPrice": "30,000,000.00",
//             "apdint": ".00",
//             "intAmt": ".00",
//             "rate": "34.0800",
//             "intretn": ".00",
//             "baoChou": "0.00",
//             "totEngCcy": "EUR"
//         },
//         {
//             "noProc": "0.00",
//             "totsAmt": "3,244.00",
//             "totChiCcy": "澳幣",
//             "totPrice": "3,244.00",
//             "apdint": ".00",
//             "intAmt": ".00",
//             "rate": "19.6300",
//             "intretn": ".00",
//             "baoChou": "0.00",
//             "totEngCcy": "AUD"
//         },
//         {
//             "noProc": "-1,290,311.00",
//             "totsAmt": "1,390,595,816.00",
//             "totChiCcy": "折台",
//             "totPrice": "1,389,305,505.00",
//             "apdint": ".00",
//             "intAmt": "-1,290,311.00",
//             "rate": "",
//             "intretn": "-.09",
//             "baoChou": "-0.09",
//             "totEngCcy": "折台"
//         }],
//         "strTotalNtMoney": "13,426,561.8",
//         "alShow": [{
//             "fundChiCcy": "台幣",
//             "p3": "3.0499%",
//             "p1": "-1.5017%",
//             "fundTpeCh": "全球高收益債",
//             "region": "固定收益型",
//             "fundName": "復華高益策略組合基金",
//             "fundCode": "7320",
//             "weight": "17.88",
//             "poi": "-0.50%",
//             "priceDate": "108/05/17",
//             "fundEngCcy": "TWD",
//             "poi_image": "DOWN",
//             "viewCurrency": "台幣",
//             "ntMoney": "2,400,000.00",
//             "fundMoney": "2,400,000.00",
//             "nowPrice": "2,387,908.00",
//             "rankName": "穩健型",
//             "acctPrice": "13.3400",
//             "p6": "7.4181%"
//         },
//         {
//             "fundChiCcy": "台幣",
//             "p3": ".1083%",
//             "p1": ".0397%",
//             "fundTpeCh": "貨幣市場 - 新臺幣",
//             "region": "貨幣型",
//             "fundName": "復華貨幣市場基金",
//             "fundCode": "7317",
//             "weight": "14.90",
//             "poi": "1.11%",
//             "priceDate": "108/05/17",
//             "fundEngCcy": "TWD",
//             "poi_image": "UP",
//             "viewCurrency": "台幣",
//             "ntMoney": "2,000,000.00",
//             "fundMoney": "2,000,000.00",
//             "nowPrice": "2,022,273.00",
//             "rankName": "保守型",
//             "acctPrice": "14.4459",
//             "p6": ".1973%"
//         }],
//         "ccyList": {
//             "rate": "0.0",
//             "engCcy": "折台",
//             "chiCcy": "折台"
//         },
//         "totalNtMoney": "1.34265618E7",
//         "infoDateStr": "2020/07/07  08：09：19  PM",
//         "strTotalBaochou": "-6.61",
//         "isNetTans": "true"
//     }
// };

let realData = {
    "apiId": "SPEC11050201",
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
        "payDate": " 01  02  03  04  05  06  07  08  09  10  11  12  13  28 ",
        "isCardPay": "N",
        "payAccount": "02203001234562",
        "status04": "Y",
        "fundKind": "定期定額",
        "status02": "Y",
        "applyDate": "1080327",
        "accountList": "",
        "amtm": "3000",
        "payBank": "011",
        "errorCount": "0",
        "isFullFund": "N",
        "isUnverifyFund": "N"
    }
};

let realData2 = {
    "apiId": "SPEC11050201",
    "token": {
        "requestId": "1f3ccd55244d8aea1603429702506",
        "responseTime": "2020-10-23 13:07:57", "lang": "zh_TW"
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "", "errorMsg": ""
    },
    "resContent": {
        "statusMessage": "",
        "fundName": "鋒裕環球生態A2美",
        "isPostPay": "N",
        "fundCode": "4811",
        "fundKindFlag": "",
        "payDate": "02",
        "isCardPay": "N",
        "status05": "N",
        "payAccount": "02203001234562",
        "status04": "N",
        "status03": "N",
        "fundKind": "定期定額",
        "status02": "N",
        "status01": "N",
        "applyDate": "1061030",
        "accountList": [
            {
                "amount": "90,226", "accountID": "02102000023233"
            },
            {
                "amount": "57,771", "accountID": "02203001234562"
            },
            {
                "amount": "96,708", "accountID": "02203001699615"
            },
            {
                "amount": "9,324,193", "accountID": "02203005800894"
            },
            {
                "amount": "126,220", "accountID": "03203002032713"
            },
            {
                "amount": "305,860", "accountID": "14203000153895"
            },
            {
                "amount": "986,843", "accountID": "23203001186484"
            },
            {
                "amount": "2,050,331,461", "accountID": "24203000382497"
            },
            {
                "amount": "******************", "accountID": "02204000017663"
            }
        ],
        "amtm": "3000",
        "payBank": "011",
        "errorCount": "0",
        "isFullFund": "N",
        "isUnverifyFund": "N"
    }
};

let response = {
    apiId: "SPEC11050201",
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
        "fundCode": "4811",
        "fundName": "鋒裕生態美",
        "payBank": "第一商業銀行",
        "payAccount": "02102000023233",
        "amtm": "23000",
        "applyDate": "2019-12-26",
        "fundKindFlag": "",
        "fundKind": "定期定額",
        "payDate": "5,24",
        "isPostPay": "Y",
        "isCardPay": "Y",
        "isFullFund": "Y",
        "isUnverifyFund": "N",
        "status01": "Y",
        "status02": "N",
        "status03": "N",
        "status04": "N",
        "status05": "Y",
        "errorCount": "1",
        "statusMessage": "累計連續扣款失敗次數 1 次，如連續扣款失敗達 3 次將自動停止扣款",
        "accountList": [
            {
                "accountID": "7778859545585657",
                "amount": "550000"
            },
            {
                "accountID": "6659585457559856",
                "amount": "610000"
            },
            {
                "accountID": "7595855655423620",
                "amount": "842000"
            },
            {
                "accountID": "02102000023233",
                "amount": "412500"
            },
            {
                "accountID": "1125495788203520",
                "amount": "542000"
            },
            {
                "accountID": "9872200326654521",
                "amount": "712300"
            },
            {
                "accountID": "7455659233123533",
                "amount": "412500"
            },
            {
                "accountID": "4225651110236590",
                "amount": "854120"
            }
        ]
    }
};

let response2 = {
    "apiId": "SPEC11050201",
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
        "payDate": "01,02,03,04,05,06,07,08,09,10,11,12,20,28",
        // "payDate": "",
        "isCardPay": "N",
        "payAccount": "02203001234562",
        "status04": "Y",
        "status01": "Y",
        "status03": "N",
        "status05": "N",
        "fundKind": "定期定額",
        "status02": "Y",
        "applyDate": "1080327",
        "amtm": "3000",
        "payBank": "011",
        "errorCount": "0",
        "isFullFund": "N",
        "isUnverifyFund": "N",
        "accountList": [
            {
                "accountID": "7778859545585657",
                "amount": "550000"
            },
            {
                "accountID": "6659585457559856",
                "amount": "610000"
            },
            {
                "accountID": "7595855655423620",
                "amount": "842000"
            },
            {
                "accountID": "02102000023233",
                "amount": "412500"
            },
            {
                "accountID": "1125495788203520",
                "amount": "542000"
            },
            {
                "accountID": "9872200326654521",
                "amount": "712300"
            },
            {
                "accountID": "7455659233123533",
                "amount": "412500"
            },
            {
                "accountID": "4225651110236590",
                "amount": "854120"
            }
        ]
    }
};

let data1M = {};
let dataEmpty = {
    apiId: "SPEC11050201",
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
    apiId: 'SPEC11050201',
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
