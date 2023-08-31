/**
 * Cache 設定參數處理
 * 指定於交易API要刪除的cache groupList
 */
export const CACHE_TRANS_GROUP = [
    'deposit' // 帳戶存款相關
    , 'fund-balance' // 基金資產相關
    , 'time-deposit' // 定存資料
    , 'account' // 帳號(可能帶餘額)
    , 'card-bill' // 信卡帳戶資料(可能更新)
];
/**
 * Cache 設定參數處理
 * groupList: 設定群組類別，可透過刪除群組刪除相關資料
 */
export const CACHE_SET = {
    // -------------------- [銀行代碼] -------------------- //
    'bank-code': {
        ttl: 60,
        keepAlive: 'always',
        groupList: ['bank-code']
    }
    // -------------------- [營業時間] -------------------- //
    , 'business-info': {
        ttl: 0,
        updateTimeList: ['07:00', '09:00', '15:00', '16:00'],
        keepAlive: 'always',
        groupList: ['business-info', 'system']
    }
    // -------------------- [首頁] -------------------- //
    // 廣告
    , 'advert': {
        ttl: 60,
        keepAlive: 'always',
        groupList: ['advert', 'home']
    }
    , 'advert-detail': {
        ttl: 60,
        keepAlive: 'always',
        groupList: ['advert', 'home']
    }
    // 台幣資產
    , 'overview-twd': {
        ttl: 10,
        keepAlive: 'login',
        groupList: ['overview', 'deposit', 'deposit-demand']
    }
    // 基金資產
    , 'overview-fund': {
        ttl: 10,
        keepAlive: 'login',
        groupList: ['overview', 'fund', 'fund-overview']
    }
    // -------------------- [存摺] -------------------- //
    // 存款查詢-活存明細
    , 'deposit-demand': {
        ttl: 10,
        keepAlive: 'login',
        groupList: ['deposit', 'deposit-demand']
    }
    // 存款查詢-定存明細
    , 'deposit-time': {
        ttl: 10,
        keepAlive: 'login',
        groupList: ['deposit', 'deposit-time']
    }
    // 國外匯入匯款
    , 'foreign-ir-deposit': {
        ttl: 10,
        keepAlive: 'login',
        groupList: ['deposit', 'foreign-ir-deposit']
    }
    // 國外匯入匯款明細
    , 'foreign-ir-deposit-detail': {
        ttl: 10,
        keepAlive: 'login',
        groupList: ['deposit', 'foreign-ir-deposit', 'foreign-ir-deposit-detail']
    }
    // -------------------- [金融資訊] -------------------- //
    // 外幣存款利率
    , 'foreign-currency-rate': {
        ttl: 20,
        updateTimeList: ['08:00', '16:00'],
        keepAlive: 'always',
        groupList: ['financial', 'foreign-currency-rate'],
        langChangeRemove: 'remove'
    }
    // 外幣放款利率
    , 'foreign-loan-currency-rate': {
        ttl: 20,
        updateTimeList: ['08:00', '16:00'],
        keepAlive: 'always',
        groupList: ['financial', 'foreign-loan-currency-rate'],
        langChangeRemove: 'remove'
    }
    // OBU存款利率
    , 'obu-currency-rate': {
        ttl: 20,
        updateTimeList: ['08:00', '16:00'],
        keepAlive: 'always',
        groupList: ['financial', 'obu-currency-rate'],
        langChangeRemove: 'remove'
    }
    // 外幣匯率
    , 'exchange-rate': {
        ttl: 20,
        updateTimeList: ['08:00', '16:00'],
        keepAlive: 'always',
        groupList: ['financial', 'exchange-rate'],
        langChangeRemove: 'remove'
    }
    // 外幣歷史匯率
    , 'exchange-history-rate': {
        ttl: 20,
        updateTimeList: ['08:00', '16:00'],
        keepAlive: 'always',
        groupList: ['financial', 'exchange-history-rate'],
    }
    // // 台幣利率
    // , 'twdSave': {
    //     ttl: 20,
    //     keepAlive: 'always',
    //     groupList: ['financial', 'twdSave']
    // }
    // -------------------- [貸款] -------------------- //
    // 貸款本金明細查詢
    , 'loan-detail-details': {
        ttl: 10,
        keepAlive: 'login',
        groupList: ['loan', 'loan-detail-details']
    }
    // 貸款利息明細查詢
    , 'loan-detail-interests': {
        ttl: 10,
        keepAlive: 'login',
        groupList: ['loan', 'loan-detail-interests']
    }
    // 貸款基本資料查詢
    , 'loan-main-basic': {
        ttl: 10,
        keepAlive: 'login',
        groupList: ['loan', 'loan-main-basic']
    }
    // -------------------- [定存] -------------------- //
    // 定期存款基本資料查詢
    , 'time-deposit-basic': {
        ttl: 10,
        keepAlive: 'login',
        groupList: ['time-deposit', 'time-deposit-basic']
    }
    // 定期存款本金利息明細查詢
    , 'time-deposit-interest': {
        ttl: 10,
        keepAlive: 'login',
        groupList: ['time-deposit', 'time-deposit-interest']
    }
    // -------------------- [轉出轉入帳號] -------------------- //
    // 台幣約定轉出
    , 'twd-transout-agreed': {
        ttl: 30,
        keepAlive: 'login',
        // 'account'帳號, 'twd-transfer'台幣轉帳, 'twd-transout'台幣轉出
        groupList: ['account', 'twd-transfer', 'twd-transout']
    }
    // 台幣非約定轉出
    , 'twd-transout-not': {
        ttl: 30,
        keepAlive: 'login',
        // 'account'帳號, 'twd-transfer'台幣轉帳, 'twd-transout'台幣轉出
        groupList: ['account', 'twd-transfer', 'twd-transout']
    }
    // 台幣約定轉入
    , 'twd-transint-agreed': {
        ttl: 0,
        keepAlive: 'login',
        // 'account'帳號, 'twd-transfer'台幣轉帳, 'twd-transint'台幣轉入
        groupList: ['account', 'twd-transfer', 'twd-transint']
    }
    // 台幣常用帳號轉入
    , 'twd-transint-offen': {
        ttl: 0,
        keepAlive: 'login',
        // 'account'帳號, 'twd-transfer'台幣轉帳, 'twd-transint'台幣轉入
        groupList: ['account', 'twd-transfer', 'twd-transint']
    }
    // -------------------- [基金] -------------------- //
    // 投資組合分析
    , 'fund-invest-healthy': {
        ttl: 10,
        keepAlive: 'login',
        // 'redeem'贖回, 'edit-fund'基金編輯
        groupList: ['fund', 'edit-fund', 'fund-overview', 'fund-balance']
    }
    // 基金現值查詢
    , 'fund-account-balance': {
        ttl: 10,
        keepAlive: 'login',
        // 'redeem'贖回, 'edit-fund'基金編輯
        groupList: ['fund', 'edit-fund', 'fund-balance']
    }
    // 理財妙管家
    , 'fund-auto-reddem': {
        ttl: 10,
        keepAlive: 'login',
        // 'redeem'贖回, 'redeem-edit'贖回編輯 ,'edit-fund'基金編輯
        groupList: ['fund', 'redeem', 'redeem-edit', 'edit-fund', 'fund-balance']
    }
    // 已實現損益查詢
    , 'fund-profit': {
        ttl: 10,
        keepAlive: 'login',
        // 'redeem'贖回, 'edit-fund'基金編輯
        groupList: ['fund', 'edit-fund', 'fund-balance']
    }
    // 投資交易明細
    , 'fund-history': {
        ttl: 10,
        keepAlive: 'login',
        // 'redeem'贖回, 'edit-twd'基金贖回編輯(外幣)
        groupList: ['fund', 'edit-fund']
    }
    // 定期(不)定額查詢
    , 'fund-inquiry-modify': {
        ttl: 10,
        keepAlive: 'login',
        // 'redeem'贖回, 'edit-twd'基金贖回編輯(外幣)
        groupList: ['fund', 'edit-fund', 'fund-balance']
    }
    // 基金申購
    , 'invest-term-html': {
        ttl: 10,
        keepAlive: 'login',
        // 基金申購-條款html
        groupList: ['fund', 'edit-fund']
    }
    // 基金申購
    , 'fund-code': {
        ttl: 10,
        keepAlive: 'login',
        // 基金申購-條款html
        groupList: ['fund', 'edit-fund', 'fund-code']
    }
    // // 基金贖回編輯(台幣)
    // , 'fund-redeem-edit-twd': {
    //     ttl: 0,
    //     keepAlive: 'login',
    //     // 'redeem'贖回, 'redeem-edit'贖回編輯 ,'edit-twd'基金贖回編輯(台幣)
    //     groupList: ['fund', 'redeem', 'redeem-edit', 'edit-twd']
    // }
    // // 基金贖回編輯(外幣)
    // , 'fund-redeem-edit-foreign': {
    //     ttl: 0,
    //     keepAlive: 'login',
    //     // 'redeem'贖回, 'redeem-edit'贖回編輯 ,'edit-twd'基金贖回編輯(外幣)
    //     groupList: ['fund', 'redeem', 'redeem-edit', 'edit-foreign']
    // }
    // -------------------- [信用卡] -------------------- //
    // 信用卡(本期帳單-首頁)
    , 'card-overview-bill': {
        ttl: 0,
        keepAlive: 'login',
        groupList: ['card', 'card-bill']
    }
    // 信用卡各期帳單查詢
    , 'history-bill': {
        ttl: 10,
        keepAlive: 'login',
        groupList: ['card', 'card-bill']
    }
    // 未出帳消費查詢
    , 'unpaid-bill': {
        ttl: 10,
        keepAlive: 'login',
        groupList: ['card', 'card-bill']
    }
    // 信用卡繳款月份查詢
    , 'card-select-month': {
        ttl: 10,
        keepAlive: 'login',
        groupList: ['card', 'card-bill']
    }
    // 信用卡繳款(本期帳單)
    , 'card-payable-bill': {
        ttl: 30,
        keepAlive: 'login',
        groupList: ['card', 'card-payable', 'card-bill']
    }
    // 信用卡繳款(扣款帳號)
    , 'card-payable-transOutAcct': {
        ttl: 30,
        keepAlive: 'login',
        groupList: ['card', 'card-payable', 'account']
    }
    // -------------------- [綜定存] -------------------- //
    // 立即轉存定存帳號
    , 'composit-deposit-account': {
        ttl: 30,
        keepAlive: 'login',
        // 'account'帳號
        groupList: ['account']
    }
    // 自動轉存定存帳號
    , 'auto-composit-deposit-account': {
        ttl: 30,
        keepAlive: 'login',
        // 'account'帳號
        groupList: ['account']
    }
    // -------------------- [設備綁定] -------------------- //
    // 綁定裝置清單
    , 'bind-device-list': {
        ttl: 0,
        keepAlive: 'login',
        // 'account'帳號
        groupList: ['bind-device']
    }

};
