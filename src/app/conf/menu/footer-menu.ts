/**
 * Footer 設定
 */
export const FOOTER_MENU = [
    {
        id: 'footer-home',
        name: 'FUNC.HOME.FOOTER', // 首頁
        icon: 'footer_i_home',
        url: 'home', // 對應routing-path
    }
    , {
        id: 'footer-credit-card',
        name: 'FUNC.CREDIT_CARDS.CREDIT_CARDS',  // 信用卡
        icon: 'footer_i_credit',
        url: 'card-overview',
    }
    , {
        id: 'footer-transfer',
        name: 'FUNC.TRANSFER.FOOTER', // 轉帳
        icon: 'footer_i_transfer',
        url: 'twdTransfer',
    }, {
        id: 'footer-fund',
        name: 'FUNC.WEALTH_INVEST.FOOTER', // 理財資訊
        icon: 'footer_i_finance',
        url: 'fund-overview',
    },
    {
        id: 'footer-more',
        name: 'FUNC.MORE.MORE', // 更多
        icon: 'footer_i_menu',
        url: '',
    }
];

/**
 * footer active設定樣式
 */
let active_list: any = {
    'user-home': 'footer-home', // 登入首頁
    'FOOTER_MORE': 'footer-more' // 更多
};
FOOTER_MENU.forEach(item => {
    if (!!item.url) {
        let path = item.url;
        active_list[path] = item.id;
    }
});


export const FOOTER_ACTIVE_SET = active_list;