import React from 'react';
import { Http } from '../Core/Services/HttpService';
import { MyModelEntity } from "../Core/Services/MyModelService";

export type Count = {
    user: number[];
    post: number[];
    reportData: number[];
}
export type PostUserCount = {
    user: number[];
    count: number[];
}
export type SearchParam = {
    year: string;
}

export class AdminService {

    getPostUserReportCount(params?: SearchParam): Promise<Count> {
        return new Promise((resolve, reject) => {
            Http.post('admin/userpostcount', params)
                .then((res) => {
                    if (res.data.code === "200" && res.data.flag === true) {
                        resolve(res.data.data);
                    } else {
                        reject(res.data);
                    }
                })
                .catch((e) => reject(e));
        });
    }
    getpostcount(): Promise<PostUserCount> {
        return new Promise((resolve, reject) => {
            Http.get('admin/postcount')
                .then((res) => {
                    if (res.data.code === "200" && res.data.flag === true) {
                        resolve(res.data.data);
                    } else {
                        reject(res.data);
                    }
                })
                .catch((e) => reject(e));
        });
    }


}