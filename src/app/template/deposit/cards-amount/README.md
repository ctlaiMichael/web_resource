# Template說明
## 目的
扣款/取消扣款 元素



## 基本module引用

    import { CardsAmountComponentModule } from '@shared/template/cards/cards-amount/cards-amount-component.module'; // 支出存入


    @NgModule({
        imports: [
            CardsAmountComponentModule
        ]
    })..

## 頁面引用
### 台幣存款帳戶
#### HTML:
    <app-cards-amount [data]="data"></app-cards-amount>

data:
    {
        transDate: '20101208', // 交易日
        digest: '摘要text', // 摘要
        withdraw: '', // 支出
        cards: '200', // 存入
        balance1: '300', // 結餘
        rcvBankId: '001', // 交易行庫代碼
        rcvBankName: 'bankname', // 交易行庫名稱
        checkNumber: '1010101', // 支票號碼
        remarks: 'remarks', // 備註
        transTime: '235959' // 交易時間
    }

### 外匯存款帳戶
請依照狀況進行調整

#### HTML:

    <app-cards-amount [data]="data"></app-cards-amount>

data:

### 黃金存摺帳戶
請依照狀況進行調整

#### HTML:
    <app-cards-amount [data]="data"></app-cards-amount>


acctObj:

