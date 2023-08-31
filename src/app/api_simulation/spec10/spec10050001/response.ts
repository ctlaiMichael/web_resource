/**
 * 模擬api
 */
let resData1 = {
    'apiId': 'SPEC10050001',
    'token': {
        'requestId': '',
        'responseTime': '2020-07-16 18:28:31',
        'lang': 'zh_TW'
    },
    'resFlag': '0',
    'resMessage': {
        'errorCode': '',
        'errorMsg': ''
    },
    'resContent': {
        capitalAmt: "30000",
        returnAmtType: "1",
        totalPayment: "36000",
        totalInterestPayable: "6000",
        rowData: [
            {
                duration: "1",
                month: "3",
                rate: "20.00",
                principal: "15000",
                durationInterestPayable: "3000",
                durationPayment: "18000",
                monthlyPayment: "6000",
            },
            {
                duration: "2",
                month: "2",
                rate: "20.00",
                principal: "10000",
                durationInterestPayable: "2000",
                durationPayment: "12000",
                monthlyPayment: "6000",
            },
            {
                duration: "3",
                month: "1",
                rate: "20.00",
                principal: "5000",
                durationInterestPayable: "1000",
                durationPayment: "6000",
                monthlyPayment: "6000",
            }
        ]
    }
};

let resData2 = {
    'apiId': 'SPEC10050001',
    'token': {
        'requestId': '',
        'responseTime': '2020-07-16 18:28:31',
        'lang': 'zh_TW'
    },
    'resFlag': '0',
    'resMessage': {
        'errorCode': '',
        'errorMsg': ''
    },
    'resContent': {

    }
};

export const api_response1 = resData1;
export const api_response2 = resData2;
export const api_error = {
    'apiId': 'SPEC10050001',
    'token': {
        'requestId': '',
        'responseTime': '2020-06-20 18:28:31',
        'lang': 'zh_TW'
    },
    'resFlag': '1',
    'resMessage': {
        'errorCode': 'ERR10050001',
        'errorMsg': 'Test Error'
    }
};
export const api_exception = {
    'errorCode': 'ERRAAAAAAA',
    'errorMsg': 'Test Error'
};
