/**
 * Request: SPEC07030201-綜定存自動轉期解除約定
 */

// ------------------ 規格 Start ----------------- //

// 層級	欄位名稱           Data Type	欄位說明	備註
// 01	apiId	          string		
// 01	token	          object		
// 02	規則請參照ApiBase-API基本框架規格文件
// 01	reqContent        object		
// 02	accountId	      string	   定存帳號	        
// 02	turnCount	      string	   轉期次數
// 02	turnType	      string	   轉期方法   

// ------------------ 規格 End ----------------- //

export const SPEC07030201Req = {
    accountId: '',
    turnCount: '',
    turnType: ''
};

