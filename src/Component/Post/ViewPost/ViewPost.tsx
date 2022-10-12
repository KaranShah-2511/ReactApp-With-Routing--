import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from "react-router";
import { Post, UserService } from '../../../Services/UserService';
import './ViewPost.scss';


function ViewPost() {
    const postId: any = useParams().postId;
    const [post, setPost] = useState<Post>();
    const userServices = new UserService();

    useEffect(() => {
        if (postId) {
            userServices.getSinglePost(postId).then((res: any) => {
                setPost(res)
            })
        }
    }, []);

    return (
        <div className='post-view'>
            <div className='post-view__title'>
               <h1>{post?.title}</h1>
            </div>
            <div className="post-image">
                {/* <img src="https://source.unsplash.com/600x400/?computer" alt="card__image" className="card__image" width="100%" /> */}
                <img src="https://images.pexels.com/photos/2565919/pexels-photo-2565919.jpeg?cs=srgb&dl=pexels-sanni-sahil-2565919.jpg&fm=jpg" alt="card__image" className="card__image" width="100%" />
            </div>
            ViewPost
        </div>
    )
}

export default ViewPost
