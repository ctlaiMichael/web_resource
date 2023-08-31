/**
 * 模擬api
 * typeId 類別代號: 1 支存; 2 活存; 3 定存; 4 其他; 5 貸款; 6 信用卡;
 * 
 *   positive	string	正資產總和
 *   negative	string	負資產總和
 *   partTwd    object 台幣帳戶資產
 *      errorMsg	string	取資料失敗時的訊息
 *      totalBalance	string	累計可用餘額
 *      checkingAcctInfoData    object 支票存款資料
 *          typeTotalBalance
 *          account
 *      savingsAcctInfoData    object 活期存款資料
 *          typeTotalBalance
 *          account
 *      timeAcctInfoData        object 定期存款資料
 *          typeTotalBalance
 *          account
 *      otherAcctInfoData       object 其他存款資料
 *          typeTotalBalance
 *          account
 *   partForeign    object 外幣帳戶資產
 *      errorMsg	string	取資料失敗時的訊息
 *      totalBalance	string	累計可用餘額
 *      savingsAcctInfoData    object 活期存款資料
 *          typeTotalBalance  (typeTotalBalance為空)
 *          account
 *      timeAcctInfoData        object 定期存款資料
 *          typeTotalBalance  (typeTotalBalance為空)
 *          account
 *      otherAcctInfoData       object 其他存款資料
 *          typeTotalBalance  (typeTotalBalance為空)
 *          account
 *      currencyList    object array 幣別清單
 *   partNegative    object 負資產
 *      totalBalance	string	累計可用餘額
 *      loansInfoData       object 貸款資料
 *          errorMsg	string	取資料失敗時的訊息
 *      cardsInfoData       object 信用卡資料 (沒有account)
 *          errorMsg	string	取資料失敗時的訊息
 *   partInvest    object 投資資產
 *      totalBalance	string	累計可用餘額
 *      fundInfoData       object 基金集合資料
 *          errorMsg	string	取資料失敗時的訊息
 *      goldInfoData       object 黃金資料 (沒有account)
 *          errorMsg	string	取資料失敗時的訊息
 * 
 *  [account] object array	帳號
 *               accountId	string	帳號編號
 *               nickName	string	帳戶名稱
 *               currencyCode	string	幣別代碼
 *               accType    string 帳號別代碼
 *               type       string 帳號別名稱
 *               balance	string	只有一個餘額/金額
 *               accountBalance	string	帳上餘額(活支存)
 *               availableBalance	string	可用餘額(活支存)
 *               endDate	string	貸款結束日/定存到期日
 * 
 */
let resData1 = {
    "apiId": "SPEC05010101",
    "token": {
        "requestId": "",
        "responseTime": "2020-10-22 11:00:04",
        "lang": "en_US"
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    "resContent": {
        "positive": "160,833,056,439.63",
        "negative": "0.00",
        "partTwd": {
            "totalBalance": "130,952,740",
            "checkingAcctInfoData": {
                "typeTotalBalance": "0.00",
                "account": []
            },
            "savingsAcctInfoData": {
                "typeTotalBalance": "129,195,280.00",
                "account": [{
                    "nickName": "",
                    "accType": "203",
                    "type": "活儲存款",
                    "status": "正常戶",
                    "currencyCode": "NTD",
                    "availableBalance": "97,628,840.00",
                    "accountId": "09203000069182",
                    "accountBalance": "97,628,840.00"
                },
                {
                    "nickName": "",
                    "accType": "203",
                    "type": "活儲存款",
                    "status": "正常戶",
                    "currencyCode": "NTD",
                    "availableBalance": "9,705,280.00",
                    "accountId": "20203000235848",
                    "accountBalance": "9,705,280.00"
                },
                {
                    "nickName": "",
                    "accType": "203",
                    "type": "活儲存款",
                    "status": "正常戶",
                    "currencyCode": "NTD",
                    "availableBalance": "10,824,540.00",
                    "accountId": "40203000055008",
                    "accountBalance": "10,824,540.00"
                },
                {
                    "nickName": "",
                    "accType": "203",
                    "type": "活儲存款",
                    "status": "正常戶",
                    "currencyCode": "NTD",
                    "availableBalance": "9,638,526.00",
                    "accountId": "51203000075982",
                    "accountBalance": "9,638,526.00"
                },
                {
                    "nickName": "",
                    "accType": "204",
                    "type": "行員存款",
                    "status": "正常戶",
                    "currencyCode": "NTD",
                    "availableBalance": "1,398,094.00",
                    "accountId": "02204000004197",
                    "accountBalance": "1,398,094.00"
                }]
            },
            "timeAcctInfoData": {
                "typeTotalBalance": "1,757,460.00",
                "account": [{
                    "nickName": "",
                    "accType": "191",
                    "type": "綜存定存",
                    "currencyCode": "NTD",
                    "status": "0.63000",
                    "endDate": "108/07/29",
                    "accountId": "20191000213150",
                    "balance": "10,000.00"
                },
                {
                    "nickName": "",
                    "accType": "191",
                    "type": "綜存定存",
                    "currencyCode": "NTD",
                    "status": "0.60000",
                    "endDate": "108/11/03",
                    "accountId": "20191000213192",
                    "balance": "20,000.00"
                },
                {
                    "nickName": "",
                    "accType": "292",
                    "type": "綜存存本取息",
                    "currencyCode": "NTD",
                    "status": "1.07000",
                    "endDate": "110/07/30",
                    "accountId": "20292000213178",
                    "balance": "108,730.00"
                },
                {
                    "nickName": "",
                    "accType": "292",
                    "type": "綜存存本取息",
                    "currencyCode": "NTD",
                    "status": "1.07000",
                    "endDate": "110/08/07",
                    "accountId": "20292000213186",
                    "balance": "108,730.00"
                },
                {
                    "nickName": "",
                    "accType": "293",
                    "type": "綜存整存整付",
                    "currencyCode": "NTD",
                    "status": "1.07000",
                    "endDate": "110/10/29",
                    "accountId": "20293000213167",
                    "balance": "10,000.00"
                },
                {
                    "nickName": "",
                    "accType": "293",
                    "type": "綜存整存整付",
                    "currencyCode": "NTD",
                    "status": "1.38000",
                    "endDate": "102/03/04",
                    "accountId": "40293000155195",
                    "balance": "1,500,000.00"
                },
                {
                    "nickName": "",
                    "accType": "293",
                    "type": "綜存整存整付",
                    "currencyCode": "NTD",
                    "status": "1.31000",
                    "endDate": "102/12/02",
                    "accountId": "40293000180409",
                    "balance": "0.00"
                },
                {
                    "nickName": "",
                    "accType": "293",
                    "type": "綜存整存整付",
                    "currencyCode": "NTD",
                    "status": "1.31000",
                    "endDate": "102/12/10",
                    "accountId": "40293000180726",
                    "balance": "0.00"
                }]
            }
        },
        "partForeign": {
            "totalBalance": "1,000,000.00",
            "savingsAcctInfoData": {
                "typeTotalBalance": "0.00",
                "account": [{
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "AUD",
                    "currencyName": "澳幣",
                    "availableBalance": "0.00",
                    "accountId": "51108000010479",
                    "balance": "0.00",
                    "accountBalance": "0.00"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "CNY",
                    "currencyName": "人民幣",
                    "availableBalance": "99,999,969,278.68",
                    "accountId": "51108000010479",
                    "balance": "99,999,969,278.68",
                    "accountBalance": "100,156.72"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "EUR",
                    "currencyName": "歐元",
                    "availableBalance": "6,963.79",
                    "accountId": "51108000010479",
                    "balance": "6,963.79",
                    "accountBalance": "6,963.79"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "GBP",
                    "currencyName": "英鎊",
                    "availableBalance": "51.37",
                    "accountId": "51108000010479",
                    "balance": "51.37",
                    "accountBalance": "51.37"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "HKD",
                    "currencyName": "港幣",
                    "availableBalance": "0.00",
                    "accountId": "51108000010479",
                    "balance": "0.00",
                    "accountBalance": "1,777,335.42"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "JPY",
                    "currencyName": "日圓",
                    "availableBalance": "788,470.69",
                    "accountId": "51108000010479",
                    "balance": "788,470.69",
                    "accountBalance": "788,470.69"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "NZD",
                    "currencyName": "紐西蘭幣",
                    "availableBalance": "46.45",
                    "accountId": "51108000010479",
                    "balance": "46.45",
                    "accountBalance": "46.45"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "SEK",
                    "currencyName": "瑞典幣",
                    "availableBalance": "215.65",
                    "accountId": "51108000010479",
                    "balance": "215.65",
                    "accountBalance": "215.65"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "SGD",
                    "currencyName": "新加坡幣",
                    "availableBalance": "2,012.70",
                    "accountId": "51108000010479",
                    "balance": "2,012.70",
                    "accountBalance": "2,012.70"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "THB",
                    "currencyName": "泰銖",
                    "availableBalance": "42,842.85",
                    "accountId": "51108000010479",
                    "balance": "42,842.85",
                    "accountBalance": "42,842.85"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "USD",
                    "currencyName": "美金",
                    "availableBalance": "1,005,976,391.33",
                    "accountId": "51108000010479",
                    "balance": "1,005,976,391.33",
                    "accountBalance": "1,006,820,695.44"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "AUD",
                    "currencyName": "澳幣",
                    "availableBalance": "1,400.00",
                    "accountId": "40108000016494",
                    "balance": "1,400.00",
                    "accountBalance": "1,400.00"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "CHF",
                    "currencyName": "瑞士法郎",
                    "availableBalance": "39.05",
                    "accountId": "40108000016494",
                    "balance": "39.05",
                    "accountBalance": "39.05"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "CNY",
                    "currencyName": "人民幣",
                    "availableBalance": "10,924,638,713.19",
                    "accountId": "40108000016494",
                    "balance": "10,924,638,713.19",
                    "accountBalance": "10,924,638,713.19"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "EUR",
                    "currencyName": "歐元",
                    "availableBalance": "4,665.22",
                    "accountId": "40108000016494",
                    "balance": "4,665.22",
                    "accountBalance": "4,665.22"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "GBP",
                    "currencyName": "英鎊",
                    "availableBalance": "2,257.68",
                    "accountId": "40108000016494",
                    "balance": "2,257.68",
                    "accountBalance": "2,257.68"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "HKD",
                    "currencyName": "港幣",
                    "availableBalance": "10,000,000,000.00",
                    "accountId": "40108000016494",
                    "balance": "10,000,000,000.00",
                    "accountBalance": "10,000,000,000.00"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "JPY",
                    "currencyName": "日圓",
                    "availableBalance": "1,834,787.19",
                    "accountId": "40108000016494",
                    "balance": "1,834,787.19",
                    "accountBalance": "1,834,787.19"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "NZD",
                    "currencyName": "紐西蘭幣",
                    "availableBalance": "0.00",
                    "accountId": "40108000016494",
                    "balance": "0.00",
                    "accountBalance": "0.00"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "SEK",
                    "currencyName": "瑞典幣",
                    "availableBalance": "0.00",
                    "accountId": "40108000016494",
                    "balance": "0.00",
                    "accountBalance": "0.00"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "SGD",
                    "currencyName": "新加坡幣",
                    "availableBalance": "887.11",
                    "accountId": "40108000016494",
                    "balance": "887.11",
                    "accountBalance": "887.11"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "THB",
                    "currencyName": "泰銖",
                    "availableBalance": "29,280.95",
                    "accountId": "40108000016494",
                    "balance": "29,280.95",
                    "accountBalance": "29,280.95"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "USD",
                    "currencyName": "美金",
                    "availableBalance": "235,978,410.51",
                    "accountId": "40108000016494",
                    "balance": "235,978,410.51",
                    "accountBalance": "236,395,946.26"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "CAD",
                    "currencyName": "加拿大幣",
                    "availableBalance": "230.72",
                    "accountId": "05108000017333",
                    "balance": "230.72",
                    "accountBalance": "230.72"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "CNY",
                    "currencyName": "人民幣",
                    "availableBalance": "688.28",
                    "accountId": "05108000017333",
                    "balance": "688.28",
                    "accountBalance": "688.28"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "DKK",
                    "currencyName": "丹麥幣",
                    "availableBalance": "194.97",
                    "accountId": "05108000017333",
                    "balance": "194.97",
                    "accountBalance": "194.97"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "EUR",
                    "currencyName": "歐元",
                    "availableBalance": "9,149.67",
                    "accountId": "05108000017333",
                    "balance": "9,149.67",
                    "accountBalance": "9,149.67"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "HKD",
                    "currencyName": "港幣",
                    "availableBalance": "12,780.90",
                    "accountId": "05108000017333",
                    "balance": "12,780.90",
                    "accountBalance": "12,780.90"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "JPY",
                    "currencyName": "日圓",
                    "availableBalance": "26,840.00",
                    "accountId": "05108000017333",
                    "balance": "26,840.00",
                    "accountBalance": "26,840.00"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "SEK",
                    "currencyName": "瑞典幣",
                    "availableBalance": "0.00",
                    "accountId": "05108000017333",
                    "balance": "0.00",
                    "accountBalance": "0.00"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "SGD",
                    "currencyName": "新加坡幣",
                    "availableBalance": "87.15",
                    "accountId": "05108000017333",
                    "balance": "87.15",
                    "accountBalance": "87.15"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "THB",
                    "currencyName": "泰銖",
                    "availableBalance": "653.55",
                    "accountId": "05108000017333",
                    "balance": "653.55",
                    "accountBalance": "653.55"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "USD",
                    "currencyName": "美金",
                    "availableBalance": "6,350.00",
                    "accountId": "05108000017333",
                    "balance": "6,350.00",
                    "accountBalance": "6,350.00"
                },
                {
                    "nickName": "",
                    "accType": "108",
                    "type": "活期存款",
                    "currencyCode": "ZAR",
                    "currencyName": "南非幣",
                    "availableBalance": "25,886.67",
                    "accountId": "05108000017333",
                    "balance": "25,886.67",
                    "accountBalance": "25,886.67"
                }]
            },
            "timeAcctInfoData": {
                "typeTotalBalance": "0.00",
                "account": [{
                    "nickName": "",
                    "accType": "128",
                    "type": "定期存款",
                    "currencyCode": "NZD",
                    "currencyName": "紐西蘭幣",
                    "endDate": "2018/08/01",
                    "accountId": "40128002119559",
                    "balance": "24,267.86",
                    "accountBalance": "24,267.86"
                },
                {
                    "nickName": "",
                    "accType": "128",
                    "type": "定期存款",
                    "currencyCode": "NZD",
                    "currencyName": "紐西蘭幣",
                    "endDate": "2019/01/08",
                    "accountId": "40128002119444",
                    "balance": "24,245.19",
                    "accountBalance": "24,245.19"
                },
                {
                    "nickName": "",
                    "accType": "128",
                    "type": "定期存款",
                    "currencyCode": "NZD",
                    "currencyName": "紐西蘭幣",
                    "endDate": "2019/01/03",
                    "accountId": "40128002119410",
                    "balance": "24,245.19",
                    "accountBalance": "24,245.19"
                },
                {
                    "nickName": "",
                    "accType": "128",
                    "type": "定期存款",
                    "currencyCode": "NZD",
                    "currencyName": "紐西蘭幣",
                    "endDate": "2016/06/04",
                    "accountId": "40128002119347",
                    "balance": "11,829.43",
                    "accountBalance": "11,829.43"
                },
                {
                    "nickName": "",
                    "accType": "128",
                    "type": "定期存款",
                    "currencyCode": "NZD",
                    "currencyName": "紐西蘭幣",
                    "endDate": "2016/05/02",
                    "accountId": "40128002119193",
                    "balance": "11,901.47",
                    "accountBalance": "11,901.47"
                },
                {
                    "nickName": "",
                    "accType": "128",
                    "type": "定期存款",
                    "currencyCode": "NZD",
                    "currencyName": "紐西蘭幣",
                    "endDate": "2018/11/01",
                    "accountId": "40128002119177",
                    "balance": "12,607.70",
                    "accountBalance": "12,607.70"
                },
                {
                    "nickName": "",
                    "accType": "128",
                    "type": "定期存款",
                    "currencyCode": "NZD",
                    "currencyName": "紐西蘭幣",
                    "endDate": "2018/05/01",
                    "accountId": "40128002119169",
                    "balance": "12,259.37",
                    "accountBalance": "12,259.37"
                },
                {
                    "nickName": "",
                    "accType": "128",
                    "type": "定期存款",
                    "currencyCode": "NZD",
                    "currencyName": "紐西蘭幣",
                    "endDate": "2016/04/04",
                    "accountId": "40128002029762",
                    "balance": "12,129.16",
                    "accountBalance": "12,129.16"
                },
                {
                    "nickName": "",
                    "accType": "128",
                    "type": "定期存款",
                    "currencyCode": "NZD",
                    "currencyName": "紐西蘭幣",
                    "endDate": "2016/06/22",
                    "accountId": "40128002029746",
                    "balance": "24,331.16",
                    "accountBalance": "24,331.16"
                },
                {
                    "nickName": "",
                    "accType": "198",
                    "type": "綜存定存",
                    "currencyCode": "USD",
                    "currencyName": "美金",
                    "endDate": "2021/04/09",
                    "accountId": "05198000597604",
                    "balance": "1,000.00",
                    "accountBalance": "1,000.00"
                },
                {
                    "nickName": "",
                    "accType": "198",
                    "type": "綜存定存",
                    "currencyCode": "CNY",
                    "currencyName": "人民幣",
                    "endDate": "2020/09/30",
                    "accountId": "40198000033416",
                    "balance": "14,000.00",
                    "accountBalance": "14,000.00"
                },
                {
                    "nickName": "",
                    "accType": "198",
                    "type": "綜存定存",
                    "currencyCode": "USD",
                    "currencyName": "美金",
                    "endDate": "2020/04/30",
                    "accountId": "51198000040088",
                    "balance": "2,000.00",
                    "accountBalance": "2,000.00"
                },
                {
                    "nickName": "",
                    "accType": "198",
                    "type": "綜存定存",
                    "currencyCode": "USD",
                    "currencyName": "美金",
                    "endDate": "2021/01/30",
                    "accountId": "51198000040070",
                    "balance": "1,000.00",
                    "accountBalance": "1,000.00"
                },
                {
                    "nickName": "",
                    "accType": "198",
                    "type": "綜存定存",
                    "currencyCode": "HKD",
                    "currencyName": "港幣",
                    "endDate": "2020/07/10",
                    "accountId": "51198000040062",
                    "balance": "9,998,175,205.48",
                    "accountBalance": "9,998,175,205.48"
                },
                {
                    "nickName": "",
                    "accType": "198",
                    "type": "綜存定存",
                    "currencyCode": "CNY",
                    "currencyName": "人民幣",
                    "endDate": "2020/07/07",
                    "accountId": "51198000040054",
                    "balance": "80,013,997.87",
                    "accountBalance": "80,013,997.87"
                },
                {
                    "nickName": "",
                    "accType": "198",
                    "type": "綜存定存",
                    "currencyCode": "USD",
                    "currencyName": "美金",
                    "endDate": "2020/01/14",
                    "accountId": "05198000597329",
                    "balance": "596,705.50",
                    "accountBalance": "596,705.50"
                },
                {
                    "nickName": "",
                    "accType": "198",
                    "type": "綜存定存",
                    "currencyCode": "CNY",
                    "currencyName": "人民幣",
                    "endDate": "2018/08/12",
                    "accountId": "40198000033393",
                    "balance": "50,001.00",
                    "accountBalance": "50,001.00"
                },
                {
                    "nickName": "",
                    "accType": "198",
                    "type": "綜存定存",
                    "currencyCode": "CNY",
                    "currencyName": "人民幣",
                    "endDate": "2018/12/28",
                    "accountId": "51198000040046",
                    "balance": "15,000.00",
                    "accountBalance": "15,000.00"
                },
                {
                    "nickName": "",
                    "accType": "198",
                    "type": "綜存定存",
                    "currencyCode": "USD",
                    "currencyName": "美金",
                    "endDate": "2018/08/12",
                    "accountId": "40198000033385",
                    "balance": "12,000.00",
                    "accountBalance": "12,000.00"
                },
                {
                    "nickName": "",
                    "accType": "198",
                    "type": "綜存定存",
                    "currencyCode": "USD",
                    "currencyName": "美金",
                    "endDate": "2018/08/12",
                    "accountId": "40198000033377",
                    "balance": "13,500.00",
                    "accountBalance": "13,500.00"
                },
                {
                    "nickName": "",
                    "accType": "198",
                    "type": "綜存定存",
                    "currencyCode": "USD",
                    "currencyName": "美金",
                    "endDate": "2019/04/30",
                    "accountId": "40198000033369",
                    "balance": "10,000.00",
                    "accountBalance": "10,000.00"
                },
                {
                    "nickName": "",
                    "accType": "198",
                    "type": "綜存定存",
                    "currencyCode": "USD",
                    "currencyName": "美金",
                    "endDate": "2018/10/30",
                    "accountId": "40198000033351",
                    "balance": "3,001.00",
                    "accountBalance": "3,001.00"
                }]
            },
            "currencyList": [{
                "currencyCode": "GBP",
                "balance": "2,309.05",
                "balanceTwd": "300,000"
            },
            {
                "currencyCode": "CHF",
                "balance": "39.05",
                "balanceTwd": "200,000"
            },
            {
                "currencyCode": "ZAR",
                "balance": "25,886.67",
                "balanceTwd": "100,000"
            },
            {
                "currencyCode": "JPY",
                "balance": "2,650,098",
                "balanceTwd": "100,000"
            },
            {
                "currencyCode": "NZD",
                "balance": "157,862.98",
                "balanceTwd": "10,000"
            },
            {
                "currencyCode": "EUR",
                "balance": "20,778.68",
                "balanceTwd": "10,000"
            },
            {
                "currencyCode": "AUD",
                "balance": "1,400.00",
                "balanceTwd": "10,000"
            },
            {
                "currencyCode": "DKK",
                "balance": "194.97",
                "balanceTwd": "10,000"
            },
            {
                "currencyCode": "THB",
                "balance": "72,777.35",
                "balanceTwd": "10,000"
            },
            {
                "currencyCode": "SGD",
                "balance": "2,986.96",
                "balanceTwd": "10,000"
            },
            {
                "currencyCode": "CNY",
                "balance": "11,004,832,557.06",
                "balanceTwd": "10,000"
            },
            {
                "currencyCode": "CAD",
                "balance": "230.72",
                "balanceTwd": "10,000"
            },
            {
                "currencyCode": "SEK",
                "balance": "215.65",
                "balanceTwd": "10,000"
            },
            {
                "currencyCode": "USD",
                "balance": "1,243,862,198.20",
                "balanceTwd": "10,000"
            },
            {
                "currencyCode": "HKD",
                "balance": "19,999,965,321.80",
                "balanceTwd": "10,000"
            }]
        },
        "partNegative": {
            "totalBalance": "0.00",
            "loansInfoData": {
                "typeTotalBalance": "0",
                "account": []
            },
            "cardsInfoData": {
                "errorMsg": "資料庫無資料"
            }
        },
        "partInvest": {
            "totalBalance": "24,885,126.00",
            "fundInfoData": {
                "typeTotalBalance": "12,442,563.00",
                "account": [{
                    "totPrice": "12,442,563.00",
                    "noProc": "-999,037.00",
                    "baoChou": "-7.43",
                    "totccy": "台幣",
                    "totosamt": "13,441,600.00",
                    "apdint": ".00",
                    "intretn": "-7.43"
                }]
            },
            "goldInfoData": {
                "typeTotalBalance": "0.00",
                "account": [{
                    "accountId": "02118000002227",
                    "balance": "0.00"
                }]
            }
        }
    }
};

let resData = {
    "resFlag": "0",
    "resContent": {
        "positive": "2,400,300,500", // 正資產加總
        "negative": "400,300,500", // 負資產加總
        // 台幣帳戶
        "partTwd": {
            "errorMsg": "",
            "totalBalance": "1,222,666,888,777",
            // 支票存款
            "checkingAcctInfoData": {
                "typeTotalBalance": "666,000,000",
                "account": [
                    {
                        "accountId": "11101000084315",
                        "nickName": "測試315",
                        "currencyCode": "TWD",
                        "accType": "101",
                        "type": "支票存款",
                        "accountBalance": "62,356",
                        "availableBalance": "62,356"
                    },
                    {
                        "accountId": "11101000084316",
                        "nickName": "測試315",
                        "currencyCode": "TWD",
                        "accType": "101",
                        "type": "支票存款",
                        "accountBalance": "62,356",
                        "availableBalance": "62,356"
                    },
                    {
                        "accountId": "11101000084317",
                        "nickName": "測試315",
                        "currencyCode": "TWD",
                        "accType": "101",
                        "type": "支票存款",
                        "accountBalance": "62,356",
                        "availableBalance": "62,356"
                    }
                ]
            },
            // 活期
            "savingsAcctInfoData": {
                "typeTotalBalance": "1,000,000,000,000",
                "account": [
                    {
                        "accountId": "02204000007528",
                        "nickName": "測試528",
                        "accType": "204",
                        "type": "行員存款",
                        "currencyCode": "TWD",
                        "accountBalance": "62,356",
                        "availableBalance": "62,356"
                    },
                    {
                        "accountId": "02203000311010",
                        "nickName": "測試010",
                        "accType": "203",
                        "type": "活期存款",
                        "currencyCode": "TWD",
                        "accountBalance": "6,356",
                        "availableBalance": "6,300"
                    }
                ]
            },
            // 定期存款
            "timeAcctInfoData": {
                "typeTotalBalance": "222,000,000,000",
                "account": [
                    {
                        "accountId": "11222000084315",
                        "nickName": "測試315",
                        "accType": "222",
                        "type": "存本取息定存",
                        "currencyCode": "TWD",
                        "balance": "500,000.00", // 定存金額
                        "endDate": "2020-01-01"
                    },
                    {
                        "accountId": "11223000097805",
                        "nickName": "測試805",
                        "accType": "223",
                        "type": "整存整付定存",
                        "balance": "500,000.00", // 定存金額
                        "endDate": "2020-01-01"
                    },
                    {
                        "accountId": "11224000122977",
                        "nickName": "測試977",
                        "accType": "224",
                        "type": "零存整付定存",
                        "balance": "500,000.00", // 定存金額
                        "endDate": "2020-01-01"
                    }
                ]
            },
            // 其他帳號
            "otherAcctInfoData": {
                "typeTotalBalance": "888,777.00",
                "account": [
                    {
                        "accountId": "11293000084315",
                        "nickName": "測試315",
                        "currencyCode": "TWD",
                        "balance": "500,000.00"
                    },
                    {
                        "accountId": "11293000097805",
                        "nickName": "測試805",
                        "currencyCode": "TWD",
                        "balance": "200,000.00"
                    },
                    {
                        "accountId": "11293000122977",
                        "nickName": "測試977",
                        "currencyCode": "TWD",
                        "balance": "30,000.00"
                    }
                ]
            }
        },
        // 外幣帳戶
        "partForeign": {
            "errorMsg": "",
            "totalBalance": "2,222,666,888,777", // 折台
            "savingsAcctInfoData": {
                "typeTotalBalance": "",
                "account": [
                    {
                        "accountId": "02108000007528",
                        "nickName": "測試528",
                        "accType": "108",
                        "type": "活期存款",
                        "currencyCode": "USD",
                        "accountBalance": "62,356",
                        "availableBalance": "62,356"

                    },
                    {
                        "accountId": "02108000311010",
                        "nickName": "測試010",
                        "accType": "108",
                        "type": "活期存款",
                        "currencyCode": "ZAR",
                        "accountBalance": "6,356",
                        "availableBalance": "6,300"
                    },
                    {
                        "accountId": "02108000311010",
                        "nickName": "測試010",
                        "accType": "108",
                        "type": "活期存款",
                        "currencyCode": "USD",
                        "accountBalance": "6,356",
                        "availableBalance": "6,300"
                    },
                    {
                        "accountId": "02203000311010",
                        "nickName": "測試010",
                        "accType": "108",
                        "type": "活期存款",
                        "currencyCode": "JPY",
                        "accountBalance": "6,356",
                        "availableBalance": "6,300"
                    }
                ]
            },
            // 定期存款
            "timeAcctInfoData": {
                "typeTotalBalance": "",
                "account": [
                    {
                        "accountId": "11128000084315",
                        "nickName": "測試315",
                        "currencyCode": "USD",
                        "accType": "128",
                        "type": "定期存款",
                        "balance": "500,000.00",
                        "endDate": "2020-01-01"
                    },
                    {
                        "accountId": "11198000097805",
                        "nickName": "測試805",
                        "currencyCode": "USD",
                        "accType": "198",
                        "type": "綜存定存",
                        "balance": "500,000.00",
                        "endDate": "2020-01-01"
                    },
                    {
                        "accountId": "11128000122977",
                        "nickName": "測試977",
                        "currencyCode": "USD",
                        "accType": "128",
                        "type": "定期存款",
                        "balance": "500,000.00",
                        "endDate": "2020-01-01"
                    },
                    {
                        "accountId": "11128000122977",
                        "nickName": "測試977",
                        "currencyCode": "JPY",
                        "accType": "128",
                        "type": "定期存款",
                        "balance": "500,000.00",
                        "endDate": "2020-01-01"
                    }
                ]
            },
            // 其他帳號
            "otherAcctInfoData": {
                "typeTotalBalance": "",
                "account": [
                    {
                        "nickName": "測試315",
                        "accountId": "11293000084315",
                        "balance": "500,000.00"
                    },
                    {
                        "nickName": "測試805",
                        "accountId": "11293000097805",
                        "balance": "200,000.00"
                    },
                    {
                        "nickName": "測試977",
                        "accountId": "11293000122977",
                        "balance": "30,000.00"
                    }
                ]
            },
            "currencyList": [
                {
                    "currencyCode": "USD",
                    "balance": "1,000,000",
                    "balanceTwd":  "1,000,000,000,000"
                }
                , {
                    "currencyCode": "JPY",
                    "balance": "20,000",
                    "balanceTwd":  "722,000,000,000",
                }
                , {
                    "currencyCode": "ZAR",
                    "balance": "1,000,000,000",
                    "balanceTwd": "777"
                }
                , {
                    "currencyCode": "EUR",
                    "balance": "20,000",
                    "balanceTwd":  "888,000"
                }
                , {
                    "currencyCode": "CNY",
                    "balance": "20,000",
                    "balanceTwd":  "300,666,888,777"
                }
                , {
                    "currencyCode": "AUD",
                    "balance": "20,000",
                    "balanceTwd":  "200,666,888,777"
                }
                , {
                    "currencyCode": "HKD",
                    "balance": "20,000",
                    "balanceTwd":  "666,888,777"
                }
                , {
                    "currencyCode": "CHF",
                    "balance": "20,000",
                    "balanceTwd":  "666,888,777"
                }
                , {
                    "currencyCode": "SEK",
                    "balance": "20,000",
                    "balanceTwd":  "666,888,777"
                }
                , {
                    "currencyCode": "CAD",
                    "balance": "20,000",
                    "balanceTwd":  "666,888,777"
                }
                , {
                    "currencyCode": "SGD",
                    "balance": "20,000",
                    "balanceTwd":  "666,888,777"
                }
                , {
                    "currencyCode": "DKK",
                    "balance": "20,000",
                    "balanceTwd":  "666,888,777"
                }
                , {
                    "currencyCode": "THB",
                    "balance": "20,000",
                    "balanceTwd":  "666,888,777"
                }
            ]

        },
        // 負資產
        "partNegative": {
            "errorMsg": "",
            "totalBalance": "3,222,666,888,777",
            // 貸款
            "loansInfoData": {
                "errorMsg": "",
                "typeTotalBalance": "1,000,000,000,000",
                "account": [
                    {
                        "accountId": "11151000122977",
                        "nickName": "測試977",
                        "currencyCode": "TWD",
                        "accType": "151",
                        "type": "短期放款",
                        "balance": "6,300",
                        "endDate": "2020-01-01"
                    },
                    {
                        "accountId": "11152000122977",
                        "nickName": "測試977",
                        "currencyCode": "TWD",
                        "accType": "152",
                        "type": "中期放款",
                        "balance": "6,300",
                        "endDate": "2020-01-01"
                    }
                ]

            },
            // 信用卡
            "cardsInfoData": {
                "errorMsg": "",
                "typeTotalBalance": "1,000,000,000,000"
            }
        },
        "partInvest": {
            "errorMsg": "",
            "totalBalance": "3,222,666,888,777",
            // 基金/集合
            "fundInfoData": {
                "errorMsg": "",
                "typeTotalBalance": "1,000,000,000,000"
            },
            // 黃金
            "goldInfoData": {
                "errorMsg": "",
                "typeTotalBalance": "1,000,000,000",
                "account": [
                    {
                        "accountId": "11151000122977",
                        "nickName": "測試977",
                        "accType": "151",
                        "type": "黃金存摺",
                        "balance": "6,300"
                    }
                ]
            }
        }
    }
};

let real_data = {
    "resContent": {"positive":"4,731,769,920,839.00","negative":"799,500.00","partTwd":{"totalBalance":"1,554,269,655","checkingAcctInfoData":{"typeTotalBalance":"12,412,790.00","account":[{"nickName":"","accType":"101","type":"支票存款","status":"正常戶","availableBalance":"7,411,255.00","accountId":"02101000006878","accountBalance":"7,411,255.00"},{"nickName":"","accType":"101","type":"支票存款","status":"正常戶","availableBalance":"5,001,535.00","accountId":"32101000023683","accountBalance":"5,001,535.00"}]},"savingsAcctInfoData":{"typeTotalBalance":"1,324,863,196.00","account":[{"nickName":"","accType":"102","type":"活期存款","status":"正常戶","availableBalance":"60,322,742.00","accountId":"24102000030878","accountBalance":"60,322,742.00"},{"nickName":"","accType":"102","type":"活期存款","status":"正常戶","availableBalance":"154,428,063.00","accountId":"24102000030886","accountBalance":"154,428,063.00"},{"nickName":"","accType":"203","type":"活儲存款","status":"薪轉戶","availableBalance":"278,704,880.00","accountId":"02203000541801","accountBalance":"86,019,289.00"},{"nickName":"","accType":"203","type":"活儲存款","status":"正常戶","availableBalance":"9,211.00","accountId":"02203002525479","accountBalance":"9,211.00"},{"nickName":"","accType":"203","type":"活儲存款","status":"正常戶","availableBalance":"934,000.00","accountId":"02203005800014","accountBalance":"934,000.00"},{"nickName":"","accType":"203","type":"活儲存款","status":"正常戶","availableBalance":"20,326.00","accountId":"02203007474796","accountBalance":"20,326.00"},{"nickName":"","accType":"203","type":"活儲存款","status":"薪轉戶","availableBalance":"1,652,486.00","accountId":"03203000606011","accountBalance":"1,666,136.00"},{"nickName":"","accType":"203","type":"活儲存款","status":"正常戶","availableBalance":"25,424.00","accountId":"03203005800026","accountBalance":"25,424.00"},{"nickName":"","accType":"203","type":"活儲存款","status":"正常戶","availableBalance":"2,222.00","accountId":"03203005800034","accountBalance":"2,222.00"},{"nickName":"","accType":"203","type":"活儲存款","status":"正常戶","availableBalance":"0.00","accountId":"03203005800050","accountBalance":"0.00"},{"nickName":"","accType":"203","type":"活儲存款","status":"正常戶","availableBalance":"0.00","accountId":"03203005800068","accountBalance":"0.00"},{"nickName":"","accType":"203","type":"活儲存款","status":"正常戶","availableBalance":"0.00","accountId":"03203005800076","accountBalance":"0.00"},{"nickName":"","accType":"203","type":"活儲存款","status":"正常戶","availableBalance":"0.00","accountId":"03203005800084","accountBalance":"0.00"},{"nickName":"","accType":"203","type":"活儲存款","status":"正常戶","availableBalance":"640.00","accountId":"10203005800019","accountBalance":"640.00"},{"nickName":"","accType":"203","type":"活儲存款","status":"正常戶","availableBalance":"8,498.00","accountId":"10203005800027","accountBalance":"8,498.00"},{"nickName":"","accType":"203","type":"活儲存款","status":"正常戶","availableBalance":"0.00","accountId":"10203005800035","accountBalance":"0.00"},{"nickName":"","accType":"203","type":"活儲存款","status":"薪轉戶","availableBalance":"20,342,657.00","accountId":"23203001005052","accountBalance":"20,333,657.00"},{"nickName":"","accType":"203","type":"活儲存款","status":"正常戶","availableBalance":"909,215,089.00","accountId":"24203000358074","accountBalance":"909,215,089.00"},{"nickName":"","accType":"203","type":"活儲存款","status":"薪轉戶","availableBalance":"89,981,023.00","accountId":"24203000367714","accountBalance":"89,883,024.00"},{"nickName":"","accType":"203","type":"活儲存款","status":"正常戶","availableBalance":"223,073.00","accountId":"37203005800013","accountBalance":"223,073.00"},{"nickName":"","accType":"203","type":"活儲存款","status":"正常戶","availableBalance":"154,380.00","accountId":"38203005800017","accountBalance":"154,380.00"},{"nickName":"","accType":"203","type":"活儲存款","status":"正常戶","availableBalance":"990,000.00","accountId":"65203005800014","accountBalance":"990,000.00"},{"nickName":"","accType":"204","type":"行員存款","status":"正常戶","availableBalance":"627,422.00","accountId":"02204000007528","accountBalance":"627,422.00"}]},"timeAcctInfoData":{"typeTotalBalance":"216,993,669.00","account":[{"nickName":"","accType":"121","type":"一般定存","status":"1.10500","endDate":"103/03/29","accountId":"02121000121125","balance":"360,000.00"},{"nickName":"","accType":"222","type":"存本取息定存","status":"1.31000","endDate":"104/03/29","accountId":"02222002020220","balance":"220,000.00"},{"nickName":"","accType":"223","type":"整存整付定存","status":"1.40000","endDate":"104/07/29","accountId":"02223000232323","balance":"330,000.00"},{"nickName":"","accType":"224","type":"零存整付定存","status":"1.17000","endDate":"108/10/22","accountId":"03224001024554","balance":"300,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.94000","endDate":"104/03/25","accountId":"02191000762703","balance":"12,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.64000","endDate":"105/11/14","accountId":"02191000773005","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.64000","endDate":"105/11/14","accountId":"02191000773021","balance":"15,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.64000","endDate":"105/11/14","accountId":"02191000773039","balance":"11,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.64000","endDate":"105/11/14","accountId":"02191000773047","balance":"12,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.35000","endDate":"107/03/08","accountId":"02191001461067","balance":"200,000,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.60000","endDate":"108/04/26","accountId":"02191001744009","balance":"5,000,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.77000","endDate":"109/02/29","accountId":"02191001746027","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.77000","endDate":"109/02/29","accountId":"02191001746035","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.60000","endDate":"108/10/26","accountId":"02191001746289","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.60000","endDate":"108/11/01","accountId":"02191001746297","balance":"10,001.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.60000","endDate":"108/11/01","accountId":"02191001746302","balance":"10,001.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.60000","endDate":"108/11/01","accountId":"02191001746310","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.60000","endDate":"108/12/04","accountId":"02191001746328","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.60000","endDate":"108/12/04","accountId":"02191001746336","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.88000","endDate":"109/08/14","accountId":"02191001746873","balance":"10,002.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.60000","endDate":"108/11/14","accountId":"02191001746881","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.60000","endDate":"108/12/18","accountId":"02191001746904","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.60000","endDate":"108/11/25","accountId":"02191001746962","balance":"11,111.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.88000","endDate":"109/08/19","accountId":"02191001747641","balance":"90,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.63000","endDate":"109/07/02","accountId":"02191001748338","balance":"100,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.60000","endDate":"109/04/03","accountId":"02191001748346","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.60000","endDate":"109/04/03","accountId":"02191001748354","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.60000","endDate":"109/04/03","accountId":"02191001748362","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.60000","endDate":"109/04/03","accountId":"02191001748370","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.60000","endDate":"109/04/03","accountId":"02191001748388","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.60000","endDate":"109/07/12","accountId":"02191001748477","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.35000","endDate":"109/11/06","accountId":"02191001750335","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.35000","endDate":"109/11/08","accountId":"02191001750343","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.54000","endDate":"110/06/08","accountId":"02191001750369","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.65000","endDate":"110/08/08","accountId":"02191001750377","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.35000","endDate":"109/12/21","accountId":"02191001750424","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.35000","endDate":"109/11/21","accountId":"02191001750432","balance":"20,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.35000","endDate":"109/11/21","accountId":"02191001750440","balance":"20,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.35000","endDate":"109/11/30","accountId":"02191001751014","balance":"50,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.40000","endDate":"110/04/17","accountId":"02191001751412","balance":"20,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.40000","endDate":"110/04/23","accountId":"02191001752515","balance":"60,005.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.35000","endDate":"109/12/23","accountId":"02191001752549","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.35000","endDate":"109/12/24","accountId":"02191001752557","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.35000","endDate":"109/12/24","accountId":"02191001752599","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.35000","endDate":"109/12/24","accountId":"02191001752604","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.60000","endDate":"108/11/03","accountId":"03191000291120","balance":"20,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.89000","endDate":"102/11/26","accountId":"23191000151261","balance":"33,333.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.89000","endDate":"104/04/10","accountId":"23191000151449","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.89000","endDate":"104/04/10","accountId":"23191000151457","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.89000","endDate":"104/04/10","accountId":"23191000151465","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.89000","endDate":"104/04/10","accountId":"23191000151473","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.89000","endDate":"104/04/10","accountId":"23191000151481","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.89000","endDate":"104/04/10","accountId":"23191000151499","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.89000","endDate":"104/06/28","accountId":"23191000151504","balance":"600,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.89000","endDate":"104/06/29","accountId":"23191000151520","balance":"10,000.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.60000","endDate":"108/12/01","accountId":"23191000151685","balance":"10,002.00"},{"nickName":"","accType":"191","type":"綜存定存","status":"0.60000","endDate":"108/12/01","accountId":"23191000151693","balance":"10,002.00"},{"nickName":"","accType":"292","type":"綜存存本取息","status":"1.38000","endDate":"104/06/12","accountId":"02292000757734","balance":"10,000.00"},{"nickName":"","accType":"292","type":"綜存存本取息","status":"0.82000","endDate":"111/11/16","accountId":"02292001751341","balance":"10,002.00"},{"nickName":"","accType":"292","type":"綜存存本取息","status":"0.84000","endDate":"111/12/20","accountId":"02292001751854","balance":"10,000.00"},{"nickName":"","accType":"292","type":"綜存存本取息","status":"0.84000","endDate":"111/12/20","accountId":"02292001751919","balance":"10,000.00"},{"nickName":"","accType":"292","type":"綜存存本取息","status":"0.82000","endDate":"110/11/23","accountId":"02292001752185","balance":"50,000.00"},{"nickName":"","accType":"292","type":"綜存存本取息","status":"0.82000","endDate":"110/11/23","accountId":"02292001752525","balance":"39,900.00"},{"nickName":"","accType":"292","type":"綜存存本取息","status":"0.84000","endDate":"111/12/24","accountId":"02292001752614","balance":"50,000.00"},{"nickName":"","accType":"292","type":"綜存存本取息","status":"0.84000","endDate":"111/12/24","accountId":"02292001752622","balance":"10,000.00"},{"nickName":"","accType":"292","type":"綜存存本取息","status":"0.80000","endDate":"111/01/24","accountId":"03292000291334","balance":"30,000.00"},{"nickName":"","accType":"292","type":"綜存存本取息","status":"0.80000","endDate":"110/11/02","accountId":"24292000313487","balance":"88,888.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"1.40000","endDate":"105/10/29","accountId":"02293000756905","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"1.40000","endDate":"106/03/26","accountId":"02293000757618","balance":"13,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"1.40000","endDate":"105/12/12","accountId":"02293000757757","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"1.38000","endDate":"105/07/27","accountId":"02293000767817","balance":"30,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"1.05000","endDate":"109/08/02","accountId":"02293001746084","balance":"20,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"1.05000","endDate":"109/11/22","accountId":"02293001747933","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"1.05000","endDate":"109/11/28","accountId":"02293001747941","balance":"12,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"1.05000","endDate":"111/03/07","accountId":"02293001748492","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.80000","endDate":"110/11/16","accountId":"02293001751330","balance":"10,001.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"02293001751550","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"02293001751568","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"02293001751576","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"02293001751746","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"02293001751754","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"02293001751762","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"02293001751835","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"02293001751843","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.82000","endDate":"111/12/20","accountId":"02293001751869","balance":"50,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"02293001751877","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"02293001751885","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"02293001751966","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"02293001751974","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"02293001751982","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"02293001751990","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"02293001752001","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"02293001752019","balance":"20,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"02293001752027","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"02293001752035","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.80000","endDate":"110/11/23","accountId":"02293001752205","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.80000","endDate":"110/11/23","accountId":"02293001752213","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.80000","endDate":"110/11/23","accountId":"02293001752221","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.82000","endDate":"111/12/23","accountId":"02293001752247","balance":"55,555.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/23","accountId":"02293001752255","balance":"50,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.80000","endDate":"110/11/23","accountId":"02293001752263","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.40000","endDate":"111/12/23","accountId":"02293001752271","balance":"5,555,500.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/23","accountId":"02293001752289","balance":"50,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.80000","endDate":"110/11/23","accountId":"02293001752297","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/23","accountId":"02293001752302","balance":"50,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/23","accountId":"02293001752328","balance":"50,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.82000","endDate":"111/12/23","accountId":"02293001752344","balance":"55,555.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.80000","endDate":"110/11/23","accountId":"02293001752352","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.80000","endDate":"110/11/23","accountId":"02293001752394","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/23","accountId":"02293001752409","balance":"50,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.82000","endDate":"111/12/23","accountId":"02293001752417","balance":"55,555.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.80000","endDate":"110/11/23","accountId":"02293001752433","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/23","accountId":"02293001752441","balance":"50,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.82000","endDate":"111/12/23","accountId":"02293001752459","balance":"55,555.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.82000","endDate":"111/12/23","accountId":"02293001752467","balance":"55,555.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.80000","endDate":"110/11/23","accountId":"02293001752506","balance":"59,924.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.80000","endDate":"110/11/23","accountId":"02293001752530","balance":"2,000,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.80000","endDate":"110/11/26","accountId":"02293001752679","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.80000","endDate":"110/11/26","accountId":"02293001752718","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.82000","endDate":"112/09/29","accountId":"03293000291250","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.82000","endDate":"112/09/29","accountId":"03293000291268","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.82000","endDate":"112/09/29","accountId":"03293000291276","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.82000","endDate":"112/09/29","accountId":"03293000291284","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.82000","endDate":"112/09/29","accountId":"03293000291292","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"03293000291315","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"03293000291323","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"1.40000","endDate":"105/07/26","accountId":"23293000150890","balance":"150,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"1.38000","endDate":"103/08/01","accountId":"23293000150963","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"1.38000","endDate":"104/05/14","accountId":"23293000151359","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"1.40000","endDate":"105/05/14","accountId":"23293000151367","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"1.40000","endDate":"106/05/14","accountId":"23293000151375","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"1.40000","endDate":"105/05/15","accountId":"23293000151383","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"1.40000","endDate":"106/07/07","accountId":"23293000151391","balance":"22,222.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"1.15000","endDate":"106/05/19","accountId":"23293000151642","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"23293000151749","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"24293000313662","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"24293000313670","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"24293000313688","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"24293000313696","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"37293000113596","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"38293000176174","balance":"10,000.00"},{"nickName":"","accType":"293","type":"綜存整存整付","status":"0.84000","endDate":"111/12/20","accountId":"65293000011428","balance":"10,000.00"}]}},"partForeign":{"totalBalance":"4,729,901,821,220.00","savingsAcctInfoData":{"account":[{"nickName":"","accType":"108","type":"活期存款","currencyCode":"USD","currencyName":"美金","availableBalance":"0.00","accountId":"05108006121457","balance":"0.00","accountBalance":"0.00"},{"nickName":"","accType":"108","type":"活期存款","currencyCode":"CNY","currencyName":"人民幣","availableBalance":"5,883.26","accountId":"24108000035969","balance":"5,883.26","accountBalance":"5,883.26"},{"nickName":"","accType":"108","type":"活期存款","currencyCode":"USD","currencyName":"美金","availableBalance":"9,729,370.74","accountId":"24108000035969","balance":"9,729,370.74","accountBalance":"10,009,409.34"},{"nickName":"外幣測試帳號989","accType":"108","type":"活期存款","currencyCode":"AUD","currencyName":"澳幣","availableBalance":"9,999,293,505.60","accountId":"05108000091989","balance":"9,999,293,505.60","accountBalance":"9,999,293,505.60"},{"nickName":"外幣測試帳號989","accType":"108","type":"活期存款","currencyCode":"CHF","currencyName":"瑞士法郎","availableBalance":"0.00","accountId":"05108000091989","balance":"0.00","accountBalance":"0.00"},{"nickName":"外幣測試帳號989","accType":"108","type":"活期存款","currencyCode":"CNY","currencyName":"人民幣","availableBalance":"952,094.43","accountId":"05108000091989","balance":"952,094.43","accountBalance":"952,094.43"},{"nickName":"外幣測試帳號989","accType":"108","type":"活期存款","currencyCode":"DKK","currencyName":"丹麥幣","availableBalance":"190,301.62","accountId":"05108000091989","balance":"190,301.62","accountBalance":"190,301.62"},{"nickName":"外幣測試帳號989","accType":"108","type":"活期存款","currencyCode":"EUR","currencyName":"歐元","availableBalance":"431.64","accountId":"05108000091989","balance":"431.64","accountBalance":"431.64"},{"nickName":"外幣測試帳號989","accType":"108","type":"活期存款","currencyCode":"GBP","currencyName":"英鎊","availableBalance":"843.33","accountId":"05108000091989","balance":"843.33","accountBalance":"843.33"},{"nickName":"外幣測試帳號989","accType":"108","type":"活期存款","currencyCode":"HKD","currencyName":"港幣","availableBalance":"9,999,942,671.78","accountId":"05108000091989","balance":"9,999,942,671.78","accountBalance":"9,999,942,671.78"},{"nickName":"外幣測試帳號989","accType":"108","type":"活期存款","currencyCode":"JPY","currencyName":"日圓","availableBalance":"5,218,156.00","accountId":"05108000091989","balance":"5,218,156.00","accountBalance":"5,218,156.00"},{"nickName":"外幣測試帳號989","accType":"108","type":"活期存款","currencyCode":"KRW","currencyName":"韓圜","availableBalance":"488,211,771.00","accountId":"05108000091989","balance":"488,211,771.00","accountBalance":"488,211,771.00"},{"nickName":"外幣測試帳號989","accType":"108","type":"活期存款","currencyCode":"NZD","currencyName":"紐西蘭幣","availableBalance":"880.72","accountId":"05108000091989","balance":"880.72","accountBalance":"880.72"},{"nickName":"外幣測試帳號989","accType":"108","type":"活期存款","currencyCode":"THB","currencyName":"泰銖","availableBalance":"438.20","accountId":"05108000091989","balance":"438.20","accountBalance":"438.20"},{"nickName":"外幣測試帳號989","accType":"108","type":"活期存款","currencyCode":"USD","currencyName":"美金","availableBalance":"55,450,009,985.62","accountId":"05108000091989","balance":"55,450,009,985.62","accountBalance":"55,453,588,219.13"},{"nickName":"外幣測試帳號989","accType":"108","type":"活期存款","currencyCode":"ZAR","currencyName":"南非幣","availableBalance":"824.56","accountId":"05108000091989","balance":"824.56","accountBalance":"824.56"},{"nickName":"外幣測試帳號988","accType":"108","type":"活期存款","currencyCode":"AUD","currencyName":"澳幣","availableBalance":"1,999.10","accountId":"55108002291988","balance":"1,999.10","accountBalance":"1,999.10"},{"nickName":"外幣測試帳號988","accType":"108","type":"活期存款","currencyCode":"CNY","currencyName":"人民幣","availableBalance":"9,999,985,605.67","accountId":"55108002291988","balance":"9,999,985,605.67","accountBalance":"9,999,996,499.50"},{"nickName":"外幣測試帳號988","accType":"108","type":"活期存款","currencyCode":"EUR","currencyName":"歐元","availableBalance":"9,999,998,999.00","accountId":"55108002291988","balance":"9,999,998,999.00","accountBalance":"9,999,998,999.00"},{"nickName":"外幣測試帳號988","accType":"108","type":"活期存款","currencyCode":"GBP","currencyName":"英鎊","availableBalance":"2,000.02","accountId":"55108002291988","balance":"2,000.02","accountBalance":"2,000.02"},{"nickName":"外幣測試帳號988","accType":"108","type":"活期存款","currencyCode":"HKD","currencyName":"港幣","availableBalance":"9,999,579,838.88","accountId":"55108002291988","balance":"9,999,579,838.88","accountBalance":"9,999,949,499.50"},{"nickName":"外幣測試帳號988","accType":"108","type":"活期存款","currencyCode":"JPY","currencyName":"日圓","availableBalance":"9,998,768,269.50","accountId":"55108002291988","balance":"9,998,768,269.50","accountBalance":"9,998,768,269.50"},{"nickName":"外幣測試帳號988","accType":"108","type":"活期存款","currencyCode":"KRW","currencyName":"韓圜","availableBalance":"69,830.00","accountId":"55108002291988","balance":"69,830.00","accountBalance":"69,830.00"},{"nickName":"外幣測試帳號988","accType":"108","type":"活期存款","currencyCode":"SEK","currencyName":"瑞典幣","availableBalance":"0.00","accountId":"55108002291988","balance":"0.00","accountBalance":"0.00"},{"nickName":"外幣測試帳號988","accType":"108","type":"活期存款","currencyCode":"THB","currencyName":"泰銖","availableBalance":"48,873.79","accountId":"55108002291988","balance":"48,873.79","accountBalance":"48,873.79"},{"nickName":"外幣測試帳號988","accType":"108","type":"活期存款","currencyCode":"USD","currencyName":"美金","availableBalance":"998,434,835.69","accountId":"55108002291988","balance":"998,434,835.69","accountBalance":"998,486,068.89"},{"nickName":"外幣測試帳號988","accType":"108","type":"活期存款","currencyCode":"ZAR","currencyName":"南非幣","availableBalance":"2,791.00","accountId":"55108002291988","balance":"2,791.00","accountBalance":"2,791.00"},{"nickName":"外幣測試帳號942","accType":"108","type":"活期存款","currencyCode":"AUD","currencyName":"澳幣","availableBalance":"89,007,274.78","accountId":"55108000011942","balance":"89,007,274.78","accountBalance":"89,007,274.78"},{"nickName":"外幣測試帳號942","accType":"108","type":"活期存款","currencyCode":"CAD","currencyName":"加拿大幣","availableBalance":"7,515.31","accountId":"55108000011942","balance":"7,515.31","accountBalance":"7,515.31"},{"nickName":"外幣測試帳號942","accType":"108","type":"活期存款","currencyCode":"CNY","currencyName":"人民幣","availableBalance":"9,999,670,199.52","accountId":"55108000011942","balance":"9,999,670,199.52","accountBalance":"9,999,749,120.57"},{"nickName":"外幣測試帳號942","accType":"108","type":"活期存款","currencyCode":"DKK","currencyName":"丹麥幣","availableBalance":"200,000,036.79","accountId":"55108000011942","balance":"200,000,036.79","accountBalance":"200,000,036.79"},{"nickName":"外幣測試帳號942","accType":"108","type":"活期存款","currencyCode":"EUR","currencyName":"歐元","availableBalance":"10,000,673,420.70","accountId":"55108000011942","balance":"10,000,673,420.70","accountBalance":"10,000,673,420.70"},{"nickName":"外幣測試帳號942","accType":"108","type":"活期存款","currencyCode":"GBP","currencyName":"英鎊","availableBalance":"100,001,653.95","accountId":"55108000011942","balance":"100,001,653.95","accountBalance":"100,001,653.95"},{"nickName":"外幣測試帳號942","accType":"108","type":"活期存款","currencyCode":"HKD","currencyName":"港幣","availableBalance":"999,265,444.45","accountId":"55108000011942","balance":"999,265,444.45","accountBalance":"999,649,739.87"},{"nickName":"外幣測試帳號942","accType":"108","type":"活期存款","currencyCode":"JPY","currencyName":"日圓","availableBalance":"988,658,803.64","accountId":"55108000011942","balance":"988,658,803.64","accountBalance":"988,658,803.64"},{"nickName":"外幣測試帳號942","accType":"108","type":"活期存款","currencyCode":"SEK","currencyName":"瑞典幣","availableBalance":"1,000,474,364.68","accountId":"55108000011942","balance":"1,000,474,364.68","accountBalance":"1,000,474,364.68"},{"nickName":"外幣測試帳號942","accType":"108","type":"活期存款","currencyCode":"SGD","currencyName":"新加坡幣","availableBalance":"10,000,032,214.46","accountId":"55108000011942","balance":"10,000,032,214.46","accountBalance":"10,000,032,214.46"},{"nickName":"外幣測試帳號942","accType":"108","type":"活期存款","currencyCode":"USD","currencyName":"美金","availableBalance":"998,721,642.13","accountId":"55108000011942","balance":"998,721,642.13","accountBalance":"999,012,430.65"},{"nickName":"外幣測試帳號942","accType":"108","type":"活期存款","currencyCode":"ZAR","currencyName":"南非幣","availableBalance":"1,000,822,738.83","accountId":"55108000011942","balance":"1,000,822,738.83","accountBalance":"1,000,822,738.83"},{"nickName":"外幣測試帳號301","accType":"108","type":"活期存款","currencyCode":"AUD","currencyName":"澳幣","availableBalance":"10,014,511,002.67","accountId":"23108000011301","balance":"10,014,511,002.67","accountBalance":"10,014,511,002.67"},{"nickName":"外幣測試帳號301","accType":"108","type":"活期存款","currencyCode":"CAD","currencyName":"加拿大幣","availableBalance":"10,007,603,656.74","accountId":"23108000011301","balance":"10,007,603,656.74","accountBalance":"10,007,603,656.74"},{"nickName":"外幣測試帳號301","accType":"108","type":"活期存款","currencyCode":"CHF","currencyName":"瑞士法郎","availableBalance":"999,906,530.97","accountId":"23108000011301","balance":"999,906,530.97","accountBalance":"999,906,530.97"},{"nickName":"外幣測試帳號301","accType":"108","type":"活期存款","currencyCode":"CNY","currencyName":"人民幣","availableBalance":"10,001,884,854.42","accountId":"23108000011301","balance":"10,001,884,854.42","accountBalance":"10,001,912,108.51"},{"nickName":"外幣測試帳號301","accType":"108","type":"活期存款","currencyCode":"DKK","currencyName":"丹麥幣","availableBalance":"2,994.70","accountId":"23108000011301","balance":"2,994.70","accountBalance":"2,994.70"},{"nickName":"外幣測試帳號301","accType":"108","type":"活期存款","currencyCode":"EUR","currencyName":"歐元","availableBalance":"9,999,801,450.75","accountId":"23108000011301","balance":"9,999,801,450.75","accountBalance":"9,999,801,450.75"},{"nickName":"外幣測試帳號301","accType":"108","type":"活期存款","currencyCode":"GBP","currencyName":"英鎊","availableBalance":"10,000,004,265.68","accountId":"23108000011301","balance":"10,000,004,265.68","accountBalance":"10,000,004,265.68"},{"nickName":"外幣測試帳號301","accType":"108","type":"活期存款","currencyCode":"HKD","currencyName":"港幣","availableBalance":"9,999,898,359.36","accountId":"23108000011301","balance":"9,999,898,359.36","accountBalance":"9,999,972,990.07"},{"nickName":"外幣測試帳號301","accType":"108","type":"活期存款","currencyCode":"JPY","currencyName":"日圓","availableBalance":"39,400,110.85","accountId":"23108000011301","balance":"39,400,110.85","accountBalance":"39,400,110.85"},{"nickName":"外幣測試帳號301","accType":"108","type":"活期存款","currencyCode":"MYR","currencyName":"馬幣","availableBalance":"0.00","accountId":"23108000011301","balance":"0.00","accountBalance":"0.00"},{"nickName":"外幣測試帳號301","accType":"108","type":"活期存款","currencyCode":"NZD","currencyName":"紐西蘭幣","availableBalance":"25,417,983.02","accountId":"23108000011301","balance":"25,417,983.02","accountBalance":"25,417,983.02"},{"nickName":"外幣測試帳號301","accType":"108","type":"活期存款","currencyCode":"SEK","currencyName":"瑞典幣","availableBalance":"5,200.00","accountId":"23108000011301","balance":"5,200.00","accountBalance":"5,200.00"},{"nickName":"外幣測試帳號301","accType":"108","type":"活期存款","currencyCode":"SGD","currencyName":"新加坡幣","availableBalance":"10,000,039,956.36","accountId":"23108000011301","balance":"10,000,039,956.36","accountBalance":"10,000,039,956.36"},{"nickName":"外幣測試帳號301","accType":"108","type":"活期存款","currencyCode":"THB","currencyName":"泰銖","availableBalance":"393,939.10","accountId":"23108000011301","balance":"393,939.10","accountBalance":"393,939.10"},{"nickName":"外幣測試帳號301","accType":"108","type":"活期存款","currencyCode":"USD","currencyName":"美金","availableBalance":"166,202,279.02","accountId":"23108000011301","balance":"166,202,279.02","accountBalance":"167,924,646.46"},{"nickName":"外幣測試帳號301","accType":"108","type":"活期存款","currencyCode":"ZAR","currencyName":"南非幣","availableBalance":"99,998,156,291.66","accountId":"23108000011301","balance":"99,998,156,291.66","accountBalance":"99,998,408,302.66"}]},"timeAcctInfoData":{"account":[{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2021/01/17","accountId":"05198000599224","balance":"10,000.00","accountBalance":"10,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2021/02/27","accountId":"05198000599185","balance":"10,000.00","accountBalance":"10,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2020/11/26","accountId":"23198002918375","balance":"1,200.00","accountBalance":"1,200.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2021/02/26","accountId":"23198002918367","balance":"10,001.00","accountBalance":"10,001.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2021/02/26","accountId":"05198000598935","balance":"10,000.01","accountBalance":"10,000.01"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2021/02/26","accountId":"23198002918359","balance":"10,000.00","accountBalance":"10,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2021/02/26","accountId":"05198000598927","balance":"10,000.00","accountBalance":"10,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2020/11/26","accountId":"05198000598919","balance":"1,001.00","accountBalance":"1,001.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2020/11/26","accountId":"05198000598901","balance":"1,000.00","accountBalance":"1,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2020/11/26","accountId":"05198000598896","balance":"1,000.00","accountBalance":"1,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2021/02/25","accountId":"23198002918341","balance":"10,500.00","accountBalance":"10,500.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"JPY","currencyName":"日圓","endDate":"2021/03/15","accountId":"05198000598626","balance":"3,000,000.00","accountBalance":"3,000,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2020/12/11","accountId":"05198000598618","balance":"80,000.00","accountBalance":"80,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"HKD","currencyName":"港幣","endDate":"2021/02/05","accountId":"05198000598600","balance":"8,000.00","accountBalance":"8,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"AUD","currencyName":"澳幣","endDate":"2021/04/03","accountId":"05198000598595","balance":"30,000.00","accountBalance":"30,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2020/10/31","accountId":"05198000598587","balance":"100,000.00","accountBalance":"100,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2021/06/30","accountId":"05198000598579","balance":"5,000.00","accountBalance":"5,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"HKD","currencyName":"港幣","endDate":"2021/03/15","accountId":"05198000598511","balance":"30,000.00","accountBalance":"30,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"AUD","currencyName":"澳幣","endDate":"2020/07/14","accountId":"05198000598244","balance":"100,000.00","accountBalance":"100,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"AUD","currencyName":"澳幣","endDate":"2020/06/19","accountId":"05198000597874","balance":"3,000.00","accountBalance":"3,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"AUD","currencyName":"澳幣","endDate":"2020/06/11","accountId":"05198000597832","balance":"100,000.00","accountBalance":"100,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2020/04/16","accountId":"23198002918333","balance":"1,000.00","accountBalance":"1,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"HKD","currencyName":"港幣","endDate":"2020/04/16","accountId":"23198002918325","balance":"8,000.00","accountBalance":"8,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2020/09/26","accountId":"23198002918317","balance":"10,000.00","accountBalance":"10,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2020/06/26","accountId":"23198002918309","balance":"1,000.00","accountBalance":"1,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2020/09/24","accountId":"23198002918294","balance":"12,000.00","accountBalance":"12,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"HKD","currencyName":"港幣","endDate":"2020/08/24","accountId":"55198000070738","balance":"20,000.00","accountBalance":"20,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"HKD","currencyName":"港幣","endDate":"2020/05/24","accountId":"55198000070720","balance":"30,000.00","accountBalance":"30,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"HKD","currencyName":"港幣","endDate":"2020/05/21","accountId":"05198000597450","balance":"20,001.00","accountBalance":"20,001.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2020/10/01","accountId":"05198000597361","balance":"1,999,103,248.84","accountBalance":"1,999,103,248.84"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2020/06/23","accountId":"05198000597230","balance":"10,001.00","accountBalance":"10,001.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2020/06/23","accountId":"05198000597222","balance":"1,000.00","accountBalance":"1,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2020/06/04","accountId":"05198000597175","balance":"10,000.00","accountBalance":"10,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2020/06/04","accountId":"05198000597167","balance":"1,000.00","accountBalance":"1,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/12/29","accountId":"05198000597133","balance":"1,200.00","accountBalance":"1,200.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2020/05/28","accountId":"55198000070704","balance":"10,000.00","accountBalance":"10,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2019/12/28","accountId":"55198000070699","balance":"5,000.00","accountBalance":"5,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2020/05/28","accountId":"05198000597125","balance":"1,002.00","accountBalance":"1,002.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/12/28","accountId":"05198000597117","balance":"1,001.00","accountBalance":"1,001.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/12/28","accountId":"55198000070681","balance":"1,111.00","accountBalance":"1,111.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2019/12/28","accountId":"05198000597109","balance":"10,000.00","accountBalance":"10,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2020/04/30","accountId":"23198002918286","balance":"11,000.00","accountBalance":"11,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2020/04/30","accountId":"05198000597010","balance":"1,600.00","accountBalance":"1,600.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2020/04/29","accountId":"05198000596991","balance":"2,200.00","accountBalance":"2,200.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/12/29","accountId":"05198000596983","balance":"1,500.00","accountBalance":"1,500.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2020/04/29","accountId":"55198000070665","balance":"2,000.00","accountBalance":"2,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/12/28","accountId":"05198000596975","balance":"1,580.00","accountBalance":"1,580.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"ZAR","currencyName":"南非幣","endDate":"2019/12/28","accountId":"05198000596967","balance":"21,000.00","accountBalance":"21,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"ZAR","currencyName":"南非幣","endDate":"2019/12/28","accountId":"05198000596941","balance":"22,000.00","accountBalance":"22,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"ZAR","currencyName":"南非幣","endDate":"2019/12/28","accountId":"55198000070657","balance":"20,010.00","accountBalance":"20,010.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/12/28","accountId":"05198000596925","balance":"1,799.00","accountBalance":"1,799.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/12/25","accountId":"05198000596917","balance":"1,000.00","accountBalance":"1,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/10/09","accountId":"05198000596836","balance":"1,937.68","accountBalance":"1,937.68"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2020/03/26","accountId":"23198002918278","balance":"25,000.00","accountBalance":"25,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2020/03/26","accountId":"05198000596789","balance":"1,202.00","accountBalance":"1,202.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/12/05","accountId":"05198000596690","balance":"5,000.90","accountBalance":"5,000.90"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/12/05","accountId":"05198000596682","balance":"2,500.00","accountBalance":"2,500.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"AUD","currencyName":"澳幣","endDate":"2019/09/12","accountId":"23198002918260","balance":"50,000.00","accountBalance":"50,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"AUD","currencyName":"澳幣","endDate":"2019/10/20","accountId":"23198002918252","balance":"5,000.00","accountBalance":"5,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2019/12/05","accountId":"23198002918244","balance":"50,000.00","accountBalance":"50,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2019/10/01","accountId":"23198002918236","balance":"10,000.00","accountBalance":"10,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"JPY","currencyName":"日圓","endDate":"2019/08/20","accountId":"55198000070615","balance":"300,000.00","accountBalance":"300,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2020/08/05","accountId":"05198000596551","balance":"1,000.00","accountBalance":"1,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2019/12/25","accountId":"55198000070576","balance":"10,000.00","accountBalance":"10,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2019/12/25","accountId":"23198002918228","balance":"10,001.00","accountBalance":"10,001.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/09/25","accountId":"05198000596496","balance":"1,560.00","accountBalance":"1,560.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"AUD","currencyName":"澳幣","endDate":"2019/09/06","accountId":"55198000070568","balance":"3,000.00","accountBalance":"3,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"AUD","currencyName":"澳幣","endDate":"2019/09/05","accountId":"23198002918210","balance":"2,000.50","accountBalance":"2,000.50"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"AUD","currencyName":"澳幣","endDate":"2019/09/03","accountId":"23198002918202","balance":"1,500.00","accountBalance":"1,500.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"AUD","currencyName":"澳幣","endDate":"2019/09/03","accountId":"05198000596292","balance":"1,000.00","accountBalance":"1,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"AUD","currencyName":"澳幣","endDate":"2019/09/03","accountId":"23198002918197","balance":"2,000.50","accountBalance":"2,000.50"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/10/23","accountId":"05198000596161","balance":"6,006.00","accountBalance":"6,006.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/07/23","accountId":"55198000070500","balance":"1,201.00","accountBalance":"1,201.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2019/09/25","accountId":"23198002918189","balance":"10,100.00","accountBalance":"10,100.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"AUD","currencyName":"澳幣","endDate":"2019/06/15","accountId":"23198002918171","balance":"110,000.00","accountBalance":"110,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/08/23","accountId":"55198000070411","balance":"2,187.00","accountBalance":"2,187.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/08/22","accountId":"05198000595937","balance":"1,000.00","accountBalance":"1,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2019/08/21","accountId":"55198000070403","balance":"10,500.00","accountBalance":"10,500.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/08/20","accountId":"05198000595929","balance":"1,001.00","accountBalance":"1,001.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2019/08/20","accountId":"23198002918163","balance":"11,000.00","accountBalance":"11,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/08/20","accountId":"05198000595911","balance":"1,000.00","accountBalance":"1,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2019/08/19","accountId":"23198002918155","balance":"12,000.00","accountBalance":"12,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2019/08/19","accountId":"23198002918147","balance":"12,000.00","accountBalance":"12,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2020/01/22","accountId":"05198000595848","balance":"5,688.00","accountBalance":"5,688.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/07/22","accountId":"55198000070356","balance":"2,001.00","accountBalance":"2,001.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/06/25","accountId":"55198000070178","balance":"5,000.00","accountBalance":"5,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/03/24","accountId":"05198000595733","balance":"3,000.00","accountBalance":"3,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2019/06/24","accountId":"23198002918139","balance":"11,002.00","accountBalance":"11,002.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"HKD","currencyName":"港幣","endDate":"2019/03/24","accountId":"55198000070160","balance":"10,000.00","accountBalance":"10,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/12/24","accountId":"55198000070152","balance":"6,688.00","accountBalance":"6,688.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/06/24","accountId":"05198000595725","balance":"1,001.00","accountBalance":"1,001.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2019/06/24","accountId":"23198002918121","balance":"11,000.00","accountBalance":"11,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/12/24","accountId":"05198000595717","balance":"1,500.00","accountBalance":"1,500.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/06/24","accountId":"05198000595709","balance":"2,000.00","accountBalance":"2,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"HKD","currencyName":"港幣","endDate":"2019/03/24","accountId":"23198002918113","balance":"13,000.00","accountBalance":"13,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"HKD","currencyName":"港幣","endDate":"2019/03/24","accountId":"23198002918105","balance":"40,000.00","accountBalance":"40,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"HKD","currencyName":"港幣","endDate":"2019/03/24","accountId":"55198000070144","balance":"12,000.00","accountBalance":"12,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/11/30","accountId":"55198000070128","balance":"1,234.00","accountBalance":"1,234.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/11/30","accountId":"55198000070110","balance":"1,000.00","accountBalance":"1,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/11/30","accountId":"55198000070102","balance":"1,000.00","accountBalance":"1,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/11/23","accountId":"55198000070097","balance":"1,000.00","accountBalance":"1,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/11/23","accountId":"55198000070089","balance":"1,000.00","accountBalance":"1,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/11/23","accountId":"55198000070063","balance":"1,000.00","accountBalance":"1,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/11/23","accountId":"55198000070071","balance":"1,000.00","accountBalance":"1,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2019/03/26","accountId":"23198002918090","balance":"12,000.00","accountBalance":"12,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2019/03/21","accountId":"23198002918082","balance":"10,001.00","accountBalance":"10,001.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/11/05","accountId":"05198000595301","balance":"10,001.00","accountBalance":"10,001.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/09/21","accountId":"55198000069981","balance":"6,800.00","accountBalance":"6,800.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/03/21","accountId":"05198000595296","balance":"1,105.00","accountBalance":"1,105.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/09/21","accountId":"05198000595262","balance":"1,200.00","accountBalance":"1,200.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/03/21","accountId":"05198000595254","balance":"1,100.00","accountBalance":"1,100.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/11/05","accountId":"05198000595246","balance":"11,000.00","accountBalance":"11,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/03/20","accountId":"05198000595238","balance":"1,000.00","accountBalance":"1,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/11/04","accountId":"05198000595220","balance":"10,000.00","accountBalance":"10,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2018/08/13","accountId":"23198002918074","balance":"11,000.00","accountBalance":"11,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2018/08/13","accountId":"23198002918066","balance":"51,000.00","accountBalance":"51,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2018/08/12","accountId":"23198002918058","balance":"51,000.00","accountBalance":"51,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2018/12/28","accountId":"23198002918040","balance":"16,880.00","accountBalance":"16,880.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2018/08/12","accountId":"23198002918032","balance":"60,000.00","accountBalance":"60,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/06/28","accountId":"05198000594232","balance":"6,000.00","accountBalance":"6,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/12/28","accountId":"05198000594216","balance":"2,500.00","accountBalance":"2,500.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/08/12","accountId":"05198000594208","balance":"20,000.00","accountBalance":"20,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/06/28","accountId":"55198000069957","balance":"5,555.00","accountBalance":"5,555.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/12/28","accountId":"05198000594169","balance":"1,005.00","accountBalance":"1,005.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/12/27","accountId":"05198000594143","balance":"1,001.00","accountBalance":"1,001.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/08/11","accountId":"05198000594135","balance":"11,005.00","accountBalance":"11,005.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2018/08/11","accountId":"23198002918024","balance":"53,000.00","accountBalance":"53,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/09/27","accountId":"55198000069892","balance":"5,500.00","accountBalance":"5,500.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/09/27","accountId":"55198000069884","balance":"5,200.00","accountBalance":"5,200.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/09/27","accountId":"55198000069876","balance":"5,102.00","accountBalance":"5,102.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/06/27","accountId":"55198000069868","balance":"1,501.00","accountBalance":"1,501.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/12/27","accountId":"55198000069850","balance":"1,500.00","accountBalance":"1,500.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2018/12/27","accountId":"23198002918016","balance":"12,000.50","accountBalance":"12,000.50"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2018/12/27","accountId":"23198002918008","balance":"12,000.00","accountBalance":"12,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2018/12/22","accountId":"23198002917997","balance":"10,000.00","accountBalance":"10,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"KRW","currencyName":"韓圜","endDate":"2018/07/22","accountId":"05198000594062","balance":"2,000,000.00","accountBalance":"2,000,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2018/12/19","accountId":"23198002917989","balance":"10,000.00","accountBalance":"10,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/07/19","accountId":"05198000594038","balance":"1,000.00","accountBalance":"1,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/07/19","accountId":"05198000594020","balance":"1,000.00","accountBalance":"1,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"HKD","currencyName":"港幣","endDate":"2018/07/15","accountId":"55198000069842","balance":"10,000.00","accountBalance":"10,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CHF","currencyName":"瑞士法郎","endDate":"2018/07/15","accountId":"23198002917971","balance":"100,000.00","accountBalance":"100,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/09/04","accountId":"55198000069834","balance":"1,004.00","accountBalance":"1,004.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/09/04","accountId":"55198000069826","balance":"1,003.00","accountBalance":"1,003.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/09/04","accountId":"55198000069818","balance":"1,002.00","accountBalance":"1,002.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/09/04","accountId":"55198000069800","balance":"1,001.00","accountBalance":"1,001.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/09/04","accountId":"55198000069795","balance":"1,001.00","accountBalance":"1,001.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/05/22","accountId":"55198000069787","balance":"3,000.00","accountBalance":"3,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/05/11","accountId":"55198000069779","balance":"3,600.00","accountBalance":"3,600.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/05/11","accountId":"55198000069761","balance":"6,000.00","accountBalance":"6,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/05/11","accountId":"05198000593888","balance":"5,500.00","accountBalance":"5,500.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/05/11","accountId":"55198000069753","balance":"5,000.00","accountBalance":"5,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/05/11","accountId":"55198000069745","balance":"3,000.00","accountBalance":"3,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/04/30","accountId":"05198000593854","balance":"5,005.00","accountBalance":"5,005.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/10/30","accountId":"05198000593820","balance":"3,001.00","accountBalance":"3,001.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/10/30","accountId":"05198000593846","balance":"3,001.00","accountBalance":"3,001.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"KRW","currencyName":"韓圜","endDate":"2018/07/26","accountId":"05198000593600","balance":"1,200,200.00","accountBalance":"1,200,200.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2018/09/20","accountId":"55198000069737","balance":"10,000.00","accountBalance":"10,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2018/10/02","accountId":"55198000069729","balance":"10,002.00","accountBalance":"10,002.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/04/02","accountId":"55198000069711","balance":"5,648.33","accountBalance":"5,648.33"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/07/02","accountId":"55198000069703","balance":"1,001.00","accountBalance":"1,001.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2018/09/19","accountId":"55198000069698","balance":"10,000.00","accountBalance":"10,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2019/03/19","accountId":"55198000069680","balance":"1,000.00","accountBalance":"1,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2018/09/16","accountId":"55198000069672","balance":"10,000.00","accountBalance":"10,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/06/13","accountId":"55198000069664","balance":"1,000.00","accountBalance":"1,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"CNY","currencyName":"人民幣","endDate":"2018/06/15","accountId":"55198000069630","balance":"10,000.00","accountBalance":"10,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/09/27","accountId":"55198000069591","balance":"1,000.00","accountBalance":"1,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2018/03/31","accountId":"55198000069444","balance":"23,121.92","accountBalance":"23,121.92"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2017/06/12","accountId":"23198002917793","balance":"1,000.00","accountBalance":"1,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2017/06/12","accountId":"23198002917785","balance":"1,000.00","accountBalance":"1,000.00"},{"nickName":"","accType":"198","type":"綜存定存","currencyCode":"USD","currencyName":"美金","endDate":"2013/02/21","accountId":"55198000068799","balance":"1,003.39","accountBalance":"1,003.39"}]},"currencyList":[{"currencyCode":"THB","balance":"443,251.09","balanceTwd":"412,224"},{"currencyCode":"SGD","balance":"20,000,072,170.82","balanceTwd":"443,601,600,749"},{"currencyCode":"ZAR","balance":"100,999,297,667.05","balanceTwd":"212,098,525,101"},{"currencyCode":"JPY","balance":"11,035,345,341","balanceTwd":"3,023,684,623"},{"currencyCode":"DKK","balance":"200,193,333.11","balanceTwd":"890,860,332"},{"currencyCode":"CHF","balance":"1,000,006,530.97","balanceTwd":"30,870,201,611"},{"currencyCode":"CNY","balance":"32,002,468,943.62","balanceTwd":"136,746,549,796"},{"currencyCode":"AUD","balance":"20,103,221,283.15","balanceTwd":"421,162,485,882"},{"currencyCode":"HKD","balance":"30,999,715,902.22","balanceTwd":"118,449,914,462"},{"currencyCode":"USD","balance":"57,629,417,643.69","balanceTwd":"1,725,424,764,252"},{"currencyCode":"NZD","balance":"25,418,863.74","balanceTwd":"510,664,973"},{"currencyCode":"SEK","balance":"1,000,479,564.68","balanceTwd":"3,161,515,424"},{"currencyCode":"EUR","balance":"30,000,474,302.09","balanceTwd":"1,003,815,870,148"},{"currencyCode":"CAD","balance":"10,007,611,172.05","balanceTwd":"230,475,285,292"},{"currencyCode":"KRW","balance":"491,481,801","balanceTwd":"12,139,600"},{"currencyCode":"GBP","balance":"10,100,008,762.98","balanceTwd":"399,657,346,751"}]},"partNegative":{"totalBalance":"799,500.00","loansInfoData":{"typeTotalBalance":"799,500.00","account":[{"nickName":"","accType":"152","type":"貸款","status":"正常戶","endDate":"2022-04-05","accountId":"02152000047295","balance":"799,500.00"}]},"cardsInfoData":{}},"partInvest":{"totalBalance":"313,829,964.00","fundInfoData":{"typeTotalBalance":"313,829,964.00","account":[{"totPrice":"313,829,964.00","noProc":"3,275,154.00","baoChou":"1.05","haveFundAllow":"Y","totccy":"折台","totosamt":"310,554,810.00","apdint":".00","intretn":"1.05"}]},"goldInfoData":{"typeTotalBalance":"0.00","account":[{"accountId":"02118000099884","balance":"0.00"}]}}}
};


let df_response = {
    "apiId": "SPEC05010101",
    "token": {
        "requestId": "",
        "responseTime": "",
        "lang": "TW"
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    "resContent": {
        "positive": "", // 正資產加總
        "negative": "", // 負資產加總
        // 台幣帳戶
        "partTwd": {
            "errorMsg": "",
            "totalBalance": "0",
            // 支票存款
            "checkingAcctInfoData": {
                "typeTotalBalance": "0",
                "account": []
            },
            // 活期
            "savingsAcctInfoData": {
                "typeTotalBalance": "0",
                "account": []
            },
            // 定期存款
            "timeAcctInfoData": {
                "typeTotalBalance": "0",
                "account": []
            },
            // 其他帳號
            "otherAcctInfoData": {
                "typeTotalBalance": "0",
                "account": []
            }
        },
        // 外幣帳戶
        "partForeign": {
            "errorMsg": "",
            "totalBalance": "0",
            "savingsAcctInfoData": {
                "typeTotalBalance": "0",
                "account": []
            },
            // 定期存款
            "timeAcctInfoData": {
                "typeTotalBalance": "0",
                "account": []
            },
            // 其他帳號
            "otherAcctInfoData": {
                "typeTotalBalance": "0",
                "account": []
            },
            "currencyList": []
        },
        // 負資產
        "partNegative": {
            "totalBalance": "0",
            // 貸款
            "loansInfoData": {
                "errorMsg": "",
                "typeTotalBalance": "0",
                "account": []
            },
            // 信用卡
            "cardsInfoData": {
                "errorMsg": "",
                "typeTotalBalance": "0",
            }
        },
        "partInvest": {
            "totalBalance": "0",
            // 基金/集合
            "fundInfoData": {
                "errorMsg": "",
                "typeTotalBalance": "0",
            },
            // 黃金
            "goldInfoData": {
                "errorMsg": "",
                "typeTotalBalance": "0",
                "account": []
            }
        }
    }
};

// export const api_response1 = resData1;
export const api_response1 = { ...df_response, ...real_data };
export const api_response = { ...df_response, ...resData };

export const api_response_erfund = {
    ...df_response, ...{
        "resContent": {
            "partInvest": {
                "totalBalance": "12,000",
                // 基金/集合
                "fundInfoData": {
                    "errorMsg": "目前批次轉檔作業中",
                    "typeTotalBalance": "0",
                },
                // 黃金
                "goldInfoData": {
                    "errorMsg": "",
                    "typeTotalBalance": "12,000",
                    "account": [
                        {
                            "accountId": "11151000122977",
                            "nickName": "測試977",
                            "accType": "151",
                            "type": "黃金存摺",
                            "balance": "6,300"
                        }
                    ]
                }
            }
        }
    }
};


export const api_error = {
    'apiId': 'SPEC05010101',
    'token': {
        'requestId': '',
        'responseTime': '2020-06-20 18:18:31',
        'lang': 'zh_TW'
    },
    'resFlag': '1',
    'resMessage': {
        'errorCode': 'ERRAAAAAAA',
        'errorMsg': 'Test Error'
    }
};
export const api_exception = {
    'errorCode': 'ERRAAAAAAA',
    'errorMsg': 'Test Error'
};
