/**
 * 交易結果參數設定
 */
export class ResultStatusTemp {
    classType?: string; // 訊息提示類型success, warning, error
    title?: string; // 標題
    title_trans?: string; // 交易功能標題
    title_params?: any; // 副標題i18n參數
    msg?: string; // 副標題
    msg_params?: any; // 副標題i18n參數
    responseTime?: string; // 交易時間
    // button?: string; // 其他按鈕
    // buttonPath?: string; // 按鈕返回頁面
    // mainInfo?: Array<any>;
    // detailData?: Array<any>;
    showData = {
        content: false, // 顯示副標題
        // mainInfo: false, // 顯示副標題資訊
        // detail: false // 顯示細節
    };
    // leftBtnIcon?: string; // 左側選單

    constructor(
    ) {
        this.classType = 'success';
        this.title = 'ERROR.API.SUCCESS'; // 處理成功
        this.title_trans = 'ERROR.API.SUCCESS_PARAMS';
        this.title_params = {
            param: 'ERROR.API.TRANSFER'
        };
        this.msg = '';
        this.msg_params = {};
        this.responseTime = '';
        // this.button = 'BTN.RETURN_HOME'; // 返回首頁
        // this.buttonPath = 'home';
        // this.mainInfo = [];
        // this.detailData = [];
        // this.leftBtnIcon = 'menu';
    }

}
