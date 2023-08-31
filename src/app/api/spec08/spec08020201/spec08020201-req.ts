/**
 * Request: SPEC08020201-貸款服務-本金利息明細查詢(利息)
 */
// ------------------ 規格 Start ----------------- //
// start	string	查詢開始日期
// end	string	查詢結束日期
// ------------------ 規格 End ----------------- //

export const SPEC08020201Req = {
    accountId: '',
    dateRange: {
        start: '',
        end: '',
    },
    paginator: {
        pageSize: '',
        pageNumber: '',
        sortColName: 'txDate',
        sortDirection: 'DESC'
    }
};

