/**
 * 分頁設定檔
 */
import { PAGE_SETTING } from '@conf/page';

export class PaginatorOption {
    // totalRowCount = 0;
    pageSize: string | number = 0; // 每頁大小
    pageNumber: string | number = 0; // 頁次
    sortColName = '';
    sortDirection = ''; // ASC, DSC
    constructor() {
        this.pageNumber = 1;
        this.pageSize = PAGE_SETTING.PAGE_SIZE;
        this.sortDirection = PAGE_SETTING.SORT;
    }
}