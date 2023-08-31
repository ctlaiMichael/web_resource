/**
 * 線上客服
 */
import { Component, OnInit } from '@angular/core';
import { NavgatorService } from '@systems/route/navgator/navgator.service';

@Component({
  selector: 'app-FundRiskWarning',
  templateUrl: './fundRiskWarning.component.html',
  styleUrls: []
})

export class FundRiskWarning implements OnInit {

  constructor(
    private navgator: NavgatorService
  ) { }

  ngOnInit() {

  }

  click1(){
    this.navgator.push("fundclear");
  }
  click2(){
    this.navgator.push("newmops");
  }

}
