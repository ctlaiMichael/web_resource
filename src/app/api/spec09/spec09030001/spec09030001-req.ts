/**
 * Request: SPEC09030001-外幣兌換取得帳號資料
 */

// ------------------ 規格 Start ----------------- //

// 層級	欄位名稱           Data Type	欄位說明	備註
// 01	apiId	          string		
// 01	token	          object		
// 02	規則請參照ApiBase-API基本框架規格文件
// 01	reqContent        object		
// 02	transType	      string	   型態	       1:台轉外, 2:外轉台

// ------------------ 規格 End ----------------- //

export const SPEC09030001Req = {
    transType: ""
};

