/**
 * Header 設定檔
 * header.style header的css樣式模式 
 *      normal 一般, 
 *      login 登入, 
 *      header_start_home 未登入首頁, 
 *      user_home 登入後首頁
 *      header_menu 選單
 */
export class HeaderOptions {
    style: string;  // 背景樣式 normal(預設)/login/user_home normal:一般頁面 user_home:登入後顯示帳戶資訊
    title: string; // 'header_logo'時顯示"上海銀行"圖片，其他則為i18n KeyName
    header: string; // header其他的class

    leftBtnIcon: string; // 'back'為上一頁圖示、'cancel'為取消文字、''空值為不顯示
    backPath: string; // 返回路徑預設為前頁
    rightBtnIcon: string; // 'qrcode'為qrcode圖示、'edit'為編輯文字、'finish'為完成文字、'customer_service'為客服圖示、''空值為不顯示


    constructor() {
        this.style = 'normal';
        this.leftBtnIcon = '';
        this.title = 'header_logo';
        this.backPath = '';
        this.rightBtnIcon = '';
        this.header = '';
    }
}
