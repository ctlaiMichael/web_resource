# 目的
圖形鎖繪製元件
(需功能進行整合)

## 參數
    PatternLockOptions:
    title?: string;       // 自定標題 
    content?: string;     // 自定內容
    type?: string;        // 畫一次or兩次
        1或不帶=>註冊、交易 (畫一次)
        2=>註冊 (畫兩次)
    value?: Array<any>;   // 自定資料值 
        預設:'value':['01','02','03','04','05','06','07','08','09']
        必須為長度9的Array
    set_obj?:any;         //最大最小值 預設6-12碼


## 範例

    module=>
        imports: [
            PatternLockModule
        ]
    component=>
        constructor(
            private patternLockPopupService: PatternLockPopupService
        )
    使用=>
    this.patternLockPopupService.show(
        {
            'title':'繪製圖形鎖',
            'content':'請輸入至少6個點',
            'type':'2',
            'value':['01','02','03','04','05','06','07','08','09']
            'set_obj':{
                'min':6,
                'max':12
            }
        }).then(
      (suc)=>{
       this._logger.error(suc);  //suc => return 圖形密碼鎖值
      },
      (fail)=>{
        this._logger.error(fail);  //使用者取消
      }
    );
##
