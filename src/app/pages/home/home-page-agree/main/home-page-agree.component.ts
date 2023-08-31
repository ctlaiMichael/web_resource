/**
 * 綜存開戶約定
 */
import { Component, OnInit, ViewChild, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { FormateService } from '@template/formate/formate.service';
import { AlertService } from '@template/msg/alert/alert.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { LocalStorageService } from '@lib/storage/local-storage.service';
import { LOCAL_STORAGE_NAME_LIST } from '@conf/security/storage-name';
@Component({
    selector: 'app-home-page-agree',
    templateUrl: './home-page-agree.component.html',
    styleUrls: []
})

export class HomePageAgreeComponent implements OnInit {
    // request
    reqData = {
        id: '',
        show: 'resultBox', // 顯示查詢結果, 'resultBox':成功, 'customBox':自訂清單, 'errorBox':錯誤畫面(白箱)
    };

    infoData: any = {};
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();



    // @ViewChild('pageBox', { read: ViewContainerRef }) pageBox: ViewContainerRef; // 動態生成(自訂)
    private nowAppendBox: any;
    // 錯誤處理相關
    errorMsg = ''; // 顯示白箱(錯誤訊息)
    // defaultAcct = ''; // 取得預設帳號(不一定有)
    // hasInit = false; //是否初始化
    gonextpage = true; // 控制頁面顯示
    errorboxFlag = false; // 控制白箱
    info: any;
    contentData: any;
    statusObj = {}; // 結果頁顯示結過狀態
    resStatus = false; // 判斷結果文字是否打開
    // 打勾用
    tick = "0";


    constructor(
        private alert: AlertService,
        private _formateServcie: FormateService,
        private _logger: Logger,
        private navgator: NavgatorService,
        private _confirm: ConfirmService,
        private headerCtrl: HeaderCtrlService,
        private localstorage: LocalStorageService
    ) { }

    ngOnInit() {
        this.headerCtrl.setOption({ leftBtnIcon: '' }); // 變更Header按鈕樣式
    }



    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------
    /**
     * [取消]按鈕點擊事件
     */
    onCancelBtnClick() {
        this.alert.show("必須同意本條款方可使用APP");
    }

    click1() {
        this.navgator.push("fristagree");
    }


    // * [確認]按鈕點擊事件
    onCommit() {
        this.localstorage.setObj(LOCAL_STORAGE_NAME_LIST.FIRSTAGREE, "Y");
        this.navgator.push("home");
    }

}
