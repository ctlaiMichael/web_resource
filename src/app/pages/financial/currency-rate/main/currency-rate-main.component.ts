/**
 * 台幣利率
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrencyRateService } from '@pages/financial/shared/service/currency.service';
import { MenuPopupService } from '@template/list/menu-popup/menu-popup.service';
import { FormateService } from '@template/formate/formate.service';
import { Logger } from '@systems/system/logger/logger.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';

@Component({
    selector: 'app-currency-rate-main',
    templateUrl: './currency-rate-main.component.html',
    styleUrls: [],
    providers: [CurrencyRateService]
})

export class CurrencyRateMainComponent implements OnInit {

    @Input() inputData: any;
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();

    dataTime: any; // 資料時間
    private accTypeList: any; // 帳戶類型list
    accTypeData = []; // 帳戶類型data
    haveData = true;
    private dfAccType = '0'; // 預設帳戶類型
    private selectAccType = ''; // 已選帳戶類型
    nowBookMark = 'common-amount'; // 現在分頁
    haveBookMark = false; // 是否為有頁籤版型
    errorMsg = '';

    // 當前選擇物件
    chooseAccTypeObj = {
        id: '',
        name: '',
        data: []
    };

    // 頁籤data
    bookmarkData = [
        {
            id: 'common-amount',
            name: 'FINANCIAL.COMMON_AMOUNT',
            sort: 1
        },
        {
            id: 'large-amount',
            name: 'FINANCIAL.LARGE_AMOUNT',
            sort: 2
        }
    ];

    constructor(
        private mainService: CurrencyRateService,
        private _menuPop: MenuPopupService,
        private _formateService: FormateService,
        private navgator: NavgatorService,
        private headerCtrl: HeaderCtrlService,
        private _logger: Logger
    ) { }

    ngOnInit() {
        if (!!this.inputData && this.inputData != 'undefined') {
            if (!!this.inputData.backPage && this.inputData.backPage == 'compositToTime') {
                this.headerCtrl.setOption({
                    leftBtnIcon: 'back',
                    rightBtnIcon: '',
                    title: 'FUNC.RATES.NTD_INTEREST_RATES'
                }); // 變更Header按鈕樣式
    
                this.headerCtrl.setLeftBtnClick(() => {
                    this.onLeftBtnClick();
                });
            }
        }

        // 取得台幣利率data
        this.mainService.getData().then(
            (res) => {
                this.haveData = true;
                this.dataTime = res.dataTime;
                this.accTypeList = res.list;
                this.accTypeData = res.accTypeData;
                if (typeof this.accTypeList[this.dfAccType] != 'undefined') {
                    this.onAccTypeChange(this.accTypeList[this.dfAccType]);
                }
                else {
                    this.chooseAccTypeObj = {
                        id: '',
                        name: '',
                        data: []
                    };
                }
            },
            (errObj) => {
                this.haveData = false;
                this.errorMsg = errObj.content;
                // Error
            }
        );
    }

    /**
     * 返回編輯頁
     */
    onLeftBtnClick() {
        let output = {
            page: 'currencyRate'
        };
        this.backPageEmit.emit(output);
    }

    /**
     * 打開帳戶類型選單popup
     */
    popOpen() {
        this._menuPop.show({
            // title: '',
            menu: this.accTypeData,
            select: this.selectAccType
        }).then(
            (AccTypeItem) => {
                this.onAccTypeChange(AccTypeItem);
            },
            () => {
                // 使用者取消

            }
        );
    }

    /**
     * Popup帳戶類型選擇完
     * @param item 
     */
    onAccTypeChange(item) {
        this.nowBookMark = 'common-amount'; // 頁籤切換回一般
        this.selectAccType = item.id;
        this.chooseAccTypeObj = {
            id: item.id,
            name: item.name,
            data: item.data
        };

        // 判斷是否為有頁籤版型
        if (item.data.length > 1) {
            let checkSubData = this._formateService.checkField(item.data[0], 'subData');
            if (checkSubData) {
                this.haveBookMark = true;
            } else {
                this.haveBookMark = false;
            }
        }

    }

    /**
     * 頁籤選擇完返回事件
     */
    onBookMarkBack(e) {
        this.nowBookMark = e.data.id;
    }

}
