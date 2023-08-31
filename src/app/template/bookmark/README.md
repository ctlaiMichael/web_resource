# Template說明: 頁籤
## 目的
第一層與第二層選單


## 層級



## 選單設定
### 第一層
    {
      id: '選單編號',
      name: '選單名稱',
      sort: 1, // 選擇性設定，排序順序，預設ASC
      default: '7D', // 預設選擇項目,未設定預設第一個
      data: [] // 第二層選單，最多設定8個,
      lock: false // 如果為true會回傳,但不切換頁籤
    }

### 第二層
    data: [
        {
            id: '選單編號', 
            name: '選單名稱', 
            sort: 1  // 選擇性設定，排序順序，預設ASC
        },
        { id: '7D', name: '7周', sort: 1 },
        { id: '1M', name: '1月', sort: 2 }
    ]

### 範例
  bookmarkData = [
    {
      id: 'trans',
      name: '交易明細',
      sort: 1,
      default: '7D',
      data: [
        { id: '7D', name: '7周', sort: 1 },
        { id: '1M', name: '1月', sort: 2 }
      ]
    },
    {
      id: 'acct',
      name: '帳戶彙總',
      sort: 2
    },
    {
      id: 'mark',
      name: '匯率試算',
      sort: 3,
      default: '1M',
      data: [
        { id: '1D', name: '近一天', sort: 1 },
        { id: '7D', name: '近一周', sort: 2 },
        { id: '1M', name: '1月', sort: 3 },
        { id: '2M', name: '2月', sort: 4 },
        { id: '3M', name: '3月', sort: 5 },
        { id: '4M', name: '4月', sort: 6 },
        { id: '5M', name: '5月', sort: 7 },
        { id: '6M', name: '6月', sort: 8 }
      ]
    },
    {
      id: 'acct3',
      name: '帳戶1總',
      sort: 4
    }
  ];

## 基本module引用
    import { BookmarkModule } from '@shared/template/bookmark/bookmark.module';
    
    @NgModule({
        imports: [
            BookmarkModule
        ]
    })...

## component

  onBookMarkBack(e) {
    this._logger.step('Bookmark', 'onBookMarkBack', e);
    let page = 'list';
    let pageType = 'list';
    let errorObj: any;
    if (typeof e === 'object') {
      if (e.hasOwnProperty('page')) {
        page = e.page;
      }
      if (e.hasOwnProperty('type')) {
        pageType = e.type;
      }
      if (e.hasOwnProperty('data')) {
        errorObj = e.data;
      }
    }
  }


## html
    <app-bookmark [setData]="bookmarkData" [defaultKey]="'mark'" (backPageEmit)="onBookMarkBack($event)"></app-bookmark>


## service

### 一層選單

    /**
     * 取得頁籤設定(一層)
     */
    getBookmark() {
        let output = [];
        this.dateCheckList = {};
        // == Level 1 == //
        // --- [today] --- //
        output.push({
            id: 'today',
            name: 'DEPOSIT.SEARCH.TODAY', // 今天
            sort: 1,
            search_data: this.setDateCheck('today')
        });
        // --- [7D] --- //
        output.push({
            id: '7D',
            name: 'DEPOSIT.SEARCH.WEEK', // 最近1週
            sort: 2,
            search_data: this.setDateCheck('7D')
        });

        // --- [1M] --- //
        output.push({
            id: '1M',
            name: 'DEPOSIT.SEARCH.MONTH', // 最近1個月
            sort: 3,
            search_data: this.setDateCheck('1M')
        });
        // --- [custom] --- //
        output.push({
            id: 'custom',
            name: 'DEPOSIT.SEARCH.CUSTOM', // 自訂
            sort: 4,
            search_data: this.setDateCheck('custom')
        });
        this._logger.step('Deposit', 'bookmark set', this.dateCheckList);
        return output;
    }

### 兩層選單

    /**
     * 取得頁籤設定)
     */
    getBookmark() {
        let output = [];
        let detail_data = [];
        this.dateCheckList = {};
        // == Level 2 == //
        // --- [today] --- //
        detail_data.push({
            id: 'today',
            name: 'DEPOSIT.SEARCH.TODAY', // 今天
            sort: 1,
            search_data: this.setDateCheck('today')
        });
        // --- [7D] --- //
        detail_data.push({
            id: '7D',
            name: 'DEPOSIT.SEARCH.WEEK', // 最近1週
            sort: 1,
            search_data: this.setDateCheck('7D')
        });

        // --- [1M] --- //
        detail_data.push({
            id: '1M',
            name: 'DEPOSIT.SEARCH.MONTH', // 最近1個月
            sort: 2,
            search_data: this.setDateCheck('1M')
        });
        // --- [custom] --- //
        detail_data.push({
            id: 'custom',
            name: 'DEPOSIT.SEARCH.CUSTOM', // 自訂
            sort: 3,
            search_data: this.setDateCheck('custom')
        });
        // == Level 1 == //
        output.push({
            id: 'detail',
            name: 'BOOK_MARK.COMMON.DETAIL', // 交易明細
            sort: 1,
            default: '7D',
            data: detail_data
        });
        output.push({
            id: 'summary',
            name: 'BOOK_MARK.COMMON.SUMMARY', // 帳戶彙總
            sort: 2
        });
        this._logger.step('Deposit', 'bookmark set', this.dateCheckList);
        return output;
    }