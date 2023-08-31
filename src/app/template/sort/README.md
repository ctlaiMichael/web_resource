# Template說明: 排序樣式
## 目的
改變排序樣式

文件：
功能開發元件使用說明\頁面控制相關\sourt-排序控制


## 層級



## 基本module引用
  import { SortModule } from '@shared/template/sort/sort.module';
    
  @NgModule({
      imports: [
          SortModule
      ]
  })...

## component
`N/A`

## html
    <button class="btn_transparent_icon btn_turn" (click)="onSort()" sortBtn [sort]="sort"></button>
