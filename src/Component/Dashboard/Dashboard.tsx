import moment from 'moment';
import React from 'react'
import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { PostServices, Post, SearchParam, } from '../../Services/PostServices';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import './Dashboard.scss'
import { PostCard } from '../../Model';

function Dashboard() {
  const [search, setSearch] = useState('');
  const [post, setPost] = useState<Post[]>([]);
  const postServices = new PostServices();
  const navigate = useNavigate();

  useEffect(() => {
    getallPost()
  }, []);

  const getallPost = async () => {
    const param: SearchParam = {
      Searchby: search
    }

    await postServices.getAllPost(param).then((data) => {
      setPost(data);
    }).catch((e) => {
      console.log('e', e)
    });
  };

  const viewPost = (id) => {
    navigate(`/post/${id}`, { replace: true });
  }

  return (
    <>
      <div className='dash-container'>
        <div className="post-search">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            name="search" placeholder="Search.."
          />
          <Button className='search-button' onClick={() => getallPost()}>
            Search
          </Button>
        </div>
      </div>

      <PostCard post={post} />
    
    </>

  )
}

export default Dashboard
