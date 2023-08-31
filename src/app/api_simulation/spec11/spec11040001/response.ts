/**
 * 模擬api
 */
let data = {
    "apiId": "SPEC11040001",
    "token": {
        "requestId": "",
        "responseTime": "2020-09-21 15:35:12",
        "lang": "zh_TW"
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    "resContent": {
        "usaSignNote": "Y",
        "version": "09909T",
        "showNotifiCation": "Y",
        "riskDisclosure": "A+B",
        "bShare": "B",
        "staNote": "Y",
        "typeInd": "N",
        "kyc": "Y",
        "pdfUrl": "https://www.google.com/webhp?hl=zh-TW&sa=X&ved=0ahUKEwjn0vC_hYntAhXqwosBHc0IDsAQPAgI",
    }
};

let realData = {
    "apiId": "SPEC11040001",
    "token": {
        "requestId": "aabd0aadd039d08e1602833932255",
        "responseTime": "2020-10-16 15:38:35",
        "lang": "zh_TW"
    },
    "resFlag": "0",
    "resMessage": {
        "errorCode": "",
        "errorMsg": ""
    },
    "resContent": {
        "typeInd": "N",
        "usasign_agr": "Y",
        "version": "10807T",
        "staNote": "Y",
        "bShare": "Y",
        "showNotifiCation": "N",
        "riskDisclosure": "A+B+C",
        "usaSignNote": "Y",
        "sign_agr": "",
        "kyc": "Y",
        "term10": "Y",
        "term11": "Y",
        "term12": "Y",
        "term13": "Y",
        "feeHtml": "<p style=\"font-size: xx-small; text-align: left;\">版本：1081105;&nbsp;日期：<%=infoDateStr%>&nbsp;</p><p class=\"txt_bold\">壹、上海商業儲蓄銀行銷售&nbsp;<%=PX901%>「<%=PX902%>」所收取之通路報酬如下：</p><p class=\"txt_bold\">ㄧ、投資人支付</p><ol class=\"note_ol_content\"><li style=\"list-style-type: '';\">項目1：申購手續費分成(%)(依&nbsp;&nbsp;台端申購金額)：</li><li style=\"list-style-type: '';\">項目1說明：&nbsp;&nbsp;台端支付的基金申購手續費率為<strong class=\"txt_highlight_red\"><%=actionForm.feep%>%</strong>，其中本行收取不多於<strong class=\"txt_highlight_red\"><%=actionForm.feep%>%</strong>。</li><li style=\"list-style-type: '';\">※定期（不）定額扣款手續費若有優惠則依本行優惠費率辦理。</li></ol><p class=\"txt_bold\">二、境外基金機構、總代理人或投信支付</p><ol class=\"note_ol_content\"><li style=\"list-style-type: '';\">項目1：經理費分成(%)(依&nbsp;&nbsp;台端持有金額)：</li><li style=\"list-style-type: '';\">項目1說明：本基金經理費收入為年率<strong class=\"txt_highlight_red\"><%=PX907%>%</strong>【含經銷費(Distribution Fee、12b-1 Fee）等】，&nbsp;&nbsp;台端持有本基金期間，本銀行收取不多於年率<strong class=\"txt_highlight_red\"><%=PX908%>%</strong>。</li></ol><br><ol class=\"note_ol_content\"><li style=\"list-style-type: '';\">項目2：贊助或提供對銷售機構之產品說明會及員工教育訓練：</li><li style=\"list-style-type: '';\">項目2說明：未達2百萬元揭露門檻</li></ol><br><ol class=\"note_ol_content\"><li style=\"list-style-type: '';\">項目3：其他報酬：</li><li style=\"list-style-type: '';\">項目3說明：未達1百萬元揭露門檻。</li></ol><br><p class=\"txt_bold\">計算說明：</p>「<%=PX902%>基金」之遞延申購手續費及經理費<strong class=\"txt_highlight_red\"><%=PX907%>%</strong>，本銀行銷售之申購手續費分成不多於3%、經理費分成不多於<strong class=\"txt_highlight_red\"><%=PX908%>%</strong>，另本銀行本年度銷售<%=PX901%>基金，該投信預計贊助或提供產品說明會、員工教育訓練之金額合計為<%=PX917%>元，預計其他報酬合計為<%=PX919%>元。<br/><strong>釋例</strong><br/>台端每投資100,000元於「<%=PX902%>」，本銀行每年收取之通路報酬如下： <br/>(1).由台端所支付之100.0元申購手續費中收取不多於100.0元(100,000*0.100%=100.0元)<br/>(2).<%=PX901%>支付：<br/>1.台端持有本基金期間之經理費分成：不多於1,000.0元(100,000*1.00%=1,000.0元)<br/>2.產品說明會及員工教育訓練：<%=PX917%>元<br/>3.本銀行自<%=PX901%>獲得其他報酬：400,000元</br></br>本銀行辦理基金銷售業務，係自各境外基金機構、總代理人及證券投資信託事業收取通路報酬(各項報酬、費用及其他利益)，以支應投資人服務及行銷成本。惟因各基金性質不同且各基金公司之行銷策略不同，致本銀行銷售不同基金時，自各基金公司收取通路報酬之項目及金額因而有所不同。本銀行及業務人員所銷售之基金，容或與台端個人投資組合之利益不相一致，請台端依個人投資目標及基金風險屬性，慎選投資標的。未來若相關通路報酬變動將於本行網頁上公告，將不另行通知台端。",
        "signDate": "2020-11-26"
    }
};

let errorData = {
    "apiId": "SPEC11040001",
    "token": {
        "requestId": "a8f288ea445c0f461603418514592",
        "responseTime": "2020-10-23 10:01:30",
        "lang": "zh_TW"
    },
    "resFlag": "1"
};

let df_response = {
    'apiId': 'SPEC11040001',
    'token': {
        'requestId': '',
        'responseTime': '',
        'lang': ''
    },
    'resFlag': '0',
    'resMessage': {
        'errorCode': '',
        'errorMsg': ''
    },
    'resContent': {

    }
};

export const api_response = { ...df_response, ...realData };
export const api_response_empty = { ...df_response, ...df_response };
export const api_error = {
    'apiId': 'SPEC11040001',
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
