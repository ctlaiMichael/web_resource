/**
 * 請設定功能選單
 * @menuType 1:一層樣式 2:二層樣式 3:三層樣式
 * 詳README.md
 */

export const LEFT_MENU = [
    // -------------------- [功能選單] -------------------- //
    // 帳戶查詢
    {
        id: 'menu.deposit',
        menuType: '2',
        name: 'FUNC.DEPOSIT.ACCOUNT',
        url: '',
        icon_class: 'i_account_overview',
        subMenu: [
            // 帳務總覽
            {
                id: 'menu.deposit.accountOverview',
                subName: 'FUNC.DEPOSIT.ACCOUNT_OVERVIEW',
                url: 'overview'
            },
            // 帳戶交易明細查詢
            {
                id: 'menu.deposit.statement',
                subName: 'FUNC.DEPOSIT.STATEMENT',
                url: 'deposit-account-detail'
            },
            // 國外匯入匯款查詢
            {
                id: 'menu.deposit.inwardRemittance',
                subName: 'FUNC.DEPOSIT.INWARD_REMITTANCE',
                url: 'foreign-ir'
            }
        ]
    },
    // 轉帳交易
    {
        id: 'menu.transfer',
        menuType: '2',
        name: 'FUNC.TRANSFER.TRANSFER',
        url: '',
        icon_class: 'i_transfer',
        subMenu: [
            // 台幣轉帳
            {
                id: 'menu.transfer.twd',
                subName: 'FUNC.TRANSFER.TRANSFER_TO_ACCOUNT',
                url: 'twdTransfer'
            },
            // 外幣兌換
            {
                id: 'menu.transfer.foreign',
                subName: 'FUNC.TRANSFER.BUY_SELL_FOREIGN_CURRENCY',
                url: 'foreignTransfer'
            }
        ]
    },
    // 綜存與定存
    {
        id: 'menu.composite',
        menuType: '2',
        name: 'FUNC.COMPOSITE_ACCOUNT_SERVICES.COMPOSITE_ACCOUNT_SERVICES',
        url: '',
        icon_class: 'i_deposit',
        subMenu: [
            // 立即轉存定存
            {
                id: 'menu.composite.toTimeDepositNow',
                subName: 'FUNC.COMPOSITE_ACCOUNT_SERVICES.TRANSFER_TO_TIME_DEPOSIT_NOW',
                url: 'CompositToTimeMainComponent'
            },
            // 自動轉存約定
            {
                id: 'menu.composite.autoToTimeDeposit',
                subName: 'FUNC.COMPOSITE_ACCOUNT_SERVICES.AUTO_TRANSFER_TO_TIME_DEPOSIT',
                url: 'AutoCompositToTimeMainComponent'
            },
            // 定期存款基本資料
            {
                id: 'menu.composite.basicDetails',
                subName: 'FUNC.COMPOSITE_ACCOUNT_SERVICES.TIME_DEPOSITS_BASIC_DETAILS_INQUIRY',
                url: 'time-deposit-main'
            },
            // 本金利息明細查詢
            {
                id: 'menu.composite.principalInterestDetails',
                subName: 'FUNC.COMPOSITE_ACCOUNT_SERVICES.PRINCIPAL_INTEREST_DETAILS',
                url: 'time-deposit-detail'
            },
            // 自動轉期約定
            {
                id: 'menu.composite.autoRollover',
                subName: 'FUNC.COMPOSITE_ACCOUNT_SERVICES.SCHEDULED_AUTOMATIC_ROLLOVER',
                url: 'auto-carry-over'
            },
            // 綜存定存結清
            {
                id: 'menu.composite.closeDeposits',
                subName: 'FUNC.COMPOSITE_ACCOUNT_SERVICES.CLOSE_OMNIBUS_TIME_DEPOSITS',
                url: 'close-time-deposit'
            }
        ]
    },
    // 投資理財
    {
        id: 'menu.invest',
        menuType: '3',
        name: 'FUNC.WEALTH_INVEST.WEALTH_INVEST',
        url: '',
        icon_class: 'i_investment',
        subMenu: [
            // -------------------- [投資理財查詢 子群組] -------------------- //
            {
                id: 'menu.invest.inquiries',
                type: 'title',
                subTitle: 'FUNC.WEALTH_INVEST.SUB_TITLE.INQUIRIES', // 查詢
                url: ''
            },
            // 投資理財總覽
            {
                id: 'menu.invest.overview',
                type: 'menu',
                subName: 'FUNC.WEALTH_INVEST.OVERVIEW',
                url: 'fund-overview'
            },
            // 我的投資
            {
                id: 'menu.invest.myInvestment',
                type: 'menu',
                subName: 'FUNC.WEALTH_INVEST.MY_INVESTMENT_SUMMARY',
                url: 'fund-invest-healthy'
            },
            // 投資現值查詢
            {
                id: 'menu.invest.assetInquiry',
                type: 'menu',
                subName: 'FUNC.WEALTH_INVEST.ASSET_ACCOUNT_INQUIRY',
                url: 'fund-account-balance-main'
            },
            // 已實現損益查詢
            {
                id: 'menu.invest.gainsAndLosses',
                type: 'menu',
                subName: 'FUNC.WEALTH_INVEST.REALIZED_GAINS_AND_LOSSES',
                url: 'fund-profit-loss-main'
            },
            // 投資交易明細查詢
            {
                id: 'menu.invest.transactions',
                type: 'menu',
                subName: 'FUNC.WEALTH_INVEST.TRANSACTIONS',
                url: 'fund-history'
            },
            // -------------------- [投資理財查詢 子群組 End] -------------------- //
            // -------------------- [投資理財交易 子群組] -------------------- //
            {
                id: 'menu.invest.transactions',
                type: 'title',
                subTitle: 'FUNC.WEALTH_INVEST.SUB_TITLE.TRANSACTIONS', // 
                url: ''
            },
            // 基金/集合帳戶申購
            {
                id: 'menu.invest.buyFunds',
                type: 'menu',
                subName: 'FUNC.WEALTH_INVEST.BUY_FUNDS',
                url: 'fund-invest'
            },
            // 基金/集合帳戶贖回
            {
                id: 'menu.invest.redemption',
                type: 'menu',
                subName: 'FUNC.WEALTH_INVEST.REDEMPTION',
                url: 'fund-account-balance-main'
            },
            // 基金轉換
            {
                id: 'menu.invest.switching',
                type: 'menu',
                subName: 'FUNC.WEALTH_INVEST.SWITCHING',
                url: 'fund-account-balance-main'
            },
            // 定期定額查詢/修改
            {
                id: 'menu.invest.fixedNonfixedModify',
                type: 'menu',
                subName: 'FUNC.WEALTH_INVEST.FIXED_NONFIXED_AMOUNT_INVESTMENTS',
                url: 'fund-inquiry-modify-main'
            },
            // 理財妙管家查詢/修改
            {
                id: 'menu.invest.smartManager',
                type: 'menu',
                subName: 'FUNC.WEALTH_INVEST.SMART_WEALTH_MANAGER',
                url: 'auto-fund-redeem-main'
            },
            // -------------------- [投資理財交易 子群組 End] -------------------- //
            // -------------------- [其他服務 子群組] -------------------- //
            {
                id: 'menu.invest.other',
                type: 'title',
                subTitle: 'FUNC.WEALTH_INVEST.SUB_TITLE.OTHER', // 其他服務
                url: ''
            },
            // 基金情報
            {
                id: 'menu.invest.fundWeb',
                type: 'menu',
                subName: 'FUNC.WEALTH_INVEST.FUND_WEB',
                url: 'fundWeb'
            },
            // 投資風險警語
            {
                id: 'menu.invest.riskInfo',
                type: 'menu',
                subName: 'FUNC.WEALTH_INVEST.INVESTMENT_RISK_INFO',
                url: 'FundRiskWarning'
            }
            // -------------------- [其他服務 子群組 End] -------------------- //
        ]
    },
    // 貸款
    {
        id: 'menu.loans',
        menuType: '2',
        name: 'FUNC.LOANS.LOANS',
        url: '',
        icon_class: 'i_loan',
        subMenu: [
            // 基本資料查詢
            {
                id: 'menu.loans.basicDetails',
                subName: 'FUNC.LOANS.BASIC_DETAILS_INQUIRY',
                url: 'loan-main-basic'
            },
            // 本金利息明細查詢
            {
                id: 'menu.loans.principalInterestDetails',
                subName: 'FUNC.LOANS.PRINCIPAL_INTEREST_DETAILS',
                url: 'loan-detail'
            },
            // 線上申請貸款: 我要申請信貸
            {
                id: 'menu.loans.principalInterestDetails',
                subName: 'FUNC.LOANS.LOANS_APPLY',
                url: 'loan-apply'
            }  
        ]
    },
    // 信用卡
    {
        id: 'menu.cards',
        menuType: '3',
        name: 'FUNC.CREDIT_CARDS.CREDIT_CARDS',
        url: '',
        icon_class: 'i_credit_card',
        subMenu: [
            // -------------------- [信用卡帳務 子群組] -------------------- //
            {
                id: '',
                type: 'title',
                subTitle: 'FUNC.CREDIT_CARDS.SUB_TITLE.PERSONAL',
                url: ''
            },
            // 信用卡總覽
            {
                id: 'menu.cards.overview',
                type: 'menu',
                subName: 'FUNC.CREDIT_CARDS.OVERVIEW',
                url: 'card-overview'
            },
            // 信用卡現況查詢
            {
                id: 'menu.cards.accountOverview',
                type: 'menu',
                subName: 'FUNC.CREDIT_CARDS.ACCOUNT_OVERVIEW',
                url: 'card-personal-profile'
            },
            // 未出帳消費查詢
            {
                id: 'menu.cards.notYetBilled',
                type: 'menu',
                subName: 'FUNC.CREDIT_CARDS.TRANSACTIONS_NOT_YET_BILLED',
                url: 'history-bill-unPaid'
            },
            // 各期帳單查詢
            {
                id: 'menu.cards.billsAndTransactions',
                type: 'menu',
                subName: 'FUNC.CREDIT_CARDS.BILLS_AND_TRANSACTIONS',
                url: 'history-bill-main'
            },
            // 繳信用卡款
            {
                id: 'menu.cards.payBill',
                type: 'menu',
                subName: 'FUNC.CREDIT_CARDS.PAY_BILL',
                url: 'pay-credit-payable'
            },
            // -------------------- [信用卡帳務 子群組 End] -------------------- //
            // -------------------- [信用卡優惠 子群組] -------------------- //
            {
                id: 'menu.cards.bonuses',
                type: 'title',
                subTitle: 'FUNC.CREDIT_CARDS.SUB_TITLE.BONUSES',
                url: ''
            },
            // 2020/11/17於6/2討論移到第二階段
            // // 信用卡優惠
            // {
            //     id: 'menu.cards.bonusHistory',
            //     type: 'menu',
            //     subName: 'FUNC.CREDIT_CARDS.BONUS_PURCHASE_HISTORY',
            //     url: 'creditcardoffers'
            // },
            // 行銷活動登錄
            {
                id: 'menu.cards.promotional',
                type: 'menu',
                subName: 'FUNC.CREDIT_CARDS.PROMOTIONAL_EVENTS',
                url: 'marketingactivitylogin'
            },
            // -------------------- [信用卡優惠 子群組 End] -------------------- //
            // -------------------- [申請與設定 子群組] -------------------- //
            {
                id: 'menu.cards.apply_settings',
                type: 'title',
                subTitle: 'FUNC.CREDIT_CARDS.SUB_TITLE.APPLY_SETTINGS',
                url: ''
            },
            // 線上申請信用卡
            {
                id: 'menu.cards.apply',
                type: 'menu',
                subName: 'FUNC.CREDIT_CARDS.APPLY',
                url: 'applycard'
            }
            // -------------------- [申請與設定 子群組 End] -------------------- //
        ]
    },
    // 利匯率查詢
    {
        id: 'menu.rates',
        menuType: '3',
        name: 'FUNC.RATES.RATES',
        url: '',
        icon_class: 'i_interest_rate',
        subMenu: [
            // -------------------- [利率 子群組] -------------------- //
            {
                id: '',
                type: 'title',
                subTitle: 'FUNC.RATES.SUB_TITLE.INTEREST',
                url: ''
            },
            // 台幣利率
            {
                id: 'menu.rates.NTDInterestRates',
                type: 'menu',
                subName: 'FUNC.RATES.NTD_INTEREST_RATES',
                url: 'currencyRate'
            },
            // 外幣利率
            {
                id: 'menu.rates.foreignInterestRates',
                type: 'menu',
                subName: 'FUNC.RATES.FOREIGN_CURRENCY_INTEREST_RATES',
                url: 'foreignCurrencyRate'
            },
            // 外幣放款利率
            {
                id: 'menu.rates.foreignLendingRates',
                type: 'menu',
                subName: 'FUNC.RATES.FOREIGN_CURRENCY_LENDING_RATES',
                url: 'foreignLoanCurrencyRate'
            },
            // OBU存款利率
            {
                id: 'menu.rates.OBUInterestRates',
                type: 'menu',
                subName: 'FUNC.RATES.OBU_DEPOSIT_INTEREST_RATES',
                url: 'obuCurrencyRate'
            },
            // 貸款本息攤還試算
            {
                id: 'menu.rates.loanCalculator',
                type: 'menu',
                subName: 'FUNC.RATES.LOAN_CALCULATOR',
                url: 'loanCalculator'
            },
            // -------------------- [利率 子群組 End] -------------------- //
            // -------------------- [匯率 子群組] -------------------- //
            {
                id: '',
                type: 'title',
                subTitle: 'FUNC.RATES.SUB_TITLE.EXCHANGE',
                url: ''
            },
            // 匯率
            {
                id: 'menu.rates.exchangeRates',
                type: 'menu',
                subName: 'FUNC.RATES.EXCHANGE_RATES',
                url: 'exchangeRate'
            },
            // 歷史匯率
            {
                id: 'menu.rates.trendGraph',
                type: 'menu',
                subName: 'FUNC.RATES.TREND_GRAPH',
                url: 'exchangeRateHistory'
            },
            // 幣別換算
            {
                id: 'menu.rates.currencyConverter',
                type: 'menu',
                subName: 'FUNC.RATES.CURRENCY_CONVERTER',
                url: 'currencyConverter'
            },
            // 匯率到價通知
            {
                id: 'menu.rates.exchangeRateNotice',
                type: 'menu',
                subName: 'FUNC.RATES.EXCHANGE_RATE_NOTICE',
                url: 'exchangeRateNotice'
            }
            // -------------------- [匯率 子群組 End] -------------------- //
        ]
    },
    // 線上服務
    {
        id: 'menu.online',
        menuType: '2',
        name: 'FUNC.ONLINE_SERVICE.ONLINE_SERVICE',
        url: '',
        icon_class: 'i_customer_service',
        subMenu: [
            // 線上客服
            {
                id: 'menu.online.customerService',
                subName: 'FUNC.ONLINE_SERVICE.CUSTOMER_SERVICE',
                url: 'online-service'
            },
            // 服務據點查詢
            {
                id: 'menu.online.findUs',
                subName: 'FUNC.ONLINE_SERVICE.FIND_US',
                url: ''
            },
            // 線上開立數位存款帳戶
            {
                id: 'menu.online.openAccount',
                subName: 'FUNC.ONLINE_SERVICE.OPENACCOUNT',
                url: 'acocountonline'
            }
        ]
    },
    // 訊息通知
    {
        id: 'menu.messageCenter',
        menuType: '1',
        name: 'FUNC.MESSAGE_CENTER',
        url: '',
        icon_class: 'i_bell'
    },
    // 設定
    {
        id: 'menu.setting',
        menuType: '3',
        name: 'FUNC.SETTING.SETTING',
        url: '',
        icon_class: 'i_setting',
        subMenu: [
            // [TODO: Phase II 第二階段功能]
            // // -------------------- [個人設定 子群組] -------------------- //
            // {
            //     id: '',
            //     type: 'title',
            //     subTitle: 'FUNC.SETTING.SUB_TITLE.PERSONAL',
            //     url: ''
            // },
            // // 常用帳號設定
            // {
            //     id: 'menu.setting.accountSetting',
            //     type: 'menu',
            //     subName: 'FUNC.SETTING.ACCOUNT_SETTING',
            //     url: ''
            // },
            // -------------------- [個人設定 子群組 End] -------------------- //
            // -------------------- [登入/交易設定 子群組] -------------------- //
            {
                id: 'menu.setting.loginTransactions',
                type: 'title',
                subTitle: 'FUNC.SETTING.SUB_TITLE.LOGIN_TRANSACTIONS',
                url: ''
            },
            // 快速登入/交易設定
            {
                id: 'menu.setting.fastLoginSetting',
                type: 'menu',
                subName: 'FUNC.SETTING.FAST_LOGIN_TRANSACTIONS_SETTING',
                url: 'fast-setting'
            },
            // -------------------- [登入/交易設定 子群組 End] -------------------- //
            // -------------------- [通知設定 子群組] -------------------- //
            {
                id: '',
                type: 'title',
                subTitle: 'FUNC.SETTING.SUB_TITLE.MESSAGE',
                url: ''
            },
            // 訊息通知設定
            {
                id: 'menu.setting.messageSetting',
                type: 'menu',
                subName: 'FUNC.SETTING.MESSAGE_SETTING',
                url: ''
            },
            // -------------------- [通知設定 子群組 End] -------------------- //
            // -------------------- [系統設定 子群組] -------------------- //
            {
                id: '',
                type: 'title',
                subTitle: 'FUNC.SETTING.SUB_TITLE.SYSTEM',
                url: ''
            },
            // 語言設定
            {
                id: 'menu.setting.language',
                type: 'menu',
                subName: 'FUNC.SETTING.LANGUAGE',
                url: 'language'
            },
             // 首次啟動約定
            //  {
            //     id: 'menu.setting.homepageagree',
            //     type: 'menu',
            //     subName: '首次約定條款',
            //     url: 'homepageagree'
            // },
            // 關於此系統
            {
                id: 'menu.setting.about',
                type: 'menu',
                subName: 'FUNC.SETTING.ABOUT',
                url: 'systeminfo'
            }
            // -------------------- [系統設定 子群組 End] -------------------- //
        ]
    },
    // 企業其他連結
    {
        id: 'menu.link',
        menuType: '2',
        name: 'FUNC.LINK.LINK',
        url: '',
        icon_class: 'i_business',
        subMenu: [
            // 預約交易
            {
                id: 'menu.link.appointmentTransaction',
                subName: 'FUNC.LINK.APPOINTMENTTRANSACTION',
                url: ''
            },
            // 網路銀行
            {
                id: 'menu.link.onlineBank',
                subName: 'FUNC.LINK.ONLINEBANK',
                url: 'onlinebank'
            }
        ]
    }
    // -------------------- [功能選單 End] -------------------- //
];