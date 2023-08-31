/**
 * 帳號選單設定
 * 
 */
export class TransAcctPopupOptions {
    title?: string;     // 自定標題
    data?: Array<any>; // 帳號列表
    select?: string; // 選擇or預設之帳號
    type?: string; // 類型，'2': 信卡繳卡費
    currency?: string; // 幣別
    special?: boolean; // 是否需判斷幣別

    constructor() {
        this.title = 'POPUP.ACCOUNT.SELECT';
        this.data = [];
        this.select = '';
        this.type = '';
        this.currency = '';
        this.special = false;
    }
}
