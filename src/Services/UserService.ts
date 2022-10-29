
import React from 'react';
import { Http } from '../Core/Services/HttpService';
import { Post } from './PostServices';
import { MyModelEntity } from "../Core/Services/MyModelService";

export type LoginParam = {
    email: string;
    password: string;
}


export class User extends MyModelEntity {

    _id: string;
    Email: string;
    FullName: string;
    Token?: string;
    UserType?: string;

    constructor(data?: any) {
        super(data);
        if (data) {
            this.objectAssign(this, data);
        }
    }
}

export class UserService {

    login(params: LoginParam): Promise<User> {
        console.log('params', params)
        return new Promise((resolve, reject) => {
            Http.post('/user/sign_in', params)
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

    getUserHistory(): Promise<Post[]> {
        return new Promise((resolve, reject) => {
            Http.get('user/history')
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
    getBookmark(): Promise<Post[]> {
        return new Promise((resolve, reject) => {
            Http.get('post/bookmark')
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
    getUserPosts(id: string | number): Promise<Post[]> {
        return new Promise((resolve, reject) => {
            const url = ['post/getallposts', id].join('/');
            Http.get(url)
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
    getUserProfile(id: string | number): Promise<User> {
        return new Promise((resolve, reject) => {
            const url = ['user/profile', id].join('/');
            Http.get(url)
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
