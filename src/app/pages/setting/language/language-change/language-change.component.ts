/**
 * 語言切換
 */
import { Component, OnInit } from '@angular/core';
import { LanguageChangeService } from '@systems/system/language/language-change.service';

@Component({
  selector: 'app-language-change',
  templateUrl: './language-change.component.html',
  styleUrls: [],
  providers: [LanguageChangeService]
})

export class LanguageChangeComponent implements OnInit {
  nowLang: string; // 當前語系
  data: any; // 語系設定list
  private langData: any; // 語系設定檔
  private dfLang: any;

  constructor(
    private mainService: LanguageChangeService
  ) { }

  ngOnInit() {
    this.langData = this.mainService.getLanguageSet();
    this.data = this.langData.data;
    // 抓預設語系顯示
    this.dfLang = this.mainService.getNowLanguage();
    this.nowLang = this.dfLang.lang;
  }

  /**
   * 變換語系
   * @param item 
   */
  onChangeLanguage(item) {
    let nowSet = this.mainService.changeLanguage(item);
    if (nowSet.need_change)
    {
      this.nowLang = nowSet.lang;
    }
  }
  
}
