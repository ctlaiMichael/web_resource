## 路由定義 routing-path.ts
{
    'KEY_NAME': {           // KEY_NAME為各頁面要顯示時的名稱
        url : ''            // 頁面的路由設定
        , urlParams : {}      // 參數設定queryParams 
        , preInit: false      // 設定過場機制
        , header: {           // 各頁面的Header設定
            style: string;          // 背景樣式 normal(預設)/login/user_home normal:一般頁面 user_home:登入後顯示帳戶資訊
            leftBtnIcon: string;    // 'btn_back'為上一頁圖示、'btn_txt'為文字、''空值為不顯示
            backPath: string;       // 返回路徑預設為前頁
            title: string;          // 'header_logo'時顯示"上海銀行"圖片，其他則為i18n KeyName
            rightBtnIcon: string;   // btn_qrcode、btn_txt、btn_customer_service、''空值為不顯示
        }
        , openType: ''              // app 開啟APP, web 外連模式
    }
}

### @menuType 1:一層樣式


    {
        id: 'menu.messageCenter',
        menuType: '1',
        name: 'FUNC.MESSAGE_CENTER',
        url: '',
        icon_class: 'i_bell'
    },

### @menuType 2:二層樣式
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
                url: ''
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


### @menuType 3:三層樣式
第二層type設定為title

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
                url: ''
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
        ]
    },