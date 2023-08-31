# Template說明: 列表展開
## 目的
點擊展開效果

文件：
功能開發元件使用說明\頁面控制相關\expand-展開收合操作


## 層級



## 基本module引用
  import { ExpandListModule } from '@shared/template/expand/expand-list.module';
    
  @NgModule({
      imports: [
          ExpandListModule
      ]
  })...

## component
`N/A`

## html

    <!-- Line START -->
    <div class="table_group">
        <div class="table_list_set">
            <div class="table_list_set_wrap sub_open flex_row" expandList>
                <div class="table_list_set_ul">
                    <div class="flex_row table_list_set_li table_list_4set_li">
                        <p class="txt_bold">USD</p>
                        <p>9,999,999,999,999.00</p>
                    </div>
                    <div class="flex_row table_list_set_li table_list_4set_li">
                        <p>2020-03-04</p>
                        <p>ASSHIR90111111</p>
                    </div>
                </div>
                <div class="list_icon"></div>
            </div>
            <!-- 細項 -->
            <div class="list_data_inner sub_open_info_frame">
                <div class="flex_row list_data_inner_li">
                    <p>通知日(西元)</p>
                    <p>2020-02-30</p>
                </div>
                <div class="flex_row list_data_inner_li">
                    <p>匯款銀行</p>
                    <p>元大台中</p>
                </div>
                <div class="flex_row list_data_inner_li">
                    <p>國外匯款編號</p>
                    <p>OR123456789</p>
                </div>
                <div class="flex_row list_data_inner_li">
                    <p>附言</p>
                    <p>- -</p>
                </div>
            </div>
        </div>
    </div>
    <!-- Line End -->

