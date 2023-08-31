/**
 * 信卡月份選單設定
 * 
 */
export class CardMonthPopupOptions {
    title?: string;     // 自定標題
    data?: Array<any>; // 幣別列表
    select?: string; //選擇or預設之帳號
    type?: string; //類型，1: 帳戶明細...等其他 , 2: 貸款

    constructor() {
        this.title = 'POPUP.ACCOUNT.SELECT';
        this.data = [];
        this.select = '';
        this.type = '';
    }
}
