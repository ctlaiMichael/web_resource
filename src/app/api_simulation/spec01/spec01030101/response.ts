/**
 * 模擬api
 */
let data = {
	"apiId": "SPEC01030101",
	"token":{
	"requestId": "SPEC01030101",
	"responseTime": "2020-08-21 01:32:58",
	"lang": "zh_TW"
	},
	"resFlag": "0",
	"resContent":{
	"forceupdateMain": "2",
	"newMainVersion": "3.15.0826",
	"mainVersion": "3.15.0825",
	"forceupdateSub": "3",
	"newSubVersion": "1.2",
	"subVersion": "1.2"
	}
};

let df_response = {
    'resContent': {
        'apiId': 'SPEC01030101',
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
    'apiId': 'SPEC01030101',
    'token': {
        'requestId': '',
        'responseTime': '2020-06-20 18:18:31',
        'lang': 'zh_TW'
    },
    'resFlag': '1',
    "resMessage":{
    "errorCode": "AppVersionError.ERROR1",
    "errorMsg": "版本號不能為空"
    }
};
export const api_exception = {
    'errorCode': 'ERRAAAAAAA',
    'errorMsg': 'Test Error'
};
