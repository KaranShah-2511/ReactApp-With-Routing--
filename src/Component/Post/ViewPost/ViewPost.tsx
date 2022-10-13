import React, { useState, useEffect } from 'react'
import { useParams } from "react-router";
import { Post, UserService, User } from '../../../Services/UserService';
import moment from 'moment';
import { BsBookmarkPlus, BsBookmarkPlusFill } from 'react-icons/bs';
import { Auth } from '../../../Core/Services/AuthService';
import { ToastContainer, Toast } from 'react-bootstrap';
import './ViewPost.scss';
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';

function ViewPost() {
    const postId: any = useParams().postId;
    const [post, setPost] = useState<Post>();
    const userServices = new UserService();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLiked, setIsLiked] = useState(0);
    const [isDisLiked, setDisLiked] = useState(0);
    const [showMessage, setShowMessage] = useState<string | null>(null);

    useEffect(() => {
        if (postId) {
            userServices.getSinglePost(postId).then((res: any) => {
                setPost(res)
                setIsBookmarked(res.isBookmarked);
                if (res.isLiked == 1) {
                    setIsLiked(1);
                }
                else if (res.isLiked == -1) {
                    setDisLiked(-1);
                }
            })
        }
    }, []);

    const bookmark = async (postId, status) => {
        setIsBookmarked(status)
        const userData: User = Auth.getUser();
        const param = {
            userId: userData.id,
            postId: postId,
            isBookmark: status
        }
        await userServices.bookmark(param)
            .then((res) => {
                setShowMessage(res.message)
            })
            .catch((e) => {
                console.log('e', e)
            });
    };

    const likepost = async (postId, status) => {

        if (status == 1) { setIsLiked(1); setDisLiked(0); }
        else if (status == -1) { setIsLiked(0); setDisLiked(-1); }
        else { setIsLiked(0); setDisLiked(0); }

        const userData: User = Auth.getUser();
        const param = {
            likedBy: userData.id,
            postId: postId,
            status: status
        }
        await userServices.LikePost(param, postId)
            .then((res) => {
                console.log('Done')
            })
            .catch((e) => {
                console.log('e', e)
            });
    };

    return (
        <div className='post-view'>
            <ToastContainer className="p-3" position="top-center">
                <Toast onClose={() => setShowMessage(null)} bg="success" show={!!showMessage} delay={3000} autohide>
                    <Toast.Header closeButton={true}>
                        <strong className="me-auto">Bookmark</strong>
                    </Toast.Header>
                    <Toast.Body>{showMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
            <div className='post-view__title'>
                <h1>{post?.title}</h1>
            </div>
            <div className="post-owner">
                <div className="name-date">
                    <div className="owner-name">
                        {post?.name}
                    </div>
                    <div className="created-date">
                        {moment(post?.created).format('DD/MM/YYYY')}
                    </div>
                </div>

                <div className="like-bookmark">
                    <div className="like-dislike">
                        <div className="like">
                            {isLiked == 1 ? <AiFillLike onClick={() => likepost(post?._id, 0)} /> : <AiOutlineLike onClick={() => likepost(post?._id, 1)} />}
                        </div>
                        <div className="dislike">
                            {isDisLiked == -1 ? <AiFillDislike onClick={() => likepost(post?._id, 0)} /> : <AiOutlineDislike onClick={() => likepost(post?._id, -1)} />}
                        </div>
                    </div>

                    <div className="bookmark">
                        {(isBookmarked) ? <BsBookmarkPlusFill onClick={() => bookmark(post?._id, false)} /> : <BsBookmarkPlus onClick={() => bookmark(post?._id, true)} />}
                    </div>
                </div>

            </div>
            <div className="post-image">
                {/* <img src="https://source.unsplash.com/600x400/?computer" alt="card__image" className="card__image" width="100%" /> */}
                <img src="https://images.pexels.com/photos/2565919/pexels-photo-2565919.jpeg?cs=srgb&dl=pexels-sanni-sahil-2565919.jpg&fm=jpg" alt="card__image" className="card__image" width="100%" />
            </div>
            <div className="description">
                <p>
                    {post?.description}
                </p>
            </div>
        </div>
    )
}

export default ViewPost
