/**
 * 走勢圖
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormateModule } from '@template/formate/formate.module';
import { ChartDoughnutComponent } from './chart-doughnut.component';
import { ChartDoughnutService } from './chart-doughnut.service';

// == 其他template清單 == //
const TemplateList = [
    ChartDoughnutComponent
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        FormateModule
    ],
    exports: [
        ...TemplateList
    ],
    declarations: [
        ...TemplateList
    ],
    providers: [
        ChartDoughnutService
    ]
})
export class ChartDoughnutComponentModule { }
