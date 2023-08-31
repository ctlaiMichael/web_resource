/**
 * 下一營業日
 * 傳進營業日回傳營業日+1
 * 遇到星期日則跳過
 */

import { Injectable } from '@angular/core';
import { logger } from '@util/log-util';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertService } from '@template/msg/alert/alert.service';
import { Subject } from 'rxjs';
import { CommonUtil } from '@util/common-util';

@Injectable()
export class DateService {


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  getNextBussDay(bussinessDay){
 
    let timestamp = new Date(bussinessDay).getTime();
    timestamp=timestamp+86400000;
    let nextDay=new Date(timestamp);
    let weekdate=nextDay.getDay();
    if(weekdate==0){  //如果為禮拜日則再加1日
      let timestamp2=timestamp+86400000;
      nextDay=new Date(timestamp2);
    } else if(weekdate==6) {
      let timestamp2=timestamp+172800000;
      nextDay=new Date(timestamp2);
    }
    let Year = nextDay.getFullYear();
    let Month = nextDay.getMonth() + 1;  
    let Day = nextDay.getDate(); 
    
    let Time = Year + '-' + (Month < 10 ? '0' + Month : Month) + '-' + (Day < 10 ? '0' + Day : Day);
    logger.debug('nextDaynextDay',Time);

    return Time;
  }

  getBusinessDay(bussinessDay) {
    let today = new Date(bussinessDay);
    let timestamp = new Date(bussinessDay).getTime();
    let nextDay = today;
    let weekdate = today.getDay();
    if (weekdate == 0) {  // 如果為禮拜日則再加1日
      let timestamp2 = timestamp + 86400000;
      nextDay = new Date(timestamp2);
    } else if ( weekdate == 6 ) {
      let timestamp2 = timestamp + 172800000;
      nextDay = new Date(timestamp2);
    }
    let Year = nextDay.getFullYear();
    let Month = nextDay.getMonth() + 1;
    let Day = nextDay.getDate();
    let Time = Year + '-' + (Month < 10 ? '0' + Month : Month) + '-' + (Day < 10 ? '0' + Day : Day);
    logger.debug('nextDaynextDay', Time);

    return Time;
  }
  

}
