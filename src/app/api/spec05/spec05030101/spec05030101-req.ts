/**
 * Request: SPEC05030101-帳戶明細查詢
 */
// ------------------ 規格 Start ----------------- //
// 02	accountId	string	帳號編號
// 02	currencyCode	string	幣別代號
// 02	dateRange	object	日期物件
// 03	start	string	起始日期
// 03	end	string	結束日期
// 02	paginator	object	分頁器
// 03	pageSize	string	一頁的筆數
// 03	pageNumber	string	查詢的頁數
// 03	sortColName	string	欄位名稱，以此排序
// 03	sortDirection	string	排序欄位方向
// ------------------ 規格 End ----------------- //

export const SPEC05030101Req = {
    account: {
        accountId: '',
        currencyCode: ''
    },
    dateRange: {
        start: '',
        end: ''
    },
    paginator: {
        pageSize: '',
        pageNumber: '',
        sortColName: 'txDate',
        sortDirection: 'DESC'
    }
};

