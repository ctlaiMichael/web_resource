/**
 * Request: SPEC09030101-外幣兌換-台轉外交易
 */

// ------------------ 規格 Start ----------------- //

// 層級	欄位名稱           Data Type	欄位說明	備註
// 01	apiId	          string		
// 01	token	          object		
// 02	規則請參照ApiBase-API基本框架規格文件
// 01	reqContent        object		
// 02	type	          string	   型態	       twdToForeign/foreignToTwd

// ------------------ 規格 End ----------------- //

export const SPEC09030101Req = {
    liveNo: '',
    permitDateRange: {
        start: '',
        end: ''
    },
    birthday: '',
    transOutAccount: {
        nickName: '',
        currencyCode: '',
        accountId: '',
        balance: ''
    },
    transInAccount: {
        nickName: '',
        accountId: ''
    },
    remitNature: {
        groupId: '',
        groupName: '',
        code: '',
        name: ''
    },
    exchangeRate: '',
    usdRate: '',
    transOutAmt: '',
    transInAmt: ''
};

