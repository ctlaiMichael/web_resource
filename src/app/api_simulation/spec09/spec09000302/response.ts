/**
 * 模擬api
 */
// let data = {
// 	'apiId': 'SPEC09000302',
// 	'token': {
// 		'requestId': '',
// 		'responseTime': '',
// 		'lang': ''
// 	},
// 	'resFlag': '0',
// 	"resMessage": {
// 		'errorCode': '',
// 		'errorMsg': ''
// 	},
// 	"resContent": {
// 		"offenAcctData": [{
// 			"bankCode": "011",
// 			"bankName": "上海商業銀行",
// 			"accountId": "0000007037722222",
// 			"nickName": "test1",
// 			"note": "20200411辦戶",
// 		},
// 		{
// 			"bankCode": "004",
// 			"bankName": "台灣銀行",
// 			"accountId": "0000007037856622",
// 			"nickName": "test2",
// 			"note": "20200625辦戶",
// 		},
// 		{
// 			"bankCode": "005",
// 			"bankName": "台灣土地銀行",
// 			"accountId": "0000007037759956",
// 			"nickName": "test3",
// 			"note": "20200726辦戶",
// 		},

// 		{
// 			"bankCode": "006",
// 			"bankName": "合作金庫商業銀行",
// 			"accountId": "0000007495009778",
// 			"nickName": "test4",
// 			"note": "20200821辦戶",
// 		}],
// 		"transOutAcctData": [{
// 			"accountId": "0000007655009450",
// 			"nickName": "test233",
// 			"avlBal": "",
// 			"amount": "1234500",
// 			"avlAmount": "1234500"
// 		},
// 		{
// 			"accountId": "0000007655044820",
// 			"nickName": "test250",
// 			"avlBal": "",
// 			"amount": "1285200",
// 			"avlAmount": "1285200"
// 		},
// 		{
// 			"accountId": "0000007657595622",
// 			"nickName": "test695",
// 			"avlBal": "",
// 			"amount": "1475000",
// 			"avlAmount": "1475000"
// 		},
// 		{
// 			"accountId": "0000007655085003",
// 			"nickName": "test252",
// 			"avlBal": "",
// 			"amount": "1259000",
// 			"avlAmount": "1259000"
// 		},
// 		{
// 			"accountId": "0000007655089500",
// 			"nickName": "test253",
// 			"avlBal": "",
// 			"amount": "250000",
// 			"avlAmount": "250000"
// 		},
// 		{
// 			"accountId": "0000007895204200",
// 			"nickName": "test257",
// 			"avlBal": "",
// 			"amount": "1082500",
// 			"avlAmount": "1082500"
// 		}],
// 		"bankData": [{
// 			"bankCode": "011",
// 			"bankName": "上海商業銀行"
// 		},
// 		{
// 			"bankCode": "004",
// 			"bankName": "台灣銀行"
// 		},
// 		{
// 			"bankCode": "005",
// 			"bankName": "台灣土地銀行"
// 		},
// 		{
// 			"bankCode": "006",
// 			"bankName": "合作金庫商業銀行"
// 		},
// 		{
// 			"bankCode": "007",
// 			"bankName": "第一商業銀行"
// 		}],
// 		"eMail": "mike447580@gmail.com"
// 	}
// };

let data = {
    'apiId': 'SPEC09000302',
    'token': {
        'requestId': '',
        'responseTime': '',
        'lang': ''
    },
    'resFlag': '0',
    "resMessage": {
        'errorCode': '',
        'errorMsg': ''
    },
    "resContent": {
        "transOutAcctData": [{
            "accountId": "0000007655009450",
            "nickName": "test233",
            "avlBal": "",
            "amount": "1234500",
            "avlAmount": "1234500"
        },
        {
            "accountId": "0000007655044820",
            "nickName": "test250",
            "avlBal": "",
            "amount": "1285200",
            "avlAmount": "1285200"
        },
        {
            "accountId": "0000007657595622",
            "nickName": "test695",
            "avlBal": "",
            "amount": "1475000",
            "avlAmount": "1475000"
        },
        {
            "accountId": "0000007655085003",
            "nickName": "test252",
            "avlBal": "",
            "amount": "1259000",
            "avlAmount": "1259000"
        },
        {
            "accountId": "0000007655089500",
            "nickName": "test253",
            "avlBal": "",
            "amount": "250000",
            "avlAmount": "250000"
        },
        {
            "accountId": "0000007895204200",
            "nickName": "test257",
            "avlBal": "",
            "amount": "1082500",
            "avlAmount": "1082500"
        }]
    }
};

let realData = {
    "apiId": "SPEC09000302",
    "token": {
        "requestId": "2c85e9a7462100c51606726725647",
        "responseTime": "2020-11-30 16:59:02",
        "lang": "zh_TW"
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    "resContent": {
        "transOutAcctData": [
            {
                "avlBal": "(可用餘額 7,434,000)",
                "amount": "7434000",
                "avlAmount": "7434000",
                "accountId": "0002101000006878"
            },
            {
                "avlBal": "(可用餘額 278,704,880)",
                "amount": "86019289",
                "avlAmount": "278704880",
                "accountId": "0002203000541801"
            },
            {
                "avlBal": "(可用餘額 666,662)",
                "amount": "666662",
                "avlAmount": "666662",
                "accountId": "0002204000007528"
            }
        ]
    }
};

let df_response = {
    'resContent': {
        'apiId': 'SPEC09000302',
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
        'transOutAcctData': [

        ]
    }
};

export const api_response = { ...df_response, ...realData };
export const api_response_empty = { ...df_response, ...df_response };
export const api_error = {
    'apiId': 'SPEC09000302',
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


export const api_gateway_exception = {
    "return_code": 23,
    "return_message": "Request session expired"
};

