/**
 * 模擬api
 */

let dataToYear = {
    "apiId": "SPEC08020101",
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
    'resContent': {
        'accountId': '10000202250311',
        'rowData': [
            { 'date': '2020-07-06', 'memo': '轉帳', 'dramt': '250000', 'cramt': '252000', 'balamt': '150000', 'dueDate': '2020-12-26', 'reMark': '批次處理' },
            { 'date': '2020-07-07', 'memo': '存入', 'dramt': '240000', 'cramt': '242000', 'balamt': '140000', 'dueDate': '2020-12-24', 'reMark': '批次處理' },
            { 'date': '2020-07-08', 'memo': '轉帳', 'dramt': '200000', 'cramt': '202000', 'balamt': '100000', 'dueDate': '2020-12-11', 'reMark': '批次處理' },
            { 'date': '2020-07-05', 'memo': '轉帳', 'dramt': '260000', 'cramt': '262000', 'balamt': '160000', 'dueDate': '2020-11-29', 'reMark': '批次處理' },
            { 'date': '2020-07-12', 'memo': '存入', 'dramt': '220000', 'cramt': '222000', 'balamt': '120000', 'dueDate': '2020-11-18', 'reMark': '批次處理' },
            { 'date': '2020-07-13', 'memo': '存入', 'dramt': '290000', 'cramt': '292000', 'balamt': '190000', 'dueDate': '2020-12-03', 'reMark': '批次處理' },
            { 'date': '2020-07-02', 'memo': '轉帳', 'dramt': '310000', 'cramt': '312000', 'balamt': '210000', 'dueDate': '2020-10-29', 'reMark': '批次處理' },
            { 'date': '2020-07-31', 'memo': '轉帳', 'dramt': '360000', 'cramt': '362000', 'balamt': '260000', 'dueDate': '2020-12-10', 'reMark': '批次處理' },
            { 'date': '2020-08-06', 'memo': '轉帳', 'dramt': '100000', 'cramt': '102000', 'balamt': '100000', 'dueDate': '2020-12-28', 'reMark': '批次處理' },
            { 'date': '2020-08-02', 'memo': '存入', 'dramt': '110000', 'cramt': '112000', 'balamt': '110000', 'dueDate': '2020-09-23', 'reMark': '批次處理' },
            { 'date': '2020-08-26', 'memo': '轉帳', 'dramt': '170000', 'cramt': '172000', 'balamt': '170000', 'dueDate': '2020-10-25', 'reMark': '批次處理' },
            { 'date': '2020-08-09', 'memo': '支出', 'dramt': '210000', 'cramt': '212000', 'balamt': '210000', 'dueDate': '2020-10-19', 'reMark': '批次處理' },
            { 'date': '2020-08-13', 'memo': '支出', 'dramt': '180000', 'cramt': '182000', 'balamt': '180000', 'dueDate': '2020-11-11', 'reMark': '批次處理' },
            { 'date': '2020-08-14', 'memo': '轉帳', 'dramt': '255000', 'cramt': '252000', 'balamt': '250000', 'dueDate': '2020-09-09', 'reMark': '批次處理' },
        ]
        ,
        'paginatedInfo': {
            'totalRowCount': '30',
            'pageSize': '15',
            'pageNumber': '5',
            'sortColName': '',
            'sortDirection': 'DESC'
        }
    }
};
let data1Y = {
    'resContent': {
        "apiId": "SPEC08020101",
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
        'accountId': '10000202250311',
        'rowData': [
            { 'date': '2020-08-15', 'memo': '支出', 'dramt': '180000', 'cramt': '182000', 'balamt': '180000', 'dueDate': '2020-11-11', 'reMark': '批次處理' },
            { 'date': '2020-07-08', 'memo': '轉帳', 'dramt': '200000', 'cramt': '202000', 'balamt': '100000', 'dueDate': '2020-12-11', 'reMark': '批次處理' },
            { 'date': '2020-07-19', 'memo': '存入', 'dramt': '290000', 'cramt': '292000', 'balamt': '190000', 'dueDate': '2020-12-03', 'reMark': '批次處理' },
            { 'date': '2020-07-02', 'memo': '轉帳', 'dramt': '310000', 'cramt': '312000', 'balamt': '210000', 'dueDate': '2020-10-29', 'reMark': '批次處理' },
            { 'date': '2020-07-06', 'memo': '轉帳', 'dramt': '250000', 'cramt': '252000', 'balamt': '150000', 'dueDate': '2020-12-26', 'reMark': '批次處理' },
            { 'date': '2020-07-02', 'memo': '存入', 'dramt': '240000', 'cramt': '242000', 'balamt': '140000', 'dueDate': '2020-12-24', 'reMark': '批次處理' },
            { 'date': '2020-08-09', 'memo': '支出', 'dramt': '210000', 'cramt': '212000', 'balamt': '210000', 'dueDate': '2020-10-19', 'reMark': '批次處理' },
            { 'date': '2020-08-14', 'memo': '轉帳', 'dramt': '255000', 'cramt': '252000', 'balamt': '250000', 'dueDate': '2020-09-09', 'reMark': '批次處理' },
            { 'date': '2020-07-07', 'memo': '轉帳', 'dramt': '260000', 'cramt': '262000', 'balamt': '160000', 'dueDate': '2020-11-29', 'reMark': '批次處理' },
            { 'date': '2020-07-12', 'memo': '存入', 'dramt': '220000', 'cramt': '222000', 'balamt': '120000', 'dueDate': '2020-11-18', 'reMark': '批次處理' },
            { 'date': '2020-08-09', 'memo': '存入', 'dramt': '110000', 'cramt': '112000', 'balamt': '110000', 'dueDate': '2020-09-23', 'reMark': '批次處理' },
            { 'date': '2020-08-26', 'memo': '轉帳', 'dramt': '170000', 'cramt': '172000', 'balamt': '170000', 'dueDate': '2020-10-25', 'reMark': '批次處理' },
        ],
        'paginatedInfo': {
            'totalRowCount': '30',
            'pageSize': '15',
            'pageNumber': '5',
            'sortColName': '',
            'sortDirection': 'DESC'
        }
    }
};
let data2Y = {
    "apiId": "SPEC08020101",
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
    'resContent': {
        'accountId': '10000202250311',
        'rowData': [
            { 'date': '2020-07-15', 'memo': '轉帳', 'dramt': '250000', 'cramt': '252000', 'balamt': '150000', 'dueDate': '2020-12-26', 'reMark': '批次處理' },
            { 'date': '2020-07-16', 'memo': '存入', 'dramt': '240000', 'cramt': '242000', 'balamt': '140000', 'dueDate': '2020-12-24', 'reMark': '批次處理' },
            { 'date': '2020-07-25', 'memo': '轉帳', 'dramt': '200000', 'cramt': '202000', 'balamt': '100000', 'dueDate': '2020-12-11', 'reMark': '批次處理' },
            { 'date': '2020-07-16', 'memo': '轉帳', 'dramt': '260000', 'cramt': '262000', 'balamt': '160000', 'dueDate': '2020-11-29', 'reMark': '批次處理' },
            { 'date': '2020-07-29', 'memo': '存入', 'dramt': '220000', 'cramt': '222000', 'balamt': '120000', 'dueDate': '2020-11-18', 'reMark': '批次處理' },
            { 'date': '2020-07-01', 'memo': '存入', 'dramt': '290000', 'cramt': '292000', 'balamt': '190000', 'dueDate': '2020-12-03', 'reMark': '批次處理' },
            { 'date': '2020-07-03', 'memo': '轉帳', 'dramt': '310000', 'cramt': '312000', 'balamt': '210000', 'dueDate': '2020-10-29', 'reMark': '批次處理' },
            { 'date': '2020-07-19', 'memo': '轉帳', 'dramt': '360000', 'cramt': '362000', 'balamt': '260000', 'dueDate': '2020-12-10', 'reMark': '批次處理' },
            { 'date': '2020-08-11', 'memo': '轉帳', 'dramt': '100000', 'cramt': '102000', 'balamt': '100000', 'dueDate': '2020-12-28', 'reMark': '批次處理' },
            { 'date': '2020-08-06', 'memo': '轉帳', 'dramt': '170000', 'cramt': '172000', 'balamt': '170000', 'dueDate': '2020-10-25', 'reMark': '批次處理' },
            { 'date': '2020-08-26', 'memo': '支出', 'dramt': '210000', 'cramt': '212000', 'balamt': '210000', 'dueDate': '2020-10-19', 'reMark': '批次處理' },
            { 'date': '2020-08-31', 'memo': '支出', 'dramt': '180000', 'cramt': '182000', 'balamt': '180000', 'dueDate': '2020-11-11', 'reMark': '批次處理' },
            { 'date': '2020-08-17', 'memo': '轉帳', 'dramt': '255000', 'cramt': '252000', 'balamt': '250000', 'dueDate': '2020-09-09', 'reMark': '批次處理' },
        ],
        'paginatedInfo': {
            'totalRowCount': '30',
            'pageSize': '15',
            'pageNumber': '5',
            'sortColName': '',
            'sortDirection': 'DESC'
        }
    }
};
let dataCustom = {
    "apiId": "SPEC08020101",
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
    'resContent': {
        'accountId': '10000202250311',
        'rowData': [
            { 'date': '2020-07-11', 'memo': '轉帳', 'dramt': '250000', 'cramt': '252000', 'balamt': '150000', 'dueDate': '2020-12-26', 'reMark': '批次處理' },
            { 'date': '2020-07-12', 'memo': '存入', 'dramt': '240000', 'cramt': '242000', 'balamt': '140000', 'dueDate': '2020-12-24', 'reMark': '批次處理' },
            { 'date': '2020-07-13', 'memo': '轉帳', 'dramt': '200000', 'cramt': '202000', 'balamt': '100000', 'dueDate': '2020-12-11', 'reMark': '批次處理' },
            { 'date': '2020-07-16', 'memo': '轉帳', 'dramt': '260000', 'cramt': '262000', 'balamt': '160000', 'dueDate': '2020-11-29', 'reMark': '批次處理' },
            { 'date': '2020-07-01', 'memo': '存入', 'dramt': '220000', 'cramt': '222000', 'balamt': '120000', 'dueDate': '2020-11-18', 'reMark': '批次處理' },
            { 'date': '2020-07-26', 'memo': '存入', 'dramt': '290000', 'cramt': '292000', 'balamt': '190000', 'dueDate': '2020-12-03', 'reMark': '批次處理' },
            { 'date': '2020-08-15', 'memo': '存入', 'dramt': '110000', 'cramt': '112000', 'balamt': '110000', 'dueDate': '2020-09-23', 'reMark': '批次處理' },
            { 'date': '2020-08-18', 'memo': '轉帳', 'dramt': '170000', 'cramt': '172000', 'balamt': '170000', 'dueDate': '2020-10-25', 'reMark': '批次處理' },
            { 'date': '2020-08-07', 'memo': '支出', 'dramt': '210000', 'cramt': '212000', 'balamt': '210000', 'dueDate': '2020-10-19', 'reMark': '批次處理' },
            { 'date': '2020-08-19', 'memo': '支出', 'dramt': '180000', 'cramt': '182000', 'balamt': '180000', 'dueDate': '2020-11-11', 'reMark': '批次處理' },
            { 'date': '2020-08-26', 'memo': '轉帳', 'dramt': '255000', 'cramt': '252000', 'balamt': '250000', 'dueDate': '2020-09-09', 'reMark': '批次處理' },
        ],
        'paginatedInfo': {
            'totalRowCount': '30',
            'pageSize': '15',
            'pageNumber': '5',
            'sortColName': '',
            'sortDirection': 'DESC'
        }
    }
};

let df_response = {
    "apiId": "SPEC08020101",
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
    'resContent': {
        'accountId': '10000202250311',
        'rowData': [
            { 'date': '2020-07-06', 'memo': '轉帳', 'dramt': '250000', 'cramt': '252000', 'balamt': '150000', 'dueDate': '2020-12-26', 'reMark': '批次處理' },
            { 'date': '2020-07-07', 'memo': '存入', 'dramt': '240000', 'cramt': '242000', 'balamt': '140000', 'dueDate': '2020-12-24', 'reMark': '批次處理' },
            { 'date': '2020-07-08', 'memo': '轉帳', 'dramt': '200000', 'cramt': '202000', 'balamt': '100000', 'dueDate': '2020-12-11', 'reMark': '批次處理' },
            { 'date': '2020-07-05', 'memo': '轉帳', 'dramt': '260000', 'cramt': '262000', 'balamt': '160000', 'dueDate': '2020-11-29', 'reMark': '批次處理' },
            { 'date': '2020-07-12', 'memo': '存入', 'dramt': '220000', 'cramt': '222000', 'balamt': '120000', 'dueDate': '2020-11-18', 'reMark': '批次處理' },
            { 'date': '2020-07-13', 'memo': '存入', 'dramt': '290000', 'cramt': '292000', 'balamt': '190000', 'dueDate': '2020-12-03', 'reMark': '批次處理' },
            { 'date': '2020-07-02', 'memo': '轉帳', 'dramt': '310000', 'cramt': '312000', 'balamt': '210000', 'dueDate': '2020-10-29', 'reMark': '批次處理' },
            { 'date': '2020-07-31', 'memo': '轉帳', 'dramt': '360000', 'cramt': '362000', 'balamt': '260000', 'dueDate': '2020-12-10', 'reMark': '批次處理' },
            { 'date': '2020-08-06', 'memo': '轉帳', 'dramt': '100000', 'cramt': '102000', 'balamt': '100000', 'dueDate': '2020-12-28', 'reMark': '批次處理' },
            { 'date': '2020-08-02', 'memo': '存入', 'dramt': '110000', 'cramt': '112000', 'balamt': '110000', 'dueDate': '2020-09-23', 'reMark': '批次處理' },
            { 'date': '2020-08-26', 'memo': '轉帳', 'dramt': '170000', 'cramt': '172000', 'balamt': '170000', 'dueDate': '2020-10-25', 'reMark': '批次處理' },
            { 'date': '2020-08-09', 'memo': '支出', 'dramt': '210000', 'cramt': '212000', 'balamt': '210000', 'dueDate': '2020-10-19', 'reMark': '批次處理' },
            { 'date': '2020-08-13', 'memo': '支出', 'dramt': '180000', 'cramt': '182000', 'balamt': '180000', 'dueDate': '2020-11-11', 'reMark': '批次處理' },
            { 'date': '2020-08-14', 'memo': '轉帳', 'dramt': '255000', 'cramt': '252000', 'balamt': '250000', 'dueDate': '2020-09-09', 'reMark': '批次處理' },
        ]
        ,
        'paginatedInfo': {
            'totalRowCount': '30',
            'pageSize': '15',
            'pageNumber': '5',
            'sortColName': '',
            'sortDirection': 'DESC'
        }
    }
};

export const api_real_response = {
    "apiId": "SPEC08020101",
    "token": {
        "requestId": "3cc1da3e0ee587831601448612591",
        "responseTime": "2020-09-30 14:49:58",
        "lang": "zh_TW"
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    "resContent": {
        "accountId": "02162000024780",
        "paginator": {
            "totalCount": "8",
            "pageSize": "6",
            "pageNumber": "1",
            "sortColName": "date",
            "sortDirection": "DESC"
        },
        "rowData": [
            {
                "date": "2020-01-16",
                "memo": "轉帳",
                "drAmt": "",
                "crAmt": "20",
                "balAmt": "299,956",
                "remark": "人工扣帳"
            },
            {
                "date": "2020-01-16",
                "memo": "轉帳",
                "drAmt": "",
                "crAmt": "10",
                "balAmt": "299,976",
                "remark": "人工扣帳"
            },
            {
                "date": "2020-01-07",
                "memo": "轉帳",
                "drAmt": "",
                "crAmt": "10",
                "balAmt": "299,986",
                "remark": "人工扣帳"
            },
            {
                "date": "2020-01-07",
                "memo": "轉帳",
                "drAmt": "",
                "crAmt": "1",
                "balAmt": "299,996",
                "remark": "人工扣帳"
            },
            {
                "date": "2020-01-07",
                "memo": "轉帳",
                "drAmt": "",
                "crAmt": "1",
                "balAmt": "299,997",
                "remark": "人工扣帳"
            },
            {
                "date": "2020-01-07",
                "memo": "轉帳",
                "drAmt": "",
                "crAmt": "1",
                "balAmt": "299,998",
                "remark": "人工扣帳"
            }
        ]
    }
};

export const api_response = { ...df_response, ...dataToYear };
export const api_response1Y = { ...df_response, ...data1Y };
export const api_response2Y = { ...df_response, ...data2Y };
export const api_responseCustom = { ...df_response, ...dataCustom };
export const api_error = {
    'apiId': 'SPEC08020101',
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
