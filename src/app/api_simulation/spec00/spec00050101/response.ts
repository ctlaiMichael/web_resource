/**
 * 模擬api
 */
let data = {
	"apiId": "SPEC00050101",
	"token": {
		"requestId": "SPEC00050101",
		"responseTime": "2020-08-14 09:31:19",
		"lang": "zh_TW"
	},
	"resFlag": "0",
	"resContent": {
		"systemVersion": "3.14.0813",
		"maintain": {
			"date": "2020/07/17",
			"start": "2020/07/16 00:30:00",
			"end": "2020/07/16 20:00:00",
			"msg": "很抱歉，本行於02/17 (一) 18:30~20:00 暫停行動網銀服務，造成您的不便，敬請見諒。",
			"en_msg": "Sorry! System is maintain!!!!!",
			"lastmodify": "2020/07/17 17:00:00"
		},
		"custServiceTel": "02-22700577",
		"serverTime": "2020-08-14 09:31:18",
		"logoutTime": "600",
		"httpTimeOut": "300",
		"cacheRowData": {
			"deposit-demand": {
				"ttl": 10,
				"keepAlive": "login",
				"groupList": ["deposit", "deposit-demand"]
			},
			"deposit-time": {
				"ttl": 10,
				"keepAlive": "login",
				"groupList": ["deposit", "deposit-time"]
			},
			"foreign-ir-deposit": {
				"ttl": 10,
				"keepAlive": "login",
				"groupList": ["deposit", "foreign-ir-deposit"]
			}
		}
	}
};

let df_response = {
    'resContent': {
        'apiId': 'SPEC00050101',
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
    'apiId': 'SPEC00050101',
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
