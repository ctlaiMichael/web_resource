/**
 * 登入後首頁
 */
import { Component, OnInit } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { AuthService } from '@systems/system/auth/auth.service';
import { PatternLockService } from '@lib/pattern/pattern-lock.service';
import { PatternLockPopupService } from '@lib/pattern/pattern-lock-popup.service';

@Component({
  selector: 'app-demo-pattern',
  templateUrl: './demo-pattern.component.html',
  styleUrls: []
})

export class DemoPatternComponent implements OnInit {


  subscriptionOnDraw: any; // 訂閱圖形鎖的onDraw
  constructor(
    private _logger: Logger,
    private auth: AuthService,
    private patternLockService: PatternLockService,
    private patternLockPopupService: PatternLockPopupService,
  ) { }

  ngOnInit() {
  }
  
  pattern() {
    this.patternLockPopupService.show(
      
      { 'title': 'SECURITY.PATTERN.DRAWPATTERN', 
      'content': 'SECURITY.PATTERN.ATLEASTDOT', 
      'type': '2', 
      'value': ['01', '02', '03', '04', '05', '06', '07', '08', '09'] 
      }).then(
      (suc) => {
        this._logger.error('login over', suc);  // pattern pw
      },
      (fail) => {
        this._logger.error('login over', fail);  // uesr cancel
      }
    );
    // this.patternLockService.onDrawSubject.subscribe(
    //   () => {
    //     this.onDraw();
    //   }
    // );
  }

  // onDraw() {
  //   this.patternLockService.onDrawSubject.unsubscribe();
  //   let patternPwd = this.patternLockService.getPatternPwd();
  //   this._logger.error('login onDraw',patternPwd);
  // }

}
