
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
export type Bookmark = {
    userId: string | number;
    postId: string | number;
    isBookmark: boolean;
}

export type LikePost = {
    likedBy: string | number;
    postId: string | number;
    status: number;
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
    isLiked: number;
    isBookmarked: boolean

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
            Http.post('post/getallpost', params)
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

    getSinglePost(id: string | number): Promise<Post> {
        return new Promise((resolve, reject) => {
            const url = ['post/singlepost', id].join('/');
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

    bookmark(params: Bookmark): Promise<any> {
        return new Promise((resolve, reject) => {
            Http.post('post/bookmark', params)
                .then((res) => {
                    if (res.data.code === "200" && res.data.flag === true) {
                        resolve(res.data);
                    } else {
                        reject(res.data);
                    }
                })
                .catch((e) => reject(e));
        });
    }

    LikePost(params: LikePost, id: string | number): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = ['/post/likepost', id].join('/');
            Http.post(url, params)
                .then((res) => {
                    if (res.data.code === "200" && res.data.flag === true) {
                        resolve(res.data);
                    } else {
                        reject(res.data);
                    }
                })
                .catch((e) => reject(e));
        });
    }

}
