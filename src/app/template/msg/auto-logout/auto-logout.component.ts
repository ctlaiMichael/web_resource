import { Component, OnInit } from '@angular/core';
import { Timer } from '@lib/timer/timer.class';

@Component({
  selector: 'app-auto-logout',
  templateUrl: './auto-logout.component.html',
  styleUrls: []
})
export class AutoLogoutComponent implements OnInit {
  promise: Promise<any>;
  timeBomb: Timer;
  deadline: number;
  remainingTime: number;
  param: any;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.yes = () => {
        // 繼續使用
        this.timeBomb.stop();
        resolve();
      };

      this.no = (type) => {
        // 登出
        this.timeBomb.stop();
        reject(type);
      };
    });
  }

  ngOnInit() {
  }

  yes() { }
  no(type) { }

  start() {
    this.remainingTime = this.deadline;
    this.param = {
      second: this.remainingTime.toString()
    };
    const self = this;
    this.timeBomb = new Timer(this.deadline, () => {
      self.no('auto');
    }, (idle) => {
      self.timeInterval(idle);
    });
  }

  timeInterval(idle: number) {
    this.remainingTime = this.deadline - idle;
    this.param = {
      second: this.remainingTime.toString()
    };
  }
}
