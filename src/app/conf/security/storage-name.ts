/**
 * 控管儲存到storage的key name
 */

/**
 * local storage
 */
export const LOCAL_STORAGE_NAME_LIST = {
    // 快速登入設定資訊暫存
    QUICK_LOGIN_STATUS: 'QuickStatus',
    // 登入記住我資訊
    REMEMBER_DATA: 'Remember',
    // 首次啟動登陸記住
    FIRSTAGREE: 'firstagree',
    // 帳務資產顯示與否註記
    ACCT_SHOW_STATUS: 'AcctShowStatus'
};

/**
 * session storage
 */
export const SESSION_STORAGE_NAME_LIST = {
    // challenge response auth info
    CHALLENGE: 'CR_Status',
    CHALLENGE_AUTH_1: 'server_auth',
    CHALLENGE_AUTH_2: 'hitrust_auth'
};