/**
 * DeviceInfo資訊
 */
/**
 * 裝置資訊設定檔
 */
export class DeviceInfoOption {
    // == 裝置軟體資訊 == //
    platform?: string; // 手機作業系統: iOS, Android
    platformLower?: string; // 手機作業系統(強制轉小寫)
    osVersion?: string; // 手機作業系統版本
    hostname?: string; // 使用者裝置名稱(自定義)
    // == 裝置資訊 == //
    manufacturer?: string; // 製造商
    modelSource?: string; // 原始手機型號
    model?: string; // 手機型號(處理過的)
    // == APP 軟體資訊 == //
    cordovaVersion?: string;
    appVersion?: string; // APP完整版本號
    appinfo?: any = {
        'name': '',  // appName
        'identifier': '', // app id
        'version': '' // APP主版本
        , 'subVersion': '' // APP子版本
    };
    // == APP 與裝置狀況 == //
    isVirtual?: boolean; // 是否模擬模式
    uuid?: string; // 設備識別碼
    serialNo?: string; // device hardware serial number (SERIAL).

    constructor() {
        // == 裝置軟體資訊 == //
        this.platform = '';
        this.platformLower = '';
        this.osVersion = '';
        this.hostname = '';
        // == 裝置資訊 == //
        this.modelSource = '';
        this.model = '';
        this.manufacturer = '';
        // == APP 軟體資訊 == //
        this.cordovaVersion = '';
        this.appVersion = '';
        this.appinfo = {
            'name': '',
            'identifier': '',
            'version': '',
            'subVersion': '' 
        };
        // == APP 與裝置狀況 == //
        this.isVirtual = false;
        this.uuid = '';
        this.serialNo = '';
    }
    
}
