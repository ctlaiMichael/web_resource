/**
 * 資料讀取
 */
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// declare var require: any;

@Injectable({
    // 全ＡＰＰ只有一個
    providedIn: 'root'
})
export class LoadFileService {

    constructor(
        private http: HttpClient
    ) { }

    /**
     * Json讀取
     * @param jsonFilePath 
     */
    getJsonFile(jsonFilePath: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(jsonFilePath, {}).toPromise().then(
                (jsonData) => {
                    if (typeof jsonData == 'object' && !!jsonData) {
                        resolve(jsonData);
                    } else {
                        reject(jsonData);
                    }
                }
            ).catch((errorClient) => {
                reject(errorClient);
            });
        });
    }



    // /**
    //  * 轉換xml > json
    //  * @param filePath 檔案路徑
    //  */
    // getXmlFile(xmlFilePath: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         const headers = new HttpHeaders({ 'Content-Type': 'text/xml' }).set('Accept', 'text/xml');
    //         this.http.get(xmlFilePath, { 'headers': headers, 'responseType': 'text' })
    //             .subscribe((xmlData: any) => {
    //                 // logger.debug('XML2JSService xml file:' + xmlData);
    //                 let parseString = require('xml2js').parseString;
    //                 parseString(xmlData, (err, resultJson) => {
    //                     // logger.debug('XML2JSService json file:' + JSON.stringify(resultJson));
    //                     resolve(resultJson);
    //                 });
    //             });
    //     });
    // }

}
