/**
 * 模擬api
 */
let data = {
	'apiId': 'SPEC09000306',
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
		"bankCode": "009",
		"bankName": "彰化商業銀行",
		"inAccount": "0000007037778562",
		"outAccount": "0000007655044820",
		"amount": "14000",
		"transferDate": "2020-08-28",
		"actBal": "260000",
		"avlBal": "258000",
		"inActBal": "180000",
		"inAvlBal": "205000",
		"fee": "150",
		"transNo": "774456456444564218456",
		"email": "jerry66589@gmail.com",
		"otherEmail": "kerry778694@gmail.com",
		"remark": "每個月定期儲蓄轉帳",
		"comment": "8月份定期儲蓄轉帳",
		"overTime": "Y",
		"memoInfo": "本日營業時間已過，本筆交易入帳時間將依入帳銀行規定時間點為基準。"
	}

};

let df_response = {
	'resContent': {
		'apiId': 'SPEC09000306',
		'token': {
			'requestId': '',
			'responseTime': '',
			'lang': ''
		},
		'resFlag': '0',
		'resMessage': {
			'errorCode': '',
			'errorMsg': ''
		}
	}
};

export const api_response = { ...df_response, ...data };
export const api_response_empty = { ...df_response, ...df_response };
export const api_error = {
	'apiId': 'SPEC09000306',
	'token': {
		'requestId': '',
		'responseTime': '2020-06-20 18:18:31',
		'lang': 'zh_TW'
	},
	'resFlag': '1',
	'resMessage': {
		'errorCode': '403',
		'errorMsg': 'Test Error'
	}
};
export const api_exception = {
	'errorCode': '403',
	'errorMsg': 'Test Error'
};
