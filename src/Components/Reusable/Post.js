import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Assets
import { Form, Button, Card } from 'react-bootstrap';
import '../../css/components/Post.css';
import { Image, Video } from 'cloudinary-react';

// Dummy Image
import dummyImage from '../../Image/bgregister.jpg';

function Post(props) {
  // Variables
  const [post, setPost] = useState(props.post);
  const [showComments, setShowComments] = useState(false);
  const [allowPost, setAllowPost] = useState(false);
  const user = JSON.parse(localStorage.getItem('username'));

  // Axios
  const followUser = async (idUser) => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_API_URL}/api/users/follow`,
        {
          target_user_id: idUser
        },
        {
          headers: {
            'x-auth-token': JSON.parse(localStorage.getItem('x-auth-token'))
          }
        }
      )
      .then((res) => {
        // Update Follower Count
      })
      .catch((err) => {
        console.info(err);
      });
  };

  const sendComment = async (target_id, text) => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_API_URL}/api/users/post/comment`,
        {
          target_post_id: target_id,
          commentTexts: text
        },
        {
          headers: {
            'x-auth-token': JSON.parse(localStorage.getItem('x-auth-token'))
          }
        }
      )
      .then((res) => {
        console.log(res);
        // Update Comment Section
      });
  };

  const likePost = async (target_id) => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_API_URL}/api/users/post/like`,
        {
          target_post_id: target_id
        },
        {
          headers: {
            'x-auth-token': JSON.parse(localStorage.getItem('x-auth-token'))
          }
        }
      )
      .then((res) => {
        console.log(res);
        // Update Like Count
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlikePost = async (target_id) => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_API_URL}/api/users/post/unlike`,
        {
          target_post_id: target_id
        },
        {
          headers: {
            'x-auth-token': JSON.parse(localStorage.getItem('x-auth-token'))
          }
        }
      )
      .then((res) => {
        console.log(res);
        // Update Like Count
      });
  };

  // Components
  const contentIsFollowing = () => {
    if (post.user.username == user) {
      return <span>Me</span>;
    }
    if (post.user.isFollowing) {
      return <span>Following</span>;
    }
    return (
      <span
        className="follow-button link"
        onClick={() => {
          btnFollow(post.user.id);
        }}>
        Follow
      </span>
    );
  };
  // Handler

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    console.log(e.target.commentText.value);
  };

  const btnFollow = (e) => {
    followUser(e);
  };

  return (
    <Card className="post-card">
      <Card.Body>
        <div className="card-head">
          <Image
            cloud_name={'projekiso'}
            publicId={'user/profiles/' + post.user.image_id}
            fetch-format="auto"
            quality="auto"
            className="card-head_image"
          />
          {/* <img className={'card-head_image'} src={profilImage} alt="Profil Image" /> */}
          <div className="card-head_profile">
            <p className="card-head_profile-name fw-bold">{post.user.username}</p>
            <p className="card-head_profile-followers text_small fw-bold text-muted">
              {post.user.followersCtr} Followers • {contentIsFollowing()}
            </p>
            <p className="post-created fw-bold text-muted">{post.dateNow}</p>
          </div>
        </div>
        <div className="card-content">
          <div className="card-content_image-container">
            <Image
              cloud_name={'projekiso'}
              publicId={'user/posts/' + post.cloudinary_id}
              fetch-format="auto"
              quality="auto"
              className="card-content_image-content"
            />
          </div>
        </div>
        <div className="card-caption">
          <div className="card-caption_action">
            <div className={`card-caption_action-like-button`}>
              <svg
                className={`like-icon filled ${post.isLiked ? 'selected' : ''}`}
                viewBox="0 0 1024 1024"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M923 283.6C909.596 252.564 890.269 224.439 866.1 200.8C841.913 177.091 813.396 158.249 782.1 145.3C749.648 131.819 714.841 124.919 679.7 125C630.4 125 582.3 138.5 540.5 164C530.5 170.1 521 176.8 512 184.1C503 176.8 493.5 170.1 483.5 164C441.7 138.5 393.6 125 344.3 125C308.8 125 274.4 131.8 241.9 145.3C210.5 158.3 182.2 177 157.9 200.8C133.7 224.412 114.368 252.544 101 283.6C87.1 315.9 80 350.2 80 385.5C80 418.8 86.8 453.5 100.3 488.8C111.6 518.3 127.8 548.9 148.5 579.8C181.3 628.7 226.4 679.7 282.4 731.4C375.2 817.1 467.1 876.3 471 878.7L494.7 893.9C505.2 900.6 518.7 900.6 529.2 893.9L552.9 878.7C556.8 876.2 648.6 817.1 741.5 731.4C797.5 679.7 842.6 628.7 875.4 579.8C896.1 548.9 912.4 518.3 923.6 488.8C937.1 453.5 943.9 418.8 943.9 385.5C944 350.2 936.9 315.9 923 283.6V283.6Z"
                  fill="#111111"
                  onClick={() => {
                    // ganti Toggle Like
                    likePost(post.id);
                  }}
                />
                {post.id}
              </svg>
              <p className="like-count text-muted fw-bold">{post.likesCtr} likes</p>
            </div>
          </div>
          <p className="card-caption_content">
            <span className="post-sender fw-bold">{post.user.username} </span>
            {post.caption}
          </p>
        </div>
        <div className={`card-comments`}>
          <div className="card-comments-header">
            <p className="text-muted fw-bold">Comments Section</p>
            <p className="total-comments text-muted text_small fw-bold">{'1.3k'}</p>
          </div>
          {post.comments.map((comment) => {
            return (
              <div className="card-comments_item" key={comment.id}>
                <Image
                  cloud_name={'projekiso'}
                  publicId={'user/profiles/' + comment.user.image_id}
                  fetch-format="auto"
                  quality="auto"
                  className="card-comments_item-profile"
                />
                <p className="card-comments_item-content">
                  <span className="card-comments_item-content_sender fw-bold">
                    {comment.user.username}
                  </span>
                  {comment.comment}
                </p>
                <p className="card-comments_item-createdTime text_small fw-bold">
                  {comment.dateNow}
                </p>
              </div>
            );
          })}
          <div className="card-comments_show-button">
            <p
              className="link fw-bold text-muted"
              onClick={() => {
                setShowComments(true);
              }}>
              View more
            </p>
          </div>
        </div>
      </Card.Body>
      <Card.Footer>
        <form action="#" method="post" className="form-comment" onSubmit={handleCommentSubmit}>
          <textarea
            className="form-control comment-input"
            placeholder="Add comment..."
            name="commentText"
            onBlur={(e) => {
              setAllowPost(e.target.value !== '');
            }}
            onChange={(e) => {
              setAllowPost(e.target.value.length !== '');
            }}></textarea>
          <p
            className={`post-comment ${allowPost ? '' : 'disabled'}`}
            onClick={(e) => {
              sendComment(post.id, e.target.value);
            }}>
            Post Comment
          </p>
        </form>
      </Card.Footer>
    </Card>
  );
}

export default Post;
