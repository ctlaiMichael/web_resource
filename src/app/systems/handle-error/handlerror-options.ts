export class HandleErrorOptions {
    status?: boolean; // 判斷狀態
    type?: string; // 模式 錯誤訊息頁面(message) 導轉到某一頁(redirect) popup(dialog)
    title?: string; // 標題: default 提醒您
    title_trans?: string; // 標題(交易結果專用標題)
    content?: string; // 錯誤訊息
    msg?: string; // 同content
    help?: string; // 錯誤說明（開發使用）
    button?: string; // 確認
    buttonList?: Array<any>; // 自定義按鈕字樣
    backType?: string; // type = redirect 啟用: '0'= 回首頁 '1'= 返回上一頁 'route/path'= 直接連接到各頁面
    classType?: string; // 訊息提示類型success, warning, error
    app_error_code?: string; // app定義的code 代碼
    app_error_code_hide?: boolean; // 是否指定不顯示
    resultCode?: string; // 錯誤代碼
    resultType?: string; // 錯誤類型
    // resultType (check 驗證失敗, security: 安控失敗, server: 伺服器回傳, cre2ee: 要重做CR E2EE, gateway: GateWay回傳)
    resultData?: any; // 原始資料
    from_page?: any; // 來源頁面
    dataTime?: any; // 查詢時間

    // 結果頁追加參數
    header_title?: string; // header title 改變
    title_params?: any = {}; // 副標題i18n參數
    content_params?: any = {}; // 訊息i18n參數
    buttonPath?: string; // 按鈕返回頁面
    mainInfo?: Array<any>; // 黃色區塊 [{title: '標題', content: '值'}]
    detailData?: Array<any>; // 雙欄位（一左一右）資訊 [{title: '標題', content: '值'}]
    notice?: string; // 提醒您區塊
    leftBtnIcon?: string; // 左側選單

    constructor(setObj: string | object = 'ERROR.DEFAULT', title: string = 'ERROR.INFO_TITLE') {
        this.status = false;
        this.type = 'dialog';
        this.title = title;
        this.title_trans = '';
        this.button = 'BTN.CHECK';
        // this.button = 'BTN.RETURN_HOME'; // 返回首頁
        // this.buttonPath = 'home';
        this.classType = 'error';
        this.title_params = {};

        // app error 控制參數
        this.help = '';
        this.app_error_code = '';
        this.app_error_code_hide = false;

        // 結果頁追加參數
        this.content_params = {};
        this.mainInfo = [];
        this.detailData = [];
        this.resultCode = '';
        this.resultType = '';

        if (typeof setObj == 'string') {
            this.content = setObj;
        } else if (typeof setObj == 'object') {
            let tmp: any;
            for (tmp in setObj) {
                if (!setObj.hasOwnProperty(tmp)) {
                    continue;
                }
                this[tmp] = setObj[tmp];
            }
        }

    }

}
