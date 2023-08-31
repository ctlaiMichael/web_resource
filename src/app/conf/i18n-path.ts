// i18n 設定檔
const i18nFolder = './assets/i18n/';
export const I18nPath = [
    // === 共用 === //
    { prefix: i18nFolder, suffix: '/common.json' }
    , { prefix: i18nFolder, suffix: '/button.json' }
    , { prefix: i18nFolder, suffix: '/error.json' }
    , { prefix: i18nFolder, suffix: '/check.json' }
    , { prefix: i18nFolder, suffix: '/currency.json' }
    // === APP通用機制設定 === //
    , { prefix: i18nFolder, suffix: '/func.json' } // 功能名稱定義
    , { prefix: i18nFolder, suffix: '/field.json' } // 欄位定義
    , { prefix: i18nFolder, suffix: '/popup.json' } // 提示訊息定義
    , { prefix: i18nFolder, suffix: '/bookmark.json' } // 頁籤定義
    , { prefix: i18nFolder, suffix: '/stepbar.json' } // 步驟列定義
    // === 各功能 === //
    , { prefix: i18nFolder, suffix: '/pages/login.json' } // 登入定義
    , { prefix: i18nFolder, suffix: '/pages/home.json' } // 首頁定義
    , { prefix: i18nFolder, suffix: '/pages/financial.json' } // 金融資訊定義
    , { prefix: i18nFolder, suffix: '/pages/setting.json' } // 設定定義    
    , { prefix: i18nFolder, suffix: '/security.json' }     // 安控模組
    // 外匯
    , { prefix: i18nFolder, suffix: '/pages/foreign_ir.json' }
    // 帳務總覽
    , { prefix: i18nFolder, suffix: '/pages/deposit-overview.json' }
    // 帳戶明細查詢
    , { prefix: i18nFolder, suffix: '/pages/deposit_detail.json' }
    // 貸款服務
    , { prefix: i18nFolder, suffix: '/pages/loan.json' }
    // 定期存款
    , { prefix: i18nFolder, suffix: '/pages/time_deposit.json' }
    // 投資理財-現值查詢
    , { prefix: i18nFolder, suffix: '/pages/fund_account_balance.json' }
    // 投資理財-理財妙管家
    , { prefix: i18nFolder, suffix: '/pages/auto-fund-redeem.json' }
    // 投資理財-定期定額查詢/修改
    , { prefix: i18nFolder, suffix: '/pages/fund-inquiry-modify.json' }
     // 投資理財-定期定額查詢/修改
     , { prefix: i18nFolder, suffix: '/pages/fund-profit-loss.json' }
    // 投資理財-基金贖回
    , { prefix: i18nFolder, suffix: '/pages/fund-redeem.json' }
    // 投資理財-基金申購
    , { prefix: i18nFolder, suffix: '/pages/fund-invest.json' }
    // 投資理財-基金轉換
    , { prefix: i18nFolder, suffix: '/pages/fund-convert.json' }
    // 信用卡各期帳單/未出帳消費查詢
    , { prefix: i18nFolder, suffix: '/pages/card.json' }
    // 信用卡總覽
    , { prefix: i18nFolder, suffix: '/pages/card_overview.json' }
    // 線上客服
    , { prefix: i18nFolder, suffix: '/pages/online_service.json' }
    // 投資總覽
    , { prefix: i18nFolder, suffix: '/pages/fund-overview.json' }
    // 投資合計和組合分析
    , { prefix: i18nFolder, suffix: '/pages/fund-invest-healthy.json' }
    // 投資交易明細查詢
    , { prefix: i18nFolder, suffix: '/pages/fund-history.json' }
    // 外幣兌換
    , { prefix: i18nFolder, suffix: '/pages/foreign-transfer.json' }
    // 台幣轉帳
    , { prefix: i18nFolder, suffix: '/pages/twd_transfer.json' }
    // 台幣綜存及定存
    , { prefix: i18nFolder, suffix: '/pages/composit-deposit-agree.json' }
    // 綜存及定存（自動）
    , { prefix: i18nFolder, suffix: '/pages/composit-to-time.json' }
];
