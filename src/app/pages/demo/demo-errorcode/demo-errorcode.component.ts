/**
 * 登入後首頁
 */
import { Component, OnInit } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { AuthService } from '@systems/system/auth/auth.service';
import { ERROR_CODE_LIST } from '@conf/error/error_code';
import { FormateService } from '@template/formate/formate.service';

@Component({
  selector: 'app-demo-errorcode',
  templateUrl: './demo-errorcode.component.html',
  styleUrls: []
})

export class DemoErrorCodeComponent implements OnInit {
  private errorCodeList = ERROR_CODE_LIST;
  mainData = [];
  private showGroup: Array<any> = [];
  private errorList = {
    '00': {
      '0000': '系統共用',
      '0001': '通訊API相關',
      '0002': '通訊相關',
      '0003': '載入相關',
      '0004': '載入相關-Mscale'
    },
    '02': '一般登入',
    '03': '快速設定',
    '04': '訊息服務',
    '05': '帳戶資產查詢',
    '06': '國外匯入匯款',
    '07': '定期存款',
    '08': '貸款服務',
    '09': '轉帳交易',
    '10': '利匯率(金融資訊)',
    '11': '投資理財服務',
    '12': '信用卡',
    '13': '服務據點',
    '14': '線上客服',
    '15': '線上開戶服務',
    '16': '系統公告',
    '17': '相關連結',
    '18': '設定',
    '19': '戰情室分析(統計分析)',
    '20': '台灣Pay ',
    '21': 'PukiiBank 圈存功能',
    '22': '優惠商品服務',
    '23': '行動框架'
  };

  constructor(
    private _logger: Logger,
    private _formateService: FormateService
  ) { }

  ngOnInit() {
    let tmp_index: any;
    this.showGroup = [];
    for (tmp_index in this.errorCodeList) {
      if (!this.errorCodeList[tmp_index]) {
        continue;
      }
      let tmp_data: any = {...{}, ...this.errorCodeList[tmp_index]};
      tmp_data['id'] = tmp_index;


      let app_error_code = tmp_data.app_error_code;
      let group_id = app_error_code.substr(0, 2);
      let subgroup_id = app_error_code.substr(0, 4);
      let item_code = app_error_code.substr(-3);
      tmp_data.group_name = '';
      tmp_data.group_id = group_id;
      if (this.showGroup.indexOf(group_id) < 0 && !!this.errorList[group_id]) {
        // 沒設定
        if (group_id != '00') {
          tmp_data.group_name = this._formateService.checkField(this.errorList, group_id);
        }
        this.showGroup.push(group_id);
      }
      if (group_id == '00' && this.showGroup.indexOf(subgroup_id) < 0 && !!this.errorList[group_id][subgroup_id]) {
        tmp_data.group_name = this.errorList[group_id][subgroup_id];
        tmp_data.group_id = subgroup_id;
        this.showGroup.push(subgroup_id);
      }
      this.mainData.push(tmp_data);

    }
  }



}
