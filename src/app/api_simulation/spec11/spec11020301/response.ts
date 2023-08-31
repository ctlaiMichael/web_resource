/**
 * 模擬api
 */
let data = {
    'apiId': 'SPEC11020301',
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
    "resContent": {
        "redeemAmt": "30000",
        "isForeignOldID": "N",
        "redeemUnit": "10",
        "isInventoryFund": "N",
        "lastUnit": "2088",
        "isAllRedeemed": "N",
        "lastAmt": "20",
        "isAllTerminated": "N",
        "isShartTrade": "Y",
        "tradeDate": "台端本筆交易已構成該基金公開說明書所認定之短線交易，請確認是否同意並接受該基金短線交易之範圍 (包括但不限於支付額外之短線交易手續費及相關費用) ，交易確認後，本行將依該基金最新版公開說明書規定辦理。<br><br>基金公開說明書請至本行網站<br>(http://fund.scsb.com.tw)、各該基金公司網站或公開資訊觀測站<br>(http://newmops.tse.com.tw)參閱、下載。<br><br>本人同意並接受本筆交易基金短線交易之規範 (包括但不限於支付額外之短線交易手續費及相關費用)。<br><br>基金公司如有收取短線交易費用者，本行將依基金公司之最新公開說明書規定辦理，2020-11-18起交易將不視為短線交易。"
    }
};

let df_response = {
    'apiId': 'SPEC11020301',
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

export const api_response = { ...df_response, ...data };
export const api_response_empty = { ...df_response, ...df_response };
export const api_error = {
    'apiId': 'SPEC11020301',
    'token': {
        'requestId': '',
        'responseTime': '2020-06-20 18:18:31',
        'lang': 'zh_TW'
    },
    'resFlag': '1',
    'resMessage': {
        'errorCode': '401',
        'errorMsg': 'Test Error'
    }
};
export const api_exception = {
    'errorCode': '401',
    'errorMsg': 'Test Error'
};
