export class PatternLockOptions {
    title?: string;     // 自定標題
    content?: string;     // 自定內容
    type?: string;     // 畫一次or兩次
    value?: Array<any>;  // 自定資料值
    set_obj?: any; // 最大最小值
    constructor() {
        this.title = 'SECURITY.PATTERN.DRAWPATTERN'; // 繪製圖形鎖
        this.content = 'SECURITY.PATTERN.ATLEASTDOT'// 請輸入至少6個點
        this.value = ['01', '02', '03', '04', '05', '06', '07', '08', '09'];
        this.set_obj = {
            min: 6,
            max: 12
        };
    }
}
