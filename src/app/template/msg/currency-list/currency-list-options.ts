/**
 * 外幣資產總攬清單
 */
export class CurrencyListOptions {
    title?: string;     // 自定標題
    data?: Array<any>;  // 內容
    content_list?: Array<any>; // 其他項目
    showNumber?: boolean; // 是否顯示項目數值

    constructor() {
        this.title = '';
        this.data = [];
        this.content_list = [];
        this.showNumber = false;
    }
}
