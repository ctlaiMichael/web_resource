/**
 * 憑證白名單
 * 檢核server的issuer、fingerprint、public key
 * 請陸續增加
 */
import { environment } from '@environments/environment';

/**
 * [CertTime] 2020-08
 * [CertInfo] 測試版
 */
let cert_test = {
    ignor: false,
    time: '2020-09-24',
    issuer: 'TAIWAN-CA',
    sha1: '47 9D 1C 8D F0 71 6E 67 33 8A 77 AF EF 37 48 55 24 EA AC BA',
    publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3ykf9dTtBEnmfCJengf5'+
    'KRnRQQ4OKQ6papKxoCp3yiqwkAZgSGYmJC2Edh8rISpwFXrRZyOq4E3PHJ5sEdFp'+
    'O7BKh+pNdic+zAe1jAy/d1PdahsTquX9QIAEqjisVCXsdBZMq6DIC9azP1pZ47lD'+
    'EEoJ71qE3OGarM/67tF9g7WhRI00rssmtqbq/XSn1FGbcqo+fWiG9wmlaP0XnRJa'+
    'vkjnsgXtgmHSU2WydFQlkZbWIOG16tuMJ57xBqCPGIPCszSqJ0teqgUKqG/IREMP'+
    'lrhgF9RnTra6QpqYP6DqH+0LHkvOnHH7WrpRhF7fV9sgUK08FbI7qKcidsu/8ywi'+
    'MwIDAQAB'
};
if (environment.PRODUCTION) {
    // 正式要把測試的清掉
    cert_test = {
        ignor: true,
        time: '',
        issuer: '',
        sha1: '',
        publicKey: ''
    };
}
/**
 * [CertTime] 2020-08
 * [CertInfo] 初版
 */
const cert_1 = {
    ignor: false,
    time: '',
    issuer: '',
    sha1: '',
    publicKey: ''
};

/**
 * [CertTime] yyyy-mm-dd
 * [CertInfo] 替換版
 */
const cert_2 = {
    ignor: true,
    time: '',
    issuer: '',
    sha1: '',
    publicKey: ''
};


export const VERIFY_CERTS_INFO = [
    cert_test,
    cert_1
    // , cert_2
];
