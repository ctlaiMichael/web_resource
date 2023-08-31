/**
 * 各期帳單資訊
 */
import { Component, OnInit, Input } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { HistoryBillService } from '@pages/card/shared/history-bill-main.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { FormateService } from '@template/formate/formate.service';
// declare var Swiper: any;

@Component({
  selector: 'app-history-bill-info',
  templateUrl: './history-bill-info.component.html',
  styleUrls: []
})

export class HistoryBillInfoComponent implements OnInit {
  @Input() setData: any; // 帳單資訊
  // expandFlag: boolean; // 是否全部展開
  // private subjectObj: any;

  constructor(
    private logger: Logger,
    private mainService: HistoryBillService,
    private handleError: HandleErrorService,
    private _formateService: FormateService
  ) { }

  ngOnInit() {
    this.logger.log("into HistoryBillInfoComponent, setData:", this.setData);
    // 控制展開監聽
    // this.subjectObj = this.mainService.expandSubject.subscribe((value: any) => {
    //   this.expandFlag = value;
    // });
    // this.getBillMonthData();
  }

  // 畫面產生完資料後會執行
  // ngAfterViewInit() {
  //   this.logger.log("into ngAfterViewInit 22222");
  //   this.doSwiper();
  // }

  // ngOnDestroy() {
  //   // 刪除監聽物件
  //   this.subjectObj.unsubscribe();
  // }

  // swiper設定
  // doSwiper() {
  //   if (typeof Swiper != 'function') {
  //     this.logger.log("into swiper error");
  //     return false;
  //   }
  //   this.logger.log("into do swiper");
  //   let swiper = new Swiper('.swiper-container_credit', {
  //     slidesPerView: 'auto',  // 設置slider容器能同時顯示的slides數量
  //     centeredSlides: true,   // 設定為true時，活動塊會居中，而不是默認狀態下的居左
  //     spaceBetween: 20,       // 兩個區塊間距
  //     pagination: {
  //       el: '.swiper-pagination_credit',
  //       clickable: true,      // 設置為true時，點擊分頁的指示點會控制Swiper切換
  //     },
  //   });
  // }

  // 取得帳單月份資料
  // getBillMonthData() {
  //   this.logger.log("into getBillMonthData");
  //   let reqData = {};
  //   this.mainService.getBillMonthData(reqData).then(
  //     (result) => {
  //       this.logger.log("success, result:", this._formateService.transClone(result));
  //       let temp = this._formateService.transClone(result.rangeData);
  //       temp.splice(0, 0, this.unPaidStr);
  //       this.billMonthData = temp; // 未出帳消費資料預設會顯示於下拉第一筆
  //       this.logger.log("billMonthData:", this.billMonthData);
  //     },
  //     (errorObj) => {
  //       this.logger.log("error, errorObj:", errorObj);
  //       this.handleError.handleError(errorObj);
  //     }
  //   );
  // }
}
