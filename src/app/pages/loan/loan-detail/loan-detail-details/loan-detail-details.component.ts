/**
 * 本金利息明細查詢(本金)
 */
import { Component, Input, Output, EventEmitter, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { LoanDetailService } from '@pages/loan/shared/loan-detail.service';

@Component({
  selector: 'app-loan-detail-details',
  templateUrl: './loan-detail-details.component.html',
  styleUrls: []
})

export class LoanDetailDetailsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() setData: any; // api 08010002 request
  @Input() sort: string; // 是否開啟排序 DESC遞減，ASC遞增，''不排序
  @Input() page: string | number = 1; // 當下頁數
  @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
  infoData: any = {}; // SPEC08010002 本金利息明細查詢(資訊)
  listData: any = []; // SPEC08010002 本金利息明細查詢(明細)
  showData = false;
  expandFlag: boolean; // 是否全部展開
  private nowSort = '';
  private nowAccount: any;
  private isFirstInit = true; // true 是第一次近來
  private nowSearch = '';
  private subjectObj: any;

  constructor(
    private _mainService: LoanDetailService,
    private _handleError: HandleErrorService,
    private _logger: Logger,
    private _formateService: FormateService
  ) { }

  ngOnInit() {
    // 控制展開監聽
    this.subjectObj = this._mainService.expandSubject.subscribe((value: any) => {
      this.expandFlag = value;
    });

    this._logger.log("ngOnInit LoanDetailDetailsComponent, setData:", this._formateService.transClone(this.setData));
    this.doInit();
  }

  // 排序參數有改變，就觸發ngOnChanges去變更排序
  ngOnChanges() {
    this._logger.log("ngOnChanges into LoanDetailDetailsComponent, setData:", this._formateService.transClone(this.setData));
    this._logger.log("ngOnChanges into LoanDetailDetailsComponent, sort:", this.sort);
    this._logger.log("ngOnChanges into LoanDetailDetailsComponent, expandFlag:", this.expandFlag);
    let regetFlag = false;
    // 只有排序 or 帳號切換的時候才重執行
    if (this.sort != this.nowSort || this.setData.accountId != this.nowAccount) {
      regetFlag = true;
    // } else if (this.setData != this.nowReq) {
    //   regetFlag = true;
    }

    if (regetFlag) {
      this.doInit();
    }
  }

  ngOnDestroy() {
    // 刪除監聽物件
    this.subjectObj.unsubscribe();
  }
  /**
   * 重新設定page data 子層返回事件
   * @param item
   */
  onBackPageData(item) {
    let output = {
      'page': 'list-page',
      'type': 'back',
      'data': item
    };
    this._logger.log("into onBackPageData, output:", output);
    this.backPageEmit.emit(output);
  }

/**
 * 重新設定page data 子層返回事件
 * @param item
 */
  onErrorPageData(item) {
    let output = {
      'page': 'list-page',
      'type': 'back',
      'data': item
    };
    this._logger.step('Deposit', 'detail back', item);
    this._logger.log("into onErrorPageData, output:", output);
    this.errorPageEmit.emit(output);
  }

  // 初始化事件
  private doInit() {
    this.isFirstInit = false;
    this._logger.log("doInit LoanDetailDetailsComponent, setData:", this.page, this._formateService.transClone(this.setData));
    this._logger.log("doInit LoanDetailDetailsComponent, sort:", this.sort);
    this.nowAccount = this._formateService.transClone(this.setData['accountId']);
    // 塞request
    let reqData = {
      'type': '1',
      'searchType': this._formateService.checkField(this.setData, 'id'), // ex: 7D
      'accountId': this._formateService.checkField(this.setData, 'accountId'),
      'startDate': this._formateService.checkField(this.setData, 'startDate'),
      'endDate': this._formateService.checkField(this.setData, 'endDate'),
    };
    this.nowSort = (this.sort) ? this.sort : '';
    // 處理頁數
    if (typeof this.page === 'undefined') {
      this.page = 1;
    } else {
      // tslint:disable-next-line:radix
      this.page = parseInt(this.page.toString());
    }

    // 檢核是否查資料
    let check_research = this.checkReSearch(reqData);
    if (!check_research) {
      this._logger.log("AccountDetail", "no search");
      return false;
    }
    this._logger.log("ready to send api");
    this.showData = false;
    this.listData = [];
    // Api SPEC08010002-本金利息明細查詢(本金)
    this.getDetailData(reqData, this.page, this.nowSort);
  }

  // Api SPEC08010002-本金利息明細(本金)
  private getDetailData(reqData, page, sort?: string) {
    let paginator = {
      // pageSize: '20',
      pageNumber: page.toString(),
      // sortColName: 'date',
      sortDirection: sort
    };
    let option = {};
    this._logger.log("getDetailData LoanDetailDetailsComponent, reqData:", this.page, this._formateService.transClone(reqData));
    this._mainService.getDetailData(reqData, paginator, option).then(
      (result) => {
        this.infoData = result.infoData;
        this.listData = result.data;
        this.showData = true;
        this._logger.log("getListData success, infoData:", this.infoData);
        this._logger.log("getListData success, listData:", this.listData);
        this.onBackPageData(result); // 回傳總計資訊給父層顯示
      },
      (errorObj) => {
        this._logger.log("getListData error, errorObj:", errorObj);
        errorObj['type'] = 'message';
        this.showData = false;
        this.onErrorPageData(errorObj); // 將錯誤資訊給父層
      }
    );
  }


  /**
   * 依功能調整檢核是否查資料
   * @param reqData 
   */
  private checkReSearch(reqData) {
    if (!reqData.accountId) {
      this._logger.log("AccountDetail", "no account");
      return false;
    }
    let new_search = [reqData.accountId, reqData.startDate, reqData.endDate, this.sort].join('_');
    if (new_search == this.nowSearch) {
      // 欄位相同不重查
      return false;
    }
    this.nowSearch = new_search;
    return true;
  }
}