/**
 * Util Number
 * 數值處理
 */
import { NumberCheckUtil } from '@util/check/number-check-util';

export const NumberUtil = {
    /**
     * 數值轉換
     * @param n1 數值字串
     * @param doParse 特殊處理
     */
    toNumber(n1: string | number, doParse?: string): any {
        const check_data = NumberCheckUtil.checkNumber(n1, 'number');
        if (!check_data.status) {
            return false; // 非數值
        }
        let output = check_data.data;

        if (typeof doParse !== 'undefined') {
            switch (doParse) {
                case 'float':
                    output = parseFloat(output);
                    break;
                case 'int':
                    // tslint:disable-next-line:radix
                    output = parseInt(output);
                    break;
            }
        }
        return output;
    },
    /**
     * 全行數字轉半形數字
     * @param str 
     */
    toHalfWidthNum(str: any) {
        if (typeof (str) != 'string') { return null; }
        // tslint:disable-next-line:one-variable-per-declaration
        let i, iStep = 65248, res = str, sTemp;
        for (i = 0; i < str.length; i++) {
            sTemp = str.substr(i, 1);
            if (str.charCodeAt(i) >= 48 && str.charCodeAt(i) < 58) {    // 如果是半形
                res = res.replace(sTemp, String.fromCharCode(sTemp.charCodeAt(0) + iStep));
            } else if (str.charCodeAt(i) >= 65296 && str.charCodeAt(i) < 65306) {    // 如果是全形
                res = res.replace(sTemp, String.fromCharCode(sTemp.charCodeAt(0) - iStep));
            }
        }
        return res;
    },
    /**
     * 金融資訊
     * @param value
     * @param set_data
     *  boolean 為symbol
     *  object 為其他參數
     *      symbol 是否顯示％
     *      formate 是否做千分為formate
     *      empty_str 空值處理
     */
    toFinancial(value: string | number, set_data?: any, flag?: string, zero_type?: boolean): string {
        let empty_str = '- -';
        let symbol = false;
        let do_formate = false;
        if (typeof set_data == 'object' && !!set_data) {
            if (set_data instanceof Array) {
                symbol = (!!set_data[0]) ? true : false;
                do_formate = (!!set_data[1]) ? true : false;
                empty_str = (!!set_data[2]) ? set_data['empty_str'] : empty_str;
            } else {
                symbol = (!!set_data['symbol']) ? true : false;
                do_formate = (!!set_data['formate']) ? true : false;
                empty_str = (!!set_data['empty_str']) ? set_data['empty_str'] : empty_str;
            }
        } else {
            // 舊變數邏輯
            symbol = (!!set_data) ? true : false;
        }


        if (!value && value != '0') {
            return empty_str;
        }

        value = value.toString();
        value = value.replace('%', '');

        let has_pos = false;
        let replace_value = value;
        replace_value = value.replace(/,/g, '');
        if (replace_value.substr(0, 1) == '+') {
            has_pos = true;
            replace_value = replace_value.substr(1);
        }

        
        if (!zero_type) {
            if (value == '0' || parseFloat(value) == 0) {
                return empty_str;
            }
        }

        let arr_value = value.toString().split('.');
        let final_value;
        if (arr_value.length > 1) {
            arr_value[1] = (arr_value[1].toString() + '00000').substr(0, 5);
            if (!arr_value[0] || arr_value[0] == '' || arr_value[0] == 'undefined') {
                final_value = '0' + '.' + arr_value[1];
            } else {
                final_value = arr_value[0] + '.' + arr_value[1];
            }
            
        } else {
            final_value = arr_value[0] + '.00000';
        }

        if (!isNaN(Number(final_value))) {
            let Reg = /^(0|(\-|)([1-9]|[0-9]+\.[0-9]*|)[0-9][0-9]*)$/;
            if (!Reg.test(final_value)) {
                return empty_str;
            }
        }

        // formate
        if (do_formate) {
            final_value = final_value.toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        }
        if (symbol) {
            final_value += '%';
        }
        if (has_pos) {
            final_value = '+' + final_value;
        }
        // logger.log('final_value', final_value);
        return final_value;
    },
    /**
     * 基金組合專用
     * @param value 
     */
    toFundSetNumber(value: string | number): string {
        let empty_str = '- -';
        if (value == '0' || value == null || value == undefined || value == '') {
            return empty_str;
        }
        value = value.toString();
        return value;
    },


    /**
     * 取得數值資訊
     * @param data 
     */
    getNumberInfo(data, pre_data?: any) {
        let output: any = {
            status: false,
            source: data,
            number: 0,
            str: '- -',
            abs: 0, // 絕對值
            isNegative: false
        };
        if (!!pre_data) {
            output['pre_data'] = JSON.parse(JSON.stringify(pre_data));
        }
        let num = this.toNumber(data, 'float');
        if (num == false) {
            return output;
        }
        output.status = true;
        output.number = num;
        output.str = num.toString();
        output.abs = Math.abs(num);
        if (num < 0) {
            output.isNegative = true;
        }
        return output;
    }

};
