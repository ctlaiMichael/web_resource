# API 說明:
## API編號
SPEC05010101--帳戶總覽

## 回傳錯誤說明
### resFlag != 0
#### 情境: 所有資產回傳都為異常
##### 說明:
* 台幣
* 外幣
* 基金
* 黃金
* 信卡
* 貸款

##### Sample:

    {
        'apiId': 'SPEC05010101',
        'token': {
            'requestId': '',
            'responseTime': '2020-06-20 18:18:31',
            'lang': 'zh_TW'
        },
        'resFlag': '1',
        'resMessage': {
            'errorCode': 'ERRAAAAAAA',
            'errorMsg': '目前資料結算處理中，暫不提供查詢功能'
        }
    }

### 無資產使用者
#### 情境: 所有資產回傳都為空
##### 說明:
資產都有成功取得，但就是沒資料

##### Sample:

    {
        'apiId': 'SPEC05010101',
        'token': {
            'requestId': '',
            'responseTime': '2020-06-20 18:18:31',
            'lang': 'zh_TW'
        },
        "resFlag": "0",
        "resMessage": {
            "errorCode": "",
            "errorMsg": "查無資料"
        },
        "resContent": {
            "positive": "0", // 正資產加總
            "negative": "0", // 負資產加總
            // 台幣帳戶
            "partTwd": {
                "errorMsg": "",
                "totalBalance": "0"
            },
            // 外幣帳戶
            "partForeign": {
                "errorMsg": "",
                "totalBalance": "0"
            },
            // 負資產
            "partNegative": {
                "totalBalance": "0"
            },
            "partInvest": {
                "totalBalance": "0"
            }
        }
    }


### 部分資產取得異常 (part)
#### 情境1: 台幣帳戶 取得失敗
##### 說明:


##### Sample:

    {
        'apiId': 'SPEC05010101',
        'token': {
            'requestId': '',
            'responseTime': '2020-06-20 18:18:31',
            'lang': 'zh_TW'
        },
        "resFlag": "0",
        "resMessage": {
            "errorCode": "",
            "errorMsg": ""
        },
        "resContent": {
            "positive": "2,400,300,500", // 正資產加總
            "negative": "400,300,500", // 負資產加總
            // 台幣帳戶
            "partTwd": {
                "errorMsg": "主機連線逾時",
                "totalBalance": ""
            },
            // 外幣帳戶
            "partForeign": {
                "errorMsg": "",
                "totalBalance": "2,222,666,888,777", // 折台
                "savingsAcctInfoData": {
                    "typeTotalBalance": "",
                    "account": [
                        {
                            "accountId": "02108000007528",
                            "nickName": "測試528",
                            "accType": "108",
                            "type": "活期存款",
                            "currencyCode": "USD",
                            "accountBalance": "62,356",
                            "availableBalance": "62,356"

                        },
                        {
                            "accountId": "02108000311010",
                            "nickName": "測試010",
                            "accType": "108",
                            "type": "活期存款",
                            "currencyCode": "ZAR",
                            "accountBalance": "6,356",
                            "availableBalance": "6,300"
                        },
                        {
                            "accountId": "02108000311010",
                            "nickName": "測試010",
                            "accType": "108",
                            "type": "活期存款",
                            "currencyCode": "USD",
                            "accountBalance": "6,356",
                            "availableBalance": "6,300"
                        },
                        {
                            "accountId": "02203000311010",
                            "nickName": "測試010",
                            "accType": "108",
                            "type": "活期存款",
                            "currencyCode": "JPY",
                            "accountBalance": "6,356",
                            "availableBalance": "6,300"
                        }
                    ]
                },
                // 定期存款
                "timeAcctInfoData": {
                    "typeTotalBalance": "",
                    "account": [
                        {
                            "accountId": "11128000084315",
                            "nickName": "測試315",
                            "currencyCode": "USD",
                            "accType": "128",
                            "type": "定期存款",
                            "balance": "500,000.00",
                            "endDate": "2020-01-01"
                        },
                        {
                            "accountId": "11198000097805",
                            "nickName": "測試805",
                            "currencyCode": "USD",
                            "accType": "198",
                            "type": "綜存定存",
                            "balance": "500,000.00",
                            "endDate": "2020-01-01"
                        },
                        {
                            "accountId": "11128000122977",
                            "nickName": "測試977",
                            "currencyCode": "USD",
                            "accType": "128",
                            "type": "定期存款",
                            "balance": "500,000.00",
                            "endDate": "2020-01-01"
                        },
                        {
                            "accountId": "11128000122977",
                            "nickName": "測試977",
                            "currencyCode": "JPY",
                            "accType": "128",
                            "type": "定期存款",
                            "balance": "500,000.00",
                            "endDate": "2020-01-01"
                        }
                    ]
                },
                // 其他帳號
                "otherAcctInfoData": {
                    "typeTotalBalance": "",
                    "account": [
                        {
                            "nickName": "測試315",
                            "accountId": "11293000084315",
                            "balance": "500,000.00"
                        },
                        {
                            "nickName": "測試805",
                            "accountId": "11293000097805",
                            "balance": "200,000.00"
                        },
                        {
                            "nickName": "測試977",
                            "accountId": "11293000122977",
                            "balance": "30,000.00"
                        }
                    ]
                },
                "currencyList": [
                    {
                        "currencyCode": "USD",
                        "balance": "1,000,000",
                        "balanceTwd":  "30,000,000"
                    }
                    , {
                        "currencyCode": "JPY",
                        "balance": "20,000",
                        "balanceTwd":  "5,000",
                    }
                    , {
                        "currencyCode": "ZAR",
                        "balance": "1,000,000,000",
                        "balanceTwd": "1,000"
                    }
                    , {
                        "currencyCode": "EUR",
                        "balance": "20,000",
                        "balanceTwd":  "80,000"
                    }
                ]

            },
            // 負資產
            "partNegative": {
                "errorMsg": "",
                "totalBalance": "3,222,666,888,777",
                // 貸款
                "loansInfoData": {
                    "errorMsg": "",
                    "typeTotalBalance": "1,000,000,000,000",
                    "account": [
                        {
                            "accountId": "11151000122977",
                            "nickName": "測試977",
                            "currencyCode": "TWD",
                            "accType": "151",
                            "type": "短期放款",
                            "balance": "6,300",
                            "endDate": "2020-01-01"
                        },
                        {
                            "accountId": "11152000122977",
                            "nickName": "測試977",
                            "currencyCode": "TWD",
                            "accType": "152",
                            "type": "中期放款",
                            "balance": "6,300",
                            "endDate": "2020-01-01"
                        }
                    ]

                },
                // 信用卡
                "cardsInfoData": {
                    "errorMsg": "",
                    "typeTotalBalance": "1,000,000,000,000"
                }
            },
            "partInvest": {
                "errorMsg": "",
                "totalBalance": "3,222,666,888,777",
                // 基金/集合
                "fundInfoData": {
                    "errorMsg": "",
                    "typeTotalBalance": "1,000,000,000,000"
                },
                // 黃金
                "goldInfoData": {
                    "errorMsg": "",
                    "typeTotalBalance": "1,000,000,000",
                    "account": [
                        {
                            "accountId": "11151000122977",
                            "nickName": "測試977",
                            "accType": "151",
                            "type": "黃金存摺",
                            "balance": "6,300"
                        }
                    ]
                }
            }
        }
    }


#### 情境2: 外幣帳戶 取得失敗
##### 說明:


##### Sample:


    {
        'apiId': 'SPEC05010101',
        'token': {
            'requestId': '',
            'responseTime': '2020-06-20 18:18:31',
            'lang': 'zh_TW'
        },
        "resFlag": "0",
        "resMessage": {
            "errorCode": "",
            "errorMsg": ""
        },
        "resContent": {
            "positive": "2,400,300,500", // 正資產加總
            "negative": "400,300,500", // 負資產加總
            // 外幣帳戶
            "partForeign": {
                "errorMsg": "主機連線逾時",
                "totalBalance": ""
            },
            ...
        }
    }



#### 情境3: 黃金與基金 取得失敗
##### 說明:
黃金與基金 都取得失敗

##### Sample:


    {
        'apiId': 'SPEC05010101',
        'token': {
            'requestId': '',
            'responseTime': '2020-06-20 18:18:31',
            'lang': 'zh_TW'
        },
        "resFlag": "0",
        "resMessage": {
            "errorCode": "",
            "errorMsg": ""
        },
        "resContent": {
            "positive": "2,400,300,500", // 正資產加總
            "negative": "400,300,500", // 負資產加總
            "partInvest": {
                "errorMsg": "",
                "totalBalance": "",
                // 基金/集合
                "fundInfoData": {
                    "errorMsg": "主機連線逾時",
                    "typeTotalBalance": ""
                },
                // 黃金
                "goldInfoData": {
                    "errorMsg": "主機連線逾時",
                    "typeTotalBalance": ""
                }
            },
            ...
        }
    }



#### 情境4: 黃金 取得失敗
##### 說明:
黃金 取得失敗

##### Sample:


    {
        'apiId': 'SPEC05010101',
        'token': {
            'requestId': '',
            'responseTime': '2020-06-20 18:18:31',
            'lang': 'zh_TW'
        },
        "resFlag": "0",
        "resMessage": {
            "errorCode": "",
            "errorMsg": ""
        },
        "resContent": {
            "positive": "2,400,300,500", // 正資產加總
            "negative": "400,300,500", // 負資產加總
            "partInvest": {
                "errorMsg": "",
                "totalBalance": "400,300,500",
                // 基金/集合
                "fundInfoData": {
                    "errorMsg": "",
                    "typeTotalBalance": "400,300,500"
                },
                // 黃金
                "goldInfoData": {
                    "errorMsg": "主機連線逾時",
                    "typeTotalBalance": ""
                }
            },
            ...
        }
    }

#### 情境5: 基金 取得失敗
##### 說明:
基金 取得失敗

##### Sample:


    {
        'apiId': 'SPEC05010101',
        'token': {
            'requestId': '',
            'responseTime': '2020-06-20 18:18:31',
            'lang': 'zh_TW'
        },
        "resFlag": "0",
        "resMessage": {
            "errorCode": "",
            "errorMsg": ""
        },
        "resContent": {
            "positive": "2,400,300,500", // 正資產加總
            "negative": "400,300,500", // 負資產加總
            "partInvest": {
                "errorMsg": "",
                "totalBalance": "1,000,000,000",
                // 基金/集合
                "fundInfoData": {
                    "errorMsg": "",
                    "typeTotalBalance": "主機連線逾時"
                },
                // 黃金
                "goldInfoData": {
                    "errorMsg": "主機連線逾時",
                    "typeTotalBalance": "1,000,000,000",
                    "account": [
                        {
                            "accountId": "11151000122977",
                            "nickName": "測試977",
                            "accType": "151",
                            "type": "黃金存摺",
                            "balance": "6,300"
                        }
                    ]
                }
            },
            ...
        }
    }

#### 情境6: 貸款與信用卡 取得失敗
##### 說明:
貸款與信用卡 都取得失敗

##### Sample:


    {
        'apiId': 'SPEC05010101',
        'token': {
            'requestId': '',
            'responseTime': '2020-06-20 18:18:31',
            'lang': 'zh_TW'
        },
        "resFlag": "0",
        "resMessage": {
            "errorCode": "",
            "errorMsg": ""
        },
        "resContent": {
            "positive": "2,400,300,500", // 正資產加總
            "negative": "400,300,500", // 負資產加總
            // 負資產
            "partNegative": {
                "errorMsg": "",
                "totalBalance": "",
                // 貸款
                "loansInfoData": {
                    "errorMsg": "主機連線逾時",
                    "typeTotalBalance": ""

                },
                // 信用卡
                "cardsInfoData": {
                    "errorMsg": "主機連線逾時",
                    "typeTotalBalance": ""
                }
            },
            ...
        }
    }



#### 情境7: 貸款 取得失敗
##### 說明:
貸款 取得失敗

##### Sample:



    {
        'apiId': 'SPEC05010101',
        'token': {
            'requestId': '',
            'responseTime': '2020-06-20 18:18:31',
            'lang': 'zh_TW'
        },
        "resFlag": "0",
        "resMessage": {
            "errorCode": "",
            "errorMsg": ""
        },
        "resContent": {
            "positive": "2,400,300,500", // 正資產加總
            "negative": "400,300,500", // 負資產加總
            // 負資產
            "partNegative": {
                "errorMsg": "",
                "totalBalance": "1,000,000,000,000",
                // 貸款
                "loansInfoData": {
                    "errorMsg": "主機連線逾時",
                    "typeTotalBalance": ""

                },
                // 信用卡
                "cardsInfoData": {
                    "errorMsg": "",
                    "typeTotalBalance": "1,000,000,000,000"
                }

            },
            ...
        }
    }



#### 情境8: 信用卡 取得失敗
##### 說明:
信用卡 取得失敗

##### Sample:




    {
        'apiId': 'SPEC05010101',
        'token': {
            'requestId': '',
            'responseTime': '2020-06-20 18:18:31',
            'lang': 'zh_TW'
        },
        "resFlag": "0",
        "resMessage": {
            "errorCode": "",
            "errorMsg": ""
        },
        "resContent": {
            "positive": "2,400,300,500", // 正資產加總
            "negative": "400,300,500", // 負資產加總
            // 負資產
            "partNegative": {
                "errorMsg": "",
                "totalBalance": "1,000,000,000,000",
                 // 貸款
                "loansInfoData": {
                    "errorMsg": "",
                    "typeTotalBalance": "1,000,000,000,000",
                    "account": [
                        {
                            "accountId": "11151000122977",
                            "nickName": "測試977",
                            "currencyCode": "TWD",
                            "accType": "151",
                            "type": "短期放款",
                            "balance": "6,300",
                            "endDate": "2020-01-01"
                        },
                        {
                            "accountId": "11152000122977",
                            "nickName": "測試977",
                            "currencyCode": "TWD",
                            "accType": "152",
                            "type": "中期放款",
                            "balance": "6,300",
                            "endDate": "2020-01-01"
                        }
                    ]

                },
                // 信用卡
                "cardsInfoData": {
                    "errorMsg": "主機連線逾時",
                    "typeTotalBalance": ""
                }

            },
            ...
        }
    }
