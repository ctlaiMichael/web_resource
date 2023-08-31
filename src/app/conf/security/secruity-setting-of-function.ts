

/*

 預設安控順序 1 => id last 4 , 2 => OTP ,3 => bio ,4 => graphic
           "id4Num": "Y", // 是否有身分證後四碼驗證
            "otp": "Y", // 是否有OTP驗證
            "fastPay": "N", // 是否有快速交易驗證
            "fastPayNon": "Y", // 是否有快速交易-非約定驗證
*/
export const SECURITYMODE =
{
    // 身分證後4
    '1': { name: '輸入認證', id: '1', checkList: ['id4Num'], funName: 'id4Num', inputValue: true },
    // OTP
    '2': { name: '手機確認碼認證', id: '2', checkList: ['otp'], funName: 'otp', inputValue: true },
    // 快速約轉
    '3': { name: '快速認證', id: '3', checkList: ['fastPay', 'deviceBind'], funName: 'fastPay', inputValue: false },
    // 快速非約
    '4': { name: '快速認證', id: '4', checkList: ['fastPay', 'fastAgreement', 'deviceBind'], funName: 'fastPay', inputValue: false },
    // 裝置綁定otp
    '5': { name: '手機確認碼認證', id: '5', checkList: ['otp_device'], funName: 'otp_device', inputValue: true }
};
/*
功能 KEY 對應交易可用安控  EX: TWD transfer : { }
台幣非約 TWDTRANSFERNOAGGREMENT:[2,3],
台幣約轉 TWDTRANSAGGREMENT:[1,3]
......
...
...
*/
export const SECURITYSETTING = {
    // 預設
    DEFAULT: ['1', '3']
    // --------------------- 轉帳 --------------------- // 
    // 台幣非約
    , TWDTRANSFERNOAGGREMENT: ['2', '4']
    // 台幣約轉 
    , TWDTRANSAGGREMENT: ['1', '3']
    // 外幣兌換
    , FOREIGNTRANSFER: ['1', '3']
    // --------------------- 綜存 --------------------- // 
    // 立即轉存定存
    , COMPOSITTOTIME: ['1', '3']
    // 自動轉存定存
    , AUTOCOMPOSITTOTIME: ['1', '3']
    // 自動轉期約定
    , AUTOCARRYOVER: ['1', '3']
    // 自動轉期解約
    , AUTOCARRYOVERDELETE: ['1', '3']
    // --------------------- 投資 --------------------- // 
    // 基金申購
    , FUNDINVEST: ['1', '3']
    // 基金贖回
    , FUNDREDEEM: ['1', '3']
    // 理財妙管家 修改
    , AUTOMREDEEMODIFY: ['1', '3']
    // 定期定額定期(不)定額修改
    , INQUIRYCHANGESTATUS: ['1', '3']
    // --------------------- 信用卡 --------------------- //
    , CARDS_PAY: ['1', '3']
    // --------------------- 裝置綁定 --------------------- //
    , DEVICEBIND: ['5']

};

export const FINALSECURITYOBJ = {
    securityType: '',
    transServiceId: '',
    // -- SSL -- //
    lastFourNum: '',
    // -- otp --//
    transNum: '',
    otpCheckCode: '',
    otpNum: '',
    // -- 快速交易 fast -- // 
    fastMode: '',
    signText: ''  // 簽章值
};

export const SECURITYTYPEOBJ = {
        '1': {
            securityType: '',
            transServiceId: '',
            lastFourNum: ''
        },
        '2': {
            securityType: '',
            transServiceId: '',
            transNum: '',
            otpCheckCode: '',
            otpNum: ''
        },
        '3': {
            securityType: '',
            transServiceId: '',
            fastMode: '',
            signText: ''
        },
        '4': {
            securityType: '',
            transServiceId: '',
            fastMode: '',
            signText: ''
        },
        '5': {
            securityType: '',
            transServiceId: '',
            transNum: '',
            otpCheckCode: '',
            otpNum: ''
        },
};


// 過濾只指回傳設定的參數
export const FILTER = (obj) => {
    // 可再調整根據不同securityType回傳對應的欄位目前根據全部欄位過濾回傳
    if (obj && obj.securityType) {
        let bakObj = {};
        let finnalSecurityObj = SECURITYTYPEOBJ[obj.securityType];
        for (let key in finnalSecurityObj) {
            if (obj[key] && obj[key] != '') {
                bakObj[key] = obj[key];
            }
        }
        return bakObj;
    } else {
        return obj;
    }

};


/**
 * 允許設定已驗證過的securityType的API
 * (某些情況交易重送兩次)
 */
export const ALLOW_IGNOR_SECURITY = [
    'SPEC11020301' // 贖回交易(台幣)-短線交易會重送
    , 'SPEC11020302' // 贖回交易(外幣)-短線交易會重送
];
