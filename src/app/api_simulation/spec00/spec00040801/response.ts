/**
 * 模擬api
 */
let data = {
    'apiId': 'SPEC00040801',
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
        'rowData': [
            { 'order': '1', 'accountId': '1512000017813', 'nickName': '測試1', 'amount': '150000', 'dueDate': '2020-07-26', 'rate': '2.2800', 'status': '正常戶' },
            { 'order': '2', 'accountId': '1512000017926', 'nickName': '測試2', 'amount': '145000', 'dueDate': '2020-07-31', 'rate': '3.2500', 'status': '靜止戶' },
            { 'order': '3', 'accountId': '1513000017445', 'nickName': '測試3', 'amount': '165000', 'dueDate': '2020-08-05', 'rate': '5.1700', 'status': '靜止戶' },
            { 'order': '4', 'accountId': '1514000022596', 'nickName': '測試4', 'amount': '175000', 'dueDate': '2020-08-17', 'rate': '1.3200', 'status': '正常戶' },
            { 'order': '5', 'accountId': '1515000012699', 'nickName': '測試5', 'amount': '180000', 'dueDate': '2020-08-23', 'rate': '1.5600', 'status': '正常戶' },
            { 'order': '6', 'accountId': '1556000019985', 'nickName': '測試6', 'amount': '195000', 'dueDate': '2020-09-26', 'rate': '2.7800', 'status': '靜止戶' },
            { 'order': '7', 'accountId': '1556000014562', 'nickName': '測試7', 'amount': '210000', 'dueDate': '2020-09-29', 'rate': '2.3200', 'status': '靜止戶' },
            { 'order': '8', 'accountId': '1556000021145', 'nickName': '測試8', 'amount': '360000', 'dueDate': '2020-10-07', 'rate': '3.3900', 'status': '正常戶' },
            { 'order': '9', 'accountId': '1678000069558', 'nickName': '測試9', 'amount': '450000', 'dueDate': '2020-10-23', 'rate': '4.5000', 'status': '靜止戶' },
            { 'order': '10', 'accountId': '1678000066523', 'nickName': '測試10', 'amount': '560000', 'dueDate': '2020-11-15', 'rate': '4.7800', 'status': '正常戶' },
            { 'order': '11', 'accountId': '1678000095665', 'nickName': '測試11', 'amount': '600000', 'dueDate': '2020-11-23', 'rate': '5.3600', 'status': '靜止戶' },
            { 'order': '12', 'accountId': '1755000018856', 'nickName': '測試12', 'amount': '50000', 'dueDate': '2020-12-01', 'rate': '5.3900', 'status': '靜止戶' },
            { 'order': '13', 'accountId': '1755000096652', 'nickName': '測試13', 'amount': '178000', 'dueDate': '2020-12-05', 'rate': '6.4100', 'status': '正常戶' },
            { 'order': '14', 'accountId': '1850000022530', 'nickName': '測試14', 'amount': '1680000', 'dueDate': '2020-12-20', 'rate': '6.8500', 'status': '靜止戶' }
        ]
    }
};

let df_response = {
    'resContent': {
        'apiId': 'SPEC00040801',
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
        'rowData': [

        ]
    }
};
export const api_response = { ...df_response, ...data };
export const api_response_empty = { ...df_response, ...df_response };
export const api_error = {
    "responseTime": "2020-09-30 14:40:49",
    "errorCode": "LoanInquiry.ERROR03102",
    "apiId": "SPEC00040801",
    "errorMsg": "很抱歉，您沒有任何貸款資料。"
};
export const api_exception = {
    'errorCode': 'ERRAAAAAAA',
    'errorMsg': 'Test Error'
};
