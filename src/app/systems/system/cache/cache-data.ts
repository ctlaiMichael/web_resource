export class CacheData {
    value?: any;  // 資料
    ttl?: number;  // (Time to live)有效時間(分鐘)
    effectTime?: number; // Timestemp
    keepAlive?: string; // 是否保存 login(登入時有效)/always(總是保留)
    group?: string; // 群組類型
    groupList?: Array<any>; // 群組類型(多組)
    // location?: string; // 地區
    // lang?: string; // 語系
    updateTimeList?: Array<any>; // 更新時間列表 如['08:00', '18:00']
    dataTime?: number; // 資料時間
    nextUpdateTime?: number; //下次強制更新時間
    langChangeRemove?: string; // 語言轉換時是否保存 keep(保存)/remove(刪除)

    constructor() {
        this.ttl = 5;
        this.groupList = [];
        this.group = '';
        this.keepAlive = 'login';
        this.updateTimeList = [];
        this.langChangeRemove = 'remove';
    }
}
