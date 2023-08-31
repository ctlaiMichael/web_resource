/**
 * 定義錯誤訊息物件
 */
import { ERROR_UC01 } from './error_uc01'; // 一般登入
import { ERROR_UC02 } from './error_uc02'; // 一般登入
import { ERROR_UC03 } from './error_uc03'; // 快速設定
import { ERROR_UC04 } from './error_uc04'; // 訊息服務
import { ERROR_UC05 } from './error_uc05'; // 帳戶資產查詢
import { ERROR_UC06 } from './error_uc06'; // 國外匯入匯款
import { ERROR_UC07 } from './error_uc07'; // 定期存款
import { ERROR_UC08 } from './error_uc08'; // 貸款服務
import { ERROR_UC09 } from './error_uc09'; // 轉帳交易
import { ERROR_UC10 } from './error_uc10'; // 金融資訊
import { ERROR_UC11 } from './error_uc11'; // 投資理財服務
import { ERROR_UC12 } from './error_uc12'; // 信用卡
import { ERROR_UC13 } from './error_uc13'; // 服務據點
import { ERROR_UC23 } from './error_uc23'; // 行動框架

// -------------------- [系統共用 0000 ] -------------------- //
const ERROR_UC0000 = {
    // 預設錯誤
    'DEFAULT': {
        app_error_code: '0000001',
        app_error_code_hide: false,
        help: '預設錯誤',
        title: 'ERROR.TITLE',
        // 發生未預期的錯誤，若有帳務交易，請確認本筆交易是否成功（查詢轉出帳號餘額或交易明細），造成不便，敬請見諒。若有其他問題，請聯繫本行客服中心。
        content: 'ERROR.DEFAULT'
    }
    // 參數格式錯誤
    , 'DATA_FORMAT_ERROR': {
        app_error_code: '0000002',
        app_error_code_hide: false,
        help: '設定參數格式錯誤',
        title: 'ERROR.TITLE',
        // 資料格式錯誤
        content: 'ERROR.DATA_FORMAT_ERROR'
    }
    // 回傳資料格式錯誤
    , 'RSP_FORMATE_ERROR': {
        app_error_code: '0000003',
        app_error_code_hide: false,
        help: '回傳資料格式錯誤',
        title: 'ERROR.TITLE',
        // 回傳資料格式錯誤，請聯絡客服人員。
        content: 'ERROR.RSP_FORMATE_ERROR'
    }
    // 無資料
    , 'EMPTY': {
        app_error_code: '0000004',
        app_error_code_hide: false,
        help: '查無資料',
        title: 'ERROR.TITLE',
        // 查無資料
        content: 'ERROR.EMPTY'
    }
    // 無資料
    , 'EMPTY_SEARCH': {
        app_error_code: '0000005',
        app_error_code_hide: false,
        help: '查詢期間無交易資料',
        title: 'ERROR.TITLE',
        // 查詢期間無交易資料
        content: 'ERROR.EMPTY_SEARCH'
    }
    // 路徑不存在
    , 'EMPTY_PATH': {
        app_error_code: '0000006',
        app_error_code_hide: false,
        help: '指定功能路徑不存在',
        title: 'ERROR.TITLE',
        // content: 'ERROR.PATH_NOT_EXIST'
        content: '目前此功能尚未提供喔!!!!!'
    }
    // 路徑不存在: 連結設定(中台設定資料)
    , 'EMPTY_LINK': {
        app_error_code: '0000007',
        app_error_code_hide: false,
        help: '指定功能路徑不存在(對外連線)',
        title: 'ERROR.TITLE',
        content: 'ERROR.PATH_NOT_EXIST'
    }

};
// -------------------- [通訊API相關 0001 ] -------------------- //
const ERROR_UC0001 = {
    // 參數格式錯誤
    'REQ_ERROR': {
        app_error_code: '0001001',
        app_error_code_hide: false,
        help: 'api request設定參數格式錯誤',
        title: 'ERROR.TITLE',
        // 資料格式錯誤
        content: 'ERROR.DATA_FORMAT_ERROR'
    }
    // 無資料
    , 'REP_ERROR': {
        app_error_code: '0001002',
        app_error_code_hide: false,
        help: 'api response回傳資料格式錯誤',
        title: 'ERROR.TITLE',
        // 回傳資料格式錯誤，請聯絡客服人員。
        content: 'ERROR.RSP_FORMATE_ERROR'
    }
    // 無資料
    , 'EMPTY_API': {
        app_error_code: '0001003',
        app_error_code_hide: false,
        help: '查無資料',
        title: 'ERROR.TITLE',
        // 查無資料
        content: 'ERROR.EMPTY'
    }
    // 無資料
    , 'EMPTY_RANGE_API': {
        app_error_code: '0001004',
        app_error_code_hide: false,
        help: '查詢期間無交易資料',
        title: 'ERROR.TITLE',
        // 查詢期間無交易資料
        content: 'ERROR.EMPTY_SEARCH'
    }
};
// -------------------- [通訊相關 0002 ] -------------------- //
const ERROR_UC0002 = {
    'SERVER_MAINTAIN': {
        app_error_code: '0002001',
        app_error_code_hide: true, // 停機公告已設定內容為準
        help: '停機公告機制',
        title: 'ERROR.INFO_TITLE',
        // 親愛的客戶您好，目前系統維護中，請稍後再試。造成您的不便，敬請見諒。
        content: 'ERROR.NO_SERVICE'
    }
    , 'NETWORK_CLIENT': {
        app_error_code: '0002002',
        app_error_code_hide: false,
        help: 'client network error',
        title: 'ERROR.TITLE',
        // 網路連線失敗，請您確認網路連線後再試。
        content: 'ERROR.NO_NETWORK'
    }
    , 'NETWORK_SERVER': {
        app_error_code: '0002003',
        app_error_code_hide: false,
        help: 'server network error',
        title: 'ERROR.TITLE',
        // 系統維護中，請稍後再試!若有其他問題，請聯絡客服人員。
        content: 'ERROR.CONNECTION'
    }
    , 'SERVER_TIMEOUT': {
        app_error_code: '0002004',
        app_error_code_hide: false,
        help: 'server connect timeout',
        title: 'ERROR.TITLE',
        // 連線逾時，請稍後再試，若有帳務交易發生逾時情況，煩請先暫停交易並洽客服人員查明結果。
        content: 'ERROR.CONNECTION_TIMEOUT'
    }
    , 'SERVER_TIMEOUT_CLIENT': {
        app_error_code: '0002005',
        app_error_code_hide: false,
        help: 'client wait server connect timeout(APP 等候超過時間)',
        title: 'ERROR.TITLE',
        // 連線逾時，請稍後再試，若有帳務交易發生逾時情況，煩請先暫停交易並洽客服人員查明結果。
        content: 'ERROR.CONNECTION_TIMEOUT'
    }
    , 'CHALLENGE_RESPONSE_ERROR': {
        app_error_code: '0002006',
        app_error_code_hide: false,
        help: 'do challenge response error',
        title: 'ERROR.TITLE',
        // 系統維護中，請稍後再試!若有其他問題，請聯絡客服人員。
        content: 'ERROR.CONNECTION'
    }
    , 'CHALLENGE_RESPONSE_CHANGE_ERROR': {
        app_error_code: '0002007',
        app_error_code_hide: false,
        help: 'send challenge response error',
        title: 'ERROR.TITLE',
        // 系統維護中，請稍後再試!若有其他問題，請聯絡客服人員。
        content: 'ERROR.CONNECTION'
    }
    , 'REQUEST_TOKEN_SET_ERROR': {
        app_error_code: '0002008',
        app_error_code_hide: false,
        // modify request obj token object is error
        help: 'modify request token data error',
        title: 'ERROR.TITLE',
        // 資料格式錯誤
        content: 'ERROR.DATA_FORMAT_ERROR'
    }
    , 'API_SEND_ERROR': {
        app_error_code: '0002009',
        app_error_code_hide: false,
        // send api error
        help: 'send api error',
        title: 'ERROR.TITLE',
        // 系統維護中，請稍後再試!若有其他問題，請聯絡客服人員。
        content: 'ERROR.CONNECTION'
    }
    , 'API_POST_ERROR': {
        app_error_code: '0002010',
        app_error_code_hide: false,
        // do api post error
        help: 'do api post error',
        title: 'ERROR.TITLE',
        // 系統維護中，請稍後再試!若有其他問題，請聯絡客服人員。
        content: 'ERROR.CONNECTION'
    }
    // ----------------------- CHALLENGE Error ----------------------- //
    , 'CHALLENGE_RESPONSE_REQ_ENCODE_ERROR': {
        app_error_code: '0002101',
        app_error_code_hide: false,
        // do challenge response request encode error
        help: 'do challenge response request encode error(1013)',
        title: 'ERROR.TITLE',
        // 資料格式錯誤
        // content: 'ERROR.DATA_FORMAT_ERROR'
        content: 'ERROR.ENCODE_ERROR'
    }
    , 'CHALLENGE_RESPONSE_REQ_ENCODE_EMPTY_ERROR': {
        app_error_code: '0002102',
        app_error_code_hide: false,
        // do challenge response request encode error
        help: 'do challenge response request encode error(加密空值)',
        title: 'ERROR.TITLE',
        // 資料格式錯誤
        // content: 'ERROR.DATA_FORMAT_ERROR'
        content: 'ERROR.ENCODE_ERROR'
    }
    , 'CHALLENGE_RESPONSE_REQ_ENCODE_OTHER_ERROR': {
        app_error_code: '0002103',
        app_error_code_hide: false,
        // do challenge response request encode error
        help: 'do challenge response request encode error(其他錯誤)',
        title: 'ERROR.TITLE',
        // 資料格式錯誤
        // content: 'ERROR.DATA_FORMAT_ERROR'
        content: 'ERROR.ENCODE_ERROR'
    }
    , 'CHALLENGE_RESPONSE_RES_DECODE_ERROR': {
        app_error_code: '0002104',
        app_error_code_hide: false,
        // do challenge response request encode error
        help: 'do challenge response response decode error(1014)',
        title: 'ERROR.TITLE',
        // 回傳資料格式錯誤，請聯絡客服人員。
        // content: 'ERROR.RSP_FORMATE_ERROR'
        content: 'ERROR.DECODE_ERROR'
    }
    , 'CHALLENGE_RESPONSE_RES_DECODE_EMPTY_ERROR': {
        app_error_code: '0002105',
        app_error_code_hide: false,
        // do challenge response request encode error
        help: 'do challenge response response decode error(解密空值)',
        title: 'ERROR.TITLE',
        // 回傳資料格式錯誤，請聯絡客服人員。
        // content: 'ERROR.RSP_FORMATE_ERROR'
        content: 'ERROR.DECODE_ERROR'
    }
    , 'CHALLENGE_RESPONSE_RES_DECODE_OTHER_ERROR': {
        app_error_code: '0002106',
        app_error_code_hide: false,
        // do challenge response request encode error
        help: 'do challenge response response decode error(其他錯誤)',
        title: 'ERROR.TITLE',
        // 回傳資料格式錯誤，請聯絡客服人員。
        // content: 'ERROR.RSP_FORMATE_ERROR'
        content: 'ERROR.DECODE_ERROR'
    }
    , 'CHALLENGE_RESPONSE_REGET_EXCEPTION': {
        app_error_code: '0002107',
        app_error_code_hide: false,
        // do challenge response request encode error
        help: 'challenge response reset error',
        title: 'ERROR.TITLE',
        // 系統維護中，請稍後再試!若有其他問題，請聯絡客服人員。
        content: 'ERROR.CONNECTION'
    }
    // ----------------------- CHALLENGE Error End ----------------------- //

};
// -------------------- [載入相關 0003 ] -------------------- //
const ERROR_UC0003 = {
    'PATH_NOT_EXIST': {
        app_error_code: '0003001',
        app_error_code_hide: false,
        help: '載入位置不存在',
        title: 'ERROR.TITLE',
        // 路徑不存在
        content: 'ERROR.PATH_NOT_EXIST'
    }
    , 'PLUGIN_ERROR': {
        app_error_code: '0003002',
        app_error_code_hide: false,
        help: 'plugin不存在',
        title: 'ERROR.TITLE',
        // 很抱歉，必要元件無法執行或異常！如造成您的困擾，敬請見諒。若有其他疑問，請聯繫客服中心。
        content: 'ERROR.PLUGIN_ERROR'
    }
    , 'SQLITE_DB_ERROR': {
        app_error_code: '0003003',
        app_error_code_hide: false,
        help: 'sqllit error',
        title: 'ERROR.TITLE',
        // 很抱歉，資料連線異常！如造成您的困擾，敬請見諒。若有其他疑問，請聯繫客服中心。
        content: 'ERROR.SQLITE_DB_ERROR'
    }
    , 'DEVICE_INIT_ERROR': {
        app_error_code: '0003004',
        app_error_code_hide: false,
        help: 'device init error',
        title: 'ERROR.TITLE',
        // 很抱歉，必要元件無法執行或異常！如造成您的困擾，敬請見諒。若有其他疑問，請聯繫客服中心。
        content: 'ERROR.PLUGIN_ERROR'
    }
    , 'DEVICE_GET_ERROR': {
        app_error_code: '0003005',
        app_error_code_hide: false,
        help: 'device data get error',
        title: 'ERROR.TITLE',
        // 很抱歉，必要元件無法執行或異常！如造成您的困擾，敬請見諒。若有其他疑問，請聯繫客服中心。
        content: 'ERROR.PLUGIN_ERROR'
    }
};
// -------------------- [mscale 0004 ] -------------------- //
const ERROR_UC0004 = {
    'MSCALE_INIT_ERROR': {
        app_error_code: '0004001',
        app_error_code_hide: false,
        help: 'mscale iniit error',
        title: 'ERROR.TITLE',
        // 很抱歉，必要元件無法執行或異常！如造成您的困擾，敬請見諒。若有其他疑問，請聯繫客服中心。
        content: 'ERROR.PLUGIN_ERROR'
    }
    , 'MSCALE_MISS_ERROR': {
        app_error_code: '0004002',
        app_error_code_hide: false,
        help: 'mscale mthod miss error',
        title: 'ERROR.TITLE',
        // 很抱歉，必要元件無法執行或異常！如造成您的困擾，敬請見諒。若有其他疑問，請聯繫客服中心。
        content: 'ERROR.PLUGIN_ERROR'
    }
    , 'MSCALE_FORMATE_ERROR': {
        app_error_code: '0004003',
        app_error_code_hide: false,
        help: 'mscale formate error',
        title: 'ERROR.TITLE',
        // 回傳資料格式錯誤，請聯絡客服人員。
        content: 'ERROR.RSP_FORMATE_ERROR'
    }
    , 'MSCALE_CR_ERROR': {
        app_error_code: '0004004',
        app_error_code_hide: false,
        help: 'mscale get id error',
        title: 'ERROR.TITLE',
        // 系統維護中，請稍後再試!若有其他問題，請聯絡客服人員。
        content: 'ERROR.CONNECTION'
    }
    , 'MSCALE_CONNECT_ERROR': {
        app_error_code: '0004005',
        app_error_code_hide: false,
        help: 'mscale get id error 網路錯誤(1003)',
        title: 'ERROR.TITLE',
        // 系統維護中，請稍後再試!若有其他問題，請聯絡客服人員。
        content: 'ERROR.CONNECTION'
    }
    , 'MSCALE_GET_ID_ERROR': {
        app_error_code: '0004006',
        app_error_code_hide: false,
        help: 'mscale get id error',
        title: 'ERROR.TITLE',
        // 很抱歉，必要元件無法執行或異常！如造成您的困擾，敬請見諒。若有其他疑問，請聯繫客服中心。
        content: 'ERROR.PLUGIN_ERROR'
    }
    , 'MSCALE_PARAM_ERROR': {
        app_error_code: '0004007',
        app_error_code_hide: false,
        help: 'mscale get id error(1012)',
        title: 'ERROR.TITLE',
        // 資料格式錯誤
        content: 'ERROR.DATA_FORMAT_ERROR'
    }
    , 'MSCALE_ENCODE_ERROR': {
        app_error_code: '0004008',
        app_error_code_hide: false,
        help: 'mscale get id error',
        title: 'ERROR.TITLE',
        // 資料格式錯誤
        content: 'ERROR.ENCODE_ERROR'
    }
    , 'MSCALE_DECODE_ERROR': {
        app_error_code: '0004009',
        app_error_code_hide: false,
        help: 'mscale get id error',
        title: 'ERROR.TITLE',
        // 資料格式錯誤
        content: 'ERROR.DECODE_ERROR'
    }
    , 'MSCALE_UNKNOW_ERROR': {
        app_error_code: '0004101',
        app_error_code_hide: false,
        help: 'do challenge response unknow error(1001)',
        title: 'ERROR.TITLE',
        // 系統維護中，請稍後再試!若有其他問題，請聯絡客服人員。
        content: 'ERROR.CONNECTION'
    }
    , 'MSCALE_RES_FORMATE_ERROR': {
        app_error_code: '0004102',
        app_error_code_hide: false,
        help: 'do challenge response formate error. Server JSON 解析錯誤(1002)',
        title: 'ERROR.TITLE',
        // 回傳資料格式錯誤，請聯絡客服人員。
        content: 'ERROR.RSP_FORMATE_ERROR'
    }
    , 'MSCALE_DOCHALLENGE_ERROR': {
        app_error_code: '0004103',
        app_error_code_hide: false,
        help: 'Challenge-Response Server 回應 Response 錯誤(1004)',
        title: 'ERROR.TITLE',
        // 系統維護中，請稍後再試!若有其他問題，請聯絡客服人員。
        content: 'ERROR.CONNECTION'
    }
    , 'MSCALE_PLUGIN_INIT_ERROR': {
        app_error_code: '0004104',
        app_error_code_hide: false,
        help: 'do challenge response plugin init error 尚未初始化(1011)',
        title: 'ERROR.TITLE',
        // 很抱歉，必要元件無法執行或異常！如造成您的困擾，敬請見諒。若有其他疑問，請聯繫客服中心。
        content: 'ERROR.PLUGIN_ERROR'
    }
    , 'MSCALE_RES_ERROR': {
        app_error_code: '0004105',
        app_error_code_hide: false,
        // do challenge response request encode error
        help: 'do challenge response response decode error(1008)',
        title: 'ERROR.TITLE',
        // 回傳資料格式錯誤，請聯絡客服人員。
        // content: 'ERROR.RSP_FORMATE_ERROR'
        content: 'ERROR.DECODE_ERROR'
    }
    , 'MSCALE_CR_SESSION_ERROR': {
        app_error_code: '0004106',
        app_error_code_hide: false,
        help: 'Challenge-Response 產生 Session Key 失敗(1005)',
        title: 'ERROR.TITLE',
        // 系統維護中，請稍後再試!若有其他問題，請聯絡客服人員。
        content: 'ERROR.CONNECTION'
    }
    , 'MSCALE_CR_CALCULATE_ERROR': {
        app_error_code: '0004107',
        app_error_code_hide: false,
        help: 'Challenge-Response 計算 Response 值錯誤(1006)',
        title: 'ERROR.TITLE',
        // 系統維護中，請稍後再試!若有其他問題，請聯絡客服人員。
        content: 'ERROR.CONNECTION'
    }
    , 'MSCALE_CR_ANSWER_ERROR': {
        app_error_code: '0004108',
        app_error_code_hide: false,
        help: 'Challenge-Response Server 沒有回應 Answer(1007)',
        title: 'ERROR.TITLE',
        // 系統維護中，請稍後再試!若有其他問題，請聯絡客服人員。
        content: 'ERROR.CONNECTION'
    }
    , 'MSCALE_CR_DEANSWER_ERROR': {
        app_error_code: '0004109',
        app_error_code_hide: false,
        help: 'Challenge-Response Server 沒有回應 Answer(1008)',
        title: 'ERROR.TITLE',
        // 系統維護中，請稍後再試!若有其他問題，請聯絡客服人員。
        content: 'ERROR.CONNECTION'
    }
    // -------------------- Mscale return error code -------------------- //
    , 'MSCALE_RES_ERROR_UNKNOW': {
        app_error_code: '0004201',
        app_error_code_hide: false,
        help: 'mscale return error(1) no support',
        title: 'ERROR.TITLE',
        // 系統維護中，請稍後再試!若有其他問題，請聯絡客服人員。
        content: 'ERROR.CONNECTION'
    }
    , 'MSCALE_RES_ERROR_1': {
        app_error_code: '0004202',
        app_error_code_hide: false,
        help: 'mscale return error(1) no support',
        title: 'ERROR.TITLE',
        // 系統維護中，請稍後再試!若有其他問題，請聯絡客服人員。
        content: 'ERROR.CONNECTION'
    }
    , 'MSCALE_RES_ERROR_10': {
        app_error_code: '0004203',
        app_error_code_hide: false,
        help: 'mscale return error(10) setting error',
        title: 'ERROR.TITLE',
        // 系統維護中，請稍後再試!若有其他問題，請聯絡客服人員。
        content: 'ERROR.CONNECTION'
    }
    , 'MSCALE_RES_ERROR_20': {
        app_error_code: '0004204',
        app_error_code_hide: false,
        help: 'mscale return error(20) CR error',
        title: 'ERROR.TITLE',
        // 系統維護中，請稍後再試!若有其他問題，請聯絡客服人員。
        content: 'ERROR.CONNECTION'
    }
    , 'MSCALE_RES_ERROR_21': {
        app_error_code: '0004205',
        app_error_code_hide: false,
        help: 'mscale return error(21) json req error',
        title: 'ERROR.TITLE',
        // 系統維護中，請稍後再試!若有其他問題，請聯絡客服人員。
        content: 'ERROR.CONNECTION'
    }
    , 'MSCALE_RES_ERROR_22': {
        app_error_code: '0004206',
        app_error_code_hide: false,
        help: 'mscale return error(22) miss token',
        title: 'ERROR.TITLE',
        // 系統維護中，請稍後再試!若有其他問題，請聯絡客服人員。
        content: 'ERROR.CONNECTION'
    }
};
// -------------------- [API ErrorCode 0005 ] -------------------- //
const ERROR_UC0005 = {
    'LOGIN_AUTH_ERROR': {
        app_error_code: '0005001',
        app_error_code_hide: false,
        help: 'server ignor login auth',
        title: 'ERROR.TITLE',
        // 您尚未登入行動銀行或已被登出，請您重新登入。
        content: 'ERROR.LOGIN.NO_LOGIN'
    }
    , 'LOGIN_AUTH_COMPARE_ERROR': {
        app_error_code: '0005002',
        app_error_code_hide: false,
        help: 'server return custid error',
        title: 'ERROR.TITLE',
        // 很抱歉，您登入的「身分證字號/統一編號」驗證失敗
        content: 'ERROR.LOGIN.DIFFERENT_CUSTID'
    }
    
    // -------------------- Security error code -------------------- //
    , 'SECURITY_CHECK_ERROR': {
        app_error_code: '0005101',
        app_error_code_hide: false,
        help: 'server check security error',
        title: 'ERROR.TITLE',
        // 驗證失敗，請您重新輸入
        content: 'SECURITY.CHECK_ERROR.SECURITY_CHECK_ERROR'
    }
    , 'SECURITY_CHECK_ERROR_1': {
        app_error_code: '0005102',
        app_error_code_hide: false,
        help: 'server check security id error',
        title: 'ERROR.TITLE',
        // 您輸入的「身分證字號/統一編號」後4碼有誤，請核對後再重新輸入。
        content: 'SECURITY.CHECK_ERROR.SECURITY_CHECK_ERROR_1'
    }
    , 'SECURITY_CHECK_ERROR_2': {
        app_error_code: '0005103',
        app_error_code_hide: false,
        help: 'server check security otp error',
        title: 'ERROR.TITLE',
        // 您輸入的「OTP驗證」有誤，請您重新輸入
        content: 'SECURITY.CHECK_ERROR.SECURITY_CHECK_ERROR_2'
    }
    , 'SECURITY_CHECK_ERROR_3': {
        app_error_code: '0005104',
        app_error_code_hide: false,
        help: 'server check security ftsecurity error',
        title: 'ERROR.TITLE',
        // 快速交易驗證失敗，請您重新執行
        content: 'SECURITY.CHECK_ERROR.SECURITY_CHECK_ERROR_3'
    }

    // -------------------- Gateway error code -------------------- //
    , 'NEED_CR_RETRY': {
        app_error_code: '0005201',
        app_error_code_hide: false,
        help: 'mscale challange request session expired',
        title: 'ERROR.TITLE',
        // 目前無法與伺服器取得連線，請稍後再試！若為進行帳務交易，請於稍後使用網銀轉帳紀錄查詢以確定該筆交易是否已完成；在未確定交易失敗前，請勿再執行該筆交易，以免交易重複。如有疑問您可洽詢本行客服中心，由專人為您服務。(2)
        content: 'ERROR.GATEWAY_EXCEPTION'
    }
    , 'NEED_CR_CHANGE_TO_RESEND': {
        app_error_code: '0005202',
        app_error_code_hide: false,
        help: 'mscale challange change, so need retry',
        title: 'ERROR.TITLE',
        // 目前無法與伺服器取得連線，請稍後再試！若為進行帳務交易，請於稍後使用網銀轉帳紀錄查詢以確定該筆交易是否已完成；在未確定交易失敗前，請勿再執行該筆交易，以免交易重複。如有疑問您可洽詢本行客服中心，由專人為您服務。(2)
        content: 'ERROR.GATEWAY_EXCEPTION'
    }
};
// -------------------- [Crypto 0006] -------------------- //
const ERROR_UC0006 = {
    'CRYPTO_MISS_ERROR': {
        app_error_code: '0006001',
        app_error_code_hide: false,
        help: 'Crypto init error',
        title: 'ERROR.TITLE',
        // 很抱歉，必要元件無法執行或異常！如造成您的困擾，敬請見諒。若有其他疑問，請聯繫客服中心。
        content: 'ERROR.PLUGIN_ERROR'
    }
    , 'CRYPTO_INIT_ERROR': {
        app_error_code: '0006002',
        app_error_code_hide: false,
        help: 'Crypto init error',
        title: 'ERROR.TITLE',
        // 很抱歉，必要元件無法執行或異常！如造成您的困擾，敬請見諒。若有其他疑問，請聯繫客服中心。
        content: 'ERROR.PLUGIN_ERROR'
    }
    , 'CRYPTO_RSA_ENCODE_ERROR': {
        app_error_code: '0006003',
        app_error_code_hide: false,
        help: 'Crypto rsa encode error',
        title: 'ERROR.TITLE',
        // 很抱歉，必要元件無法執行或異常！如造成您的困擾，敬請見諒。若有其他疑問，請聯繫客服中心。
        content: 'ERROR.PLUGIN_ERROR'
    }
    , 'CRYPTO_SHA256_ERROR': {
        app_error_code: '0006004',
        app_error_code_hide: false,
        help: 'Crypto SHA256 encode error',
        title: 'ERROR.TITLE',
        // 很抱歉，必要元件無法執行或異常！如造成您的困擾，敬請見諒。若有其他疑問，請聯繫客服中心。
        content: 'ERROR.PLUGIN_ERROR'
    }
    , 'CRYPTO_AES_ENCODE_ERROR': {
        app_error_code: '0006005',
        app_error_code_hide: false,
        help: 'Crypto AES encode error',
        title: 'ERROR.TITLE',
        // 很抱歉，必要元件無法執行或異常！如造成您的困擾，敬請見諒。若有其他疑問，請聯繫客服中心。
        content: 'ERROR.PLUGIN_ERROR'
    }
    , 'CRYPTO_AES_DECODE_ERROR': {
        app_error_code: '0006006',
        app_error_code_hide: false,
        help: 'Crypto AES decode error',
        title: 'ERROR.TITLE',
        // 很抱歉，必要元件無法執行或異常！如造成您的困擾，敬請見諒。若有其他疑問，請聯繫客服中心。
        content: 'ERROR.PLUGIN_ERROR'
    }
    , 'CRYPTO_BASE64_ENCODE_ERROR': {
        app_error_code: '0006007',
        app_error_code_hide: false,
        help: 'Crypto BASE64 encode error',
        title: 'ERROR.TITLE',
        // 很抱歉，必要元件無法執行或異常！如造成您的困擾，敬請見諒。若有其他疑問，請聯繫客服中心。
        content: 'ERROR.PLUGIN_ERROR'
    }
    , 'CRYPTO_BASE64_DECODE_ERROR': {
        app_error_code: '0006008',
        app_error_code_hide: false,
        help: 'Crypto AES decode error',
        title: 'ERROR.TITLE',
        // 很抱歉，必要元件無法執行或異常！如造成您的困擾，敬請見諒。若有其他疑問，請聯繫客服中心。
        content: 'ERROR.PLUGIN_ERROR'
    }
    , 'CRYPTO_MD5_ERROR': {
        app_error_code: '0006009',
        app_error_code_hide: false,
        help: 'Crypto md5 encode error',
        title: 'ERROR.TITLE',
        // 很抱歉，必要元件無法執行或異常！如造成您的困擾，敬請見諒。若有其他疑問，請聯繫客服中心。
        content: 'ERROR.PLUGIN_ERROR'
    }
    , 'CRYPTO_SHA1_ERROR': {
        app_error_code: '0006010',
        app_error_code_hide: false,
        help: 'Crypto sha1 encode error',
        title: 'ERROR.TITLE',
        // 很抱歉，必要元件無法執行或異常！如造成您的困擾，敬請見諒。若有其他疑問，請聯繫客服中心。
        content: 'ERROR.PLUGIN_ERROR'
    }
};

export const ERROR_CODE_LIST = {
    // -------------------- [APP共用功能 01] -------------------- //
    ...ERROR_UC01
    // -------------------- [一般登入 02] -------------------- //
    , ...ERROR_UC02
    // -------------------- [快速設定 03] -------------------- //
    , ...ERROR_UC03
    // -------------------- [ 訊息服務 04 ] -------------------- //
    , ...ERROR_UC04
    // -------------------- [帳戶資產查詢 05] -------------------- //
    , ...ERROR_UC05
    // -------------------- [國外匯入匯款 06] -------------------- //
    , ...ERROR_UC06
    // -------------------- [ 定期存款 07 ] -------------------- //
    , ...ERROR_UC07
    // -------------------- [ 貸款服務 08 ] -------------------- //
    , ...ERROR_UC08
    // -------------------- [轉帳交易 09 ] -------------------- //
    , ...ERROR_UC09
    // -------------------- [利匯率(金融資訊) 10 ] -------------------- //
    , ...ERROR_UC10
    // -------------------- [ 投資理財服務 11 ] -------------------- //
    , ...ERROR_UC11
    // -------------------- [信用卡 12 ] -------------------- //
    , ...ERROR_UC12
    // -------------------- [ 服務據點 13 ] -------------------- //
    , ...ERROR_UC13
    // -------------------- [ 線上客服 14 ] -------------------- //
    // -------------------- [ 線上開戶服務 15 ] -------------------- //
    // -------------------- [ 系統公告 16 ] -------------------- //
    // -------------------- [ 相關連結 17 ] -------------------- //
    // -------------------- [ 設定 18 ] -------------------- //
    // -------------------- [ 戰情室分析(統計分析) 19 ] -------------------- //
    // -------------------- [ 台灣Pay  20 ] -------------------- //
    // -------------------- [ PukiiBank 圈存功能 21 ] -------------------- //
    // -------------------- [ 優惠商品服務 22 ] -------------------- //
    // -------------------- [ 行動框架 23 ] -------------------- //
    , ...ERROR_UC23


    // 以下固定放這些，功能請往上放
    // -------------------- [系統共用 0000 ] -------------------- //
    , ...ERROR_UC0000
    // -------------------- [通訊API相關 0001 ] -------------------- //
    , ...ERROR_UC0001
    // -------------------- [通訊相關 0002 ] -------------------- //
    , ...ERROR_UC0002
    // -------------------- [載入相關 0003 ] -------------------- //
    , ...ERROR_UC0003
    // -------------------- [mScale 0004 ] -------------------- //
    , ...ERROR_UC0004
    // -------------------- [API ErrorCode 0005 ] -------------------- //
    , ...ERROR_UC0005
    // -------------------- [Crypto 0006 ] -------------------- //
    , ...ERROR_UC0006
};