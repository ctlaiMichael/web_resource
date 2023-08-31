/**
 * 幣別選單設定
 * data: [
 *      {
 *          currencyCode: 'USD',
 *          currencyName: '美金'
 *      }
 * ]
 */
export class CurrencyFlagPopupOptions {
    title?: string;     // 自定標題
    data?: Array<any>; // 幣別列表
    selectCurrency?: string; // 已選擇幣別
    type?: string;

    constructor() {
        this.title = 'POPUP.CURRENCY_SELECT.TITLE';
        this.data = [];
        this.selectCurrency = '';
        this.type = 'normal';
    }
}
