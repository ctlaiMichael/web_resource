/**
 * 外聯網址設定
 * target設定說明
 *  _system: 另開OS預設劉覽器開啟鏈結
 *  _blank: 開啟內嵌網頁劉覽器開啟鏈結
 */
import { environment } from '@environments/environment';

let externalWebOption = {
    // 智能客服
    'robot': {
        url: 'https://smartrobot.scsb.com.tw/index.php?eservice=mainapp'
        , target: '_system'
        , confirmOptions: {
            title: '', // 空值 就用預設值取代
            context: 'POPUP.WEB_OPEN.robot'
        }
    },
    // 線上申請信用卡
    'applycard': {
        url: 'https://apply.scsb.com.tw/card/credit_card/contact'
        , target: '_system'
        , confirmOptions: {
            title: '', // 空值 就用預設值取代
            context: 'POPUP.WEB_OPEN.applycard'
        }
    },
    // 線上開立數位存款帳戶
    'acocountonline': {
        url: 'https://apply.scsb.com.tw/openaccount/client/',
        target: '_system'
        , confirmOptions: {
            title: '', // 空值 就用預設值取代
            context: 'POPUP.WEB_OPEN.acocountonline'
        }
    },
    // 網路銀行
    'onlinebank': {
        url: 'https://ibank.scsb.com.tw/'
        , target: '_system'
        , confirmOptions: {
            title: '', // 空值 就用預設值取代
            context: 'POPUP.WEB_OPEN.onlinebank'
        }
    },
    // 行銷活動登錄
    'marketingactivitylogin': {
        url: 'https://ibank.scsb.com.tw/PROMOTIONS/cardlogin/begin.do'
        , target: '_system'
        , confirmOptions: {
            title: '', // 空值 就用預設值取代
            context: 'POPUP.WEB_OPEN.marketingactivitylogin'
        }
    },
    // 信用卡優惠
    'creditcardoffers': {
        url: 'https://www.scsbrewards.com.tw/'
        , target: '_system'
        , confirmOptions: {
            title: '', // 空值 就用預設值取代
            context: 'POPUP.WEB_OPEN.creditcardoffers'
        }
    },
    // 基金KYC
    'fund-kyc': {
        url: 'https://ibank.scsb.com.tw/?fundfunc=34&fundcode=0000'
        , target: '_system'
        , confirmOptions: {
            title: '', // 空值 就用預設值取代
            context: 'POPUP.WEB_OPEN.fundKyc'
        }
    },
    // 開信託戶
    'fund-apply-open': {
        url: 'https://ibank.scsb.com.tw/?fundfunc=40&fundcode=0000'
        , target: '_system'
        , confirmOptions: {
            title: '', // 空值 就用預設值取代
            context: 'POPUP.WEB_OPEN.fundApplyOpen'
        }
    },
    // 得獎基金
    'fund-finance': {
        url: 'https://fund.scsb.com.tw/finance-web/index.html'
        , target: '_system'
        , confirmOptions: {
            title: '', // 空值 就用預設值取代
            context: 'POPUP.WEB_OPEN.fundFinance'
        }
    },
    // 基金情報
    'fundWeb': {
        url: 'https://fund.scsb.com.tw/ReportFile/MarketComment/MarketWeek.jsp'
        , target: '_system'
        , confirmOptions: {
            title: '', // 空值 就用預設值取代
            context: 'POPUP.WEB_OPEN.fundWeb'
        }
    },
    // 基金資訊觀測站
    'fundclear': {
        url: 'http://www.fundclear.com.tw'
        , target: '_system'
        , confirmOptions: {
            title: '基金資訊觀測站', // 空值 就用預設值取代
            context: 'POPUP.WEB_OPEN.fundclear'
        }
    },
    // 個人資料告知書
    'fristagree': {
        url: 'https://www.scsb.com.tw/content/link/src/link09.pdf'
        , target: '_system'
        , confirmOptions: {
            title: '個人資料告知書', // 空值 就用預設值取代
            context: 'POPUP.WEB_OPEN.homepageagree'
        }
    },
    // 公開資訊觀測站
    'newmops': {
        url: 'http://newmops.tse.com.tw'
        , target: '_system'
        , confirmOptions: {
            title: '公開資訊觀測站', // 空值 就用預設值取代
            context: 'POPUP.WEB_OPEN.newmops'
        }
    },
    // 線上申請貸款: 我要申請信貸
    'loan-apply': {
        url: 'https://apply.scsb.com.tw/loan/client/?promotionUnit=8900&promotionCode=91006&project='
        , target: '_system'
        , confirmOptions: {
            title: '', // 空值 就用預設值取代
            context: 'POPUP.WEB_OPEN.loanapply'
        }
    },
    // 全國繳費網
    'ebill': {
        // url: 'https://ebill.ba.org.tw/'
        url: 'https://ebill.ba.org.tw/PayPage/Index/E8C51A14-5475-42C4-B888-360B86E054E2'
        , target: '_system'
        , confirmOptions: {
            title: '', // 空值 就用預設值取代
            context: 'POPUP.WEB_OPEN.EBILL'
        }
    },
    'demo': {
        url: 'http path'
        , target: '_blank'
    }
    , 'demo2': {
        url: 'http path'
        , target: '_blank'
        , confirmOptions: {
            title: '', // 空值 就用預設值取代
            context: '即將離開app前往google網頁'
        }
    }
};

/**
 * 測試外連網址
 */
if (!environment.PRODUCTION) {

}

export const Sites = externalWebOption;
