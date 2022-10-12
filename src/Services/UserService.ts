
import React from 'react';
import { Http } from '../Core/Services/HttpService';
import { MyModelEntity } from "../Core/Services/MyModelService";

export type LoginParam = {
    email: string;
    password: string;
}
export type SearchParam = {
    Searchby: string;
}

export class User extends MyModelEntity {

    _id: string;
    Email: string;
    FullName: string;
    Token: string;
    UserType: string;

    constructor(data?: any) {
        super(data);
        if (data) {
            this.objectAssign(this, data);
        }
    }
}
export class Post extends MyModelEntity {

    _id: string | number;
    title: string;
    description: string;
    tags: string;
    createdBy: string;
    created: string;
    status: string;
    likes: string;
    dislikes: string;
    name: string;
    email: string;
    count: string;

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

    getAllPost(params?: SearchParam): Promise<Post[]> {
        return new Promise((resolve, reject) => {
            Http.post('post/getallpost',params)
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