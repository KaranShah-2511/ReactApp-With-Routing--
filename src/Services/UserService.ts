
import React from 'react';
import { Http } from '../Core/Services/HttpService';

export type LoginParam = {
    email: string;
    password: string;
}

export class User extends React.Component {

    _id: string | undefined;
    Email: string | undefined;
    FullName: string | undefined;
    Token: string | undefined;
    UserType: string | undefined;

    constructor(data?: any) {
        super(data);
        if (data) {
            this.objectAssign(this, data);
        }
    }
    protected objectAssign<T extends Object>(obj: any, data: any) {
        const properties = Object.keys(data);
        properties.forEach((property) => {
            const desc =
                Object.getOwnPropertyDescriptor(obj, property)
                || Object.getOwnPropertyDescriptor(Object.getPrototypeOf(obj), property)
                || {};
            if (desc.writable && data[property] !== undefined) {
                obj[property] = data[property];
            }
        });
    }
}

export class UserService {

    login(params: LoginParam): Promise<User> {
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

    getAllPost(params: LoginParam): Promise<User> {
        return new Promise((resolve, reject) => {
            Http.post('/post', params)
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