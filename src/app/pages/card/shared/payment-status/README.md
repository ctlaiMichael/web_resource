# 主要區塊說明
## 功能: 信用卡服務
(pages folder):`card`

### 功能說明
* 信卡繳費狀況顯示

### 登入權限
`須登入`

---

## 帶入參數Input值
須符合以下格式

object = {
    prevPay: '',  已繳總金額
    curBal: '',  本期應繳總額
    minPay: '',  最低應繳總額
    dueDate: ''  繳款截止日
};

---
## HTML
<div class="info_tag tag_outline flex_row">{{ paidStr | translate }}</div>

### 規則說明
   1.已繳
   已繳總金額 == 本期應繳總額
   prevPay == curBal

   2.溢繳
   已繳總金額 > 本期應繳總額
   prevPay > curBal

   3.繳部分:
   本期應繳總額 > 已繳總金額 >= 最低應繳總額
   curBal > prevPay >= minPay

   4.未繳足: 
   最低應繳總額 > 已繳總金額，且 當日 <= 繳款截止日
   minPay > prevPay && today <= dueDate

   5.逾期
   最低應繳總額 > 已繳總金額，且 當日 > 繳款截止日
   minPay > prevPay && today > dueDate

   6.未繳
   已繳總金額=0，且 當日 <= 繳款截止日
   prevPay == 0 && today <= dueDate


