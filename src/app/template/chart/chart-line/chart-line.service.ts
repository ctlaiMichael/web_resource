/**
 * 
 * 走勢圖
 *
 */
import { Injectable } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';

@Injectable()

export class ChartLineService {

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
    ) {
    }

    doFormateData(setData) {
        this._logger.log("into doFormateDate, setData:", setData);
        let output = {
            dateData: [], // 買賣日期資料
            buyData: [], // 買匯資料
            sellData: [] // 賣匯資料
        }
        setData.forEach(item => {
            if (item.hasOwnProperty('rateDate')) {
                // 日期formate處理
                let formateDate = this.dateFormate(item['rateDate']);
                output.dateData.push(formateDate);
            }
            if (item.hasOwnProperty('buyRate')) {
                output.buyData.push(item['buyRate']);
            }
            if (item.hasOwnProperty('sellRate')) {
                output.sellData.push(item['sellRate']);
            }
        });
        return output;
    }

    /**
     * 
     * @param setData : yyyy-MM-dd or yyyyMMdd
     *
     */
    dateFormate(setData) {
        let formateData = ''; // output
        let toYear = (new Date().getFullYear()).toString(); // 算今年
        let temp = ''; // 統一格式為無'-'分割, EX: 20200102
        // 若中台有回傳格式有'-'
        if (setData.indexOf('-')) {
            let splitData = setData.split('-');
            splitData.forEach(item => {
                temp += item;
            });
        } else {
            temp = setData;
        }
        // 若等於今年,且是1月1日,顯示yyyy-MM-dd, 若不是顯示MM-dd
        if (temp.substring(0, 4) == toYear && temp.substr(-4) == '0101') {
            formateData = this._formateService.transDate(setData, 'yyyy-MM-dd');;
        } else {
            formateData = this._formateService.transDate(setData, 'MM-dd');
        }
        return formateData;
    }

}
