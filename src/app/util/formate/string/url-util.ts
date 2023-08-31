/**
 * Util Url處理
 */
export const UrlUtil = {

    /**
     * 串接url參數
     * @param url_list url string array
     * @param params_list params string array
     */
    mappingUrl: (url_list: Array<string>, params_list?: Array<string>) => {
        let isParams = false;
        let url_path = [];
        let params_data = [];
        url_list.forEach((item) => {
            let set_item = item;
            if (!isParams && item.search(/\?/g) > -1) {
                isParams = true;
                if (item != '?') {
                    let spilt_list = item.split('?');
                    if (!!spilt_list[0]) {
                        url_path.push(spilt_list[0]);
                    }
                    set_item = (!!spilt_list[1]) ? spilt_list[1] : '';
                }
            }
            if (set_item == '') {
                return;
            }
            set_item = set_item.replace(/^(&|\/)+|(&|\/)+$/gm, '');
            if (isParams) {
                // is params part
                // 去頭尾&
                set_item = set_item.replace(/^&+|&+$/gm, '');
                params_data.push(set_item);
            } else {
                // is url path part
                if (set_item.substr(-3) != '://') {
                    // 去頭尾斜線
                    set_item = set_item.replace(/^\/+|\/+$/gm, '');
                }
                url_path.push(set_item);
            }
        });
        if (params_list) {
            params_list.forEach((item) => {
                // 去頭尾&
                let set_item = item.replace(/^&+|&+$/gm, '');
                params_data.push(set_item);
            });
        }

        let output = url_path.join('/');
        if (params_data.length > 0) {
            output += '?' + params_data.join('&');
        }
        return output;
    }

};
