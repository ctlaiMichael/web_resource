/**
 * 模擬api
 */
let data = {
	'apiId': 'SPEC09000301',
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
			"accountId": "0000007655009440",
			"nickName": "test232",
			"avlBal": "",
			"amount": "1236750",
			"avlAmount": "1236750"
		},
		{
			"accountId": "0000007037778562",
			"nickName": "test250",
			"avlBal": "",
			"amount": "1285200",
			"avlAmount": "1285200"
		},
		{
			"accountId": "0000007655049558",
			"nickName": "test114",
			"avlBal": "",
			"amount": "1249000",
			"avlAmount": "1249000"
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
			"accountId": "0000007655058200",
			"nickName": "test267",
			"avlBal": "",
			"amount": "248000",
			"avlAmount": "248000"
		},
		{
			"accountId": "000000765555900",
			"nickName": "test178",
			"avlBal": "",
			"amount": "229000",
			"avlAmount": "229000"
		},
		{
			"accountId": "000000765504820",
			"nickName": "test211",
			"avlBal": "",
			"amount": "198000",
			"avlAmount": "198000"
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
	"apiId": "SPEC09000301",
	"token": {
		"requestId": "4ab09b1fd6cf20fd1606726741593",
		"responseTime": "2020-11-30 16:59:10",
		"lang": "zh_TW"
	},
	"resFlag": "0",
	"resMessage": {
		"errorCode": "",
		"errorMsg": ""
	},
	"resContent": {
		"transOutAcctData": [{
			"avlBal": "02101000006878帳單存款 (可用餘額 7,434,000)",
			"amount": "7434000",
			"avlAmount": "7434000",
			"accountId": "02101000006878"
		},
		{
			"avlBal": "02203000541801帳單存款 (可用餘額 278,704,880)",
			"amount": "278704880",
			"avlAmount": "278704880",
			"accountId": "02203000541801"
		},
		{
			"avlBal": "02203005800014帳單存款 (可用餘額 934,275)",
			"amount": "934275",
			"avlAmount": "934275",
			"accountId": "02203005800014"
		},
		{
			"avlBal": "03203000606011帳單存款 (可用餘額 1,652,486)",
			"amount": "1652486",
			"avlAmount": "1652486",
			"accountId": "03203000606011"
		},
		{
			"avlBal": "03203005800026帳單存款 (可用餘額 25,424)",
			"amount": "25424",
			"avlAmount": "25424",
			"accountId": "03203005800026"
		},
		{
			"avlBal": "23203001005052帳單存款 (可用餘額 20,342,656)",
			"amount": "20342656",
			"avlAmount": "20342656",
			"accountId": "23203001005052"
		},
		{
			"avlBal": "24203000367714帳單存款 (可用餘額 89,981,023)",
			"amount": "89981023",
			"avlAmount": "89981023",
			"accountId": "24203000367714"
		},
		{
			"avlBal": "37203005800013帳單存款 (可用餘額 223,073)",
			"amount": "223073",
			"avlAmount": "223073",
			"accountId": "37203005800013"
		},
		{
			"avlBal": "02204000007528帳單存款 (可用餘額 666,662)",
			"amount": "666662",
			"avlAmount": "666662",
			"accountId": "02204000007528"
		},
		{
			"avlBal": "97100030115927帳單存款 (可用餘額 486,385)",
			"amount": "486385",
			"avlAmount": "486385",
			"accountId": "97100030115927"
		},
		{
			"avlBal": "97100030303936帳單存款 (可用餘額 978,496)",
			"amount": "978496",
			"avlAmount": "978496",
			"accountId": "97100030303936"
		}]
	}
};

let df_response = {
	'resContent': {
		'apiId': 'SPEC09000301',
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
		'outAccountData': [

		],
		"eMail": ""
	}
};

export const api_response = { ...df_response, ...realData };
export const api_response_empty = { ...df_response, ...df_response };
export const api_error = {
	'apiId': 'SPEC09000301',
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

