/**
 * Request: SPEC02010201-登出
 */

// ------------------ 規格 Start ----------------- //

// 層級	欄位名稱	 Data Type	 欄位說明	 備註
// 01	apiId	    string	    API編號	
// 01	token	    object		
// 02	requestId	string	    交易識別碼	
// 02	requestTime	string	    交易時間	
// 02	sessionId	string	    sessionId	
// 02	userId	    string	    身份證號/統一編號	
// 02	userName	string	    使用者代號	
// 02	role	    string	    角色	    企業戶: ENTREPRENEUR 個人戶: INDIVIDUAL 信用卡戶: CARDHOLDER
// 02	userIp	    string	    IP位置	
// 02	channel	    string	    通路(MB)	預設：MB
// 02	lang	    string	    語言	    zh_TW, en_US, zh_CN
// 02	deviceId	string	    機碼	
// 02	deviceOs	string	    系統	    iPhone, Android
// 02	deviceOsVer	string	    系統版本	10.2.1/11.1.3…
// 02	appMainVer	string	    應用程序主版本	
// 02	appSubVer	string	    應用程序子版本	
// 01	reqContent	object		
// 02	userId	    string			

// ------------------ 規格 End ----------------- //

export const SPEC02010201Req = {
    userId: ""
};

