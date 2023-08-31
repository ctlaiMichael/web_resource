/**
 * 走勢圖
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormateModule } from '@template/formate/formate.module';
import { ChartLineComponent } from './chart-line.component';
import { ChartLineService } from './chart-line.service';
// == 其他template清單 == //
const TemplateList = [
    ChartLineComponent
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
        ChartLineService
    ]
})
export class ChartLineComponentModule { }
