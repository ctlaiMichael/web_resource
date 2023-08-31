/**
 * 結匯性質選單設定
 * 
 */
export class RemitNaturePopupOptions {
    title?: string;     // 自定標題
    data?: Array<any>; // 結匯性質列表
    select?: any; // 選擇or預設之結匯性質

    constructor() {
        this.title = 'POPUP.MENU.TITLE';
        this.data = [];
        this.select = {
            groupId: '',
            groupName: '',
            code: '',
            name: ''
        };
    }
}
