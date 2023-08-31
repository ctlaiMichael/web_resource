/**
 * 模擬api SPEC11060201-理財妙管家修改
 */

let response = {

    apiId: "SPEC11060201",
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
        "selectedProfitAccountID": "02204000009971",
        "faccountProfitData": [{
            "accnoNickname": "凱耳聞2",
            "accno": "02203000311010"
        },
        {
            "accnoNickname": "我的扣款帳號1",
            "accno": "02204000009971"
        },
        {
            "accnoNickname": "凱文帳號",
            "accno": "09203000130080"
        },
        {
            "accnoNickname": "傑利帳號",
            "accno": "11203000082571"
        },
        {
            "accnoNickname": "艾爾文帳號",
            "accno": "55203000109729"
        },
        {
            "accnoNickname": "法國人帳號",
            "accno": "58456220155895"
        },
        {
            "accnoNickname": "蘋果帳號",
            "accno": "58002564188595"
        },
        {
            "accnoNickname": "蓮霧帳號",
            "accno": "885952230256"
        },
        {
            "accnoNickname": "我的扣款帳號2",
            "accno": "775907859552"
        }],
        "infoDateStr": "2020/07/22  11：02：53  AM"
    }
};

let realData = {"apiId":"SPEC11060201","token":{"requestId":"76cad5daf13c44181602490496343","responseTime":"2020-10-12 16:14:38","lang":"zh_TW"},"resFlag":"0","resMessage":{"errorCode":"","errorMsg":""},"resContent":{"selectedProfitAccountID":"","faccountProfitData":[{"accnoNickname":"測試帳號233","accno":"02102000023233"},{"accnoNickname":"測試帳號562","accno":"02203001234562"},{"accnoNickname":"測試帳號615","accno":"02203001699615"},{"accnoNickname":"測試帳號894","accno":"02203005800894"},{"accnoNickname":"測試帳號行存","accno":"02204000017663"},{"accnoNickname":"測試帳號713","accno":"03203002032713"},{"accnoNickname":"測試帳號895","accno":"14203000153895"},{"accnoNickname":"測試帳號484","accno":"23203001186484"},{"accnoNickname":"測試帳號497","accno":"24203000382497"}],"infoDateStr":"2020/10/12  04：14：44  PM"}};
let data1M = {};
let dataEmpty = {
    apiId: "SPEC11060201",
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

export const api_response = { ...df_response, ...realData };
export const api_empty = { ...df_response, ...dataEmpty };
export const api_error = {
    apiId: 'SPEC11060201',
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
