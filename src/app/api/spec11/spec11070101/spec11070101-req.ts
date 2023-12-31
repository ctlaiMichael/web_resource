/**
 * Request: SPEC11070101-已實現損益查詢
 */
// ------------------ 規格 Start ----------------- //
// 02	role	string	角色	 企業戶: ENTREPRENEUR
//                              個人戶: INDIVIDUAL
//                              信用卡戶: CARDHOLDER
// 02	userIp	    string	IP位置	
// 02	channel	    string	通路(MB)	預設：MB
// 02	lang	    string	語言	zh_TW, en_US, zh_CN
// 02	deviceId	string	機碼	
// 02	deviceOs	string	系統	iPhone, Android
// 02	deviceOsVer	string	系統版本	10.2.1/11.1.3…
// 02	appMainVer	string	應用程序主版本	
// 02	appSubVer	string	應用程序子版本	
// 01	reqContent	object		
// 02	startDate	string	查詢期間(起)	
// 02	endDate	    string	查詢期間(迄)	
// 02	paginator	object	分頁器	
// 03	pageSize	string	一頁的筆數大小	
// 03	pageNumber	string	查詢的頁數	
// 03	sortColName	string	排序的資料表欄位名稱	
// 03	sortDirection	string	排序欄位	

// ------------------ 規格 End ----------------- //

export const SPEC11070101Req = {
    "startDate": "",
    "endDate": "",
    "paginator": {
        "pageSize": "3",
        "pageNumber": "1",
        "sortColName": "buyDate",
        "sortDirection": "ASC"
    }

};

