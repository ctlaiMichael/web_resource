export const CommonUtil = {
    /**
     * 等待
     * @param number ms
     */
    wait: (delay: number) => {
        return new Promise(resolve => setTimeout(resolve, delay));
    },
    /**
     * 欄位檢核
     * @param data 檢查的物件
     * @param field 確認的欄位
     */
    checkFieldExist: (data: object, field: string | number) => {
        if (typeof data === 'object' && data.hasOwnProperty(field)) {
            return true;
        }
        return false;
    },
    /**
     * 回傳物件
     * @param data 
     * @param return_type 
     */
    modifyReturn: (data: any, return_type: boolean) => {
        if (return_type) {
            return data.status;
        } else {
            if (data.hasOwnProperty('msg') && data.msg !== '') {
                // i18n轉換
                // data.msg = this._langTransService.instant(data.msg);
            }
            return data;
        }
    },
    /**
     * 將uri參數轉物件
     */
    uriToJson: (uri: string) => {
        return JSON.parse('{"' + decodeURI(uri.replace(/&/g, '\",\"').replace(/=/g, '\":\"')) + '"}');
    },
    /**
     * 檢查是否為台幣
     */
    checkIsTwd: (currency) => {
        let allow_list = ['TWD', 'NTD', 'NT$'];
        let output = false;
        if (typeof currency != 'string') {
            return output;
        }
        if (allow_list.indexOf(currency.toLocaleUpperCase()) > -1) {
            output = true;
        }

        return output;
    },
    /**
     * 動態載入module
     */
    importClass: (path: string, class_name: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            reject();
            // import('../' + path).then(
            //     (loadModule) => {
            //         if (typeof loadModule[class_name] == 'function') {
            //             let output = new loadModule[class_name]();
            //             resolve(output);
            //         } else {
            //             reject('miss class name' + class_name);
            //         }
            //     },
            //     (errorObj) => {
            //         reject(errorObj);
            //     }
            // ).catch((exceptionObj) => {
            //     reject(exceptionObj);
            // });
        });
    }
};
