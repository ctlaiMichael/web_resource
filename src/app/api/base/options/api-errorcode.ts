/**
 * 行動中台ErrorCode清單
 * 並對應error_code.ts
 * 設定APP的錯誤訊息
 */
/**
 * API的specialDoEvent的type
 * 用來進行後續辨識
 */
export const API_ERROR_TYPE_LIST = {
    'login': 'NEED_LOGOUT',
    'security': 'NEED_SECURITY_REINPUT',
    'gateway': 'GATEWAY_ERROR'
};


/**
 * Login Error (登入錯誤)
 */
export const API_LOGIN_ERRORCODE = {
    '403': 'LOGIN_AUTH_ERROR'
};

/**
 * Security Error (交易驗證錯誤)
 */
export const API_SECURITY_ERRORCODE = {
    '401': 'SECURITY_CHECK_ERROR'
    // 身分證驗錯誤
    , '401_1': 'SECURITY_CHECK_ERROR_1'
    // OTP驗錯誤
    , '401_2': 'SECURITY_CHECK_ERROR_2'
    // 快速驗錯誤
    , '401_3': 'SECURITY_CHECK_ERROR_3'
};


/**
 * Login Error (登入錯誤)
 */
export const API_GATEWAY_ERRORCODE = {
    '23': 'NEED_CR_RETRY'
};


