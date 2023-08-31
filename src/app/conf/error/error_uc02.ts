/**
 * 一般登入錯誤參數設定
 */
export const ERROR_UC02 = {
    // -------------------- [一般登入 0201 ] -------------------- //
    // 參數格式錯誤
    'SPEC02010101_SERVER_REP': {
        app_error_code: '0201001',
        app_error_code_hide: false,
        help: '伺服器回傳錯誤',
        title: 'ERROR.TITLE',
        // 未預期性錯誤
        content: 'ERROR.RSP_FORMATE_ERROR'
    },
    'SPEC02010101_MOBILE_BANK': {
        app_error_code: '0201002',
        app_error_code_hide: false,
        help: '尚未開通行動網銀賬戶',
        title: 'ERROR.TITLE',
        // 未預期性錯誤
        content: 'ERROR.LOGIN.NEED_APPLY_MOBILE_BANK'
    },
    'SPEC02010201_SERVER_REP': {
        app_error_code: '0201002',
        app_error_code_hide: false,
        help: '伺服器回傳錯誤',
        title: 'ERROR.TITLE',
        // 未預期性錯誤
        content: 'ERROR.RSP_FORMATE_ERROR'
    }
};
