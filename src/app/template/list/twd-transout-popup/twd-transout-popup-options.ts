/**
 * 台幣轉出帳號popup
 * 
 */
export class TwdTransOutPopupOptions {
    title?: string;
    data?: Array<any>;
    select?: string;
    type?: string;
    offenAcctData?: Array<any>;

    constructor() {
        this.title = 'POPUP.ACCOUNT.SELECT';
        this.data = [];
        this.select = '';
        this.type = '';
        this.offenAcctData = [];
    }
}
