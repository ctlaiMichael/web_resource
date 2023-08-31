/**
 * 分頁設定檔
 * PAGE_SIZE 必須是偶數頁，要不然樣式會跑掉
 */
import { environment } from '@environments/environment';

let setOption = {
  PAGE_SIZE: 200,
  SORT: 'DESC'
};

if (!environment.ONLINE) {
  // 測試用分頁為6
  setOption.PAGE_SIZE = 6;
}

export const PAGE_SETTING = setOption;