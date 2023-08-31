import { NavgatorService } from './systems/route/navgator/navgator.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { LanguageChangeService } from '@systems/system/language/language-change.service';
import { LayoutCtrlService } from '@systems/route/layout/layout-ctrl.service';
import { InitService } from '@systems/system/init/init.service';
import { LOCAL_STORAGE_NAME_LIST } from '@conf/security/storage-name';
import { LocalStorageService } from '@lib/storage/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LanguageChangeService]
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'scsb';

  constructor(
    private languageService: LanguageChangeService,
    private layoutCtrlService: LayoutCtrlService,
    private initService: InitService,
    private localstorage: LocalStorageService,
    private navgator: NavgatorService,
  ) {
    this.languageService.setDefaultLanguage(); // 改語系
    // this.layoutCtrlService.init(); // 畫面控制 => layoutCtrl constructor自動處理
  }

  ngOnInit() {
    this.initService.init().then(
      () => {
        this.checkGoToAgreem();
      }
    );
  }

  ngAfterViewInit() {
    // 啟動畫面控制
    this.initService.hidenInitPateBox();
  }

  private checkGoToAgreem() {
    let checkfrist: any = this.localstorage.getObj(LOCAL_STORAGE_NAME_LIST.FIRSTAGREE);
    if (checkfrist != "Y") {
      this.navgator.push("homepageagree");
    }
  }

}
