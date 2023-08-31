import { Injectable } from '@angular/core';

@Injectable()
export class CheckIdService {
    
    constructor(
        
    ) { }

    /**
     * 檢核ID
     * 回傳 false:格式錯誤
     */
    checkID(userID: string) {
        userID = userID.toUpperCase().trim();
        let idChecked = false;

        if (this.isValidPID(userID)) {
            // 個人戶
            idChecked = true;			
        } else if (this.isValidCID(userID)) {
            // 企業戶
            idChecked = true;
        } else if (userID.length == 9) {
            // 企業戶
            idChecked = true;
        }

        return idChecked;
    }

    /**
     * 檢核個人戶
     * 回傳 false:格式錯誤
     */
    private isValidPID(userID: string) {
        let check = false;

        if (this.isTwID(userID)) {
            check = true;
        } else if (userID.length == 10) {
            // 統一證號
            let regex1 = /^[ABCDEFGHIJKLMNOPQRSTUVWXZ][ABCD]\d{8}$/;
            // 外國人ID (前2碼=英文+後八碼數字) ([A-Z]{2}\d{8})
            // 外國人ID (後2碼=英文+前八碼數字) (\d{8}[A-Z]{2})
            // 外國人ID (第1碼=英文+第2碼=8或9+後八碼數字) ([A-Z]{1}(8|9)\d{8}
            let regex2 = /^([A-Z]{2}\d{8})|(\d{8}[A-Z]{2})|([A-Z]{1}(8|9)\d{8})$/;

            if (regex1.test(userID) || regex2.test(userID)) {
                check = true;
            } else {
                check = false;
            }
        } else if (userID.length == 11) {
            // 有可能是聯名戶 身份證 + 一碼
            // 就不驗了, 直接送
            check = true;
        }

        return check;
    }

    /**
     * 檢核台灣身分證字號規則
     * 回傳 false:格式錯誤
     */
    private isTwID(userID: string) {
        let verify = true;
        let id = userID;
        let IDarea = "ABCDEFGHJKLMNPQRSTUVXYWZIO";
        let IDpos = 0;
        let check = 0;
        let re = /^[A-Z](1|2)\d{8}$/;
        let total = 0;

        if (!re.test(id)) {
            verify = false;
        } else {
            for (let num = 0; num < 9; num++) {
                if (num == 0) {
                    IDpos = IDarea.indexOf(id.substring(0, 1)) + 10;
                    total += Math.floor(IDpos / 10);
                    total += ((IDpos % 10) * 9);
                } else {
                    // tslint:disable-next-line: radix
                    total += (parseInt(id.substr(num, 1)) * (9 - num));
                }
            }
            check = ((total % 10) == 0) ? 0 : (10 - (total % 10));
            if (check.toString() != id.substr(9, 1)) {
                verify = false;
            }
        }
        return verify;
    }

    /**
     * 檢核企業戶
     * 回傳 false:格式錯誤
     */
    private isValidCID(userID: string) {
        let verify = true;
        let idNumber = userID;
        let re = /^\d{8}$/;
        let idNumber7 = 0;
        let temp7 = 0;
        let temp7A = 0;
        let temp7B = 0;
        let xtemp7A = 0;
        let xtemp7B = 0;
        let total = 0;

        if (idNumber.length >= 10) {
            idNumber = idNumber.substring(0, 8);
        }

        if (idNumber.length == 9) {
            idNumber = idNumber.substring(0, 8);
        } else if (idNumber.length != 8) {
            return false;
        }

        if (!re.test(idNumber)) {
            verify = false;
        } else {
            for (let num = 0; num < 8; num++) {
                if (num == 0 || num == 2 || num == 4 || num == 7) {
                    // tslint:disable-next-line: radix
                    total += parseInt(idNumber.substring(num, num + 1)) * 1;
                } else if (num == 1 || num == 3 || num == 5) {
                    // tslint:disable-next-line: radix
                    let temp = parseInt(idNumber.substring(num, num + 1)) * 2;
                    if (temp < 10) {
                        total += temp;
                    } else {
                        total += ((temp - (temp % 10)) / 10) + (temp % 10);
                    }
                } else if (num == 6) {
                    // tslint:disable-next-line: radix
                    idNumber7 = parseInt(idNumber.substring(num, num + 1));
                    // tslint:disable-next-line: radix
                    temp7 = parseInt(idNumber.substring(num, num + 1)) * 4;
                    if (temp7 < 10) {
                        temp7A = 0;
                        temp7B = temp7;
                    } else {
                        temp7A = (temp7 - (temp7 % 10)) / 10;
                        temp7B = temp7 % 10;
                    }
                }
            }
            if ((total + temp7A + temp7B) % 10 != 0) {
                if (idNumber7 == 7) {
                    let xtemp7 = temp7A + temp7B;
                    if (xtemp7 < 10) {
                        xtemp7A = 0;
                        xtemp7B = xtemp7;
                    } else {
                        xtemp7A = (xtemp7 - (xtemp7 % 10)) / 10;
                        xtemp7B = xtemp7 % 10;
                    }
                    if ((total + xtemp7A) % 10 != 0) {
                        verify = false;
                    }
                } else {
                    verify = false;
                }
            }
        }
        return verify;
    }

    /**
     * 檢核連續相同英數字
     * 回傳 false:格式錯誤
     */
    checkContinuousSame(value: string) {
        value = value.toUpperCase().trim();
        let check = true;
        let charArray = value.split('');
        if (charArray.length >= 2) {
            let i;
            for (i = 0; i < charArray.length - 1; i++) {
                if (charArray[0] != charArray[i + 1]) {
                    check = true;
                    break;
                }
                check = false;
            }
        }
        return check;
    }

    /**
     * 檢核連續數字
     * 回傳 false:格式錯誤
     */
    checkContinuousNumber(value: string) {
        value = value.trim();
        let check1 = true;
        let check2 = true;
        let reg = /^[0-9]$/;
        let charArray = value.split('');
        if (charArray.length >= 2) {
            let i;
            for (i = 0; i < charArray.length - 1; i++) {
                if (reg.test(charArray[i]) && reg.test(charArray[i + 1])) {
                    // tslint:disable-next-line: radix
                    let one = parseInt(charArray[i]);
                    // tslint:disable-next-line: radix
                    let two = parseInt(charArray[i + 1]);
                    if (two == one + 1) {
                        check1 = false;
                    } else {
                        check1 = true;
                        break;
                    }
                } else {
                    check1 = true;
                    break;
                }
            }
            for (i = 0; i < charArray.length - 1; i++) {
                if (reg.test(charArray[i]) && reg.test(charArray[i + 1])) {
                    // tslint:disable-next-line: radix
                    let one = parseInt(charArray[i]);
                    // tslint:disable-next-line: radix
                    let two = parseInt(charArray[i + 1]);
                    if (two == one - 1) {
                        check2 = false;
                    } else {
                        check2 = true;
                        break;
                    }
                } else {
                    check2 = true;
                    break;
                }
            }
        }
        return (check1 && check2);
    }

}
