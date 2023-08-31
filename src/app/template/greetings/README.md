# Template說明: 注意資訊
## 目的
提供問候語的顯示，並隨時間隨機產生

凌晨Early       00:00 ~ 03:00

拂曉dawn        03:00 ~ 06:00

早晨morning     06:00 ~ 09:00

午前forenoon	09:00 ~ 12:00

午後Afternoon	12:00 ~ 15:00

傍晚Evening     15:00 ~ 18:00

薄暮dusk        18:00 ~ 21:00

深夜night       21:00 ~ 24:00


詳見需求確認文件「RD-MNB-0101-首頁.docx」



## 參數設定
### options



## 基本module引用
    import { GreetingsModule } from '@template/greetings/greetings.module';

    
    @NgModule({
        imports: [
            GreetingsModule
        ]
    })...


## html
    <app-greetings></app-greetings>


## component
 

## service
N/A