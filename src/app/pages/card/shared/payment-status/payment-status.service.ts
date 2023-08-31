/**
 * 繳費狀況資訊(EX: 已繳)
 * 
 * 
 */
import { Injectable, Output } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';

@Injectable()

export class PaymentStatusService {

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private handleError: HandleErrorService
    ) {
    }

    /**
     * 處理狀態顯示文字
     */
    formateStatusShow(setData) {
        this._logger.log("into formateStatusShow");
        let output: any = {
            status: false,
            msg: '',
            data: setData,
            error: {
                title: 'ERROR.TITLE',
                content: 'ERROR.EMPTY'
            },
            show: '' // A: 已繳, B: 溢繳, C: 繳部分, D: 未繳足, E: 逾期, F: 未繳
        };
        let today = new Date().toLocaleDateString();
        let todayMin = new Date(today).getTime();
        this._logger.log("into formateStatusShow, todayMin:", todayMin);
        this._logger.log("into formateStatusShow, setData:", setData);
        // this._logger.log("into formateStatusShow, setData.dueDate:", setData.dueDate);
        // this._logger.log("into formateStatusShow, setData.prevPay:", setData.prevPay);
        // this._logger.log("into formateStatusShow, setData.curBal:", setData.curBal);
        // this._logger.log("into formateStatusShow, setData.minPay:", setData.minPay);
        // ----- 測完開啟 -----
        let dueDate = this._formateService.checkField(setData, 'dueDate'); // => setData['dueDate']
        // tslint:disable-next-line:radix
        let prevPay = parseInt(this._formateService.checkField(setData, 'prevPay')); // => setData['prevPay']
        // tslint:disable-next-line:radix
        let curBal = parseInt(this._formateService.checkField(setData, 'curBal')); // => setData['curBal']
        // tslint:disable-next-line:radix
        let minPay = parseInt(this._formateService.checkField(setData, 'minPay')); // => setData['minPay']
        if (!dueDate && !prevPay && !curBal) {
            // error
            output.status = false;
            output.error = this.handleError.getErrorObj({}, 'CARDS_PAYMENT_SETDATA_ERROR');
            return output;
        }
        let formateDate = '';
        // let dateSame = false; // 判斷日期是否一樣, true同一天, 因為同一天用毫秒數判斷會有問題
        // 若傳入之日期有 '-'格式做formate, 2020-07-20 or 2020-0720
        dueDate = dueDate.replace(/[\/|\-]/g, '');
        let dueDateObj = this._formateService.transDate(dueDate, 'object');
        // this._logger.error('dueDate', dueDateObj);
        if (!dueDateObj || !dueDateObj.date) {
            // dueDate資料錯誤
            output.status = false;
            output.error = this.handleError.getErrorObj({}, 'CARDS_PAYMENT_DUEDATE_ERROR');
            return output;
        }
        let year = dueDateObj.data.year;
        let month = dueDateObj.data.month;
        let date = dueDateObj.data.month;
        formateDate = year + '/' + month + '/' + date;

        // let date = len.substring(6, 8);
        // let toDate = today.getDate().toString();
        // // dateSame: 為了判斷同一日， 同一日用毫秒數判斷會錯，因此此變數為true也視為同一天
        // if (date == toDate) {
        //     this._logger.log("len date same");
        //     dateSame = true;
        // }
        let dueDateMin = dueDateObj.timestamp;
        this._logger.log("dueDateMin:", dueDateMin);
        // ----- 測式 -----
        // 已繳
        if (prevPay == curBal) {
            this._logger.log("A");
            output.show = 'A';
            // 溢繳
        } else if (prevPay > curBal) {
            this._logger.log("B");
            output.show = 'B';
            // 繳部分
        } else if (curBal > prevPay && prevPay >= minPay) {
            this._logger.log("C");
            output.show = 'C';
            // 未繳足
        } else if (minPay > prevPay && setData['prevPay'] != '0' && setData['prevPay'] != ''
            && todayMin <= dueDateMin) {
            this._logger.log("D");
            output.show = 'D';
            // 逾期
        } else if (minPay > prevPay && todayMin > dueDateMin) {
            this._logger.log("E");
            output.show = 'E';
            // 未繳
        } else if ((setData['prevPay'] == '0' || setData['prevPay'] == '') &&
            todayMin <= dueDateMin) {
            this._logger.log("F");
            output.show = 'F';
        }
        output.status = true;
        output.msg = 'success';
        this._logger.log("output:", output);
        return output;
    }


}
