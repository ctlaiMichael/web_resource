# Template說明: 列表顯示年月(跑迴圈顯示過不會在顯示)
## 目的


## 層級

## component
`N/A`

## html

    <!-- Line START -->
    <div class="info_group info_date">
        {{ formateDate }}
    </div>
    <!-- Line End -->

    *service需有暫存機制,及清除機制:

     1.存年月,判斷該年分是否出現過(有此筆資料) 
     hasYearList = []; 

     2.重製列表顯示年月標題資料
    resetHasYearList() {
        this.hasYearList = [];
    }


