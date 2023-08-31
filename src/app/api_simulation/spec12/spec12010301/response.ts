/**
 * 模擬api
 */
let data = {
	'apiId': 'SPEC12010301',
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
		"totalStmBal": "50000",
		"payRow": [
			{ "transDate": "2020-0507", "postDate": "2020-0501", "tranDesc": "謝謝您在本行扣款", "twdAmt": "50000" },
			{ "transDate": "2020-0614", "postDate": "2020-0608", "tranDesc": "謝謝您在本行扣款", "twdAmt": "25000" },
			{ "transDate": "2020-0312", "postDate": "2020-0309", "tranDesc": "謝謝您在本行扣款", "twdAmt": "110000" },
			{ "transDate": "2020-0423", "postDate": "2020-0414", "tranDesc": "謝謝您在本行扣款", "twdAmt": "15000" },
			{ "transDate": "2020-0619", "postDate": "2020-0605", "tranDesc": "謝謝您在本行扣款", "twdAmt": "23000" }
		],
		"totalPayment": "25000",
		"consumeRow": [
			{ "transDate": "2020-0526", "postDate": "2020-0514", "cardName": "春暉電影金卡", "cardLst": "5866", "tranDesc": "繳交綜所稅本金分期05/26", "currencyCode": "TWD", "foreignAmt": "7500", "twdAmt": "15000" },
			{ "transDate": "2020-0617", "postDate": "2020-0625", "cardName": "億欣會員白金卡", "cardLst": "7855", "tranDesc": "菲恩精品-卡爾錶分期06/25", "currencyCode": "TWD", "foreignAmt": "4500", "twdAmt": "15000" },
			{ "transDate": "2020-0421", "postDate": "2020-0406", "cardName": "彰化銀行金卡", "cardLst": "4759", "tranDesc": "豐信汽車行-馬自達-M36526 分期04/10", "currencyCode": "TWD", "foreignAmt": "11500", "twdAmt": "15000" },
			{ "transDate": "2020-0321", "postDate": "2020-0308", "cardName": "禾翔影視金卡", "cardLst": "7721", "tranDesc": "菲恩精品-卡爾錶分期06/25", "currencyCode": "TWD", "foreignAmt": "7800", "twdAmt": "15000" },
			{ "transDate": "2020-0206", "postDate": "2020-0224", "cardName": "春暉電影金卡", "cardLst": "5866", "tranDesc": "繳交綜所稅本金分期02/06", "currencyCode": "TWD", "foreignAmt": "5900", "twdAmt": "15000" },
			{ "transDate": "2020-0208", "postDate": "2020-0214", "cardName": "彰化銀行金卡", "cardLst": "4759", "tranDesc": "豐信汽車行-馬自達-M36526 分期04/10", "currencyCode": "TWD", "foreignAmt": "21000", "twdAmt": "15000" },
			{ "transDate": "2020-0211", "postDate": "2020-0221", "cardName": "春暉電影金卡", "cardLst": "5866", "tranDesc": "菲恩精品-卡爾錶分期06/25", "currencyCode": "TWD", "foreignAmt": "11500", "twdAmt": "15000" },
			{ "transDate": "2020-0315", "postDate": "2020-0319", "cardName": "億欣會員白金卡", "cardLst": "7855", "tranDesc": "繳交綜所稅本金分期02/06", "currencyCode": "TWD", "foreignAmt": "5850", "twdAmt": "15000" },
			{ "transDate": "2020-0218", "postDate": "2020-0229", "cardName": "春暉電影金卡", "cardLst": "5866", "tranDesc": "繳交綜所稅本金分期02/08", "currencyCode": "TWD", "foreignAmt": "3200", "twdAmt": "15000" },
			{ "transDate": "2020-0301", "postDate": "2020-0311", "cardName": "彰化銀行金卡", "cardLst": "4759", "tranDesc": "菲恩精品-卡爾錶分期06/25", "currencyCode": "TWD", "foreignAmt": "5400", "twdAmt": "15000" },
			{ "transDate": "2020-0319", "postDate": "2020-0329", "cardName": "禾翔影視金卡", "cardLst": "7721", "tranDesc": "繳交綜所稅本金分期02/06", "currencyCode": "TWD", "foreignAmt": "6580", "twdAmt": "15000" },
			{ "transDate": "2020-0302", "postDate": "2020-0314", "cardName": "億欣會員白金卡", "cardLst": "7855", "tranDesc": "豐信汽車行-馬自達-M36526 分期04/10", "currencyCode": "TWD", "foreignAmt": "12050", "twdAmt": "15000" },
			{ "transDate": "2020-0325", "postDate": "2020-0331", "cardName": "億欣會員白金卡", "cardLst": "7855", "tranDesc": "菲恩精品-卡爾錶分期06/25", "currencyCode": "TWD", "foreignAmt": "9000", "twdAmt": "15000" },
			{ "transDate": "2020-0405", "postDate": "2020-0414", "cardName": "春暉電影金卡", "cardLst": "5866", "tranDesc": "繳交綜所稅本金分期02/06", "currencyCode": "TWD", "foreignAmt": "3150", "twdAmt": "15000" },
			{ "transDate": "2020-0413", "postDate": "2020-0427", "cardName": "春暉電影金卡", "cardLst": "5866", "tranDesc": "繳交綜所稅本金分期02/06", "currencyCode": "TWD", "foreignAmt": "10850", "twdAmt": "15000" },
			{ "transDate": "2020-0426", "postDate": "2020-0430", "cardName": "彰化銀行金卡", "cardLst": "4759", "tranDesc": "菲恩精品-卡爾錶分期06/25", "currencyCode": "TWD", "foreignAmt": "7100", "twdAmt": "15000" },
			{ "transDate": "2020-0519", "postDate": "2020-0527", "cardName": "春暉電影金卡", "cardLst": "5526", "tranDesc": "繳交綜所稅本金分期02/06", "currencyCode": "TWD", "foreignAmt": "2100", "twdAmt": "15000" },
			{ "transDate": "2020-0512", "postDate": "2020-0526", "cardName": "億欣會員白金卡", "cardLst": "7855", "tranDesc": "菲恩精品-卡爾錶分期06/25", "currencyCode": "TWD", "foreignAmt": "15000", "twdAmt": "15000" },
			{ "transDate": "2020-0706", "postDate": "2020-0715", "cardName": "春暉電影金卡", "cardLst": "5866", "tranDesc": "豐信汽車行-馬自達-M36526 分期04/10", "currencyCode": "TWD", "foreignAmt": "8520", "twdAmt": "15000" },
			{ "transDate": "2020-0715", "postDate": "2020-0728", "cardName": "禾翔影視金卡", "cardLst": "7721", "tranDesc": "繳交綜所稅本金分期02/06", "currencyCode": "TWD", "foreignAmt": "7400", "twdAmt": "15000" },
			{ "transDate": "2020-0814", "postDate": "2020-0826", "cardName": "禾翔影視金卡", "cardLst": "7721", "tranDesc": "菲恩精品-卡爾錶分期06/25", "currencyCode": "TWD", "foreignAmt": "6520", "twdAmt": "15000" },
			{ "transDate": "2020-0509", "postDate": "2020-0510", "cardName": "禾翔影視金卡", "cardLst": "7721", "tranDesc": "繳交綜所稅本金分期02/06", "currencyCode": "TWD", "foreignAmt": "14050", "twdAmt": "15000" }
		],
		"totalConsume": "45000",
		"cardData": [
			{
				"cardLst": "5866",
				"cardName": "春暉電影金卡",
				"attahCard": "22659984265339",
				"cardRow": [
					{ "transDate": "2020-0526", "postDate": "2020-0514", "cardName": "春暉電影金卡", "cardLst": "5866", "tranDesc": "繳交綜所稅本金分期05/26", "currencyCode": "TWD", "foreignAmt": "7500", "twdAmt": "15000" },
					{ "transDate": "2020-0206", "postDate": "2020-0224", "cardName": "春暉電影金卡", "cardLst": "5866", "tranDesc": "繳交綜所稅本金分期02/06", "currencyCode": "TWD", "foreignAmt": "5900", "twdAmt": "15000" },
					{ "transDate": "2020-0211", "postDate": "2020-0221", "cardName": "春暉電影金卡", "cardLst": "5866", "tranDesc": "菲恩精品-卡爾錶分期06/25", "currencyCode": "TWD", "foreignAmt": "11500", "twdAmt": "15000" },
					{ "transDate": "2020-0218", "postDate": "2020-0229", "cardName": "春暉電影金卡", "cardLst": "5866", "tranDesc": "繳交綜所稅本金分期02/08", "currencyCode": "TWD", "foreignAmt": "3200", "twdAmt": "15000" },
					{ "transDate": "2020-0405", "postDate": "2020-0414", "cardName": "春暉電影金卡", "cardLst": "5866", "tranDesc": "繳交綜所稅本金分期02/06", "currencyCode": "TWD", "foreignAmt": "3150", "twdAmt": "15000" },
					{ "transDate": "2020-0413", "postDate": "2020-0427", "cardName": "春暉電影金卡", "cardLst": "5866", "tranDesc": "繳交綜所稅本金分期02/06", "currencyCode": "TWD", "foreignAmt": "10850", "twdAmt": "15000" },
					{ "transDate": "2020-0519", "postDate": "2020-0527", "cardName": "春暉電影金卡", "cardLst": "5526", "tranDesc": "繳交綜所稅本金分期02/06", "currencyCode": "TWD", "foreignAmt": "2100", "twdAmt": "15000" },
					{ "transDate": "2020-0706", "postDate": "2020-0715", "cardName": "春暉電影金卡", "cardLst": "5866", "tranDesc": "豐信汽車行-馬自達-M36526 分期04/10", "currencyCode": "TWD", "foreignAmt": "8520", "twdAmt": "15000" }
				]
			},
			{
				"cardLst": "7855",
				"cardName": "億欣會員白金卡",
				"attahCard": "22445684759985",
				"cardRow": [
					{ "transDate": "2020-0617", "postDate": "2020-0625", "cardName": "億欣會員白金卡", "cardLst": "401200017855", "tranDesc": "菲恩精品-卡爾錶分期06/25", "currencyCode": "TWD", "foreignAmt": "4500", "twdAmt": "15000" },
					{ "transDate": "2020-0315", "postDate": "2020-0319", "cardName": "億欣會員白金卡", "cardLst": "401200017855", "tranDesc": "繳交綜所稅本金分期02/06", "currencyCode": "TWD", "foreignAmt": "5850", "twdAmt": "15000" },
					{ "transDate": "2020-0302", "postDate": "2020-0314", "cardName": "億欣會員白金卡", "cardLst": "7855", "tranDesc": "豐信汽車行-馬自達-M36526 分期04/10", "currencyCode": "TWD", "foreignAmt": "12050", "twdAmt": "15000" },
					{ "transDate": "2020-0325", "postDate": "2020-0331", "cardName": "億欣會員白金卡", "cardLst": "7855", "tranDesc": "菲恩精品-卡爾錶分期06/25", "currencyCode": "TWD", "foreignAmt": "9000", "twdAmt": "15000" },
					{ "transDate": "2020-0512", "postDate": "2020-0526", "cardName": "億欣會員白金卡", "cardLst": "7855", "tranDesc": "菲恩精品-卡爾錶分期06/25", "currencyCode": "TWD", "foreignAmt": "15000", "twdAmt": "15000" }
				]
			},
			{
				"cardLst": "4759",
				"cardName": "彰化銀行金卡",
				"attahCard": "22758984425523",
				"cardRow": [
					{ "transDate": "2020-0421", "postDate": "2020-0406", "cardName": "彰化銀行金卡", "cardLst": "4759", "tranDesc": "豐信汽車行-馬自達-M36526 分期04/10", "currencyCode": "TWD", "foreignAmt": "11500", "twdAmt": "15000" },
					{ "transDate": "2020-0208", "postDate": "2020-0214", "cardName": "彰化銀行金卡", "cardLst": "4759", "tranDesc": "豐信汽車行-馬自達-M36526 分期04/10", "currencyCode": "TWD", "foreignAmt": "21000", "twdAmt": "15000" },
					{ "transDate": "2020-0301", "postDate": "2020-0311", "cardName": "彰化銀行金卡", "cardLst": "4759", "tranDesc": "菲恩精品-卡爾錶分期06/25", "currencyCode": "TWD", "foreignAmt": "5400", "twdAmt": "15000" },
					{ "transDate": "2020-0426", "postDate": "2020-0430", "cardName": "彰化銀行金卡", "cardLst": "4759", "tranDesc": "菲恩精品-卡爾錶分期06/25", "currencyCode": "TWD", "foreignAmt": "7100", "twdAmt": "15000" }
				]
			},
			{
				"cardLst": "7721",
				"cardName": "禾翔影視金卡",
				"attahCard": "22758984425523",
				"cardRow": [
					{ "transDate": "2020-0321", "postDate": "2020-0308", "cardName": "禾翔影視金卡", "cardLst": "7721", "tranDesc": "菲恩精品-卡爾錶分期06/25", "currencyCode": "TWD", "foreignAmt": "7800", "twdAmt": "15000" },
					{ "transDate": "2020-0319", "postDate": "2020-0329", "cardName": "禾翔影視金卡", "cardLst": "7721", "tranDesc": "繳交綜所稅本金分期02/06", "currencyCode": "TWD", "foreignAmt": "6580", "twdAmt": "15000" },
					{ "transDate": "2020-0715", "postDate": "2020-0728", "cardName": "禾翔影視金卡", "cardLst": "7721", "tranDesc": "繳交綜所稅本金分期02/06", "currencyCode": "TWD", "foreignAmt": "7400", "twdAmt": "15000" },
					{ "transDate": "2020-0814", "postDate": "2020-0826", "cardName": "禾翔影視金卡", "cardLst": "7721", "tranDesc": "菲恩精品-卡爾錶分期06/25", "currencyCode": "TWD", "foreignAmt": "6520", "twdAmt": "15000" },
					{ "transDate": "2020-0509", "postDate": "2020-0510", "cardName": "禾翔影視金卡", "cardLst": "7721", "tranDesc": "繳交綜所稅本金分期02/06", "currencyCode": "TWD", "foreignAmt": "14050", "twdAmt": "15000" }
				]
			}
		]
	}
};

let real_data = {
	"apiId": "SPEC12010301",
	"token": {
		"requestId": "d123997a6e2f36e01607000365181",
		"responseTime": "2020-12-03 20:59:33",
		"lang": "zh_TW"
	},
	"resFlag": "0",
	"resMessage": {
		"errorCode": "",
		"errorMsg": ""
	},
	"resContent": {
		"totalStmBal": "1234",
		"totalConsume": "0"
	}
};

let df_response = {
	'apiId': 'SPEC12010301',
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
		"totalStmBal": "",
		"payRow": [],
		"totalPayment": "",
		"consumeRow": [],
		"totalConsume": ""
	}
};


let empty_data = { ...df_response, ...data };
empty_data.resContent = {
	...empty_data.resContent, ...{
		// "cardData": [],
		// "payRow": [],
		"consumeRow": [],
	}
};

export const api_response = { ...df_response, ...real_data };
export const api_response_empty = empty_data;
export const api_error = {
	'apiId': 'SPEC12010301',
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
