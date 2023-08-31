/**
 * 銀行分行選單設定
 * 
 */
export class BankCodePopupOptions {
    title?: string;     // 自定標題
    data?: Array<any>; // 代碼資料
    select?: string; //選擇or預設之分行
    type?: string; //類型

    constructor() {
        this.title = 'POPUP.BANK_CODE.SELECT';
        this.data = [];
        this.select = '';
        this.type = '';
    }
}
