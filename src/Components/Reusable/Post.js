import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Assets
import { Form, Button, Card } from 'react-bootstrap';
import '../../css/components/Post.css';
import { Image, Video } from 'cloudinary-react';

// Dummy Image
import dummyImage from '../../Image/bgregister.jpg';

// Components
import ProfileImage from './ProfileImage';

function Post(props) {
  // Variables
  // const [isLike,setIsLike] = useState(props.post.isLiked);
  // const [isFollowing,setIsFollowing] = useState(props.post.isFollowing);
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
        setPost((prevState) => ({
          ...prevState,
          user: {
            ...prevState.user,
            isFollowing: true,
            followersCtr: prevState.user.followersCtr + 1
          }
        }));
      })
      .catch((err) => {
        console.info(err);
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
        // console.log(res);
        // Update Like Count
        setPost((prevState) => ({
          ...prevState,
          isLiked: true,
          likesCtr: prevState.likesCtr + 1
        }));
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
        setPost((prevState) => ({
          ...prevState,
          isLiked: false,
          likesCtr: prevState.likesCtr - 1
        }));
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
          btnFollow(post.id);
        }}>
        Follow
      </span>
    );
  };

  // const contentIsLiked = () => {
  //   if (post.isLiked == true) {
  //     return <span>Me</span>;
  //   }
  //   if (post.user.isFollowing) {
  //     return <span>Following</span>;
  //   }
  //   return (
  //       <span
  //           className="follow-button link"
  //           onClick={() => {
  //             btnFollow(post.id);
  //           }}>
  //       Follow
  //     </span>
  //   );
  // };

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
          <ProfileImage
            username={post.user.username}
            publicId={post.user.image_id}
            className="card-head_image"
          />
          {/* <img className={'card-head_image'} src={profilImage} alt="Profil Image" /> */}
          <div className="card-head_profile">
            <p className="card-head_profile-name fw-bold">{post.user.username}</p>
            <p
              key={post.user.isFollowing}
              className="card-head_profile-followers text_small fw-bold text-muted">
              {post.user.followersCtr} Followers • {contentIsFollowing()}
            </p>
            <p className="post-created fw-bold text-muted text_small">{post.dateNow}</p>
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
            <div
              key={post.isLiked}
              className={`card-caption_action-button`}
              onClick={(e) => {
                e.stopPropagation();
                // ganti Toggle Like
                if (post.isLiked == true) {
                  unlikePost(post.id);
                } else {
                  likePost(post.id);
                }
              }}>
              <svg
                className={`action-button-icon filled ${post.isLiked ? 'selected' : ''}`}
                viewBox="0 0 1024 1024"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M923 283.6C909.596 252.564 890.269 224.439 866.1 200.8C841.913 177.091 813.396 158.249 782.1 145.3C749.648 131.819 714.841 124.919 679.7 125C630.4 125 582.3 138.5 540.5 164C530.5 170.1 521 176.8 512 184.1C503 176.8 493.5 170.1 483.5 164C441.7 138.5 393.6 125 344.3 125C308.8 125 274.4 131.8 241.9 145.3C210.5 158.3 182.2 177 157.9 200.8C133.7 224.412 114.368 252.544 101 283.6C87.1 315.9 80 350.2 80 385.5C80 418.8 86.8 453.5 100.3 488.8C111.6 518.3 127.8 548.9 148.5 579.8C181.3 628.7 226.4 679.7 282.4 731.4C375.2 817.1 467.1 876.3 471 878.7L494.7 893.9C505.2 900.6 518.7 900.6 529.2 893.9L552.9 878.7C556.8 876.2 648.6 817.1 741.5 731.4C797.5 679.7 842.6 628.7 875.4 579.8C896.1 548.9 912.4 518.3 923.6 488.8C937.1 453.5 943.9 418.8 943.9 385.5C944 350.2 936.9 315.9 923 283.6V283.6Z"
                  fill="#111111"
                />
              </svg>
              <p className="action-button-text text-muted fw-bold">{post.likesCtr} likes</p>
            </div>
            <div className={`card-caption_action-button`}>
              <svg
                className="action-button-icon filled"
                viewBox="0 0 97 97"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M48.5001 9.09375C41.6563 9.09323 34.9303 10.8751 28.9845 14.2639C23.0386 17.6527 18.0778 22.5316 14.5905 28.4203C11.1032 34.3089 9.20962 41.0043 9.09623 47.8471C8.98284 54.69 10.6535 61.4444 13.9438 67.4453L10.7231 78.7746C10.4202 79.8171 10.401 80.9215 10.6674 81.9739C10.9338 83.0263 11.4763 83.9886 12.2387 84.7613C13.0011 85.5274 13.9567 86.0728 15.0041 86.3397C16.0515 86.6065 17.1515 86.5849 18.1876 86.277L29.5548 83.0563C34.8226 85.9435 40.6809 87.5882 46.6818 87.8645C52.6826 88.1409 58.6673 87.0416 64.1782 84.6508C69.6892 82.2599 74.5805 78.6407 78.4785 74.0699C82.3765 69.499 85.1778 64.0975 86.6684 58.2781C88.159 52.4588 88.2995 46.3757 87.079 40.4937C85.8584 34.6118 83.3093 29.0867 79.6264 24.3409C75.9435 19.595 71.2243 15.754 65.8296 13.1114C60.4348 10.4688 54.5073 9.09458 48.5001 9.09375V9.09375ZM30.3126 53.0469C29.4133 53.0469 28.5342 52.7802 27.7865 52.2806C27.0387 51.781 26.4559 51.0709 26.1118 50.24C25.7677 49.4092 25.6776 48.495 25.8531 47.613C26.0285 46.7309 26.4615 45.9208 27.0974 45.2849C27.7333 44.649 28.5435 44.2159 29.4255 44.0405C30.3075 43.8651 31.2217 43.9551 32.0526 44.2992C32.8834 44.6434 33.5935 45.2262 34.0932 45.9739C34.5928 46.7216 34.8594 47.6007 34.8594 48.5C34.8594 49.7059 34.3804 50.8624 33.5277 51.7151C32.675 52.5678 31.5185 53.0469 30.3126 53.0469ZM48.5001 53.0469C47.6008 53.0469 46.7217 52.7802 45.974 52.2806C45.2262 51.781 44.6434 51.0709 44.2993 50.24C43.9552 49.4092 43.8651 48.495 44.0406 47.613C44.216 46.7309 44.649 45.9208 45.2849 45.2849C45.9208 44.649 46.731 44.2159 47.613 44.0405C48.495 43.8651 49.4092 43.9551 50.2401 44.2992C51.0709 44.6434 51.781 45.2262 52.2806 45.9739C52.7803 46.7216 53.0469 47.6007 53.0469 48.5C53.0469 49.7059 52.5679 50.8624 51.7152 51.7151C50.8625 52.5678 49.706 53.0469 48.5001 53.0469ZM66.6876 53.0469C65.7883 53.0469 64.9092 52.7802 64.1615 52.2806C63.4137 51.781 62.8309 51.0709 62.4868 50.24C62.1427 49.4092 62.0526 48.495 62.2281 47.613C62.4035 46.7309 62.8365 45.9208 63.4724 45.2849C64.1083 44.649 64.9185 44.2159 65.8005 44.0405C66.6825 43.8651 67.5967 43.9551 68.4276 44.2992C69.2584 44.6434 69.9685 45.2262 70.4682 45.9739C70.9678 46.7216 71.2344 47.6007 71.2344 48.5C71.2344 49.7059 70.7554 50.8624 69.9027 51.7151C69.05 52.5678 67.8935 53.0469 66.6876 53.0469Z"
                  fill="#111111"
                />
              </svg>
              <p className="action-button-text text-muted fw-bold">{post.commentsCtr} comments</p>
            </div>
          </div>
          <p className="card-caption_content display-linebreak">
            <span className="post-sender fw-bold">{post.user.username} </span>
            {post.caption}
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Post;
