# 主要區塊說明
## 功能: 錯誤處理

#### alert & confirm

    errorObj['type'] = 'confirm';
    this._handleError.handleError(errorObj).then(
        () => {
            // check
        },
        () => {
            // cancle
        }
    );


## resultType
### 說明
特殊轉導功能

#### check 驗證失敗
APP檢合失敗

#### security: 安控失敗
Server 安控aop檢合失敗

#### server: 伺服器回傳
Server回傳錯誤

#### gateway: GateWay回傳
Gateway回傳錯誤

#### cre2ee: 要重做CR E2EE
Gateway回傳錯誤
且指定要做CR E2E



