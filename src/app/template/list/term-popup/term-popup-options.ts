/**
 * Note opton
 */
export class TermPopupOptions {
    title?: string;     // 自定標題
    content?: string;  // 自定內容
    content_list?: Array<any>; // 其他項目
    type?: string; // 類別, 用於判斷需不需要發api取得資料, EX: '1' 公開說明書(不發api)
    reqType?: any; // request 條款api類別, EX: Fund_Terms04_A 高收益配息風險預告書-A
    // showNumber?: boolean; // 是否顯示項目數值

    constructor() {
        this.title = '';
        this.content = '';
        this.content_list = [];
        this.type = '';
        this.reqType = [];
        // this.showNumber = false;
    }
}
