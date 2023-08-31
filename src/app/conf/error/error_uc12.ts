/**
 * 信用卡錯誤參數設定
 */
export const ERROR_UC12 = {
    // -------------------- [信用卡 1201 ] -------------------- //
    // 參數格式錯誤
    'CARDS_PAYMENT_SETDATA_ERROR': {
        app_error_code: '1201001',
        app_error_code_hide: false,
        help: '帳單的回傳格式資料錯誤',
        title: 'ERROR.TITLE',
        // 查無資料
        content: 'ERROR.EMPTY'
    },
    'CARDS_PAYMENT_DUEDATE_ERROR': {
        app_error_code: '1201002',
        app_error_code_hide: false,
        help: '帳單的dueDate資料錯誤',
        title: 'ERROR.TITLE',
        // 查無資料
        content: 'ERROR.EMPTY'
    },
    'CARDS_UNPAID_EMPTY_ERROR': {
        app_error_code: '1201003',
        app_error_code_hide: false,
        help: '未出帳消費查詢consumeData本期消費紀錄資料為空',
        title: 'ERROR.TITLE',
        // 查無資料
        content: 'ERROR.EMPTY'
    }
};
