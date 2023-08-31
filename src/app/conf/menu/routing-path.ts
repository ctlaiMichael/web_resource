/**
 * 所有功能 route設定
 * header.title 標題(請用i18n設定檔),當為header_logo時顯示LOGO
 * header.style header的css樣式模式 
 *      normal 一般, 
 *      login 登入, 
 *      header_start_home 未登入首頁, 
 *      user_home 登入後首頁
 *      header_menu 功能選單
 * header.header header是否顯示其他class
 * header.leftBtnIcon 返回事件
 *  
 * 
 * footer.displayFooter 是否顯示footer: 交易為false, 查詢為true
 */
import { environment } from '@environments/environment';

export const ROUTING_DEFAULT_PATH = 'home'; // 預設功能

let demo_part = {};
if (!environment.NATIVE) {
    // Demo程式
    demo_part = {
        'demo': {
            'url': '/demo',
            'header': {
                'title': 'Demo'  // 範例
                , 'style': 'normal'
                , 'leftBtnIcon': 'back'
                // , 'rightBtnIcon': ''
                // , 'backPath': ''
            },
            'footer': {
                'displayFooter': true
            }
        },
        'demo-popup': {
            'url': '/demo/demo-popup',
            'header': {
                'title': 'Demo'  // 範例
                , 'style': 'normal'
                , 'leftBtnIcon': 'back'
                // , 'rightBtnIcon': ''
                // , 'backPath': ''
            },
            'footer': {
                'displayFooter': true
            }
        },
        'demo-security': {
            'url': '/demo/demo-security',
            'header': {
                'title': 'Demo'  // 範例
                , 'style': 'normal'
                , 'leftBtnIcon': 'back'
                // , 'rightBtnIcon': ''
                // , 'backPath': ''
            },
            'footer': {
                'displayFooter': true
            }
        },
        'demo-pattern': {
            'url': '/demo/demo-pattern',
            'header': {
                'title': 'Demo'  // 範例
                , 'style': 'normal'
                , 'leftBtnIcon': 'back'
                // , 'rightBtnIcon': ''
                // , 'backPath': ''
            },
            'footer': {
                'displayFooter': true
            }
        },
        'demo-errorcode': {
            'url': '/demo/demo-errorcode',
            'header': {
                'title': 'Demo Errorcode'  // 範例
                , 'style': 'normal'
                , 'leftBtnIcon': 'back'
                // , 'rightBtnIcon': ''
                // , 'backPath': ''
            },
            'footer': {
                'displayFooter': true
            }
        }
    };
}

export const ROUTING_PATH = {
    ...demo_part,
    // -------------------- [系統] -------------------- //
    // --- 首頁 --- //
    '': {
        'url': 'home',
        'header': {
            'title': '',
            'style': 'header_start_home',
            'header': '',
            'leftBtnIcon': 'ignor'
        },
        'footer': {
            'displayFooter': false
        }
    },
    'menu': {
        'url': 'menu',
        'header': {
            'title': '',
            'style': '',
            'header': '',
            'leftBtnIcon': 'ignor'
        },
        'footer': {
            'displayFooter': true
        }
    },
    'home': {
        'url': 'home',
        'header': {
            'title': '',
            'style': 'header_start_home',
            'header': '',
            'leftBtnIcon': 'ignor'
        },
        'footer': {
            'displayFooter': false // 之後改false
        }
    },
    'user-home': {
        'url': '/home/user-home',
        // 'preInit': false, // 會出錯
        'header': {
            'title': '',
            'style': 'user_home',
            'header': '',
            'leftBtnIcon': 'ignor'
        },
        'footer': {
            'displayFooter': true
        }
        // , 'micro': 'default' // 是否顯示微交互
    },

    
    // -------------------- [系統 End] -------------------- //
    // -------------------- [登入] -------------------- //
    'login': {
        'url': '/login/1',
        'header': {
            'title': 'header_logo',
            'style': 'login',
            'leftBtnIcon': 'back',
            'header': ''
        }
        , 'footer': {
            'displayFooter': false
        }
    },

    'homepageagree': {
        'url': '/home/homepageagree/main',
        'header': {
            'title': 'FUNC.SETTING.HOMEPAGEAGREE'  // 啟動條款
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': false
        }
    },
    // -------------------- [登入 End] -------------------- //

    // ======================================== 主要功能 ======================================== //
    // -------------------- [存款查詢] -------------------- //
    // <<<<<<<<< [帳戶總覽] >>>>>>>>> //
    'overview': {
        'url': '/deposit/deposit-overview/main',
        'header': {
            'title': 'FUNC.DEPOSIT.ACCOUNT_OVERVIEW'  // 
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    // <<<<<<<<< [國外匯入匯款查詢] >>>>>>>>> //
    'foreign-ir': {
        'url': '/deposit/foreign-ir/main',
        'header': {
            'title': 'FUNC.DEPOSIT.INWARD_REMITTANCE'  // 國外匯入匯款查詢
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    // <<<<<<<<< [帳戶明細查詢] >>>>>>>>> //
    'deposit-account-detail': {
        'url': '/deposit/deposit-account-detail/main',
        'header': {
            'title': 'FUNC.DEPOSIT.STATEMENT'  // 帳戶明細查詢
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': true
        }
    },

    // -------------------- [存款查詢 End] -------------------- //
    // -------------------- [定期存款] -------------------- //
    'time-deposit-main': {
        'url': '/time-deposit/time-deposit-main/main',
        'header': {
            'title': 'FUNC.TIME_DEPOSIT.TIME_DEPOSIT_MAIN'  // 定期存款(主控)
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        },
        'urlParams': {
            'type': 'basic'
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    'time-deposit-detail': {
        'url': '/time-deposit/time-deposit-main/main',
        'header': {
            'title': 'FUNC.COMPOSITE_ACCOUNT_SERVICES.PRINCIPAL_INTEREST_DETAILS'  // 本金利息明細
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        },
        'urlParams': {
            'type': 'interest'
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    'auto-carry-over': {
        'url': '/time-deposit/auto-carry-over-agreement/main',
        'header': {
            'title': 'FUNC.COMPOSITE_ACCOUNT_SERVICES.SCHEDULED_AUTOMATIC_ROLLOVER'  // 自動轉期約定、解約
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': false
        }
    },
    'close-time-deposit': {
        'url': '/time-deposit/time-deposit-close/main',
        'header': {
            'title': 'FUNC.COMPOSITE_ACCOUNT_SERVICES.CLOSE_OMNIBUS_TIME_DEPOSITS'  // 綜存定存結清
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': false
        }
    },
    // -------------------- [定期存款 End] -------------------- //
    // -------------------- [貸款服務] -------------------- //
    'loan-detail': {
        'url': '/loan/loan-detail/main',
        'header': {
            'title': 'FUNC.COMPOSITE_ACCOUNT_SERVICES.PRINCIPAL_INTEREST_DETAILS'  // 本金利息明細查詢
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        },
        'urlParams': {
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    'loan-main-basic': {
        'url': '/loan/loan-main/main',
        'header': {
            'title': 'FUNC.LOANS.BASIC_DETAILS_INQUIRY'  // 貸款基本資料查詢
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    'loan-apply': {
        'url': 'loan-apply',
        'header': {
            'title': "FUNC.LOANS.LOANS_APPLY"  // 線上申請貸款: 我要申請信貸
        },
        'openType': 'web' // 開啟類型 app/web
    },
    // -------------------- [貸款服務 End] -------------------- //
    // -------------------- [轉帳交易] -------------------- //
    // <<<<<<<<< [外幣兌換] >>>>>>>>> //
    'foreignTransfer': {
        'url': '/transfer/foreign-transfer',
        'header': {
            'title': 'FUNC.TRANSFER.BUY_SELL_FOREIGN_CURRENCY'  // 外幣兌換
            , 'leftBtnIcon': 'edit-back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': false
        }
    },
    // <<<<<<<<< [台幣轉帳] >>>>>>>>> //
    'twdTransfer': {
        'url': '/transfer/twd-transfer/main',
        'header': {
            'title': 'FUNC.TRANSFER.TRANSFER_TO_ACCOUNT'  // 台幣轉帳
            , 'leftBtnIcon': 'edit-back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': false
        }
    },
    // -------------------- [轉帳交易 End] -------------------- //

    // -------------------- [綜活存] -------------------- //
    // <<<<<<<<< [綜存開戶約定] >>>>>>>>> //
    'CompositDepositAgreeComponent': {
        'url': '/transfer/twd-composit-deposit/composit-deposit-agree/main',
        'header': {
            'title': 'FUNC.COMPOSITE_ACCOUNT_SERVICES.COMPOSITE_ACCOUNT_AGREE'  // 綜存開戶約定
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': false
        }
    },
    // <<<<<<<<< [立即轉存定存] >>>>>>>>> //
    'CompositToTimeMainComponent': {
        'url': '/transfer/twd-composit-deposit/composit-to-time/main',
        'header': {
            'title': 'FUNC.COMPOSITE_ACCOUNT_SERVICES.TRANSFER_TO_TIME_DEPOSIT_NOW'  // 立即轉存定存
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': false
        }
    },
    // <<<<<<<<< [自動轉存約定] >>>>>>>>> //
     'AutoCompositToTimeMainComponent': {
        'url': '/transfer/twd-composit-deposit/auto-composit-to-time/main',
        'header': {
            'title': 'FUNC.COMPOSITE_ACCOUNT_SERVICES.AUTO_TRANSFER_TO_TIME_DEPOSIT'  // 自動轉存約定
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': false
        }
    },
    // -------------------- [綜活存 End] -------------------- //

    // -------------------- [投資理財] -------------------- //
    // <<<<<<<<< [投資組合總覽] >>>>>>>>> //
    'fund-overview': {
        'url': '/fund/fund-overview/main',
        'header': {
            'title': 'FUNC.WEALTH_INVEST.OVERVIEW'  // 
            , 'leftBtnIcon': ''
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'overview'
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    // <<<<<<<<< [投資現值查詢] >>>>>>>>> //
    'fund-account-balance-main': {
        'url': '/fund/fund-account-balance/main',
        'header': {
            'title': 'FUNC.WEALTH_INVEST.ASSET_ACCOUNT_INQUIRY'  // 投資現值查詢
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    // <<<<<<<<< [投資交易明細查詢] >>>>>>>>> //
    'fund-history': {
        'url': '/fund/fund-history/main',
        'header': {
            'title': 'FUNC.WEALTH_INVEST.TRANSACTIONS'  // 投資交易明細查詢
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    // <<<<<<<<< [投資組合分析] >>>>>>>>> //
    'fund-invest-healthy': {
        'url': '/fund/fund-invest-healthy/main',
        'header': {
            'title': 'FUNC.WEALTH_INVEST.MY_INVESTMENT'  // 
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    // <<<<<<<<< [理財妙管家] >>>>>>>>> //
    'auto-fund-redeem-main': {
        'url': '/fund/auto-fund-redeem/main',
        'header': {
            'title': 'FUNC.WEALTH_INVEST.SMART_WEALTH_MANAGER'  // 理財妙管家
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    // <<<<<<<<< [基金風險警語] >>>>>>>>> //
    'FundRiskWarning': {
        'url': '/fund/fund-risk-warning/main',
        'header': {
            'title': 'FUNC.WEALTH_INVEST.INVESTMENT_RISK_INFO'  // 投資風險警語
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    // <<<<<<<<< [基金定期定額] >>>>>>>>> //
    'fund-inquiry-modify-main': {
        'url': '/fund/fund-inquiry-modify/main',
        'header': {
            'title': 'FUNC.WEALTH_INVEST.FIXED_NONFIXED_AMOUNT_INVESTMENTS'  // 定期定額查詢/修改
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    // <<<<<<<<< [已實現損益] >>>>>>>>> //
    'fund-profit-loss-main': {
        'url': '/fund/fund-profit-loss/main',
        'header': {
            'title': 'FUNC.WEALTH_INVEST.REALIZED_GAINS_AND_LOSSES'  // 已實現損益查詢
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    // <<<<<<<<< [基金申購] >>>>>>>>> //
    'fund-invest': {
        'url': '/fund/fund-invest/main',
        'header': {
            'title': 'FUNC.WEALTH_INVEST.BUY_FUNDS'
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': false
        }
    },
    // <<<<<<<<< [基金贖回] >>>>>>>>> //
    'fund-redeem': {
        'url': '/fund/fund-redeem/main',
        'header': {
            'title': 'FUNC.WEALTH_INVEST.REDEMPTION'
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': false
        }
    },
    // -------------------- [投資理財 End] -------------------- //
    // -------------------- [信用卡] -------------------- //
    'card-overview': {
        'url': '/card/card-overview/main',
        'header': {
            'title': 'FUNC.CREDIT_CARDS.OVERVIEW'  // 信用卡總覽
            , 'style': 'overview'
            , 'header': ''
            , 'leftBtnIcon': 'ignor'
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    'history-bill-main': {
        'url': '/card/history-bill/main',
        'header': {
            'title': 'FUNC.CREDIT_CARDS.BILLS_AND_TRANSACTIONS'  // 各期帳單查詢(主控)
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        },
        'urlParams': {
            'type': 'detail' // 判斷顯示各期帳單
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    'history-bill-unPaid': {
        'url': '/card/history-bill/main',
        'header': {
            'title': 'FUNC.CREDIT_CARDS.TRANSACTIONS_NOT_YET_BILLED'  // 未出帳消費查詢
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        },
        'urlParams': {
            'type': 'unPaid' // 判斷顯示未出帳消費
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    'card-personal-profile': {
        'url': '/card/card-personal-profile/main',
        'header': {
            'title': 'FUNC.CREDIT_CARDS.ACCOUNT_OVERVIEW'  // 信用卡現況查詢
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    'pay-credit-payable': {
        'url': '/card/pay-credit-payable/main',
        'header': {
            'title': 'FUNC.CREDIT_CARDS.PAY_BILL'  // 繳信用卡款
            , 'leftBtnIcon': 'edit-back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': false
        }
    },
    // -------------------- [信用卡 End] -------------------- //

    // ======================================== 其他功能 ======================================== //
    // -------------------- [金融資訊] -------------------- //
    'financial': {
        'url': '/financial/menu',
        'header': {
            'title': 'FUNC.FINANCIAL.FINANCIAL'  // 金融資訊
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    'currencyRate': {
        'url': '/financial/currency-rate',
        'preInit': true,
        'header': {
            'title': 'FUNC.RATES.NTD_INTEREST_RATES'  // 台幣利率
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    'foreignCurrencyRate': {
        'url': '/financial/foreign-currency-rate',
        'preInit': true,
        'header': {
            'title': 'FUNC.RATES.FOREIGN_CURRENCY_INTEREST_RATES'  // 外幣利率
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': 'finish'
            // , 'backPath': ''
            , 'style': 'normal'
        },
        'openType': '' // 開啟類型 app/web
        , 'footer': {
            'displayFooter': true
        }
    },
    'foreignLoanCurrencyRate': {
        'url': '/financial/foreign-loan-currency-rate',
        'preInit': true,
        'header': {
            'title': 'FUNC.RATES.FOREIGN_CURRENCY_LENDING_RATES'  // 外幣放款利率
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    'obuCurrencyRate': {
        'url': '/financial/obu-currency-rate',
        'preInit': true,
        'header': {
            'title': 'FUNC.RATES.OBU_DEPOSIT_INTEREST_RATES'  // OBU存款利率
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    'loanCalculator': {
        'url': '/financial/loan-calculator',
        'preInit': true,
        'header': {
            'title': 'FUNC.RATES.LOAN_CALCULATOR'  // 貸款本息攤還試算
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': false
        }
    },
    'exchangeRate': {
        'url': '/financial/exchange-rate',
        'preInit': true,
        'header': {
            'title': 'FUNC.RATES.EXCHANGE_RATES'  // 外幣匯率
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': 'financial'
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    'exchangeRateHistory': {
        'url': '/financial/exchange-rate/history',
        'preInit': true,
        'header': {
            'title': 'FUNC.RATES.TREND_GRAPH'  // 外幣歷史匯率走勢圖
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    'currencyConverter': {
        'url': '/financial/currency-converter',
        'preInit': true,
        'header': {
            'title': 'FUNC.RATES.CURRENCY_CONVERTER'  // 幣別換算
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': 'financial'
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    'exchangeRateNotice': {
        'url': '/financial/exchange-rate-notice',
        'preInit': true,
        'header': {
            'title': 'FUNC.RATES.EXCHANGE_RATE_NOTICE'  // 匯率到價通知
            , 'leftBtnIcon': 'back'
            , 'rightBtnIcon': 'edit'
            // , 'backPath': 'financial'
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': false
        }
    },
    'exchangeRateNoticeSetting': {
        'url': '/financial/exchange-rate-notice/setting',
        'preInit': true,
        'header': {
            'title': 'FUNC.RATES.EXCHANGE_RATE_NOTICE_SETTING'  // 匯率到價通知設定
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': 'edit'
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': false
        }
    },
    // -------------------- [金融資訊 End] -------------------- //
    // -------------------- [設定] -------------------- //
    'setting': {
        'url': '/setting/menu',
        'header': {
            'title': 'FUNC.SETTING.SETTING'  // 設定
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    'fast-setting': {
        'url': '/setting/fast-setting',
        'preInit': true,
        'header': {
            'title': 'FUNC.SETTING.FAST_LOGIN_TRANSACTIONS_SETTING'  // 快速(登入/交易)設定
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': 'edit'
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': false
        }
    },
    'language': {
        'url': '/setting/language',
        'preInit': true,
        'header': {
            'title': 'FUNC.SETTING.LANGUAGE'  // 語言設定
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': 'edit'
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    'systeminfo': {
        'url': '/setting/systeminfo',
        'preInit': true,
        'header': {
            'title': 'FUNC.SETTING.ABOUT'  // 關於此系統
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': 'edit'
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    // -------------------- [設定 End] -------------------- //
    // -------------------- [線上服務] -------------------- //
    'online-service': {
        'url': '/other/online-service/main',
        'header': {
            'title': 'FUNC.ONLINE_SERVICE.CUSTOMER_SERVICE'  // 線上客服
            , 'leftBtnIcon': 'back'
            // , 'rightBtnIcon': ''
            // , 'backPath': ''
            , 'style': 'normal'
        }
        , 'footer': {
            'displayFooter': true
        }
    },
    // -------------------- [線上服務 End] -------------------- //
    // -------------------- [外開連結設定] -------------------- //
    // 智能客服
    'robot': {
        'url': 'robot',
        'header': {
            'title': "智能客服"
        },
        'openType': 'web' // 開啟類型 app/web
    },
    // 線上申請信用卡
    'applycard': {
        'url': 'applycard',
        'header': {
            'title': "線上申請信用卡"
        },
        'openType': 'web' // 開啟類型 app/web
    },
    // 線上開立數位存款帳戶
    'acocountonline': {
        'url': 'acocountonline',
        'header': {
            'title': "線上開立數位存款帳戶"
        },
        'openType': 'web' // 開啟類型 app/web
    },
    // 網路銀行
    'onlinebank': {
        'url': 'onlinebank',
        'header': {
            'title': "網路銀行"
        },
        'openType': 'web' // 開啟類型 app/web
    },
    // 行銷活動登錄
    'marketingactivitylogin': {
        'url': 'marketingactivitylogin',
        'header': {
            'title': "行銷活動登錄"
        },
        'openType': 'web' // 開啟類型 app/web
    },
    // 信用卡優惠
    'creditcardoffers': {
        'url': 'creditcardoffers',
        'header': {
            'title': "信用卡優惠"
        },
        'openType': 'web' // 開啟類型 app/web
    },
    // KYC
    'fund-kyc': {
        'url': 'fund-kyc',
        'header': {
            'title': "風險承受度測驗"
        },
        'openType': 'web' // 開啟類型 app/web
    },
    // 信託開戶
    'fund-apply-open': {
        'url': 'fund-apply-open',
        'header': {
            'title': "信託開戶"
        },
        'openType': 'web' // 開啟類型 app/web
    },
    // 得獎基金
    'fund-finance': {
        'url': 'fund-finance',
        'header': {
            'title': "得獎基金"
        },
        'openType': 'web' // 開啟類型 app/web
    },
    // 基金情報
    'fundWeb': {
        'url': 'fundWeb',
        'header': {
            'title': "基金情報"
        },
        'openType': 'web' // 開啟類型 app/web
    },
    // 基金資訊觀測站
    'fundclear': {
        'url': 'fundclear',
        'header': {
            'title': "基金資訊觀測站"
        },
        'openType': 'web' // 開啟類型 app/web
    },
    // 首次啟動條款
    'fristagree': {
        'url': 'fristagree',
        'header': {
            'title': "首次啟動約定"
        },
        'openType': 'web' // 開啟類型 app/web
    },
    // 公開資訊觀測站
    'newmops': {
        'url': 'newmops',
        'header': {
            'title': "公開資訊觀測站"
        },
        'openType': 'web' // 開啟類型 app/web
    },
    // 全國繳費網
    'ebill': {
        'url': 'ebill',
        'header': {
            'title': "全國繳費網"
        },
        'openType': 'web' // 開啟類型 app/web
    }
    // -------------------- [外開連結設定 End] -------------------- //
};


