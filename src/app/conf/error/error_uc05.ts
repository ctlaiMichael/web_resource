/**
 * 帳戶資產查詢 UC-05
 */
export const ERROR_UC05 = {
    // -------------------- [帳務總覽 01 ] -------------------- //
    // 參數格式錯誤
    'SPEC05010101_SERVER_REP': {
        app_error_code: '0501001',
        app_error_code_hide: false,
        help: '伺服器回傳錯誤',
        title: 'ERROR.TITLE',
        // 未預期性錯誤
        content: 'ERROR.RSP_FORMATE_ERROR'
    },
    // 中台業務流程回傳錯誤
    'SPEC05010101_SERVER_BUSINESS_ERROR': {
        app_error_code: '0501002',
        app_error_code_hide: false,
        help: '中台resFlag不為0(失敗或異常)',
        title: 'ERROR.TITLE',
        // 目前資料結算處理中，暫不提供查詢功能
        content: 'DEPOSIT_OVERVIEW.ERROR.SERVER_BUSINESS_ERROR'
    },
    // 中台業務流程回傳錯誤
    'SPEC05010101_SERVER_MISSOBJ': {
        app_error_code: '0501003',
        app_error_code_hide: false,
        help: '中台回傳物件不存在',
        title: 'ERROR.TITLE',
        // 目前資料結算處理中，暫不提供查詢功能
        content: 'DEPOSIT_OVERVIEW.ERROR.SERVER_BUSINESS_ERROR'
    },
    // 查無任何資產資料
    'SPEC05010101_EMPTY': {
        app_error_code: '0501004',
        app_error_code_hide: false,
        help: '查無任何資產資料',
        title: 'ERROR.TITLE',
        // 未預期性錯誤
        content: 'ERROR.EMPTY'
    }
};
