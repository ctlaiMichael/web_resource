/**
 * 基金標的popup
 * 
 */
export class FundCodePopupOptions {
    title?: string;
    data?: Array<any>;
    selectComp?: string;
    selectFund?: string;
    type?: string;
    investType?: string;
    // offenAcctData?: Array<any>;

    constructor() {
        this.title = 'POPUP.ACCOUNT.SELECT';
        this.data = [];
        this.selectComp = '';
        this.selectFund = '';
        this.type = '';
        this.investType = '';
        // this.offenAcctData = [];
    }
}
