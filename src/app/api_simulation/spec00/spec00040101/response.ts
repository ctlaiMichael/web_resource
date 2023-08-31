/**
 * 模擬api
 */
let data = {
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
    'resContent': {
        'rowData': [
            { 'order': '1', 'status': '正常戶', 'accType': '101', 'amount': '964949', 'type': '支票存款', 'accountId': '02101000541801', 'nickName': '測試1', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '營業部' },
            { 'order': '1', 'status': '靜止戶', 'accType': '101', 'amount': '964950', 'type': '支票存款', 'accountId': '02101000541802', 'nickName': '測試2', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '中山分行' },
            { 'order': '1', 'status': '正常戶', 'accType': '101', 'amount': '964951', 'type': '支票存款', 'accountId': '02101000544495', 'nickName': '測試3', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '松山分行' },
            { 'order': '2', 'status': '正常戶', 'accType': '102', 'amount': '964952', 'type': '活期存款', 'accountId': '02102000555956', 'nickName': '測試4', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '營業部' },
            { 'order': '2', 'status': '靜止戶', 'accType': '102', 'amount': '964967', 'type': '活期存款', 'accountId': '02102004456923', 'nickName': '測試5', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '信義分行' },
            { 'order': '2', 'status': '靜止戶', 'accType': '102', 'amount': '964971', 'type': '活期存款', 'accountId': '02102000596552', 'nickName': '測試6', 'currencyCode': 'USD', 'currencyName': '美金', 'branchName': '大安分行' },
            { 'order': '2', 'status': '正常戶', 'accType': '102', 'amount': '964983', 'type': '活期存款', 'accountId': '02102000579885', 'nickName': '測試7', 'currencyCode': 'USD', 'currencyName': '美金', 'branchName': '新莊分行' },
            { 'order': '2', 'status': '正常戶', 'accType': '102', 'amount': '964985', 'type': '活期存款', 'accountId': '02102004445669', 'nickName': '測試8', 'currencyCode': 'EUR', 'currencyName': '歐元', 'branchName': '營業部' },
            { 'order': '3', 'status': '正常戶', 'accType': '203', 'amount': '964445', 'type': '活儲存款', 'accountId': '02203000541801', 'nickName': '測試9', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '營業部' },
            { 'order': '3', 'status': '靜止戶', 'accType': '203', 'amount': '969566', 'type': '活儲存款', 'accountId': '02203000541802', 'nickName': '測試10', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '中山分行' },
            { 'order': '3', 'status': '正常戶', 'accType': '203', 'amount': '966695', 'type': '活儲存款', 'accountId': '02203000544495', 'nickName': '測試11', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '松山分行' },
            { 'order': '3', 'status': '正常戶', 'accType': '203', 'amount': '964655', 'type': '活儲存款', 'accountId': '02203000555956', 'nickName': '測試12', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '營業部' },
            { 'order': '4', 'status': '靜止戶', 'accType': '204', 'amount': '969566', 'type': '行員存款', 'accountId': '02204004456923', 'nickName': '測試13', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '信義分行' },
            { 'order': '4', 'status': '靜止戶', 'accType': '204', 'amount': '964568', 'type': '行員存款', 'accountId': '02204000596552', 'nickName': '測試14', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '大安分行' },
            { 'order': '4', 'status': '正常戶', 'accType': '204', 'amount': '967789', 'type': '行員存款', 'accountId': '02204000579885', 'nickName': '測試15', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '新莊分行' },
            { 'order': '4', 'status': '正常戶', 'accType': '204', 'amount': '969965', 'type': '行員存款', 'accountId': '02204004445669', 'nickName': '測試16', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '營業部' },
            { 'order': '5', 'status': '正常戶', 'accType': '108', 'amount': '964566', 'type': '活期存款', 'accountId': '02108000541801', 'nickName': '測試17', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '營業部' },
            { 'order': '5', 'status': '靜止戶', 'accType': '108', 'amount': '969886', 'type': '活期存款', 'accountId': '02108000541802', 'nickName': '測試18', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '中山分行' },
            { 'order': '5', 'status': '正常戶', 'accType': '108', 'amount': '966652', 'type': '活期存款', 'accountId': '02108000544495', 'nickName': '測試19', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '松山分行' },
            { 'order': '5', 'status': '正常戶', 'accType': '108', 'amount': '967789', 'type': '活期存款', 'accountId': '02108000555956', 'nickName': '測試20', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '營業部' },
            { 'order': '6', 'status': '靜止戶', 'accType': '121', 'amount': '966526', 'type': '一般定存', 'accountId': '02121004456923', 'nickName': '測試21', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '信義分行' },
            { 'order': '6', 'status': '靜止戶', 'accType': '121', 'amount': '967736', 'type': '一般定存', 'accountId': '02121000596552', 'nickName': '測試22', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '大安分行' },
            { 'order': '6', 'status': '正常戶', 'accType': '121', 'amount': '969965', 'type': '一般定存', 'accountId': '02121000579885', 'nickName': '測試23', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '新莊分行' },
            { 'order': '6', 'status': '正常戶', 'accType': '121', 'amount': '969985', 'type': '一般定存', 'accountId': '02121004445669', 'nickName': '測試24', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '營業部' },
            { 'order': '7', 'status': '正常戶', 'accType': '222', 'amount': '966588', 'type': '存本取息定存', 'accountId': '02222000541801', 'nickName': '測試25', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '營業部' },
            { 'order': '7', 'status': '靜止戶', 'accType': '222', 'amount': '969566', 'type': '存本取息定存', 'accountId': '02222000541802', 'nickName': '測試26', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '中山分行' },
            { 'order': '7', 'status': '正常戶', 'accType': '222', 'amount': '969996', 'type': '存本取息定存', 'accountId': '02222000544495', 'nickName': '測試27', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '松山分行' },
            { 'order': '8', 'status': '正常戶', 'accType': '223', 'amount': '968856', 'type': '整存整付定存', 'accountId': '02223000555956', 'nickName': '測試28', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '營業部' },
            { 'order': '8', 'status': '靜止戶', 'accType': '223', 'amount': '969920', 'type': '整存整付定存', 'accountId': '02223004456923', 'nickName': '測試29', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '信義分行' },
            { 'order': '8', 'status': '靜止戶', 'accType': '223', 'amount': '964655', 'type': '整存整付定存', 'accountId': '02223000596552', 'nickName': '測試30', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '大安分行' },
            { 'order': '8', 'status': '正常戶', 'accType': '223', 'amount': '964556', 'type': '整存整付定存', 'accountId': '02223000579885', 'nickName': '測試31', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '新莊分行' },
            { 'order': '8', 'status': '正常戶', 'accType': '223', 'amount': '967785', 'type': '整存整付定存', 'accountId': '02223004445669', 'nickName': '測試32', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '營業部' },
            { 'order': '9', 'status': '正常戶', 'accType': '224', 'amount': '964985', 'type': '零存整付定存', 'accountId': '02224004445669', 'nickName': '測試33', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '營業部' },
            { 'order': '9', 'status': '正常戶', 'accType': '224', 'amount': '964445', 'type': '零存整付定存', 'accountId': '02224000541801', 'nickName': '測試34', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '營業部' },
            { 'order': '9', 'status': '靜止戶', 'accType': '224', 'amount': '969566', 'type': '零存整付定存', 'accountId': '02224000541802', 'nickName': '測試35', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '中山分行' },
            { 'order': '10', 'status': '正常戶', 'accType': '227', 'amount': '966695', 'type': '便利零存整付', 'accountId': '02227000544495', 'nickName': '測試36', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '松山分行' },
            { 'order': '10', 'status': '正常戶', 'accType': '227', 'amount': '964655', 'type': '便利零存整付', 'accountId': '02227000555956', 'nickName': '測試37', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '營業部' },
            { 'order': '10', 'status': '靜止戶', 'accType': '227', 'amount': '969566', 'type': '便利零存整付', 'accountId': '02227004456923', 'nickName': '測試38', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '信義分行' },
            { 'order': '10', 'status': '靜止戶', 'accType': '227', 'amount': '964568', 'type': '便利零存整付', 'accountId': '02227000596552', 'nickName': '測試39', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '大安分行' },
            { 'order': '11', 'status': '正常戶', 'accType': '191', 'amount': '967789', 'type': '綜存定存', 'accountId': '02191000579885', 'nickName': '測試40', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '新莊分行' },
            { 'order': '11', 'status': '正常戶', 'accType': '191', 'amount': '969965', 'type': '綜存定存', 'accountId': '02191004445669', 'nickName': '測試41', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '營業部' },
            { 'order': '11', 'status': '正常戶', 'accType': '191', 'amount': '964566', 'type': '綜存定存', 'accountId': '02191000541801', 'nickName': '測試42', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '營業部' },
            { 'order': '12', 'status': '靜止戶', 'accType': '292', 'amount': '969886', 'type': '綜存存本取息', 'accountId': '02292000541802', 'nickName': '測試43', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '中山分行' },
            { 'order': '12', 'status': '正常戶', 'accType': '292', 'amount': '966652', 'type': '綜存存本取息', 'accountId': '02292000544495', 'nickName': '測試44', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '松山分行' },
            { 'order': '12', 'status': '正常戶', 'accType': '292', 'amount': '967789', 'type': '綜存存本取息', 'accountId': '02292000555956', 'nickName': '測試45', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '營業部' },
            { 'order': '13', 'status': '靜止戶', 'accType': '293', 'amount': '966526', 'type': '綜存整存整付', 'accountId': '02293004456923', 'nickName': '測試46', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '信義分行' },
            { 'order': '13', 'status': '靜止戶', 'accType': '293', 'amount': '967736', 'type': '綜存整存整付', 'accountId': '02293000596552', 'nickName': '測試47', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '大安分行' },
            { 'order': '13', 'status': '正常戶', 'accType': '293', 'amount': '969965', 'type': '綜存整存整付', 'accountId': '02293000579885', 'nickName': '測試48', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '新莊分行' },
            { 'order': '13', 'status': '正常戶', 'accType': '293', 'amount': '969985', 'type': '綜存整存整付', 'accountId': '02293004445669', 'nickName': '測試49', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '營業部' },
            { 'order': '13', 'status': '正常戶', 'accType': '293', 'amount': '966588', 'type': '綜存整存整付', 'accountId': '02293000541801', 'nickName': '測試50', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '營業部' },
            { 'order': '14', 'status': '靜止戶', 'accType': '128', 'amount': '969566', 'type': '定期存款', 'accountId': '02128000541802', 'nickName': '測試51', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '中山分行' },
            { 'order': '14', 'status': '正常戶', 'accType': '128', 'amount': '969996', 'type': '定期存款', 'accountId': '02128000544495', 'nickName': '測試52', 'currencyCode': 'ZAR', 'currencyName': '巴西幣', 'branchName': '松山分行' },
            { 'order': '14', 'status': '正常戶', 'accType': '128', 'amount': '968856', 'type': '定期存款', 'accountId': '02128000555956', 'nickName': '測試53', 'currencyCode': 'JPY', 'currencyName': '日圓', 'branchName': '營業部' },
            { 'order': '15', 'status': '靜止戶', 'accType': '198', 'amount': '969920', 'type': '綜存定存', 'accountId': '02198004456923', 'nickName': '測試54', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '信義分行' },
            { 'order': '15', 'status': '靜止戶', 'accType': '198', 'amount': '964655', 'type': '綜存定存', 'accountId': '02198000596552', 'nickName': '測試55', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '大安分行' },
            { 'order': '15', 'status': '正常戶', 'accType': '198', 'amount': '964556', 'type': '綜存定存', 'accountId': '02198000579885', 'nickName': '測試56', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '新莊分行' },
            { 'order': '15', 'status': '正常戶', 'accType': '198', 'amount': '967785', 'type': '綜存定存', 'accountId': '02198004445669', 'nickName': '測試57', 'currencyCode': 'TWD', 'currencyName': '台幣', 'branchName': '營業部' }
        ]
    }
};

let testResponse = {
	"apiId": "SPEC00040101",
	"token": {
		"requestId": "",
		"responseTime": "2020-07-10 14:27:50",
		"lang": "zh_TW"
	},
	"resFlag": "0",
	"resMessage": {
		"errorCode": "",
		"errorMsg": ""
	},
	"resContent": [{
		"title": "current",
		"rowData": [{
			"order": "0000",
			"nickName": "",
			"accType": "101",
			"type": "支票存款",
			"currencyCode": "NTD",
			"currencyName": "台幣",
			"status": "正常戶",
			"branch": {
				"code": "08",
				"name": "台中分行",
				"englishName": "Taichung Branch",
				"order": "A008"
			},
			"amount": "1.00",
			"accountId": "08101000020541"
		},
		{
			"order": "0000",
			"nickName": "",
			"accType": "101",
			"type": "支票存款",
			"currencyCode": "NTD",
			"currencyName": "台幣",
			"status": "正常戶",
			"branch": {
				"code": "08",
				"name": "台中分行",
				"englishName": "Taichung Branch",
				"order": "A008"
			},
			"amount": "1.00",
			"accountId": "40203000055008"
		},
		{
			"order": "2000",
			"nickName": "",
			"accType": "203",
			"type": "活儲存款",
			"currencyCode": "NTD",
			"currencyName": "台幣",
			"status": "正常戶",
			"branch": {
				"code": "08",
				"name": "台中分行",
				"englishName": "Taichung Branch",
				"order": "A008"
			},
			"amount": "0.00",
			"accountId": "08203000143039"
		},
		{
			"order": "2000",
			"nickName": "",
			"accType": "203",
			"type": "活儲存款",
			"currencyCode": "USD",
			"currencyName": "美元",
			"status": "正常戶",
			"branch": {
				"code": "08",
				"name": "台中分行",
				"englishName": "Taichung Branch",
				"order": "A008"
			},
			"amount": "0.00",
			"accountId": "08203000143039"
		},
		{
			"order": "2001",
			"nickName": "",
			"accType": "203",
			"type": "活儲存款",
			"currencyCode": "NTD",
			"currencyName": "台幣",
			"status": "正常戶",
			"branch": {
				"code": "08",
				"name": "台中分行",
				"englishName": "Taichung Branch",
				"order": "A008"
			},
			"amount": "-134,648.00",
			"accountId": "08203000241976"
		},
		{
			"order": "4000",
			"nickName": "",
			"accType": "108",
			"type": "活期存款",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "正常戶",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05108009633128"
		},
		{
			"order": "4001",
			"nickName": "",
			"accType": "108",
			"type": "活期存款",
			"currencyCode": "AUD",
			"currencyName": "澳幣",
			"status": "正常戶",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "0",
			"accountId": "05108000051426"
		},
		{
			"order": "4002",
			"nickName": "",
			"accType": "108",
			"type": "活期存款",
			"currencyCode": "CAD",
			"currencyName": "加拿大幣",
			"status": "正常戶",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "0",
			"accountId": "05108000051426"
		},
		{
			"order": "4003",
			"nickName": "",
			"accType": "108",
			"type": "活期存款",
			"currencyCode": "EUR",
			"currencyName": "歐元",
			"status": "正常戶",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "233,212.34",
			"accountId": "05108000051426"
		},
		{
			"order": "4004",
			"nickName": "",
			"accType": "108",
			"type": "活期存款",
			"currencyCode": "GBP",
			"currencyName": "英鎊",
			"status": "正常戶",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "4,020.52",
			"accountId": "05108000051426"
		},
		{
			"order": "4005",
			"nickName": "",
			"accType": "108",
			"type": "活期存款",
			"currencyCode": "JPY",
			"currencyName": "日圓",
			"status": "正常戶",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "38,365,456.76",
			"accountId": "05108000051426"
		},
		{
			"order": "4006",
			"nickName": "",
			"accType": "108",
			"type": "活期存款",
			"currencyCode": "THB",
			"currencyName": "泰銖",
			"status": "正常戶",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "0",
			"accountId": "05108000051426"
		},
		{
			"order": "4007",
			"nickName": "",
			"accType": "108",
			"type": "活期存款",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "正常戶",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "343,188,558.57",
			"accountId": "05108000051426"
		},
		{
			"order": "4008",
			"nickName": "",
			"accType": "108",
			"type": "活期存款",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "正常戶",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05108009654378"
		},
		{
			"order": "4009",
			"nickName": "",
			"accType": "108",
			"type": "活期存款",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "正常戶",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,500.00",
			"accountId": "05108009654352"
		},
		{
			"order": "4010",
			"nickName": "",
			"accType": "108",
			"type": "活期存款",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "9,000.00",
			"accountId": "05108009632156"
		},
		{
			"order": "4011",
			"nickName": "",
			"accType": "108",
			"type": "活期存款",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "500.00",
			"accountId": "05108009632148"
		},
		{
			"order": "4012",
			"nickName": "",
			"accType": "108",
			"type": "活期存款",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "48,500.00",
			"accountId": "05108008881223"
		},
		{
			"order": "4013",
			"nickName": "",
			"accType": "108",
			"type": "活期存款",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "2,430.00",
			"accountId": "05108009998138"
		},
		{
			"order": "4014",
			"nickName": "",
			"accType": "108",
			"type": "活期存款",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05108009998146"
		},
		{
			"order": "4015",
			"nickName": "",
			"accType": "108",
			"type": "活期存款",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "206,000.00",
			"accountId": "05108009998829"
		},
		{
			"order": "4016",
			"nickName": "",
			"accType": "108",
			"type": "活期存款",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "200,000.00",
			"accountId": "05108009998861"
		},
		{
			"order": "4017",
			"nickName": "",
			"accType": "108",
			"type": "活期存款",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "24",
				"name": "仁愛分行",
				"englishName": "Jen Ai Branch",
				"order": "A024"
			},
			"amount": "50,000.00",
			"accountId": "24108007777774"
		},
		{
			"order": "4018",
			"nickName": "",
			"accType": "108",
			"type": "活期存款",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "44",
				"name": "承德分行",
				"englishName": "Cheng Teh Branch",
				"order": "A044"
			},
			"amount": "104,000.00",
			"accountId": "44108000088887"
		},
		{
			"order": "4019",
			"nickName": "",
			"accType": "108",
			"type": "活期存款",
			"currencyCode": "JPY",
			"currencyName": "日圓",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "211.00",
			"accountId": "05108000053135"
		},
		{
			"order": "4020",
			"nickName": "",
			"accType": "108",
			"type": "活期存款",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "97,865.44",
			"accountId": "05108000053135"
		},
		{
			"order": "4021",
			"nickName": "",
			"accType": "108",
			"type": "活期存款",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "104,201.83",
			"accountId": "05108000052121"
		},
		{
			"order": "4022",
			"nickName": "",
			"accType": "108",
			"type": "活期存款",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "2,000.00",
			"accountId": "05108000051515"
		}]
	},
	{
		"title": "timeDeposit",
		"rowData": [{
			"order": "6000",
			"nickName": "",
			"accType": "292",
			"type": "綜存存本取息",
			"currencyCode": "NTD",
			"currencyName": "台幣",
			"status": "正常戶",
			"branch": {
				"code": "08",
				"name": "台中分行",
				"englishName": "Taichung Branch",
				"order": "A008"
			},
			"amount": "50,000.00",
			"accountId": "08292000039952"
		},
		{
			"order": "6001",
			"nickName": "",
			"accType": "292",
			"type": "綜存存本取息",
			"currencyCode": "NTD",
			"currencyName": "台幣",
			"status": "正常戶",
			"branch": {
				"code": "08",
				"name": "台中分行",
				"englishName": "Taichung Branch",
				"order": "A008"
			},
			"amount": "50,000.00",
			"accountId": "08292000050314"
		},
		{
			"order": "6001",
			"nickName": "",
			"accType": "292",
			"type": "綜存存本取息",
			"currencyCode": "USD",
			"currencyName": "台幣",
			"status": "正常戶",
			"branch": {
				"code": "08",
				"name": "台中分行",
				"englishName": "Taichung Branch",
				"order": "A008"
			},
			"amount": "50,000.00",
			"accountId": "08292000050314"
		},
		{
			"order": "6002",
			"nickName": "",
			"accType": "292",
			"type": "綜存存本取息",
			"currencyCode": "NTD",
			"currencyName": "台幣",
			"status": "正常戶",
			"branch": {
				"code": "08",
				"name": "台中分行",
				"englishName": "Taichung Branch",
				"order": "A008"
			},
			"amount": "50,000.00",
			"accountId": "08292000056742"
		},
		{
			"order": "9000",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000004287"
		},
		{
			"order": "9001",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000004279"
		},
		{
			"order": "9002",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "4,322.00",
			"accountId": "05198000004237"
		},
		{
			"order": "9003",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000004156"
		},
		{
			"order": "9004",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000004148"
		},
		{
			"order": "9005",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000004130"
		},
		{
			"order": "9006",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000004122"
		},
		{
			"order": "9007",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000004114"
		},
		{
			"order": "9008",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000004106"
		},
		{
			"order": "9009",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000004091"
		},
		{
			"order": "9010",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000004083"
		},
		{
			"order": "9011",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000004075"
		},
		{
			"order": "9012",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000004067"
		},
		{
			"order": "9013",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000004059"
		},
		{
			"order": "9014",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000004041"
		},
		{
			"order": "9015",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000004025"
		},
		{
			"order": "9016",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000004017"
		},
		{
			"order": "9017",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "2,000.00",
			"accountId": "05198000004009"
		},
		{
			"order": "9018",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "2,000.00",
			"accountId": "05198000003998"
		},
		{
			"order": "9019",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "2,000.00",
			"accountId": "05198000003964"
		},
		{
			"order": "9020",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003914"
		},
		{
			"order": "9021",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003891"
		},
		{
			"order": "9022",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,234.55",
			"accountId": "05198000003867"
		},
		{
			"order": "9023",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,222.00",
			"accountId": "05198000003817"
		},
		{
			"order": "9024",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "JPY",
			"currencyName": "日圓",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "900,000.00",
			"accountId": "05198000003809"
		},
		{
			"order": "9025",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,001.00",
			"accountId": "05198000003794"
		},
		{
			"order": "9026",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.99",
			"accountId": "05198000003786"
		},
		{
			"order": "9027",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "4,000.00",
			"accountId": "05198000003778"
		},
		{
			"order": "9028",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,660.12",
			"accountId": "05198000003760"
		},
		{
			"order": "9029",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "JPY",
			"currencyName": "日圓",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000,000.00",
			"accountId": "05198000003752"
		},
		{
			"order": "9030",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "2,233.44",
			"accountId": "05198000003736"
		},
		{
			"order": "9031",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "777,888.66",
			"accountId": "05198000003728"
		},
		{
			"order": "9032",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,001.11",
			"accountId": "05198000003697"
		},
		{
			"order": "9033",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "4,322.00",
			"accountId": "05198000003689"
		},
		{
			"order": "9034",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003663"
		},
		{
			"order": "9035",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "JPY",
			"currencyName": "日圓",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "900,000.00",
			"accountId": "05198000003655"
		},
		{
			"order": "9036",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "JPY",
			"currencyName": "日圓",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "169,876.00",
			"accountId": "05198000003647"
		},
		{
			"order": "9037",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "JPY",
			"currencyName": "日圓",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "155,000.00",
			"accountId": "05198000003639"
		},
		{
			"order": "9038",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "JPY",
			"currencyName": "日圓",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "155,000.00",
			"accountId": "05198000003621"
		},
		{
			"order": "9039",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "JPY",
			"currencyName": "日圓",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "155,000.00",
			"accountId": "05198000003613"
		},
		{
			"order": "9040",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,234.56",
			"accountId": "05198000003605"
		},
		{
			"order": "9041",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "JPY",
			"currencyName": "日圓",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "150,000.00",
			"accountId": "05198000003590"
		},
		{
			"order": "9042",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "JPY",
			"currencyName": "日圓",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "150,000.00",
			"accountId": "05198000003582"
		},
		{
			"order": "9043",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "JPY",
			"currencyName": "日圓",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "150,000.00",
			"accountId": "05198000003574"
		},
		{
			"order": "9044",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "JPY",
			"currencyName": "日圓",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "150,000.00",
			"accountId": "05198000003566"
		},
		{
			"order": "9045",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "JPY",
			"currencyName": "日圓",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000,000.00",
			"accountId": "05198000003558"
		},
		{
			"order": "9046",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "JPY",
			"currencyName": "日圓",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000,000.00",
			"accountId": "05198000003540"
		},
		{
			"order": "9047",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "GBP",
			"currencyName": "英鎊",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003532"
		},
		{
			"order": "9048",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,918.00",
			"accountId": "05198000003524"
		},
		{
			"order": "9049",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,234.00",
			"accountId": "05198000003516"
		},
		{
			"order": "9050",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "EUR",
			"currencyName": "歐元",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003338"
		},
		{
			"order": "9051",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "EUR",
			"currencyName": "歐元",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003299"
		},
		{
			"order": "9052",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "EUR",
			"currencyName": "歐元",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003281"
		},
		{
			"order": "9053",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "EUR",
			"currencyName": "歐元",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003273"
		},
		{
			"order": "9054",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003265"
		},
		{
			"order": "9055",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "EUR",
			"currencyName": "歐元",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003257"
		},
		{
			"order": "9056",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "EUR",
			"currencyName": "歐元",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003249"
		},
		{
			"order": "9057",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003231"
		},
		{
			"order": "9058",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "EUR",
			"currencyName": "歐元",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003215"
		},
		{
			"order": "9059",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "EUR",
			"currencyName": "歐元",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003207"
		},
		{
			"order": "9060",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "EUR",
			"currencyName": "歐元",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003192"
		},
		{
			"order": "9061",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "EUR",
			"currencyName": "歐元",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003184"
		},
		{
			"order": "9062",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "EUR",
			"currencyName": "歐元",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003176"
		},
		{
			"order": "9063",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "EUR",
			"currencyName": "歐元",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003168"
		},
		{
			"order": "9064",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "EUR",
			"currencyName": "歐元",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003150"
		},
		{
			"order": "9065",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "EUR",
			"currencyName": "歐元",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003142"
		},
		{
			"order": "9066",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "EUR",
			"currencyName": "歐元",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003134"
		},
		{
			"order": "9067",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "EUR",
			"currencyName": "歐元",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003126"
		},
		{
			"order": "9068",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "EUR",
			"currencyName": "歐元",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003118"
		},
		{
			"order": "9069",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "EUR",
			"currencyName": "歐元",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003100"
		},
		{
			"order": "9070",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "EUR",
			"currencyName": "歐元",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "891,000.00",
			"accountId": "05198000003095"
		},
		{
			"order": "9071",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "EUR",
			"currencyName": "歐元",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003087"
		},
		{
			"order": "9072",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "EUR",
			"currencyName": "歐元",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003061"
		},
		{
			"order": "9073",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "EUR",
			"currencyName": "歐元",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000003053"
		},
		{
			"order": "9074",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "EUR",
			"currencyName": "歐元",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000002992"
		},
		{
			"order": "9075",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "EUR",
			"currencyName": "歐元",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000002984"
		},
		{
			"order": "9076",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "EUR",
			"currencyName": "歐元",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000002950"
		},
		{
			"order": "9077",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "25,000.00",
			"accountId": "05198000002934"
		},
		{
			"order": "9078",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000002895"
		},
		{
			"order": "9079",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000002861"
		},
		{
			"order": "9080",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000002853"
		},
		{
			"order": "9081",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000002845"
		},
		{
			"order": "9082",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000002837"
		},
		{
			"order": "9083",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000002829"
		},
		{
			"order": "9084",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000002730"
		},
		{
			"order": "9085",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000002706"
		},
		{
			"order": "9086",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "2,870,000.00",
			"accountId": "05198000002489"
		},
		{
			"order": "9087",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "99,000.00",
			"accountId": "05198000002081"
		},
		{
			"order": "9088",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "CAD",
			"currencyName": "加拿大幣",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "5,000.00",
			"accountId": "05198000001857"
		},
		{
			"order": "9089",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "CAD",
			"currencyName": "加拿大幣",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,800.00",
			"accountId": "05198000001823"
		},
		{
			"order": "9090",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,800.00",
			"accountId": "05198000001815"
		},
		{
			"order": "9091",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "CAD",
			"currencyName": "加拿大幣",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "5,000.00",
			"accountId": "05198000001069"
		},
		{
			"order": "9092",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,200.00",
			"accountId": "05198000001043"
		},
		{
			"order": "9093",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "更正",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "0",
			"accountId": "05198000000233"
		},
		{
			"order": "9094",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "更正",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "0",
			"accountId": "05198000000225"
		},
		{
			"order": "9095",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "更正",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "0",
			"accountId": "05198000000217"
		},
		{
			"order": "9096",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "更正",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "0",
			"accountId": "05198000000160"
		},
		{
			"order": "9097",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "1,000.00",
			"accountId": "05198000000039"
		},
		{
			"order": "9098",
			"nickName": "",
			"accType": "198",
			"type": "綜存定存",
			"currencyCode": "USD",
			"currencyName": "美金",
			"status": "",
			"branch": {
				"code": "05",
				"name": "總行國外部",
				"order": "A005"
			},
			"amount": "5,200.00",
			"accountId": "05198000000005"
		}]
	}]
}

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
        'rowData': [

        ]
    }
};

export const api_response = { ...df_response, ...testResponse };
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
