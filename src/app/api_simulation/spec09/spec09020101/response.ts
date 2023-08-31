/**
 * 模擬api SPEC09020101-綜存開戶約定事項
 */

let response = {
    "apiId": "SPEC09020101",
    "token": {
        "requestId": "",
        "responseTime": "2020-07-07 17:07:39",
        "lang": "zh_TW"
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    "resContent": {
        "agreeTerms": "約定事項：1.本存款係綜合活期（儲蓄）存款（以下簡稱活存）、定期（儲蓄）存款（以下簡稱定存）、定存質押借款以下簡稱質借）於同一帳戶內。2.開立本存款後，凡辦理定存，貴行得將定存明細依與客戶約定之方式填入存摺或對帳單，本存款項下之定存不另簽發存單，除另有約定外，在所有定存總金額之範圍內，均設定最高限額質權予貴行，擔保貴行對客戶之借款、透支、貼現、買入光票、墊款、承兌、委任保證、開發信用狀、進出口押匯、票據、保證、信用卡契約、應收帳款承購契約、衍生性金融商品交易契約、特約商店契約、取得執行名義之費用、債務不履行而發生之損害賠償及辦理客戶與貴行約定之擔保債權種類及範圍所生之手續費用。３.活存轉存定存方式有兩種，一為自動轉存，二為臨櫃轉存。自動轉存為客戶之活存餘額超過約定留存餘額時，其超過部分以新臺幣壹萬元之倍數一筆自動轉存為該約定之定存，此自動轉存之約定，不因客戶死亡、破產或喪失行為能力而終止；臨櫃轉存為客戶至櫃台申請或以網路銀行或自動化服務設備申請轉存為定存。轉存金額則依貴行存單存款規定辦理（以自動化服務設備申請者，依貴行於營業廳公告啟用時生效）。4.本存款中定存於到期時即自動結清轉存活存；亦可由客戶於到期前申請提前結清或變更約定為自動轉期，經約定為自動轉期者，不因客戶死亡、破產或喪失行為能力而終。5.本存款中定存結清本息或存期中約定給付時，客戶不得直接提領現款，一律以轉帳方式轉入活存帳戶後再由活存帳戶提領款項。6.在擔保債權確定前，本存款於客戶提取款項或依約定方式扣取款項時，若取款金額超過活存餘額，超過部份視為質借，即由貴行自動依客戶在本存款項下之所有定存金額九成範圍內由客戶陸續質借，客戶不另簽具借款憑證。質借利息一律由貴行自活存帳上直接扣除，不足者貴行得視同客戶再向貴行質借相當於該不足額之本金，並以之抵充利息。7.本存款質借本金如超逾本存款項下之所有定存金額九成範圍時（以下簡稱超額質借），客戶經貴行通知應即清償超逾之部分，否則貴行得自動將定存結清，依序抵充客戶應付之費用、利息、本金等債務 。8.本存款質借期限一年，質借期限到期即自動展期一年，餘此類推，同時就本存款後續存入之活存金額視為自動償還質借款項。9.本存款質借利息以質借當日定存利率較低者，優先逐筆計算，計息利率以該筆定存利率加1.5％為依據；超額質借部份之計息利率，以當日貴行牌告基準利率加3％為依據。10.本存款所有應收應付之利息，均以轉帳方式轉存活存或由活存帳上扣除。11.本存款質借利息收息日為每月二十一日，係收取上月二十一日截至本月二十日所有定存質借利息總額及超額質借利息。惟定存結清時，即同時收取該筆定存質借利息及超額質借利息。 "
    }
};
let data1M = {};
let dataEmpty = {
    apiId: "SPEC09020101",
    token: {
        requestId: "",
        responseTime: "2020-07-17 11:13:27",
        lang: "zh_TW"
    },
    resFlag: '0',
    resMessage: {
        errorCode: "",
        errorMsg: ""
    },
    resContent: {
        outputData: [
            {
                isNetTrans: "true",
                roiDataList: [

                ],
                "infoDateStr": "2020/07/17  11：13：27  AM"
            }
        ]
    }
};

let df_response = {};

export const api_response = { ...df_response, ...response };
export const api_empty = { ...df_response, ...dataEmpty };
export const api_error = {
    apiId: 'SPEC09020101',
    token: {
        requestId: '',
        responseTime: '2020-06-20 18:18:31',
        lang: 'zh_TW'
    },
    resFlag: '1',
    resMessage: {
        errorCode: 'ERRAAAAAAA',
        errorMsg: 'Test Error'
    }
};
export const api_exception = {
    errorCode: 'ERRAAAAAAA',
    errorMsg: 'Test Error'
};