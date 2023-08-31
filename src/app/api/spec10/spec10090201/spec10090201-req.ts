/**
 * Request: SPEC10090201-匯率到價通知新增、修改、刪除
 */

// ------------------ 規格 Start ----------------- //

// 層級	欄位名稱           Data Type	欄位說明	備註
// 01	apiId	          string		
// 01	token	          object		
// 02	規則請參照ApiBase-API基本框架規格文件
// 01	reqContent        object		
// 02	type	          string	   型態	       create/update/delete
// 02	record	          object	   設定記錄	
// 03	settingTime       string	   設定的時間   type為delete時僅需待此欄位
// 03	email	          string	   使用者e-mail	
// 03	transInCurrency   object	   轉入幣	
// 04	currencyCode	  string	   轉入幣別代號	
// 04	currencyName	  string	   轉入幣別名稱	
// 04	buyRate	          string	   轉入幣買匯	
// 04	sellRate	      string	   轉入幣賣匯	
// 03	transOutCurrency  object	   轉出幣	
// 04	currencyCode	  string	   轉出幣別代號	
// 04	currencyName	  string	   轉出幣別名稱	
// 04	buyRate	          string	   轉出幣買匯	
// 04	sellRate	      string	   轉出幣賣匯	
// 03	exchangeRate	  string	   參考匯率	
// 03	expectedRate	  string	   預期匯率	
// 03	noticeDateRange	  object	   通知日期區間	
// 04	start	          string	   開始日期	
// 04	end	              string	   結束日期	

// ------------------ 規格 End ----------------- //

export const SPEC10090201Req = {
    action: "",
    record: {
        settingTime: "",
        email: "",
        transInCurrency: {
            currencyCode: "",
            currencyName: "",
            buyRate: "",
            sellRate: ""
        },
        transOutCurrency: {
            currencyCode: "",
            currencyName: "",
            buyRate: "",
            sellRate: ""
        },
        referenceRate: "",
        expectedRate: "",
        noticeDateRange: {
            start: "",
            end: ""
        }
    }
};

