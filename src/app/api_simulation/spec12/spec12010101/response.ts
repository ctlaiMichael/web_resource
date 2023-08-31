/**
 * 模擬api
 */
let data = {
    'apiId': 'SPEC12010101',
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
        'userName': 'Herry-Lai',
        'eMail': 'herrylai0526@gmail.com',
        'currentBalance': '150000', // 目前可用額度(舊中台無此欄位,有可能廢除不放)
        'avallableBalance': '300000',
        'stmtDate': '20200730',
        'dueDate': '20200802',
        'ownerPercent': '3',
        'atmNo': '17468565396330',
        'stmAmt': '176800',
        'minAmt': '17680',
        'stmBal': '4100',
        'miBal': '1900',
        'payDate': '20200803',
        'totalAmt': '10000',
        'autoPayRate': '85',
        'autoPayAmt': '17500',
        'autoPayDate': '20200801',
        'autoPayAcct': '上海銀行 02204000017663 行存測試帳號',
        'autoPayAcctBankName': '上海銀行',
        'autoPayAcctAccount': '02204000017663',
        'autoPayAcctNickName': '行存測試帳號',
        'bonus': '2600'
    }
};

let df_response = {
    'apiId': 'SPEC12010101',
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

export const api_response = { ...df_response, ...data };
export const api_response_empty = { ...df_response, ...df_response };
export const api_error = {
    'apiId': 'SPEC12010101',
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
