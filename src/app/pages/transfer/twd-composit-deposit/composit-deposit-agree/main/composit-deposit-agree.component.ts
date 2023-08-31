/**
 * 綜存開戶約定
 */
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { CompositDepositAgreeService } from '@pages/transfer/shared/composit-deposit-agree.service';
import { FormateService } from '@template/formate/formate.service';
import { AlertService } from '@template/msg/alert/alert.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { CompositDepositAgreeContentService } from '@pages/transfer/shared/composit-deposit-agree-content.service';

@Component({
  selector: 'app-composit-deposit-agree',
  templateUrl: './composit-deposit-agree.component.html',
  styleUrls: []
})

export class CompositDepositAgreeComponent implements OnInit {

    @Input() setData: any;
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();

    nowPage = 'check';
    nowStep = 'check'; // 當前步驟

    // 步驟列data
    stepMenuData = [
        {
            id: 'edit',
            name: 'STEP_BAR.COMMON.EDIT' // 輸入資料頁
        },
        {
            id: 'check',
            name: 'STEP_BAR.DEVICE_BIND.STEP1', // 確認資料頁
        },
        {
            id: 'result',
            name: 'STEP_BAR.COMMON.RESULT', // 結果頁
            // 執行此步驟時是否隱藏步驟列
            hidden: true
        }
    ];

    infoData: any = {};

    // 錯誤處理相關
    errorMsg = ''; // 顯示白箱(錯誤訊息)

    errorboxFlag = false; // 控制白箱
    contentData: any;
    statusObj = {}; // 結果頁顯示結過狀態
    resStatus = false; // 判斷結果文字是否打開
    
    tick = "0"; // 打勾用
    
    constructor(
        private alert: AlertService,
        private compositDepositService: CompositDepositAgreeService,
        private compositdepositagreecontentservice: CompositDepositAgreeContentService,
        private _formateServcie: FormateService,
        private _logger: Logger,
        private  navgator: NavgatorService,
        private _headerCtrl: HeaderCtrlService,
        private confirm: ConfirmService
    ) { }

    ngOnInit() {
        // 變更Header左側按鈕功能
        this._headerCtrl.setLeftBtnClick(() => {
            this.onBackPageEvent();
        });
        this._initEvent();
    }

    private _initEvent() {
        this.compositDepositService.removeAllCache();

        // 取得條款內容
        this.compositDepositService.getListData({}, {}).then(
            (result) => {
                this.infoData = result.infoData;
                this.contentData = this._formateServcie.checkField(this.infoData, 'agreeTerms');
                if (!this.contentData) {
                    this.nowPage = 'empty';
                }
            },
            (errorObj) => {
                this.nowPage = 'empty';
                this.errorMsg = errorObj.content;
            }
        );
    }

    // 打勾值轉換
    clickchang() {
        if (this.tick === '0') {
            this.tick = '1';
        } else {
            this.tick = '0';
        }
    }

    // * [確認]按鈕點擊事件
    onCommit() {
        if (this.tick === "0") {
            this.alert.show("SETTING.FAST_SETTING.AGREE_CHECK", {});
        } else {
            let reqData = {
                acno: this.setData.acno,
                choiseType: 'N'
            };
            this.compositdepositagreecontentservice.getListData(reqData).then(
                (result) => {
                    this.infoData = result.infoData;
                    this.statusObj = result.statusObj;
                    this.resStatus = result.status;
                    return Promise.resolve();
                },
                (errorObj) => {
                    this.resStatus = false;
                    this.statusObj = errorObj;
                    return Promise.resolve();
                }
            ).then(
                () => {
                    this.nowPage = 'result';
                    this._headerCtrl.setOption({ leftBtnIcon: '', rightBtnIcon: 'finish' }); // 變更Header按鈕樣式
                    this._headerCtrl.setRightBtnClick(() => {
                        this.navgator.editBack();
                    });
                }
            );

        }
    }

    /**
     * [取消]按鈕點擊事件
     */
    onCancelBtnClick() {
        this.confirm.cancelEdit({type: 'edit'}).then(
            (res) => {
                this.navgator.editBack();
            },
            (errObj) => {

            }
        );
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    /**
     * 返回快速交易設定頁面
     */
    private onBackPageEvent() {
        let output = {
            'page': "openAccount",
        };
        this.backPageEmit.emit(output);
    }

}
