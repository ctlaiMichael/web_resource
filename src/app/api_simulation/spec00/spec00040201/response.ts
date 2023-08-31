/**
 * 模擬api
 */
let data = {
	'apiId': 'SPEC00040201',
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
	"resContent": {
		"transOutAcctData": [{
			"accountId": "23203001186484",
			"nickName": "中山分行帳單存款",
			"avlBal": "1120000",
			"amount": "1121000",
			"avlAmount": "1120000"
		},
		{
			"accountId": "21103088595452",
			"nickName": "大安分行帳單存款",
			"avlBal": "980000",
			"amount": "981000",
			"avlAmount": "980000"
		},
		{
			"accountId": "15226055595856",
			"nickName": "信義分行帳單存款",
			"avlBal": "1050000",
			"amount": "1051000",
			"avlAmount": "1050000"
		},
		{
			"accountId": "75995805954452",
			"nickName": "松山分行帳單存款",
			"avlBal": "780000",
			"amount": "781000",
			"avlAmount": "780000"
		},
		{
			"accountId": "65523201595845",
			"nickName": "新莊分行帳單存款",
			"avlBal": "670000",
			"amount": "671000",
			"avlAmount": "670000"
		},
		{
			"accountId": "44564598875200",
			"nickName": "汐止分行帳單存款",
			"avlBal": "580000",
			"amount": "581000",
			"avlAmount": "580000"
		},
		{
			"accountId": "88594058565523",
			"nickName": "泰山分行帳單存款",
			"avlBal": "650000",
			"amount": "651000",
			"avlAmount": "650000"
		},
		{
			"accountId": "11604588542131",
			"nickName": "林口分行帳單存款",
			"avlBal": "650000",
			"amount": "651000",
			"avlAmount": "650000"
		},
		{
			"accountId": "24456582159875",
			"nickName": "板橋分行帳單存款",
			"avlBal": "2400000",
			"amount": "2401000",
			"avlAmount": "2400000"
		}]
	}
};

// let data = {
// 	'apiId': 'SPEC00040201',
// 	'token': {
// 		'requestId': '',
// 		'responseTime': '',
// 		'lang': ''
// 	},
// 	'resFlag': '0',
// 	'resMessage': {
// 		'errorCode': '',
// 		'errorMsg': ''
// 	},
// 	"resContent": {
// 		"balanceData": [{
// 			"accountId": "23203001186484",
// 			"balance": "963220",
// 		},
// 		{
// 			"accountId": "22566595884526",
// 			"balance": "755000",
// 		},
// 		{
// 			"accountId": "22593546886695",
// 			"balance": "320000",
// 		},
// 		{
// 			"accountId": "28954495626770",
// 			"balance": "420000",
// 		},
// 		{
// 			"accountId": "24509580694450",
// 			"balance": "560000",
// 		},
// 		{
// 			"accountId": "22009956394780",
// 			"balance": "610000",
// 		},
// 		{
// 			"accountId": "22778560985006",
// 			"balance": "1002000",
// 		}],
// 		"transOutData": [{
// 			"accountId": "23203001186484",
// 			"memo": "23203001186484 中山分行帳單存款 (可用餘額 9,63220)",
// 		},
// 		{
// 			"accountId": "22566595884526",
// 			"memo": "22566595884526大安分行帳單存款 (可用餘額 7,55000)",
// 		},
// 		{
// 			"accountId": "22593546886695",
// 			"memo": "22593546886695內湖分行帳單存款 (可用餘額 3,20000)",
// 		},
// 		{
// 			"accountId": "28954495626770",
// 			"memo": "28954495626770信義分行帳單存款 (可用餘額 4,20000)",
// 		},
// 		{
// 			"accountId": "24509580694450",
// 			"memo": "24509580694450汐止分行帳單存款 (可用餘額 5,60000)",
// 		},
// 		{
// 			"accountId": "22009956394780",
// 			"memo": "22009956394780林口分行帳單存款 (可用餘額 6,10000)",
// 		},
// 		{
// 			"accountId": "22778560985006",
// 			"memo": "22778560985006新莊分行帳單存款 (可用餘額 10,02000)",
// 		}]
// 	}
// };

let df_response = {
	'resContent': {
		'apiId': 'SPEC00040101',
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
		'balanceData': [

		],
		'transOutData': [

		]
	}
};

export const api_response = { ...df_response, ...data };
export const api_response_empty = { ...df_response, ...df_response };
export const api_error = {
	'apiId': 'SPEC00040201',
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
