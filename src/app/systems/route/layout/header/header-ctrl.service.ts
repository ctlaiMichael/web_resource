import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Logger } from '@systems/system/logger/logger.service';
import { PersonalInfo } from './personal-info';
import { HeaderOptions } from './header-options';
import { LocalStorageService } from '@lib/storage/local-storage.service';
// import { MENU_SETTING } from '@conf/menu/main-menu';
import { ObjectUtil } from '@util/formate/modify/object-util';

@Injectable({
    providedIn: 'root'
})
export class HeaderCtrlService {

    // -- data -- //
    changeLeftBtnClick: Subject<any> = new Subject<any>();
    changeRightBtnClick: Subject<any> = new Subject<any>();
    changeOption: Subject<any> = new Subject<any>();
    updateOptionSubject: Subject<any> = new Subject<any>();
    // -- event -- //
    onLeftEventClickSubject: Subject<any> = new Subject<any>(); // 左側事件點擊控制
    onRightEventClickSubject: Subject<any> = new Subject<any>(); // 右側事件點擊控制

    constructor(
        private localStorage: LocalStorageService,
        private _logger: Logger
    ) {
    }

    // --------------------------------------------------------------------------------------------
    //                                       __          __   
    // ___________     ____   ____     _____/  |________|  |  
    // \____ \__  \   / ___\_/ __ \  _/ ___\   __\_  __ \  |  
    // |  |_> > __ \_/ /_/  >  ___/  \  \___|  |  |  | \/  |__
    // |   __(____  /\___  / \___  >  \___  >__|  |__|  |____/
    // |__|       \//_____/      \/       \/                     PART_BOX: pate ctrl 頁面控制
    // --------------------------------------------------------------------------------------------

    /**
     * 點選左側選單
     */
    onLeftClickEvent(e: any) {
        this.onLeftEventClickSubject.next(e);
    }

    /**
     * 點選右側選單
     */
    onRightClickEvent(e: any) {
        this.onRightEventClickSubject.next(e);
    }


    // --------------------------------------------------------------------------------------------
    //     _____                 ______               _   
    //     / ____|               |  ____|             | |  
    //    | (___   __ ___   _____| |____   _____ _ __ | |_ 
    //     \___ \ / _` \ \ / / _ \  __\ \ / / _ \ '_ \| __|
    //     ____) | (_| |\ V /  __/ |___\ V /  __/ | | | |_ 
    //    |_____/ \__,_| \_/ \___|______\_/ \___|_| |_|\__  PART_BOX: save event 儲存資料
    // --------------------------------------------------------------------------------------------

    /**
     * 設定Header樣式
     * @param style 樣式名稱 normal/login
     */
    setHeaderStyle(style: string) {
        // this._logger.step('HeaderCtrl', 'set header setHeaderStyle');
        const option = new HeaderOptions();
        option.style = style;
        this.setOption(option);
    }

    /**
     * 設定Header選項
     * @param option Header設定
     * @param isCreate false:使用當前頁面header樣式更新/true:使用預設header樣式更新
     */
    setOption(option, isCreate?: boolean) {
        if (isCreate) {
            this.changeOption.next(option);
        } else {
            this.updateOptionSubject.next(option);
        }
    }


    /**
     * 設定左邊按鈕
     * @param clickLeft 對應Function
     */
    setLeftBtnClick(clickLeft: any) {
        this.changeLeftBtnClick.next(clickLeft);
    }

    /**
     * 設定右邊按鈕
     * @param clickRight 對應Function
     */
    setRightBtnClick(clickRight: any) {
        this.changeRightBtnClick.next(clickRight);
    }



}
