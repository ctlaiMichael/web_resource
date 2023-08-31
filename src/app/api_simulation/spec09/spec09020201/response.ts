/**
 * 模擬api SPEC09020101-綜存開戶約定
 */

let response = {
    apiId: 'SPEC09020201',
    token: {
        requestId: '',
        responseTime: '2020-07-07 17:07:39',
        lang: 'zh_TW'
    },
    resFlag: '0',
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    resContent: {
        outPutData: [
            {
                accountId: '02203000541801',
                nickName: '測試1',
                avlAmount: '23,355,511',
                openAnAccount: '0'
            },
            {
                accountId: '02203000566543',
                nickName: '測試2',
                avlAmount: '11,222,333',
                openAnAccount: '0'
            },
            {
                accountId: '02203000566987',
                nickName: '測試3',
                avlAmount: '1,355,511',
                openAnAccount: '1'
            },
            {
                accountId: '02203000132669',
                nickName: '測試4',
                avlAmount: '55,355,511',
                openAnAccount: '0'
            },
            {
                accountId: '02203000889759',
                nickName: '測試5',
                avlAmount: '7,377,511',
                openAnAccount: '1'
            }
        ]
    }
};
let data1M = {};
let dataEmpty = {
    apiId: 'SPEC09020201',
    token: {
        requestId: '',
        responseTime: '2020-07-17 11:13:27',
        lang: 'zh_TW'
    },
    resFlag: '0',
    resMessage: {
        errorCode: '',
        errorMsg: ''
    },
    resContent: {
        outputData: [
            {
                isNetTrans: 'true',
                roiDataList: [],
                infoDateStr: '2020/07/17  11：13：27  AM'
            }
        ]
    }
};

let df_response = {};

export const api_response = { ...df_response, ...response };
export const api_empty = { ...df_response, ...dataEmpty };
export const api_error = {
    apiId: 'SPEC09020201',
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
