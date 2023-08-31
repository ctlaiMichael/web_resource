/**
 * Request: SPEC10070001-外幣歷史匯率查詢
 */

// ------------------ 規格 Start ----------------- //

// 層級 欄位名稱        Data Type       欄位說明        備註
// 01	apiId	       string	       API編號	
// 01	token	       object		
// 02	規則請參照ApiBase-API基本框架規格文件
// 01	reqContent	   object		
// 02	currencyCode   string	       幣別代碼	
// 02	dateRange	   object	       查詢區間	
// 03	start	       string	       查詢開始日期    開始日期<結束日期
// 03	end	           string	       查詢結束日期	

// ------------------ 規格 End ----------------- //

export const SPEC10070001Req = {
    currencyCode: '',
    dateRange: {
        start: '',
        end: ''
    }
};

