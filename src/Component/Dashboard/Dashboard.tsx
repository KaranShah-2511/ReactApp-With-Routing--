import moment from 'moment';
import React from 'react'
import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { Post, SearchParam, UserService } from '../../Services/UserService';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';


import './Dashboard.scss'

function Dashboard() {
  const [search, setSearch] = useState('');
  const [post, setPost] = useState<Post[]>([]);
  const userServices = new UserService();

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
            <div className="card" key={index}>
              <div className="card__header">
                <img src="https://source.unsplash.com/600x400/?computer" alt="card__image" className="card__image" width="600" />
              </div>
              <div className="card__body">
                <div className="tag-div">
                  {
                    tag.map((item, index) => {
                      return (
                        <>
                          <span className="tag tag-blue" key={index}> {item} </span>
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
        }
        )
        }

        {/* <div className="card">
          <div className="card__header">
            <img src="https://source.unsplash.com/600x400/?food" alt="card__image" className="card__image" width="600" />
          </div>
          <div className="card__body">
            <span className="tag tag-brown">Food</span>
            <h4>Delicious Food</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi perferendis molestiae non nemo doloribus. Doloremque, nihil! At ea atque quidem!</p>
          </div>
          <div className="card__footer">
            <div className="user">
              <img src="https://i.pravatar.cc/40?img=2" alt="user__image" className="user__image" />
              <div className="user__info">
                <h5>Jony Doe</h5>
                <small>Yesterday</small>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card__header">
            <img src="https://source.unsplash.com/600x400/?car,automobile" alt="card__image" className="card__image" width="600" />
          </div>
          <div className="card__body">
            <span className="tag tag-red">Automobile</span>
            <h4>Race to your heart content</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi perferendis molestiae non nemo doloribus. Doloremque, nihil! At ea atque quidem!</p>
          </div>
          <div className="card__footer">
            <div className="user">
              <img src="https://i.pravatar.cc/40?img=3" alt="user__image" className="user__image" />
              <div className="user__info">
                <h5>John Doe</h5>
                <small>2d ago</small>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>

  )
}

export default Dashboard
