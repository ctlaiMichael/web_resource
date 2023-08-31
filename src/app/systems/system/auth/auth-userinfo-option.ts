/**
 * 定義使用者權限物件
 */
export class AuthUserInfoOption {
    /**
     * 個資
     */
    custId?: string; // 使用者身分證
    userId?: string; // 使用者代號
    userName?: string; // 使用者姓名
    email?: string; // email
    phone?: string; // 一般手機號碼
    phoneOTP?: string; // OTP手機號碼
    phoneCard?: string; // 純卡戶手機號碼

    /**
     * 身分
     */
    role?: string; // 身分別=> 企業戶: ENTREPRENEUR 個人戶: INDIVIDUAL 信用卡戶: CARDHOLDER
    idType: string; // 本國人: TWNID 外國人: FOREIGNID 居留證: RESIDENTID
    isCardUser?: string; // 是否為信用卡用戶 N:否 Y:是

    /**
     * 權限
     */
    isMobilebank?: string; // 行動銀行開通狀態 N:未開通 Y:已開通
    nameFlag?: string; // 同戶名註記 N:否 Y:是
    nonFlag?: string; // 非約定註記 N:否 Y:是
    fundAllow?: string; // 是否有基金功能使用權限 N:否 Y:是 (基金申 定期 轉換 贖回 修改 理財妙管家等交易要看此flag  餘查詢功能皆不用)
    fundService?: string; // 是否允許有基金資料 N:否 Y:是 
    transferAllow?: string; // 轉帳權限 Y: 可轉出、可查詢轉出轉入 N: 不可轉出、可查詢轉入 D: 註銷
    isLoginCheckStrReset?: string; // 建議是否需要重新設定密碼 N:否 Y:是
    isLoginForciblyStrReset?: string; // 強制是否需要重新設定密碼 N:否 Y:是
    security?: object;
    // id4Num?: string; // 是否有身分證後四碼驗證 N:否 Y:是
    // otp?: string; // 是否有OTP驗證 N:否 Y:是
    // fastPay?: string; // 是否有快速交易驗證 N:否 Y:是
    // deviceBind?: string; // 是否有綁定裝置 N:否 Y:是
    fastPaySet?: object;
    // fastAgreement: "1 || 2" // 1 => 約轉 , 2 => 約轉及非約轉皆可
    // "fastMode?": "2", // 2 => BIO , 1 => Graphic
    // "deviceBind?": "1" // 是否有綁定裝置 0:否 1:是
    accessToken?: string;
    refreshToken?: string;
    timeOut?: string;

    constructor() {
        
    }

}
