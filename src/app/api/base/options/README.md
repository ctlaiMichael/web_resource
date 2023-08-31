# API Options定義

## 說明

定義APP API的相關格式option檔案



## 檔案項目

[基本格式]

- api-formate.ts

  定義伺服器格式

[APP連線設定相關]

- telegram-option.ts

  定義APP要請求api時的連線狀態設定

[Request相關]

- req-base-option.ts

  各ApiService功能定義的request物件的父類別

- req-header-options.ts

  API token設定

  

[Response相關]

- api-response-options.ts

  處理APP專用的api response格式類別物件

- res-base-option.ts

  各ApiService功能定義的response物件的父類別

- 