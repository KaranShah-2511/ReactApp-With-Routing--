import React, { useState, useRef, useMemo, } from 'react';
import JoditEditor from 'jodit-react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Auth } from '../../../Core/Services/AuthService';
import './CreatePost.scss';
import { User } from '../../../Services/UserService';
import { PostServices } from '../../../Services/PostServices';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const editor = useRef(null);
  const [tags, setTags] = useState<any[]>([]);
  const userData: User = Auth.getUser();
  const postServices = new PostServices();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>({
    title: '',
    description: '',
    tags: [],
    createdBy: userData.id,
  })

  const contentFieldChanaged = (data) => {
    setPost({ ...post, 'description': data })
  }
  const fieldChanged = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value })
  }
  const addTags = event => {
    if (event.key === "Enter" && event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };
  const removeTags = index => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
  };

  const createPost = async (event) => {
    event.preventDefault();
    const param = { ...post, tags: tags }
    console.log('data', param)
    if (param.title && param.description ) {
      await postServices.createPost(param).then((res) => {
        console.log('res', res)
        navigate('/')
      }).catch((err) => {
        console.log('err', err)
      })
    }
  }

  return (
    <div className='createpost-div'>
      <div className='title'>
        Create Post
      </div>
      <Form onSubmit={createPost}>
        <div className="my-3">
          <Form.Label>Post title</Form.Label>
          <Form.Control
            type="text"
            id="title"
            placeholder="Enter here"
            className="rounded-0"
            name="title"
            onChange={fieldChanged}
            value={post.title}
          />
        </div>
        <div className="editor">
          <Form.Label>Post Description</Form.Label>
          <JoditEditor
            ref={editor}
            value={post.description}
            onChange={(newContent) => contentFieldChanaged(newContent)}
          />
        </div>



        <div className="tag-container">
          {/* {tags.map((tag) =>  <div className="tag">{tag} </div>)} */}
          {tags.map((tag, index) => {
            return (
              <div className="tag" key={index}>
                {tag}
                <Button onClick={() => removeTags(index)}>x</Button>
              </div>
            );
          })}
          <input
            placeholder="Enter a tag"
            onKeyUp={(event) => addTags(event)}
          />
        </div>
        <Button onClick={createPost} className="rounded-0" color="primary">Create Post</Button>
      </Form>

      {/* <p>
        {JSON.stringify(post.description)}
      </p> */}
    </div>
  )
}

export default CreatePost
