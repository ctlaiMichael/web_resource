# Template說明: 注意資訊
## 目的
提供頁面顯示控制資訊，
並於點選後顯示設定的提示內容



詳見需求確認文件「RD-MNB-0003-提示訊息.docx」



## 參數設定
### options
請參考note-popup的note-options.ts定義


## 基本module引用
    import { BookmarkModule } from '@shared/template/note/note.module';
    
    @NgModule({
        imports: [
            NoteModule
        ]
    })...


## html
    <app-note [options]="noteData"></app-note>


## component
    this.noteData = {
        title: '標題',
        content: '<b>HTML內容</b>測試測試測試'
    };


## service
N/A


# component

## note: 注意資訊

## after-trans-note: 交易資訊