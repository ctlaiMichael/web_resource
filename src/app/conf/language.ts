/**
 * 語系定義檔
 * 
 * key 語系: {
 *  id: '語系代碼'
 *  name: '語系名稱'
 *  class: '語系的Body Class name'
 *  apiLang: '送API時對應的lang欄位'
 * }
 */
let language_data = [];
let language_list = {
    'zh-tw': {
        id: 'zh-tw',
        name: '繁體中文',
        class: '',
        apiLang: 'zh_TW'
    },
    'en-us': {
        id: 'en-us',
        name: 'English',
        class: 'bodyLang_en',
        apiLang: 'en_US'
    }
};
let tmp_i;
for (tmp_i in language_list) {
    if (typeof language_list[tmp_i] != 'undefined') {
        language_data.push(language_list[tmp_i]);
    }
}


export const LANGUAGE_SET = {
    list: language_list,
    data: language_data
};