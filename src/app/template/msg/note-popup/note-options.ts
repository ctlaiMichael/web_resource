/**
 * Note opton
 */
export class NoteOptions {
    title?: string;     // 自定標題
    content?: string;  // 自定內容
    content_list?: Array<any>; // 其他項目
    showNumber?: boolean; // 是否顯示項目數值

    constructor() {
        this.title = '';
        this.content = '';
        this.content_list = [];
        this.showNumber = false;
    }
}
