/**
 * 此檔案定義伺服器規格
 */

/**
 * Api Paginator request Formate
 * 伺服器請求上傳的API 分頁 Request 規格
 */
export const API_PAGINATOR_REQUEST = {
    pageSize: '',
    pageNumber: '',
    sortColName: '',
    sortDirection: '',
};

/**
 * Api Paginator reponse Formate
 * 伺服器請求上傳的API 分頁 Reponse 規格
 */
export const API_PAGINATOR_REPONSE = {
    totalCount: '',
    pageSize: '',
    pageNumber: '',
    sortColName: '',
    sortDirection: '',
};

/**
 * Api Token request Formate
 * 伺服器請求上傳的API 固定資訊 Request 規格
 */
export const API_TOKEN_REQUEST = {
    "requestId": "",
    "requestTime": "",
    "accessToken": "",
    "userId": "",
    "userName": "",
    "role": "",
    "userIp": "",
    "channel": "",
    "lang": "",
    "deviceId": "",
    "deviceOs": "",
    "deviceOsVer": "",
    "appMainVer": "",
    "appSubVer": ""
};

/**
 * Api Token reponse Formate
 * 伺服器請求上傳的API 固定資訊 Reponse 規格
 */
export const API_TOKEN_REPONSE = {
    "requestId": "",
    "responseTime": "",
    "lang": ""
};


/**
 * API Request Formate
 * 伺服器請求上傳的API Request 規格
 */
let output_api_request = {
    "apiId": "",
    "token": {},
    "security": {}, // 安控
    "reqContent": {},
    // mscale 專用
    "_mscale_header": {
        "_api_id": "",
        "_system_id": "mobile"
    }
};
output_api_request.token = API_TOKEN_REQUEST;
export const API_REQUEST_FORMATE = output_api_request;

/**
 * API Response Formate
 * 伺服器回傳的API Response 規格 （業務功能正常）
 */
let output_api_reponse = {
    "apiId": "",
    "token": {},
    "resFlag": "",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    "resContent": {}
};
output_api_reponse.token = API_TOKEN_REPONSE;
export const API_RESPONSE_FORMATE = output_api_reponse;

/**
 * API Response Exception Formate
 * 伺服器回傳的API Exception Response 規格 （系統功能異常）
 */
export const API_RESPONSE_EXCEPTION = {
    "apiId": "",
    "responseTime": "",
    "errorCode": "",
    "errorMsg": ""
};


/**
 * Gateway Exception Formate
 * 伺服器回傳的API Exception Response 規格 （gateway系統功能異常）
 */
export const API_GATEWAY_EXCEPTION = {
    "return_code": '',
    "return_message": "" 
};

