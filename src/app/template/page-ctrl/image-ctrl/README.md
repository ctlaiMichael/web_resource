# Template說明: 圖片處理
## 目的
提供圖片處理機制



詳見需求確認文件「RD-MNB-0003-提示訊息.docx」



## 參數設定
### options
#### imageCtrl 
圖片檔案

支援以下形式
* base64字串(圖片)
* 外部圖片(https://,http://)
* local圖檔：local圖檔只支援放在 /assets/imgaes/下的圖檔

#### imageType
* background-image：顯示在css的background-image上
* img：建立html `<img/>`


## 基本module引用
    import { ImageCtrlModule } from '@template/page-ctrl/image-ctrl/image-ctrl.module';
    
    @NgModule({
        imports: [
            ImageCtrlModule
        ]
    })...


## html
    <div class="login_event_img login_event_img_1" [imageCtrl]="ad.img" [imageType]="'background-image'" ></div>


## component
N/A


## service
N/A