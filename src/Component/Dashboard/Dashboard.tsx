import moment from 'moment';
import React from 'react'
import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { Post, SearchParam, UserService } from '../../Services/UserService';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import './Dashboard.scss'

function Dashboard() {
  const [search, setSearch] = useState('');
  const [post, setPost] = useState<Post[]>([]);
  const userServices = new UserService();
  const navigate = useNavigate();

  useEffect(() => {
    getallPost()
  }, []);

  const getallPost = async () => {
    const param: SearchParam = {
      Searchby: search
    }

    await userServices.getAllPost(param).then((data) => {
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
      <div className="container">
        {post.map((item, index) => {
          const tag: any = item.tags;
          return (
            <div className="card" key={index} onClick={() => viewPost(item._id)}>
              <div className="card__header">
                <img src="https://source.unsplash.com/600x400/?computer" alt="card__image" className="card__image" width="600" />
              </div>
              <div className="card__body">
                <div className="tag-div">
                  {
                    tag.map((item, i) => {
                      return (
                        <>
                          <span className="tag tag-blue" key={i}> {item} </span>
                        </>
                      )
                    })
                  }
                </div>
                <h4>{item.title}</h4>
                <p className='discription'>{item.description}</p>
              </div>
              <div className="like-dislike">
                <div className="like">
                  <div className="icon">
                    <AiOutlineLike />
                  </div>
                  <div className="div">
                    {item.likes}
                  </div>
                </div>
                <div className="dislike">
                  <AiOutlineDislike />
                  {item.dislikes}
                </div>
                <div className="views">
                  <div className="icon">
                    views
                  </div>
                  <div className="div">
                    {item.count}
                  </div>
                </div>
              </div>
              <div className="card__footer">
                <div className="user">
                  <div className="user__info">
                    <h5>{item.name}</h5>
                    {/* <small>{item.created}</small> */}
                    <small>{moment(item.created).format('DD/MM/YYYY')}</small>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>

  )
}

export default Dashboard
