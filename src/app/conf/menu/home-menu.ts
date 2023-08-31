/**
 * 首頁相關連結設定
 */

// == (未登入前首頁)啟動首頁快捷選單(主) == //
export const START_HOME_BTN = {
    // 左按鈕: 我要開戶
    'left': {
        id: 'start.messageCenter',
        name: 'HOME.START_HOME.LEFT',
        url: 'acocountonline',
        icon_class: ''
    },
    // 右按鈕: 登入
    'right': {
        id: 'start.messageCenter',
        name: 'HOME.START_HOME.RIGHT',
        url: 'login',
        icon_class: ''
    }
};
// == (未登入前首頁)啟動首頁快捷選單(快捷) == //
export const START_HOME_MENU = [
    // 帳戶總覽
    {
        id: 'start.accountOverview',
        name: 'HOME.START_HOME.BTN1',
        url: 'overview',
        icon_class: 'shortcut_i_account'
    },
    // 台幣轉帳
    {
        id: 'start.twdTransfer',
        name: 'HOME.START_HOME.BTN2',
        url: 'twdTransfer',
        icon_class: 'shortcut_i_transfer'
    },
    // 外幣匯率
    {
        id: 'start.exchangeRate',
        name: 'HOME.START_HOME.BTN3',
        url: 'exchangeRate',
        icon_class: 'shortcut_i_foreignRate'
    },
    // // 線上客服
    // {
    //     id: 'start.onlineService',
    //     name: 'HOME.START_HOME.BTN4',
    //     url: 'online-service',
    //     icon_class: 'shortcut_i_customer'
    // },
    // 更多
    {
        id: 'start.more',
        name: 'HOME.START_HOME.BTN_MORE',
        url: 'menu',
        icon_class: 'shortcut_i_more'
    }
];

// == (投資)投資首頁快捷選單(快捷) 最多3個 == //
export const FUND_HOME_BTN = [
    // (左)
    {
        id: 'fundhome-quick.fund-invest',
        name: 'FUND_OVERVIEW.BTN.INVEST', // 基金申購
        url: 'fund-invest',
        icon_class: '',
        class: 'btn3_l'
    }
    // (中)
    , {
        id: 'fundhome-quick.auto-fund-redeem',
        name: 'FUND_OVERVIEW.BTN.AUTO_REDEEM', // 理財妙管家
        url: 'auto-fund-redeem-main',
        icon_class: '',
        class: 'btn3_c'
    }
    // (右)
    , {
        id: 'fundhome-quick.fund-invest-healthy',
        name: 'FUND_OVERVIEW.BTN.INVEST_HEALTHY', // 我的投資合計
        url: 'fund-invest-healthy',
        icon_class: '',
        class: ''
    }
];
// == (投資)投資首頁快捷選單(選單) == //
export const FUND_HOME_MENU = [
    // 投資現值查詢
    {
        id: 'fundhome-menu.fund-account-balance',
        name: 'FUND_OVERVIEW.BTN.FUND_ACCOUNT_BALANCE',
        url: 'fund-account-balance-main',
        icon_class: '',
        class: ''
    }
    // 定期定額查詢
    , {
        id: 'fundhome-menu.fund-inquiry-modify',
        name: 'FUND_OVERVIEW.BTN.FUND_INQUIRY_MODIFY',
        url: 'fund-inquiry-modify-main',
        icon_class: '',
        class: ''
    }
    // 基金情報
    , {
        id: 'fundhome-menu.fundWeb',
        name: 'FUND_OVERVIEW.BTN.INVEST_INFORMATION',
        url: 'fundWeb',
        icon_class: '',
        class: ''
    }
    // 線上客服
    , {
        id: 'fundhome-menu.online-service',
        name: 'FUND_OVERVIEW.BTN.ONLINE_SERVICE',
        url: 'online-service',
        icon_class: '',
        class: ''
    }
];



// == (信用卡)信用卡首頁快捷選單(快捷) 最多3個 == //
export const CARD_HOME_BTN = [
    // (左)
    {
        id: 'cardhome-quick.card-personal-profile',
        name: 'CARD_OVERVIEW.MAIN.CARD_PROFILE', // 信用卡現況查詢
        url: 'card-personal-profile',
        icon_class: '',
        class: 'btn3_l'
    }
    // (中)
    , {
        id: 'cardhome-quick.pay-credit-payable',
        name: 'CARD_OVERVIEW.MAIN.CARD_PAY', // 繳卡費
        url: 'pay-credit-payable',
        icon_class: '',
        class: 'btn3_c'
    }
    // (右)
    , {
        id: 'cardhome-quick.applycard',
        name: 'CARD_OVERVIEW.MAIN.CARD_APPLY', // 申請信用卡
        url: 'applycard',
        icon_class: '',
        class: ''
    }
];
// == (信用卡)信用卡首頁快捷選單(選單) == //
// 目前無設定
export const CARD_HOME_MENU = [
];


// == (帳務總覽)單一帳號別選單(選單) == //
export const DEPOSIT_ACCOUNT_MENU = {
    // 支票
    'checkingAcctInfoData': [
        {
            id: 'overview.deposit-account-detail',
            name: 'FUNC.DEPOSIT.STATEMENT',  // 帳戶明細查詢
            url: 'deposit-account-detail',
            icon_class: '',
            class: ''
        }
        , {
            id: 'overview.twdTransfer',
            name: 'FUNC.TRANSFER.TRANSFER_TO_ACCOUNT',  // 台幣轉帳
            url: 'twdTransfer',
            icon_class: '',
            class: ''
        }
        , {
            id: 'overview.foreignTransfer',
            name: 'FUNC.TRANSFER.BUY_SELL_FOREIGN_CURRENCY',  // 外幣兌換
            url: 'foreignTransfer',
            icon_class: '',
            class: ''
        }
    ]
    // 活存
    , 'savingsAcctInfoData_TWD': [
        {
            id: 'overview.deposit-account-detail',
            name: 'FUNC.DEPOSIT.STATEMENT',  // 帳戶明細查詢
            url: 'deposit-account-detail',
            icon_class: '',
            class: ''
        }
        , {
            id: 'overview.twdTransfer',
            name: 'FUNC.TRANSFER.TRANSFER_TO_ACCOUNT',  // 台幣轉帳
            url: 'twdTransfer',
            icon_class: '',
            class: ''
        }
        , {
            id: 'overview.foreignTransfer',
            name: 'FUNC.TRANSFER.BUY_SELL_FOREIGN_CURRENCY',  // 外幣兌換
            url: 'foreignTransfer',
            icon_class: '',
            class: ''
        }
    ]
    // 活存(外幣)
    , 'savingsAcctInfoData': [
        {
            id: 'overview.deposit-account-detail',
            name: 'FUNC.DEPOSIT.STATEMENT',  // 帳戶明細查詢
            url: 'deposit-account-detail',
            icon_class: '',
            class: ''
        }
        , {
            id: 'overview.foreignTransfer',
            name: 'FUNC.TRANSFER.BUY_SELL_FOREIGN_CURRENCY',  // 外幣兌換
            url: 'foreignTransfer',
            icon_class: '',
            class: ''
        }
    ]
    // 定存
    , 'timeAcctInfoData': [
        {
            id: 'overview.time-deposit-main',
            name: 'FUNC.COMPOSITE_ACCOUNT_SERVICES.TIME_DEPOSITS_BASIC_DETAILS_INQUIRY',  // 定期存款基本資料
            url: 'time-deposit-main',
            icon_class: '',
            class: ''
        }
        , {
            id: 'overview.time-deposit-detail',
            name: 'FUNC.COMPOSITE_ACCOUNT_SERVICES.PRINCIPAL_INTEREST_DETAILS',  // 本金利息明細
            url: 'time-deposit-detail',
            icon_class: '',
            class: ''
        }
        , {
            id: 'overview.auto-time-to-composit',
            name: 'FUNC.COMPOSITE_ACCOUNT_SERVICES.SCHEDULED_AUTOMATIC_ROLLOVER',  // 自動轉期約定
            url: 'auto-time-to-composit',
            icon_class: '',
            class: ''
        }
    ]

};