/**
 * 帳號餘額眼睛功能
 */
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-amount-mask',
  templateUrl: './amount-mask.component.html',
  styleUrls: []
})

export class AmountMaskComponent implements OnInit {

  @Input() title: any; // 欄位名稱
  @Input() currency: any; // 幣別
  @Input() amount: any; // 金額
  @Input() showSign: string; // 是否顯示正負號(紅色,綠色箭頭圖示), Y:顯示 N:不顯示

  see_amount = false;

  constructor() { }

  ngOnInit() {

  }

  switchSee() {
    this.see_amount = !this.see_amount;
  }

}
