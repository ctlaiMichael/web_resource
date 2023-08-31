/**
 * header notice
 * 通知功能
 * 
 * 有新訊息通知狀態 在btn_news後加 active
 */
import { Component, NgZone, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { environment } from '@environments/environment';
import { Logger } from '@systems/system/logger/logger.service';
// == library == //

@Component({
  selector: 'app-header-notice',
  templateUrl: './header-notice.component.html',
  styleUrls: [],
})
export class HeaderNoticeComponent implements OnInit {

  btnClass = ''; // 是否有通知，有新訊息通知狀態 在btn_news後加 active

  constructor(
    private _logger: Logger

  ) {
  }


  ngOnInit() {
  }


  private haveNotice() {
    this.btnClass = 'active';
  }

}
