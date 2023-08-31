/**
 * 模擬api SPEC11050101-定期定額
 */

let response = {

    apiId: "SPEC11050101",
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
        "rowData": [
            {
                "accountID": "14203000153895",
                "amt": "3,000",
                "chgDate": "27,28",
                "status": "停止申購",
                "engCcy": "TWD",
                "license": "07206000005",
                "fundName": "鋒裕生態美",
                "fundCode": "4811",
                "type": "定期定額",
                "memo": "",
                "chiCcy": "台幣",
                "applyDate": "106/09/13"

            },
            {
                "accountID": "02102000023233",
                "amt": "3,000",
                "chgDate": "02,12",
                "status": "停止申購",
                "engCcy": "TWD",
                "license": "07206003854",
                "fundName": "鋒裕生態美",
                "fundCode": "4811",
                "type": "定期定額",
                "memo": "",
                "chiCcy": "台幣",
                "applyDate": "106/10/30"

            },
            {
                "accountID": "02203001234562",
                "amt": "3,000",
                "chgDate": "02",
                "status": "停止扣款",
                "engCcy": "TWD",
                "license": "07206003855",
                "fundName": "鋒裕生態美",
                "fundCode": "4811",
                "type": "定期定額",
                "memo": "1081107起終止扣款",
                "chiCcy": "台幣",
                "applyDate": "106/10/30"

            },
            {
                "accountID": "05542001569574",
                "amt": "5,000",
                "chgDate": "01",
                "status": "停止申購",
                "engCcy": "USD",
                "license": "06659005584",
                "fundName": "施羅德特美國債券基金",
                "fundCode": "4955",
                "type": "定期定額",
                "memo": "",
                "chiCcy": "美金",
                "applyDate": "106/11/20"

            },
            {
                "accountID": "02203001234562",
                "amt": "3,000",
                "chgDate": "01,02,03,04,05,06,07,08,09,10,11,12,13,28",
                "status": "正常扣款",
                "engCcy": "TWD",
                "license": "07208000004",
                "fundName": "摩根日本",
                "fundCode": "0101",
                "type": "定期定額",
                "memo": "",
                "chiCcy": "台幣",
                "applyDate": "108/03/27"

            }
        ],
        "infoDateStr": "2020/07/23  08：13：25  PM"
    },
    "paginator": {
        "totalCount": "10",
        "pageSize": "5",
        "pageNumber": "1",
        "sortColName": "fund",
        "sortDirection": "ASC"
    }
};
let data1M = {};
let dataEmpty = {
    apiId: "SPEC11060101",
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

export const api_response = { ...df_response, ...response };
export const api_empty = { ...df_response, ...dataEmpty };
export const api_error = {
    apiId: 'SPEC11050101',
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
