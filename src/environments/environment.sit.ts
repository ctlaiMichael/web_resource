/**
 * 環境變數 [整合模式(廠商內部環境)]
 * 請設定angular.json和package.json
 * 
 * NATIVE=true, ONLINE=true
 */
export const environment = {
    PRODUCTION: false,
    SERVER_URL: 'http://192.168.100.132:7000', // Server位置(UAT測試)
    API_URL: 'comm', // api入口(電文路徑)
    // [包版模式設定]
    ONLINE: true, // 是否連線測試
    SERVER_CERT_CHECK: false,
    NATIVE: true, // 是否build到手機上測試
    DIRECTUPDATE: true, // 是否啟動版本同步機制,DirectUpdate檢查
    CHALLENGE_RESPONSE_FLAG: true, // 啟動challenge response模式
    OPEN_LOGIN: false, // 臨時需求!!!!(登入還沒好處理) true是會不檢核登入機制
    // -------------------- [開發專用設定] -------------------- //
    APP_ERROR_COSE_SHOW: true, // 是否顯示app error code (handle error)
    // LOG level: OFF > ERROR > WARN > INFO > DEBUG > LOG
    // 當array時(開發用)，可吐出多種step('LOG_LEVEL allow string')
    LOG_LEVEL: ['LOG', 'Cache', 'Telegram', 'Security', 'TelegramBase', 'LoadApp', 'Init', 'Mscale'],
    LOG_SHOW_ERROR: false, // 設定為true時會在log-util.ts顯示錯誤檔案
    SIMULATION_TIME: 1000, // 模擬電文模擬秒數
    // -------------------- [通訊設定] -------------------- //
    HTTP_TIMEOUT: 180000,
    // [停機公告機制]
    SERVER_ANNO_URL: 'http://localhost:4200/app_disabled.json', // 停機公告檔案路徑(server), 空值則為關閉此機制
    CLIENT_ANNO_URL: './assets/data/terms/maintain.json', // 停機公告檔案路徑(client), 空值則為關閉此機制
    // -------------------- [業務功能設定] -------------------- //
    AUTOLOGOUT_TIME: 300,  // 自動登出時間(秒)
    WARNING_BEFORE_LOGOUT_TIME: 60,  // 自動登出前提示時間(秒)
    // -------------------- [Challenge Response] -------------------- //
    // REGISTER: '',
    // HAND_SHAKE: '',
    // EXCHANGE_KEY: '',
    DOWNLOAD_PATCH: 'downloadpatch/*.rest?t=/*',
    // AUTHORIZATION_KEY: 'hitrust_auth',
    AUTH_TOKEN_KEY: 'scsb_ht',
    AUTHORIZATION_KEY: 'Authorization',
    AUTH_CHECK_TIMEOUT: true, // 是否啟動client的timeout檢核
    AUTH_TIME: 1500, // mscale token timeout(need retry) 1500 = 25 min
    WARNING_BEFORE_AUTH_TIME: 60,  // mscale token timeout前提示時間(秒)
    // -------------------- [特定參數設定] -------------------- //
    GOOGLE_MAP_API_KEY: ''
};

