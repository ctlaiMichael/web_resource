/**
 * 使用者導覽頁
 */
import { Component, OnInit } from '@angular/core';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { LocalStorageService } from '@lib/storage/local-storage.service';
// import { UiContentService } from '@core/layout/ui-content/ui-content.service';

@Component({
    selector: 'app-guide-page',
    templateUrl: './guide-page.component.html',
    styleUrls: []
})
export class GuidePageComponent implements OnInit {

    constructor(

    ) { }

    ngOnInit() {

    }

}
