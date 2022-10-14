import React from 'react'
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Post } from '../../Services/PostServices';
import './PostCard.scss'


function PostCard(post: any) {
  const navigate = useNavigate();

  const viewPost = (id) => {
    navigate(`/post/${id}`, { replace: true });
  }


  return (
    <div className="container">
      {post.post.map((item, index) => {
        const tag: any = item.tags;
        return (
          <div className="card" key={Math.random()} onClick={() => viewPost(item._id)}>
            <div className="card__header">
              <img src="https://source.unsplash.com/600x400/?computer" alt="card__image" className="card__image" width="600" />
            </div>
            <div className="card__body">
              <div className="tag-div">
                {
                  tag.map((item, i) => {
                    return (
                      <>
                        <span className="tag tag-blue" key={i.toString()}> {item} </span>
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
  )
}

export default PostCard
