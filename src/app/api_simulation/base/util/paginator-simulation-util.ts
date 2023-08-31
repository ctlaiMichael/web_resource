/**
 * [模擬處理] paginator
 */
import { PAGE_SETTING } from '@conf/page';
import { FieldUtil } from '@util/formate/modify/field-util';
import { ObjectUtil } from '@util/formate/modify/object-util';
import { ApiRequestOption } from '@api/base/options/api-request-option';
import { DateUtil } from '@util/formate/date/date-util';
import { ObjectCheckUtil } from '@util/check/object-check-util';
import { logger } from '@util/log-util';

const totalPage = 10; // 模擬測試數量
export const PaginatorSimlationUtil = {
    /**
     * 模擬分頁處理
     * @param reqObj 
     */
    getPaginatedInfo(reqObj: ApiRequestOption) {
        let pageSize;
        let pageNumber; 
        let sortColName; 
        let sortDirection;
        let paginator = reqObj.getPaginator();

        pageSize = FieldUtil.checkField(paginator, 'pageSize');
        pageNumber = FieldUtil.checkField(paginator, 'pageNumber');
        sortColName = FieldUtil.checkField(paginator, 'sortColName');
        sortDirection = FieldUtil.checkField(paginator, 'sortDirection');
        // logger.error('getPaginatedInfo:', paginator);

        if (!pageSize || pageSize == '') {
            pageSize = PAGE_SETTING.PAGE_SIZE;
        }
        if (!pageNumber || pageNumber == '') {
            pageNumber = 1;
        }
        if (!sortColName) {
            sortColName = '';
        }
        if (!sortDirection || sortDirection == '') {
            sortDirection = PAGE_SETTING.SORT;
        }


        let totalRowCount = totalPage * pageSize;

        if (totalPage < pageNumber) {
            // 超過比數
            return false;
        }
        return {
            'totalCount': totalRowCount.toString(),
            'pageSize': pageSize.toString(),
            'pageNumber': pageNumber.toString(),
            'sortColName': sortColName,
            'sortDirection': sortDirection
        };
    },

    getResponse(data, paginatedInfo, field_list?: string) {
        if (!data.hasOwnProperty('resContent')
        ) {
            return ObjectUtil.clone(data);
        }
        let output = ObjectUtil.clone(data);
        // if (!ObjectCheckUtil.checkObjectList(data, 'resContent.paginator') && ObjectCheckUtil.checkObjectList(data, 'resContent.paginatedInfo')) {
        //     output['resContent']['paginator'] = data['resContent']['paginatedInfo'];
        // }
        // 2010-12-22T13:38:07.046+08:00
        // output['token']['responseTime'] = new Date().toISOString();
        output['token']['responseTime'] = DateUtil.transDate('NOW_TIME');
        output['resContent'] = this.modifyDetails(output['resContent'], paginatedInfo, field_list);
        output['resContent']['paginator'] = paginatedInfo;
        return output;
    },

    modifyDetails(data, paginatedInfo, field_list?: string) {
        let search_data = ObjectUtil.clone(data);
        let output: any = [];
        if (typeof field_list === 'undefined') {
            return search_data;
        }
        const field_key = field_list.split('.');
        if (field_key.length <= 0) {
            return search_data;
        }
        let tmp_data: any = ObjectUtil.clone(search_data);
        field_key.forEach(tmp_field => {
            if (!tmp_data.hasOwnProperty(tmp_field)) {
                return false;
            }
            tmp_data = tmp_data[tmp_field];
        });
        if (!(tmp_data instanceof Array) || tmp_data.length < 1) {
            return search_data;
        }
        const data_length = tmp_data.length;
        if (paginatedInfo.pageSize > data_length) {
            // 增長度
            let item_data = ObjectUtil.clone(tmp_data[0]);
            let diff_length = paginatedInfo.pageSize - data_length;
            tmp_data = tmp_data.concat(new Array(diff_length).fill(item_data));
        } else if (paginatedInfo.pageSize < data_length) {
            // 減長度
            tmp_data = tmp_data.slice(0, paginatedInfo.pageSize);
        }
        let i = 0;
        let tmp_data2 = search_data;
        let key_length = field_key.length;
        field_key.forEach(tmp_field => {
            i++;
            if (tmp_data2.hasOwnProperty(tmp_field)) {
                if (i === key_length) {
                    tmp_data2[tmp_field] = tmp_data;
                } else {
                    tmp_data2 = tmp_data2[tmp_field];
                }

            }
        });
        return search_data;
    }
};
