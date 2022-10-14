import React from 'react';
import { Http } from '../Core/Services/HttpService';
import { MyModelEntity } from "../Core/Services/MyModelService";

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
export type ReportPost = {
    userId: string | number;
    postId: string | number;
    reason: string;
}
export class Post extends MyModelEntity {

    _id: string | number;
    title: string;
    description: string;
    tags: string;
    createdBy: string;
    created: string;
    likes: string;
    dislikes: string;
    name: string;
    email: string;
    count: string;
    isLiked: number;
    isBookmarked: boolean;
    status: boolean;

    constructor(data?: any) {
        super(data);
        if (data) {
            this.objectAssign(this, data);
        }
    }
}

export class PostServices {

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

    reportPost(params: ReportPost): Promise<any> {
        return new Promise((resolve, reject) => {
            Http.post('post/postreport', params)
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

    deletePost(id: string | number): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = ['/post/deletepost', id].join('/');
            Http.delete(url)
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
