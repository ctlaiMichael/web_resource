/**
 * 模擬api
 */
let data = {
	'apiId': 'SPEC12030101',
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
		"printBarCode": true,
		"customerMask": "G121158856",
		"creditLmt": "150000",
		"apPer": "100%",
		"apAmt": "15000",
		"apDay": "2020-0705",
		"apAccount": "02203000001164",
		"stmtDate": "2020-0720",
		"dueDate": "2020-0726",
		"begBal": "80000",
		"prevPay": "20000",
		"curAmt": "15000",
		"curBal": "50000",
		"currDue": "18000",
		"pastDue": "40000",
		"minPay": "20000",
		"msg": "",
		"bpStart": "1000",
		"bpUsed": "5000",
		"bpEarn": "1000",
		"bpCur": "3500",
		"aRrears": "14000",
		"apMonth": "06",
		"rowData": [{
			"transDate": "2020-0721",
			"postDate": "2020-0728",
			"memo": "家福股份有限公司-汐止店一般",
			"foreignCurr": "TWD",
			"foreignAmt": "15000",
			"foreignDate": "2020-0711",
			"transAmt": "11000",
			"cardDesc": "02244565452251",
			"cardLst": "2251"
		},
		{
			"transDate": "2020-0705",
			"postDate": "2020-0715",
			"memo": "五鳳旗實業股份有限公司-礁溪老爺大酒店",
			"foreignCurr": "TWD",
			"foreignAmt": "14000",
			"foreignDate": "2020-0729",
			"transAmt": "11400",
			"cardDesc": "02295585641669",
			"cardLst": "1669"
		},
		{
			"transDate": "2020-0720",
			"postDate": "2020-0715",
			"memo": "家福股份有限公司-內湖店一般",
			"foreignCurr": "USD",
			"foreignAmt": "3000",
			"foreignDate": "2020-0716",
			"transAmt": "2000",
			"cardDesc": "02565597268856",
			"cardLst": "8856"
		},
		{
			"transDate": "2020-0706",
			"postDate": "2020-0714",
			"memo": "菲恩精品-內湖家樂福店",
			"foreignCurr": "EUR",
			"foreignAmt": "1000",
			"foreignDate": "2020-0707",
			"transAmt": "1000",
			"cardDesc": "02985568574588",
			"cardLst": "4588"
		},
		{
			"transDate": "2020-0708",
			"postDate": "2020-0715",
			"memo": "遙相股份有限公司-大直店一般",
			"foreignCurr": "EUR",
			"foreignAmt": "1000",
			"foreignDate": "2020-0710",
			"transAmt": "1000",
			"cardDesc": "02985568571669",
			"cardLst": "1669"
		},
		{
			"transDate": "2020-0711",
			"postDate": "2020-0715",
			"memo": "義鑫股份有限公司",
			"foreignCurr": "EUR",
			"foreignAmt": "1000",
			"foreignDate": "2020-0719",
			"transAmt": "1000",
			"cardDesc": "02985568578856",
			"cardLst": "8856"
		},
		{
			"transDate": "2020-0721",
			"postDate": "2020-0724",
			"memo": "雷德瑟醫療科技",
			"foreignCurr": "EUR",
			"foreignAmt": "1000",
			"foreignDate": "2020-0726",
			"transAmt": "1000",
			"cardDesc": "02985568572251",
			"cardLst": "2251"
		},
		{
			"transDate": "2020-0719",
			"postDate": "2020-0717",
			"memo": "雅欣樂器-永春店",
			"foreignCurr": "EUR",
			"foreignAmt": "1000",
			"foreignDate": "2020-0718",
			"transAmt": "1000",
			"cardDesc": "02985568571669",
			"cardLst": "1669"
		},
		{
			"transDate": "2020-0721",
			"postDate": "2020-0731",
			"memo": "億岷實業股份有限公司-大直分店",
			"foreignCurr": "EUR",
			"foreignAmt": "1000",
			"foreignDate": "2020-0729",
			"transAmt": "1000",
			"cardDesc": "02985568578856",
			"cardLst": "8856"
		},
		{
			"transDate": "2020-0719",
			"postDate": "2020-0721",
			"memo": "志培鐵金製造-台中分店",
			"foreignCurr": "EUR",
			"foreignAmt": "1000",
			"foreignDate": "2020-0726",
			"transAmt": "1000",
			"cardDesc": "02985568571669",
			"cardLst": "1669"
		},
		{
			"transDate": "2020-0703",
			"postDate": "2020-0705",
			"memo": "方尚股份有限公司-民生分店",
			"foreignCurr": "EUR",
			"foreignAmt": "1000",
			"foreignDate": "2020-0706",
			"transAmt": "1000",
			"cardDesc": "02985568572251",
			"cardLst": "2251"
		},
		{
			"transDate": "2020-0719",
			"postDate": "2020-0718",
			"memo": "卡雅西西式飲食館-市府分店",
			"foreignCurr": "EUR",
			"foreignAmt": "1000",
			"foreignDate": "2020-0722",
			"transAmt": "1000",
			"cardDesc": "02985568571669",
			"cardLst": "1669"
		},
		{
			"transDate": "2020-0715",
			"postDate": "2020-0718",
			"memo": "杜設五金",
			"foreignCurr": "EUR",
			"foreignAmt": "1000",
			"foreignDate": "2020-0727",
			"transAmt": "1000",
			"cardDesc": "02985568572251",
			"cardLst": "2251"
		},
		{
			"transDate": "2020-0711",
			"postDate": "2020-0716",
			"memo": "立方奇設計股份有限公司",
			"foreignCurr": "EUR",
			"foreignAmt": "1000",
			"foreignDate": "2020-0719",
			"transAmt": "1000",
			"cardDesc": "02985568578856",
			"cardLst": "8856"
		},
		{
			"transDate": "2020-0726",
			"postDate": "2020-0729",
			"memo": "菲恩精品-內湖家樂福店",
			"foreignCurr": "EUR",
			"foreignAmt": "1000",
			"foreignDate": "2020-0724",
			"transAmt": "1000",
			"cardDesc": "02985568574588",
			"cardLst": "4588"
		},
		{
			"transDate": "2020-0724",
			"postDate": "2020-0730",
			"memo": "菲恩精品-內湖家樂福店",
			"foreignCurr": "EUR",
			"foreignAmt": "1000",
			"foreignDate": "2020-0725",
			"transAmt": "1000",
			"cardDesc": "02985568572251",
			"cardLst": "2251"
		},
		{
			"transDate": "2020-0709",
			"postDate": "2020-0708",
			"memo": "馬德實業股份有限公司-台南分店",
			"foreignCurr": "EUR",
			"foreignAmt": "1000",
			"foreignDate": "2020-0712",
			"transAmt": "1000",
			"cardDesc": "02985568574588",
			"cardLst": "4588"
		},
		{
			"transDate": "2020-0721",
			"postDate": "2020-0723",
			"memo": "雅詩羅特實業股份有限公司",
			"foreignCurr": "EUR",
			"foreignAmt": "1000",
			"foreignDate": "2020-0726",
			"transAmt": "1000",
			"cardDesc": "02985568578856",
			"cardLst": "8856"
		},
		{
			"transDate": "2020-0719",
			"postDate": "2020-0724",
			"memo": "雅欣樂器-永春店",
			"foreignCurr": "TWD",
			"foreignAmt": "25000",
			"foreignDate": "2020-07-26",
			"transAmt": "20000",
			"cardDesc": "02275644152251",
			"cardLst": "2251"
		}],
		"cardData": [

		]
	}
};

let df_response = {
	'apiId': 'SPEC12030101',
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
		"printBarCode": true,
		"customerMask": "",
		"creditLmt": "",
		"apPer": "",
		"apAmt": "",
		"apDay": "",
		"apAccount": "",
		"stmtDate": "",
		"dueDate": "",
		"begBal": "",
		"prevPay": "",
		"curAmt": "",
		"curBal": "",
		"currDue": "",
		"pastDue": "",
		"minPay": "",
		"msg": "",
		"bpStart": "",
		"bpUsed": "",
		"bpEarn": "",
		"bpCur": "",
		"rowData": [

		],
		"cardData": [
			
		]
	}
};

export const api_response = { ...df_response, ...data };
export const api_response_empty = { ...df_response, ...df_response };
export const api_error = {
	'apiId': 'SPEC12030101',
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
