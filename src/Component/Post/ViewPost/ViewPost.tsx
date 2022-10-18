import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router";
import { User } from '../../../Services/UserService';
import { PostServices, Post } from '../../../Services/PostServices';
import moment from 'moment';
import { BsBookmarkPlus, BsBookmarkPlusFill, BsThreeDotsVertical } from 'react-icons/bs';
import { Auth } from '../../../Core/Services/AuthService';
import { ToastContainer, Toast, Spinner } from 'react-bootstrap';
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ReportIcon from '@mui/icons-material/Report';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Formik } from 'formik';
import * as yup from 'yup';
import './ViewPost.scss';

function ViewPost() {
    const postId: any = useParams().postId;
    const [post, setPost] = useState<Post>();
    const postServices = new PostServices();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLiked, setIsLiked] = useState(0);
    const [isDisLiked, setDisLiked] = useState(0);
    const [showMessage, setShowMessage] = useState<string | null>(null);
    const [showError, setShowError] = useState<string | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [show, setShow] = useState(false);
    const handleClosePopup = () => setShow(false);
    const handleShowPopup = () => setShow(true);
    const open = Boolean(anchorEl);
    const userData: User = Auth.getUser();
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (postId) {
            postServices.getSinglePost(postId).then((res: any) => {
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

        const param = {
            userId: userData.id,
            postId: postId,
            isBookmark: status
        }
        await postServices.bookmark(param)
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


        const param = {
            likedBy: userData.id,
            postId: postId,
            status: status
        }
        await postServices.LikePost(param, postId)
            .then((res) => {
                console.log('Done')
            })
            .catch((e) => {
                console.log('e', e)
            });
    };

    const getInitialValues = () => {
        return {
            reason: ''
        };
    };
    const onSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        const payload: any = {
            userId: userData.id,
            postId: postId,
            reason: values.reason
        };
        await postServices.reportPost(payload)
            .then((res) => {
                setShowMessage(res.message);
                handleClosePopup();
            })
            .catch((e) => {
                setShowError(e.message);
                handleClosePopup();
            });

    };

    const formlik = {
        validationSchema: yup.object().shape({
            reason: yup.string().required('Please enter Event Name'),
        }),
        initialValues: getInitialValues(),
        onSubmit: onSubmit
    };

    const deltePost = async (postId) => {
        console.log('postId', postId)
        await postServices.deletePost(postId).then((res) => {
            console.log('res', res)
            navigate(`/`, { replace: true });

        }).catch((e) => {
            console.log('e', e)
        })
    };
    return (
        <div className='post-view'>
            <ToastContainer className="p-3" position="top-center">
                <Toast onClose={() => setShowMessage(null)} bg="success" show={!!showMessage} delay={3000} autohide>
                    <Toast.Header closeButton={true}>
                        <strong className="me-auto">Successful</strong>
                    </Toast.Header>
                    <Toast.Body>{showMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
            <ToastContainer className="p-3" position="top-center">
                <Toast onClose={() => setShowError(null)} bg="danger" show={!!showError} delay={3000} autohide>
                    <Toast.Header closeButton={true}>
                        <strong className="me-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body>{showError}</Toast.Body>
                </Toast>
            </ToastContainer>
            <div className='post-view__title'>
                <div className="title">
                    <h1>{post?.title}</h1>
                </div>
                <div className="menu">

                    <React.Fragment>
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

                            <Tooltip title="Post Setting">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'Post Setting' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <BsThreeDotsVertical className='text-dark' />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible', filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))', mt: 1.5,
                                    '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1, },
                                    '&:before': { content: '""', display: 'block', position: 'absolute', top: 0, right: 14, width: 10, height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0, },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem>
                                Profile
                            </MenuItem>
                            <MenuItem>
                                My account
                            </MenuItem>
                            {/* <Divider /> */}
                            {(userData.id != post?.createdBy) ?
                                <MenuItem onClick={handleShowPopup}>

                                    Report
                                </MenuItem>
                                :
                                (<div>
                                    <Divider />

                                    <MenuItem  >
                                        Update
                                    </MenuItem>
                                    <MenuItem onClick={() => deltePost(post._id)}  >
                                        Delete
                                    </MenuItem>
                                    {(!post.status)
                                        ?
                                        <MenuItem >

                                            Open Report Request
                                        </MenuItem>
                                        : ''}
                                </div>
                                )
                            }
                        </Menu>
                    </React.Fragment>
                </div>
            </div>
            <Modal show={show} onHide={handleClosePopup}>
                <Modal.Header closeButton>
                    <Modal.Title>Post Report</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik {...formlik}>
                        {({ handleSubmit, handleChange, touched, values, isSubmitting, errors }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="name@example.com"
                                        autoFocus
                                        value={userData.Email}
                                        disabled={true}
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>Report Description</Form.Label>
                                    <Form.Control as="textarea" rows={3}
                                        name="reason"
                                        type="reason"
                                        placeholder="Your reason"
                                        onChange={handleChange}
                                        value={values.reason}
                                        isValid={touched.reason && !errors.reason}
                                        autoComplete="off"
                                        isInvalid={!!errors.reason} />
                                    <Form.Control.Feedback type="invalid">{errors.reason}</Form.Control.Feedback>

                                </Form.Group>
                                <Button className="mr-1 save-btn" variant="success" type="submit"> Submit
                                    {(isSubmitting) ? <Spinner className="spinner" animation="border" size="sm" /> : null}
                                </Button>

                            </Form>
                        )}
                    </Formik>
                </Modal.Body>

            </Modal>
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

                {/* {JSON.parse(post?.description)} */}

                <div dangerouslySetInnerHTML={{ __html: post?.description }} />
            </div>
        </div>
    )
}

export default ViewPost
