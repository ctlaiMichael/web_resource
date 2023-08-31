/**
 * Request: SPEC08010002-定期存款-本金利息明細查詢
 */
// ------------------ 規格 Start ----------------- //
// start	string	查詢開始日期
// end	string	查詢結束日期
// ------------------ 規格 End ----------------- //

export const SPEC07010201Req = {
    accountId: '',
    currencyCode: '',
    dateRange: {
        start: '',
        end: '',
    },
    paginator: {
        pageSize: '',
        pageNumber: '',
        sortColName: 'date',
        sortDirection: 'DESC'
    }
};

