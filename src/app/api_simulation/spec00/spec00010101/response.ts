/**
 * 模擬api
 */
let data = {
	'apiId': 'SPEC00010101',
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
		'rowData': [{
			"bankCode": "011",
			"bankName": "上海商業銀行",
		},
		{
			"bankCode": "004",
			"bankName": "台灣銀行",
		},
		{
			"bankCode": "005",
			"bankName": "台灣土地銀行",
		},

		{
			"bankCode": "006",
			"bankName": "合作金庫商業銀行",
		},
		{
			"bankCode": "007",
			"bankName": "第一商業銀行",
		},
		{
			"bankCode": "008",
			"bankName": "華南商業銀行",
		},

		{
			"bankCode": "009",
			"bankName": "彰化商業銀行",
		},
		{
			"bankCode": "012",
			"bankName": "台北富邦銀行",
		},
		{
			"bankCode": "013",
			"bankName": "國泰世華銀行",
		}]
	}
};

let df_response = {
	'resContent': {
		'apiId': 'SPEC00010101',
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
	'apiId': 'SPEC00040101',
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
