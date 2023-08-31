# Template說明: 注意資訊
## 目的
顯示幣別選單

詳見需求確認文件「RD-MNB-0003-提示訊息.docx」

前端框架標準說明書@note-popup-提醒資訊.doc


## 參數設定
### options
請參考currency-flag-popup-options定義

    {
        title: '標題',
        content: '<b>HTML內容</b>測試測試測試'
    }


## 基本module引用
    import { NotePopupModule } from '@template/msg/note-popup/note-popup.module';
    
    @NgModule({
        imports: [
            NotePopupModule
        ]
    })...


## html
N/A


## component
    constructor(
        private notePopup: NotePopupService
    ) { }

    // 呼叫顯示
    this.notePopup.show({
        title: '標題',
        content: '<b>HTML內容</b>測試測試測試'
    });

## service
N/A