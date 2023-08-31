/**
 * Demo-選單
 */
import { Component, OnInit } from '@angular/core';
import { AlertService } from '@template/msg/alert/alert.service';
import { AutoLogoutService } from '@template/msg/auto-logout/auto-logout.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { DatepickerPopService } from '@template/list/datepicker-pop/datepicker-pop.service';
import { InfomationService } from '@template/msg/infomation/infomation.service';
import { MenuPopupService } from '@template/list/menu-popup/menu-popup.service';
import { NotePopupService } from '@template/msg/note-popup/note-popup.service';
import { DateSelectService } from '@template/list/date-select-popup/date-select.service';

@Component({
    selector: 'app-demo-menu',
    templateUrl: './demo-menu.component.html',
    styleUrls: [],
    providers: []
})
export class DemoMenuComponent implements OnInit {

  notePopupOption = {};
  dateSelectOption = {};
  inp_data = '2020/05/07';
  minDate = '2020/05/01'; // 最小日期
  maxDate = '2020/05/31'; // 最大日期

  constructor(
    private alert: AlertService,
    private autoLogoutTimeBomb: AutoLogoutService,
    private confirm: ConfirmService,
    private datepicker: DatepickerPopService,
    private infomationService: InfomationService,
    private _menuPopup: MenuPopupService,
    private noteService: NotePopupService,
    private dateSelect: DateSelectService
  ) { }

  ngOnInit() {
    this.notePopupOption = {
      title: 'POPUP.NOTE.TITLE',
      content: 'POPUP.NOTE.CONTENT',
    };

    this.dateSelectOption = {
      // title: "",
      dateType: "2",
      dateArrr: [10, 20, 30]
    };

    let datepicker_data = {
      date: this.inp_data,
      min: this.minDate,
      max: this.maxDate
    };

    let information_data = {
      title: "POPUP.INFORMATION.TITLE",
      content: "POPUP.NOTE.CONTENT",
      btnTitle: "BTN.CHECK",
      doubleButton: false,
      btnCancleTitle: "BTN.CANCEL"
    };

    let menu_data = [
      {
        id: "alert",
        name: "alert功能",
        qrcode: ""
      },
      {
        id: "auto-logout",
        name: "auto-logout功能",
        qrcode: ""
      },
      {
        id: "confirm",
        name: "confirm功能",
        qrcode: ""
      },
      {
        id: "date-select-popup",
        name: "date-select-popup功能",
        qrcode: ""
      },
      {
        id: "datepicker-pop",
        name: "datepicker-pop功能",
        qrcode: ""
      },
      {
        id: "information",
        name: "information功能",
        qrcode: ""
      }
    ];

    // this._menuPopup.show({
    //   title: '請選擇欲測試項目'
    //   , menu: menu_data
    // }).then(
    //   (item) => {
    //     let test_case = (!!item['id']) ? item['id'] : '';
    //     switch (test_case) {
    //       case 'alert':
    //         this.alert.show('POPUP.NOTE.CONTENT');
    //         break;
    //       case 'auto-logout':
    //         this.autoLogoutTimeBomb.show(60);
    //         break;
    //       case 'confirm':
    //         this.confirm.show('POPUP.NOTE.CONTENT', {
    //           title: 'POPUP.CONFIRM.TITLE',
    //           btnYesTitle: 'POPUP.CONFIRM.OK_BTN',
    //           btnNoTitle: 'POPUP.CONFIRM.CANCEL_BTN'
    //         });
    //         break;
    //       case 'date-select-popup':
    //         this.dateSelect.show(this.dateSelectOption);
    //         break;
    //       case 'datepicker-pop':
    //         this.datepicker.show(datepicker_data);
    //         break;
    //       case 'information':
    //         this.infomationService.show(information_data);
    //         break;
    //       default:
    //         break;
    //     }
    //   },
    //   () => {

    //   }
    // );

  }
}
