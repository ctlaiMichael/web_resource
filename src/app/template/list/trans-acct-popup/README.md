# Template說明: 注意資訊
## 目的
顯示幣別選單



詳見需求確認文件「RD-MNB-0001-共用選單.docx」的「RD-MNB-0001-02-幣別選單」



## 參數設定
### options
請參考currency-flag-popup-options定義

{
    title: 'popup標題',
    data: [
        {
            currencyCode: 'USD',
             currencyName: '美金'
        }
        , {
            currencyCode: 'JPY',
             currencyName: '日幣'
        }
    ]
}


## 基本module引用
    import { CurrencyFlagPopupModule } from '@shared/template/list/currency-flag/currency-flag-popup.module';
    
    @NgModule({
        imports: [
            CurrencyFlagPopupModule
        ]
    })...


## html
N/A


## component
    constructor(
        private _currencyPop: CurrencyFlagPopupService
    ) { }

    // 呼叫顯示
    this._currencyPop.show({
        // title: '', // 若有要調整再放入
        data: this.currencyData
    }).then(
        (currencyItem) => {
            this.onCurrencyChange(currencyItem);
        },
        () => {
            // 使用者取消
        }
    );

## service
N/A