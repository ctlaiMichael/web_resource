# mScale安控模組
## plugin
`com-hitrust-plugin-mscale`

[version] `1.0`

[url] `HiTrust mScale`

### 功能說明
HiTrust mScale challenge Response 機制

---

## 引用

    import { mscalePluginService } from '@lib/security/mscale/mscale-plugin.service';

    constructor(
        private mScale: mscalePluginService
    ) {
    }

---


## initialize 註冊
### 目的
  APP 啟動務必註冊此method

### 呼叫方法


## doChallengeResponse 執行 challenge Response
### 目的
  與伺服器建立信任連線與交換金鑰

### 呼叫方法




## encrypt 資料加密
### 目的
  資料加密

### 呼叫方法




## decrypt 資料解密
### 目的
  資料加密

### 呼叫方法



## getSessionId 取得公鑰
### 目的
  取得公鑰

### 呼叫方法









