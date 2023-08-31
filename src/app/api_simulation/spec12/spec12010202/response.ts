/**
 * 模擬api
 */
let data = {
	'apiId': 'SPEC12010202',
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
		"printBarCode": 'Y',
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
			{
				"cardLst": "2251",
				"cardName": "彰化銀行金卡",
				"attahCard": "22659984265339",
				"cardRow": [
					{
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
						"transDate": "2020-0719",
						"postDate": "2020-0724",
						"memo": "雅欣樂器-永春店",
						"foreignCurr": "TWD",
						"foreignAmt": "25000",
						"foreignDate": "2020-07-26",
						"transAmt": "20000",
						"cardDesc": "02275644152251",
						"cardLst": "2251"
					}
				]
			},
			{
				"cardLst": "1669",
				"cardName": "台新銀行金卡",
				"attahCard": "22495664277856",
				"cardRow": [
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
						"transDate": "2020-0719",
						"postDate": "2020-0718",
						"memo": "卡雅西西式飲食館-市府分店",
						"foreignCurr": "EUR",
						"foreignAmt": "1000",
						"foreignDate": "2020-0722",
						"transAmt": "1000",
						"cardDesc": "02985568571669",
						"cardLst": "1669"
					}
				]
			},
			{
				"cardLst": "8856",
				"cardName": "國泰世華金卡",
				"attahCard": "21169988859654",
				"cardRow": [
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
						"transDate": "2020-0721",
						"postDate": "2020-0723",
						"memo": "雅詩羅特實業股份有限公司",
						"foreignCurr": "EUR",
						"foreignAmt": "1000",
						"foreignDate": "2020-0726",
						"transAmt": "1000",
						"cardDesc": "02985568578856",
						"cardLst": "8856"
					}
				]
			},
			{
				"cardLst": "4588",
				"cardName": "星光銀行金卡",
				"attahCard": "21169988859654",
				"cardRow": [
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
						"transDate": "2020-0709",
						"postDate": "2020-0708",
						"memo": "馬德實業股份有限公司-台南分店",
						"foreignCurr": "EUR",
						"foreignAmt": "1000",
						"foreignDate": "2020-0712",
						"transAmt": "1000",
						"cardDesc": "02985568574588",
						"cardLst": "4588"
					}
				]
			}
		]
	}
};

let data06Month = {
	'apiId': 'SPEC12010202',
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
		"printBarCode": 'Y',
		"customerMask": "B121958565",
		"creditLmt": "145000",
		"apPer": "90%",
		"apAmt": "25000",
		"apDay": "2020-0605",
		"apAccount": "04453000001164",
		"stmtDate": "2020-0606",
		"dueDate": "2020-0614",
		"begBal": "12000",
		"prevPay": "15000",
		"curAmt": "25000",
		"curBal": "21000",
		"currDue": "9000",
		"pastDue": "26000",
		"minPay": "18000",
		"msg": "",
		"bpStart": "5000",
		"bpUsed": "4000",
		"bpEarn": "3000",
		"bpCur": "9500",
		"rowData": [{
			"transDate": "2020-0620",
			"postDate": "2020-0629",
			"memo": "家福股份有限公司-南港店一般",
			"foreignCurr": "TWD",
			"foreignAmt": "15000",
			"foreignDate": "2020-0809",
			"transAmt": "11000",
			"cardDesc": "02556565454458",
			"cardLst": "4458"
		},
		{
			"transDate": "2020-0530",
			"postDate": "2020-0530",
			"memo": "美盛實業股份有限公司-台中分館",
			"foreignCurr": "TWD",
			"foreignAmt": "11000",
			"foreignDate": "2020-0530",
			"transAmt": "11400",
			"cardDesc": "02445685649566",
			"cardLst": "9566"
		},
		{
			"transDate": "2020-0601",
			"postDate": "2020-0612",
			"memo": "美盛實業股份有限公司-台中分館",
			"foreignCurr": "TWD",
			"foreignAmt": "11000",
			"foreignDate": "2020-0612",
			"transAmt": "11400",
			"cardDesc": "02445685649566",
			"cardLst": "9566"
		},
		{
			"transDate": "2020-0603",
			"postDate": "2020-0621",
			"memo": "遙相股份有限公司-大直店一般",
			"foreignCurr": "USD",
			"foreignAmt": "3000",
			"foreignDate": "2020-0614",
			"transAmt": "2000",
			"cardDesc": "02514556261223",
			"cardLst": "1223"
		},
		{
			"transDate": "2020-0607",
			"postDate": "2020-0612",
			"memo": "菲恩精品-內湖家樂福店",
			"foreignCurr": "EUR",
			"foreignAmt": "500",
			"foreignDate": "2020-0610",
			"transAmt": "400",
			"cardDesc": "045586685744586",
			"cardLst": "4458"
		},
		{
			"transDate": "2020-0611",
			"postDate": "2020-0615",
			"memo": "雅芳工訪-南港分店",
			"foreignCurr": "TWD",
			"foreignAmt": "500",
			"foreignDate": "2020-0618",
			"transAmt": "600",
			"cardDesc": "0266953274458",
			"cardLst": "4458"
		},
		{
			"transDate": "2020-0608",
			"postDate": "2020-0614",
			"memo": "卡羅雅美式餐館",
			"foreignCurr": "TWD",
			"foreignAmt": "750",
			"foreignDate": "2020-0619",
			"transAmt": "650",
			"cardDesc": "0266953279566",
			"cardLst": "9566"
		},
		{
			"transDate": "2020-0625",
			"postDate": "2020-0629",
			"memo": "雅芳工訪-南港分店",
			"foreignCurr": "TWD",
			"foreignAmt": "340",
			"foreignDate": "2020-0629",
			"transAmt": "460",
			"cardDesc": "0266953271223",
			"cardLst": "1223"
		},
		{
			"transDate": "2020-0615",
			"postDate": "2020-0609",
			"memo": "法特斯股份有限公司",
			"foreignCurr": "TWD",
			"foreignAmt": "500",
			"foreignDate": "2020-0615",
			"transAmt": "500",
			"cardDesc": "0266953279566",
			"cardLst": "9566"
		},
		{
			"transDate": "2020-0606",
			"postDate": "2020-0601",
			"memo": "伊斯特精品",
			"foreignCurr": "TWD",
			"foreignAmt": "4500",
			"foreignDate": "2020-0611",
			"transAmt": "5500",
			"cardDesc": "0266953274458",
			"cardLst": "4458"
		},
		{
			"transDate": "2020-0611",
			"postDate": "2020-0615",
			"memo": "雅芳工訪-南港分店",
			"foreignCurr": "TWD",
			"foreignAmt": "500",
			"foreignDate": "2020-0618",
			"transAmt": "500",
			"cardDesc": "0266953274458",
			"cardLst": "4458"
		},
		{
			"transDate": "2020-0607",
			"postDate": "2020-0612",
			"memo": "雅爾文-南港分店",
			"foreignCurr": "TWD",
			"foreignAmt": "7000",
			"foreignDate": "2020-0612",
			"transAmt": "7500",
			"cardDesc": "0266953279566",
			"cardLst": "9566"
		},
		{
			"transDate": "2020-0609",
			"postDate": "2020-0611",
			"memo": "義鑫股份有限公司",
			"foreignCurr": "TWD",
			"foreignAmt": "1500",
			"foreignDate": "2020-0613",
			"transAmt": "1700",
			"cardDesc": "0266953271223",
			"cardLst": "1223"
		},
		{
			"transDate": "2020-0611",
			"postDate": "2020-0615",
			"memo": "弘毅租車",
			"foreignCurr": "TWD",
			"foreignAmt": "14500",
			"foreignDate": "2020-0618",
			"transAmt": "15500",
			"cardDesc": "0266953274458",
			"cardLst": "4458"
		},
		{
			"transDate": "2020-0611",
			"postDate": "2020-0615",
			"memo": "雅芳工訪-忠孝分店",
			"foreignCurr": "TWD",
			"foreignAmt": "500",
			"foreignDate": "2020-0618",
			"transAmt": "500",
			"cardDesc": "0266953274458",
			"cardLst": "4458"
		},
		{
			"transDate": "2020-0611",
			"postDate": "2020-0615",
			"memo": "雷德瑟醫療科技",
			"foreignCurr": "TWD",
			"foreignAmt": "10500",
			"foreignDate": "2020-0618",
			"transAmt": "10500",
			"cardDesc": "0266953271223",
			"cardLst": "1223"
		},
		{
			"transDate": "2020-0619",
			"postDate": "2020-0626",
			"memo": "雅欣樂器-永春店",
			"foreignCurr": "TWD",
			"foreignAmt": "25000",
			"foreignDate": "2020-06-16",
			"transAmt": "20000",
			"cardDesc": "02255968151223",
			"cardLst": "1223"
		}],
		"cardData": [
			{
				"cardLst": "4458",
				"cardName": "彰化銀行金卡",
				"attahCard": "22659984265339",
				"cardRow": [
					{
						"transDate": "2020-0620",
						"postDate": "2020-0629",
						"memo": "家福股份有限公司-南港店一般",
						"foreignCurr": "TWD",
						"foreignAmt": "15000",
						"foreignDate": "2020-0809",
						"transAmt": "11000",
						"cardDesc": "02556565454458",
						"cardLst": "4458"
					},
					{
						"transDate": "2020-0607",
						"postDate": "2020-0612",
						"memo": "菲恩精品-內湖家樂福店",
						"foreignCurr": "EUR",
						"foreignAmt": "500",
						"foreignDate": "2020-0610",
						"transAmt": "400",
						"cardDesc": "045586685744586",
						"cardLst": "4458"
					},
					{
						"transDate": "2020-0611",
						"postDate": "2020-0615",
						"memo": "雅芳工訪-南港分店",
						"foreignCurr": "TWD",
						"foreignAmt": "500",
						"foreignDate": "2020-0618",
						"transAmt": "600",
						"cardDesc": "0266953274458",
						"cardLst": "4458"
					},
					{
						"transDate": "2020-0606",
						"postDate": "2020-0601",
						"memo": "伊斯特精品",
						"foreignCurr": "TWD",
						"foreignAmt": "4500",
						"foreignDate": "2020-0611",
						"transAmt": "5500",
						"cardDesc": "0266953274458",
						"cardLst": "4458"
					},
					{
						"transDate": "2020-0611",
						"postDate": "2020-0615",
						"memo": "雅芳工訪-南港分店",
						"foreignCurr": "TWD",
						"foreignAmt": "500",
						"foreignDate": "2020-0618",
						"transAmt": "500",
						"cardDesc": "0266953274458",
						"cardLst": "4458"
					},
					{
						"transDate": "2020-0611",
						"postDate": "2020-0615",
						"memo": "弘毅租車",
						"foreignCurr": "TWD",
						"foreignAmt": "14500",
						"foreignDate": "2020-0618",
						"transAmt": "15500",
						"cardDesc": "0266953274458",
						"cardLst": "4458"
					},
					{
						"transDate": "2020-0611",
						"postDate": "2020-0615",
						"memo": "雅芳工訪-忠孝分店",
						"foreignCurr": "TWD",
						"foreignAmt": "500",
						"foreignDate": "2020-0618",
						"transAmt": "500",
						"cardDesc": "0266953274458",
						"cardLst": "4458"
					}
				]
			},
			{
				"cardLst": "9566",
				"cardName": "台新銀行金卡",
				"attahCard": "22495664277856",
				"cardRow": [
					{
						"transDate": "2020-0601",
						"postDate": "2020-0612",
						"memo": "美盛實業股份有限公司-台中分館",
						"foreignCurr": "TWD",
						"foreignAmt": "11000",
						"foreignDate": "2020-0612",
						"transAmt": "11400",
						"cardDesc": "02445685649566",
						"cardLst": "9566"
					},
					{
						"transDate": "2020-0530",
						"postDate": "2020-0530",
						"memo": "美盛實業股份有限公司-台中分館",
						"foreignCurr": "TWD",
						"foreignAmt": "11000",
						"foreignDate": "2020-0530",
						"transAmt": "11400",
						"cardDesc": "02445685649566",
						"cardLst": "9566"
					},
					{
						"transDate": "2020-0608",
						"postDate": "2020-0614",
						"memo": "卡羅雅美式餐館",
						"foreignCurr": "TWD",
						"foreignAmt": "750",
						"foreignDate": "2020-0619",
						"transAmt": "650",
						"cardDesc": "0266953279566",
						"cardLst": "9566"
					},
					{
						"transDate": "2020-0615",
						"postDate": "2020-0609",
						"memo": "法特斯股份有限公司",
						"foreignCurr": "TWD",
						"foreignAmt": "500",
						"foreignDate": "2020-0615",
						"transAmt": "500",
						"cardDesc": "0266953279566",
						"cardLst": "9566"
					},
					{
						"transDate": "2020-0607",
						"postDate": "2020-0612",
						"memo": "雅爾文-南港分店",
						"foreignCurr": "TWD",
						"foreignAmt": "7000",
						"foreignDate": "2020-0612",
						"transAmt": "7500",
						"cardDesc": "0266953279566",
						"cardLst": "9566"
					}
				]
			},
			{
				"cardLst": "1223",
				"cardName": "華南銀行金卡",
				"attahCard": "21169988859654",
				"cardRow": [
					{
						"transDate": "2020-0603",
						"postDate": "2020-0621",
						"memo": "遙相股份有限公司-大直店一般",
						"foreignCurr": "USD",
						"foreignAmt": "3000",
						"foreignDate": "2020-0614",
						"transAmt": "2000",
						"cardDesc": "02514556261223",
						"cardLst": "1223"
					},
					{
						"transDate": "2020-0625",
						"postDate": "2020-0629",
						"memo": "雅芳工訪-南港分店",
						"foreignCurr": "TWD",
						"foreignAmt": "340",
						"foreignDate": "2020-0629",
						"transAmt": "460",
						"cardDesc": "0266953271223",
						"cardLst": "1223"
					},
					{
						"transDate": "2020-0609",
						"postDate": "2020-0611",
						"memo": "義鑫股份有限公司",
						"foreignCurr": "TWD",
						"foreignAmt": "1500",
						"foreignDate": "2020-0613",
						"transAmt": "1700",
						"cardDesc": "0266953271223",
						"cardLst": "1223"
					},
					{
						"transDate": "2020-0611",
						"postDate": "2020-0615",
						"memo": "雷德瑟醫療科技",
						"foreignCurr": "TWD",
						"foreignAmt": "10500",
						"foreignDate": "2020-0618",
						"transAmt": "10500",
						"cardDesc": "0266953271223",
						"cardLst": "1223"
					},
					{
						"transDate": "2020-0619",
						"postDate": "2020-0626",
						"memo": "雅欣樂器-永春店",
						"foreignCurr": "TWD",
						"foreignAmt": "25000",
						"foreignDate": "2020-06-16",
						"transAmt": "20000",
						"cardDesc": "02255968151223",
						"cardLst": "1223"
					}
				]
			}
		]
	}
};

let data05Month = {
	'apiId': 'SPEC12010202',
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
		"printBarCode": 'Y',
		"customerMask": "A123556851",
		"creditLmt": "112000",
		"apPer": "75%",
		"apAmt": "15000",
		"apDay": "2020-0505",
		"apAccount": "04653000008569",
		"stmtDate": "2020-0506",
		"dueDate": "2020-0514",
		"begBal": "12000",
		"prevPay": "15000",
		"curAmt": "25000",
		"curBal": "35500",
		"currDue": "9000",
		"pastDue": "26000",
		"minPay": "18000",
		"msg": "",
		"bpStart": "5000",
		"bpUsed": "4000",
		"bpEarn": "3000",
		"bpCur": "9500",
		"rowData": [{
			"transDate": "2020-0506",
			"postDate": "2020-0521",
			"memo": "豐碩股份有限公司-南京店一般",
			"foreignCurr": "TWD",
			"foreignAmt": "13000",
			"foreignDate": "2020-0519",
			"transAmt": "9000",
			"cardDesc": "02545665457599",
			"cardLst": "7599"
		},
		{
			"transDate": "2020-0501",
			"postDate": "2020-0511",
			"memo": "雅德實業股份有限公司-西湖分館",
			"foreignCurr": "TWD",
			"foreignAmt": "1300",
			"foreignDate": "2020-0512",
			"transAmt": "9500",
			"cardDesc": "02422685644456",
			"cardLst": "4456"
		},
		{
			"transDate": "2020-0515",
			"postDate": "2020-0526",
			"memo": "可芳股份有限公司-龍潭分店",
			"foreignCurr": "TWD",
			"foreignAmt": "7500",
			"foreignDate": "2020-0514",
			"transAmt": "3500",
			"cardDesc": "02533854591156",
			"cardLst": "1156"
		},
		{
			"transDate": "2020-0507",
			"postDate": "2020-0526",
			"memo": "菲恩精品-內湖家樂福店",
			"foreignCurr": "EUR",
			"foreignAmt": "1500",
			"foreignDate": "2020-0510",
			"transAmt": "750",
			"cardDesc": "099580559273449",
			"cardLst": "3449"
		},
		{
			"transDate": "2020-0511",
			"postDate": "2020-0515",
			"memo": "億岷實業股份有限公司-大直分店",
			"foreignCurr": "TWD",
			"foreignAmt": "3500",
			"foreignDate": "2020-0518",
			"transAmt": "4500",
			"cardDesc": "09978995564456",
			"cardLst": "4456"
		},
		{
			"transDate": "2020-0516",
			"postDate": "2020-0502",
			"memo": "志培鐵金製造-台中分店",
			"foreignCurr": "TWD",
			"foreignAmt": "7000",
			"foreignDate": "2020-0521",
			"transAmt": "5600",
			"cardDesc": "09995691234456",
			"cardLst": "4456"
		},
		{
			"transDate": "2020-0523",
			"postDate": "2020-0526",
			"memo": "方尚股份有限公司-民生分店",
			"foreignCurr": "TWD",
			"foreignAmt": "5500",
			"foreignDate": "2020-0526",
			"transAmt": "7400",
			"cardDesc": "09859991221156",
			"cardLst": "1156"
		},
		{
			"transDate": "2020-0507",
			"postDate": "2020-0501",
			"memo": "卡雅西西式飲食館-市府分店",
			"foreignCurr": "TWD",
			"foreignAmt": "6700",
			"foreignDate": "2020-0511",
			"transAmt": "6400",
			"cardDesc": "09298445237599",
			"cardLst": "7599"
		},
		{
			"transDate": "2020-0531",
			"postDate": "2020-0521",
			"memo": "杜設五金",
			"foreignCurr": "TWD",
			"foreignAmt": "5500",
			"foreignDate": "2020-0525",
			"transAmt": "5700",
			"cardDesc": "07598812554456",
			"cardLst": "4456"
		},
		{
			"transDate": "2020-0517",
			"postDate": "2020-0505",
			"memo": "立方奇設計股份有限公司",
			"foreignCurr": "TWD",
			"foreignAmt": "35000",
			"foreignDate": "2020-0512",
			"transAmt": "27000",
			"cardDesc": "09778944563449",
			"cardLst": "3449"
		},
		{
			"transDate": "2020-0509",
			"postDate": "2020-0517",
			"memo": "馬德實業股份有限公司-台南分店",
			"foreignCurr": "TWD",
			"foreignAmt": "7500",
			"foreignDate": "2020-0513",
			"transAmt": "6500",
			"cardDesc": "09933545561156",
			"cardLst": "1156"
		},
		{
			"transDate": "2020-0511",
			"postDate": "2020-0515",
			"memo": "雅詩羅特實業股份有限公司",
			"foreignCurr": "TWD",
			"foreignAmt": "11500",
			"foreignDate": "2020-0523",
			"transAmt": "8500",
			"cardDesc": "08895619957599",
			"cardLst": "7599"
		},
		{
			"transDate": "2020-0522",
			"postDate": "2020-0529",
			"memo": "可方餐館-民族分店",
			"foreignCurr": "TWD",
			"foreignAmt": "5700",
			"foreignDate": "2020-0521",
			"transAmt": "6500",
			"cardDesc": "09788914561156",
			"cardLst": "1156"
		},
		{
			"transDate": "2020-0509",
			"postDate": "2020-0502",
			"memo": "卡羅雅美式餐館",
			"foreignCurr": "TWD",
			"foreignAmt": "2900",
			"foreignDate": "2020-0517",
			"transAmt": "2800",
			"cardDesc": "09944561293449",
			"cardLst": "3449"
		},
		{
			"transDate": "2020-0518",
			"postDate": "2020-0502",
			"memo": "法式萊特實業股份有限公司",
			"foreignCurr": "TWD",
			"foreignAmt": "11200",
			"foreignDate": "2020-0514",
			"transAmt": "10900",
			"cardDesc": "04456991191156",
			"cardLst": "1156"
		},
		{
			"transDate": "2020-0519",
			"postDate": "2020-0508",
			"memo": "雅欣樂器-永春店",
			"foreignCurr": "TWD",
			"foreignAmt": "7500",
			"foreignDate": "2020-05-16",
			"transAmt": "17000",
			"cardDesc": "01654495157599",
			"cardLst": "7599"
		}],
		"cardData": [
			{
				"cardLst": "7599",
				"cardName": "彰化銀行金卡",
				"attahCard": "22659984265339",
				"cardRow": [
					{
						"transDate": "2020-0506",
						"postDate": "2020-0521",
						"memo": "豐碩股份有限公司-南京店一般",
						"foreignCurr": "TWD",
						"foreignAmt": "13000",
						"foreignDate": "2020-0519",
						"transAmt": "9000",
						"cardDesc": "02545665457599",
						"cardLst": "7599"
					},
					{
						"transDate": "2020-0507",
						"postDate": "2020-0501",
						"memo": "卡雅西西式飲食館-市府分店",
						"foreignCurr": "TWD",
						"foreignAmt": "6700",
						"foreignDate": "2020-0511",
						"transAmt": "6400",
						"cardDesc": "09298445237599",
						"cardLst": "7599"
					},
					{
						"transDate": "2020-0511",
						"postDate": "2020-0515",
						"memo": "雅詩羅特實業股份有限公司",
						"foreignCurr": "TWD",
						"foreignAmt": "11500",
						"foreignDate": "2020-0523",
						"transAmt": "8500",
						"cardDesc": "08895619957599",
						"cardLst": "7599"
					},
					{
						"transDate": "2020-0519",
						"postDate": "2020-0508",
						"memo": "雅欣樂器-永春店",
						"foreignCurr": "TWD",
						"foreignAmt": "7500",
						"foreignDate": "2020-05-16",
						"transAmt": "17000",
						"cardDesc": "01654495157599",
						"cardLst": "7599"
					}
				]
			},
			{
				"cardLst": "4456",
				"cardName": "台新銀行金卡",
				"attahCard": "22495664277856",
				"cardRow": [
					{
						"transDate": "2020-0501",
						"postDate": "2020-0511",
						"memo": "雅德實業股份有限公司-西湖分館",
						"foreignCurr": "TWD",
						"foreignAmt": "1300",
						"foreignDate": "2020-0512",
						"transAmt": "9500",
						"cardDesc": "02422685644456",
						"cardLst": "4456"
					},
					{
						"transDate": "2020-0511",
						"postDate": "2020-0515",
						"memo": "億岷實業股份有限公司-大直分店",
						"foreignCurr": "TWD",
						"foreignAmt": "3500",
						"foreignDate": "2020-0518",
						"transAmt": "4500",
						"cardDesc": "09978995564456",
						"cardLst": "4456"
					},
					{
						"transDate": "2020-0516",
						"postDate": "2020-0502",
						"memo": "志培鐵金製造-台中分店",
						"foreignCurr": "TWD",
						"foreignAmt": "7000",
						"foreignDate": "2020-0521",
						"transAmt": "5600",
						"cardDesc": "09995691234456",
						"cardLst": "4456"
					},
					{
						"transDate": "2020-0531",
						"postDate": "2020-0521",
						"memo": "杜設五金",
						"foreignCurr": "TWD",
						"foreignAmt": "5500",
						"foreignDate": "2020-0525",
						"transAmt": "5700",
						"cardDesc": "07598812554456",
						"cardLst": "4456"
					}
				]
			},
			{
				"cardLst": "1156",
				"cardName": "華南銀行金卡",
				"attahCard": "21169988859654",
				"cardRow": [
					{
						"transDate": "2020-0515",
						"postDate": "2020-0526",
						"memo": "可芳股份有限公司-龍潭分店",
						"foreignCurr": "TWD",
						"foreignAmt": "7500",
						"foreignDate": "2020-0514",
						"transAmt": "3500",
						"cardDesc": "02533854591156",
						"cardLst": "1156"
					},
					{
						"transDate": "2020-0523",
						"postDate": "2020-0526",
						"memo": "方尚股份有限公司-民生分店",
						"foreignCurr": "TWD",
						"foreignAmt": "5500",
						"foreignDate": "2020-0526",
						"transAmt": "7400",
						"cardDesc": "09859991221156",
						"cardLst": "1156"
					},
					{
						"transDate": "2020-0509",
						"postDate": "2020-0517",
						"memo": "馬德實業股份有限公司-台南分店",
						"foreignCurr": "TWD",
						"foreignAmt": "7500",
						"foreignDate": "2020-0513",
						"transAmt": "6500",
						"cardDesc": "09933545561156",
						"cardLst": "1156"
					},
					{
						"transDate": "2020-0522",
						"postDate": "2020-0529",
						"memo": "可方餐館-民族分店",
						"foreignCurr": "TWD",
						"foreignAmt": "5700",
						"foreignDate": "2020-0521",
						"transAmt": "6500",
						"cardDesc": "09788914561156",
						"cardLst": "1156"
					},
					{
						"transDate": "2020-0518",
						"postDate": "2020-0502",
						"memo": "法式萊特實業股份有限公司",
						"foreignCurr": "TWD",
						"foreignAmt": "11200",
						"foreignDate": "2020-0514",
						"transAmt": "10900",
						"cardDesc": "04456991191156",
						"cardLst": "1156"
					}
				]
			},
			{
				"cardLst": "3449",
				"cardName": "國泰世華金卡",
				"attahCard": "15579956877456",
				"cardRow": [
					{
						"transDate": "2020-0507",
						"postDate": "2020-0526",
						"memo": "菲恩精品-內湖家樂福店",
						"foreignCurr": "EUR",
						"foreignAmt": "1500",
						"foreignDate": "2020-0510",
						"transAmt": "750",
						"cardDesc": "099580559273449",
						"cardLst": "3449"
					},
					{
						"transDate": "2020-0517",
						"postDate": "2020-0505",
						"memo": "立方奇設計股份有限公司",
						"foreignCurr": "TWD",
						"foreignAmt": "35000",
						"foreignDate": "2020-0512",
						"transAmt": "27000",
						"cardDesc": "09778944563449",
						"cardLst": "3449"
					},
					{
						"transDate": "2020-0509",
						"postDate": "2020-0502",
						"memo": "卡羅雅美式餐館",
						"foreignCurr": "TWD",
						"foreignAmt": "2900",
						"foreignDate": "2020-0517",
						"transAmt": "2800",
						"cardDesc": "09944561293449",
						"cardLst": "3449"
					}
				]
			}
		]
	}
};

let df_response = {
	'apiId': 'SPEC12010202',
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
		"printBarCode": 'Y',
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


let empty_data = { ...df_response, ...data};
empty_data.resContent = {...empty_data.resContent, ...{
	// "dueDate": "",
	"cardData": [],
	"rowData": []
}};

export const api_response = { ...df_response, ...data };
export const api_response_06month = { ...df_response, ...data06Month };
export const api_response_05month = { ...df_response, ...data05Month };
export const api_response_empty = empty_data;
export const api_error = {
	'apiId': 'SPEC12010202',
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
