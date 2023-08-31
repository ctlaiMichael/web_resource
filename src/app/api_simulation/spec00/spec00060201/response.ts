/**
 * 模擬api
 * \
 * 
 * 
 * 
 * 
 */
let data = {
	"apiId": "SPEC00060201",
	"token": {
		"requestId": "SPEC00060201",
		"responseTime": "2020-08-14 09:31:19",
		"lang": "zh_TW"
	},
	'resFlag': '0',
	'resMessage': {
		'errorCode': '',
		'errorMsg': ''
	},
	"resContent": {
		"transNum": "2342444",
		"otpCheckCode": "YY12GG",
		"date": "09/07",
		"time": "11:11:10"
	}
};

let df_response = {
	"apiId": "SPEC00060201",
	"token": {
		"requestId": "SPEC00060201",
		"responseTime": "2020-08-14 09:31:19",
		"lang": "zh_TW"
	},
	"resContent": {
	
	}
};

export const api_response = { ...df_response, ...data };
export const api_response_empty = { ...df_response, ...df_response };
export const api_error = {
	'apiId': 'SPEC00060101',
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
