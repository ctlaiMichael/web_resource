/**
 * 系統參數設定檔
 */

import { environment } from 'environments/environment';

let output_data = {
    // -------------------- [系統] -------------------- //
    // -------------------- [系統 End] -------------------- //
    // ======================================== 特殊專區 ======================================== //
};

if (!environment.PRODUCTION) {
    // 測試版修正(開發模式)
}


export const SYSTEM_PARAMS = output_data;
