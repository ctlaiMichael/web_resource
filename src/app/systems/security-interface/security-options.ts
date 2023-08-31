/**
 * security opton
 */
export class SecurityOptions {
    setSecurity: {
        transServiceId: string,
        nameOfSecurity: string,
        signText: string ,
        inBankCode: string ,
        inAccount?: string,
        outAccount?: string,
        currency?: string,
        amount?: string,
    };
    
    securityAction: object; 

    constructor() {
        this.setSecurity = {
            transServiceId: '',
            nameOfSecurity: 'DEFAULT',
            signText: '', // 簽章內容
            // agreement: '0', // 預設非約 0 非約 1 約定
            // securityTypeOrder: ['1', '2', '3', '4'], // 預設安控順序 1 id last 4 , 2 => OTP ,3 => bio ,4 => graphic
            inAccount: '',
            inBankCode: '',
            outAccount: '',
            currency: 'TWD',
            amount: '',
        };
        this.securityAction = { method: 'init' };
    }

}
