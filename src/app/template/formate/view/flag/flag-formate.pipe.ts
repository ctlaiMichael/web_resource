/**
 * 基本Date常用pipe
 */
import { Pipe, PipeTransform, WrappedValue } from '@angular/core';
import { FlagUtil } from '@util/formate/view/flag-util';
import { TranslateService } from '@ngx-translate/core';
import { LanguageChangeService } from '@systems/system/language/language-change.service';

/**
 * 幣別國旗顯示
 */
@Pipe({
    name: 'iconFlag'
})
export class IconFlagPipe implements PipeTransform {

    constructor(

    ) { }

    transform(value: string, arg?: string): string {
        let params_key: string = '';
        let params: any = {};
        if (typeof arg !== 'undefined') {
            params_key = arg;
        }
        return FlagUtil.transIconFlag(value, params_key);
    }
}


/**
 * 幣別國旗顯示
 */
@Pipe({
    name: 'currencyName'
    , pure: false
})
export class CurrencyNamePipe implements PipeTransform {

    private originValue = '';
    private originArg = '';
    private outputData = '';

    constructor(
        private translate: TranslateService,
        private language: LanguageChangeService
    ) { }

    transform(value: string, arg?: string): any {
        let show_obj = FlagUtil.transCurrencyName(value, arg);
        let output = '';
        if (this.originValue == value && this.originArg == arg) {
            return this.outputData;
        }
        this.originArg = arg;
        this.originValue = value;

        if (show_obj.currency == 'USDOB') {
            show_obj.currency = 'USD(OB)';
        } else if (show_obj.currency == 'USDIB') {
            show_obj.currency = 'USD(IB)';
        }

        if (show_obj.type === 'i18n') {
            const set_params = { currency: show_obj.currency };
            this.translate.get(show_obj.name, set_params).subscribe((val) => {
                output = val;
                this.outputData = output;
            });
            return WrappedValue.wrap(output);
        } else {
            if (this.language.getNowLanguage().lang == 'zh-tw') {
                output = show_obj.currency + ' ' + show_obj.name;
            }
            else {
                output = show_obj.currency;
            }
            if (output.indexOf('_')) {
                output = output.replace('_', ' ');
            }
            this.outputData = output;
            return output;
        }
    }
}

