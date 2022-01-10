import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

// Assets
import '../../css/components/detailPost.css';
import { Image, Video } from 'cloudinary-react';

// Components
import ProfileImage from './ProfileImage';

function DetailPost(props) {
  // variables
  const [searchParams, setSearchParams] = useSearchParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const postId = searchParams.get('post');
    if (postId) {
      getPost(postId);
    } else {
      getPost(props.postId);
    }
  }, []);

  // Handler
  const getPost = async (postId) => {
    console.log(postId);
    await axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/api/users/post/search/${postId}`, {
        headers: {
          'x-auth-token': JSON.parse(localStorage.getItem('x-auth-token'))
        }
      })
      .then((res) => {
        console.log(res);
        setPost((prevPost) => res.data.data);
      });
  };

  const sendComment = async () => {
    const textValue = document.querySelector('.chat-input').value;
    document.querySelector('.chat-input').value = '';

    await axios
      .post(
        `${process.env.REACT_APP_BASE_API_URL}/api/users/post/comment`,
        {
          target_post_id: post.id,
          commentTexts: textValue
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
        getPost(res.data.data.post_id);
      });
  };

  const onKeyDown = (e) => {
    console.log(e.keyCode);
    const input = document.querySelector('.chat-input');
    const el = document.querySelector('.chat-input-container');

    if (e.keyCode === 13) {
      // Enter
      e.preventDefault();

      const isShifting = input.getAttribute('data-shift') === '1';
      if (isShifting) {
        // value input jadi ke bawah
        input.value += '\r\n';

        // Scroll ikut turun
        input.scrollTop = input.scrollHeight - input.clientHeight;
      } else sendComment();
      // sendMessage();
    } else if (e.keyCode === 16) {
      //Shift
      input.setAttribute('data-shift', 1);
    }
  };

  const onKeyUp = (e) => {
    const input = document.querySelector('.chat-input');
    const el = document.querySelector('.chat-input-container');
    const currHeight = el.offsetHeight;
    // Tambah tinggi jika ada line baru
    if (currHeight < 10 * 16 && input.scrollHeight > input.clientHeight) {
      el.style.height = parseInt(currHeight) + 16 + 'px';
    }

    if (e.keyCode === 16) {
      input.setAttribute('data-shift', 0);
    } else if (e.keyCode === 8) {
      const currHeight = el.offsetHeight;
      //Backspace
      if (input.value.length === 0) el.style.height = 16 * 4 + 'px';
      else if (input.clientHeight === input.scrollHeight && el.clientHeight > 16 * 4) {
        el.style.height = parseInt(currHeight) - 16 + 'px';
      }
    }
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

  return (
    <div className="detailpost-container">
      {post && Object.keys(post).length !== 0 && (
        <React.Fragment>
          <div className="detailpost-image_container">
            <Image
              cloud_name={'projekiso'}
              publicId={'user/posts/' + post.cloudinary_id}
              fetch-format="auto"
              quality="auto"
              className="detailpost-image_content"
            />
            {/* <img src={dummyImage} alt="" className="detailpost-image_content" /> */}
          </div>
          <div className="detailpost-content">
            <div className="detailpost-content_header">
              <div className="detailpost-content_header-image">
                <ProfileImage
                  publicId={post.target_user.image_id}
                  username={post.target_user.username}
                />
              </div>
              <div className="detailpost-content_header-user">
                <div className="detailpost-content_header-user_username fw-bold">
                  {post.target_user.username}
                </div>
                <div className="detailpost-content_header-user_followers fw-bold text_small text-muted">
                  {post.target_user.followersCtr} Followers
                </div>
              </div>
            </div>
            <div className="detailpost-content_wrapper">
              <div className="detailpost-content_caption">
                <p>{post.caption}</p>
                <span className="fw-bold text-muted text_small">{post.moment}</span>
              </div>
              <div className="detailpost-content_comments">
                <div className="card-caption_action">
                  <div key={post.isLiked} className={`card-caption_action-button`}>
                    <svg
                      className={`action-button-icon filled ${post.isLiked ? 'selected' : ''}`}
                      viewBox="0 0 1024 1024"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M923 283.6C909.596 252.564 890.269 224.439 866.1 200.8C841.913 177.091 813.396 158.249 782.1 145.3C749.648 131.819 714.841 124.919 679.7 125C630.4 125 582.3 138.5 540.5 164C530.5 170.1 521 176.8 512 184.1C503 176.8 493.5 170.1 483.5 164C441.7 138.5 393.6 125 344.3 125C308.8 125 274.4 131.8 241.9 145.3C210.5 158.3 182.2 177 157.9 200.8C133.7 224.412 114.368 252.544 101 283.6C87.1 315.9 80 350.2 80 385.5C80 418.8 86.8 453.5 100.3 488.8C111.6 518.3 127.8 548.9 148.5 579.8C181.3 628.7 226.4 679.7 282.4 731.4C375.2 817.1 467.1 876.3 471 878.7L494.7 893.9C505.2 900.6 518.7 900.6 529.2 893.9L552.9 878.7C556.8 876.2 648.6 817.1 741.5 731.4C797.5 679.7 842.6 628.7 875.4 579.8C896.1 548.9 912.4 518.3 923.6 488.8C937.1 453.5 943.9 418.8 943.9 385.5C944 350.2 936.9 315.9 923 283.6V283.6Z"
                        fill="#111111"
                        onClick={(e) => {
                          e.stopPropagation();
                          // ganti Toggle Like
                          if (post.isLiked == true) {
                            unlikePost(post.id);
                          } else {
                            likePost(post.id);
                          }
                        }}
                      />
                    </svg>
                    <p className="action-button-text text-muted fw-bold">{post.likesCtr} likes</p>
                  </div>
                </div>
                <div className="detailpost-content_comments-header">
                  <div className="fw-bold text-muted">Comments</div>
                  <div className="fw-bold text-muted text_small">{post.commentsCtr}</div>
                </div>
                <div className="detailpost-content_comments-content">
                  {post.hasComments &&
                    post.comments.map((comment, index) => {
                      return (
                        <div className="card-comments_item" key={index}>
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
                            {comment.moment}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="chat-input-container comment-input">
              <form
                action="#"
                method="post"
                onSubmit={(e) => {
                  e.preventDefault();
                }}>
                <textarea
                  className="form-control chat-input"
                  placeholder="Type here..."
                  name="chat"
                  onKeyDown={onKeyDown}
                  onKeyUp={onKeyUp}></textarea>
                <svg
                  onClick={sendComment}
                  className="send-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21.426 11.095L4.42601 3.09504C4.25482 3.0145 4.0643 2.98416 3.87657 3.00756C3.68883 3.03095 3.51158 3.10713 3.36541 3.22723C3.21923 3.34733 3.11012 3.50644 3.05076 3.68607C2.99139 3.8657 2.98419 4.05849 3.03001 4.24205L4.24201 9.09104L12 12L4.24201 14.909L3.03001 19.758C2.98333 19.9417 2.98992 20.1349 3.04902 20.315C3.10811 20.4951 3.21726 20.6546 3.3637 20.7749C3.51014 20.8953 3.68782 20.9714 3.87594 20.9944C4.06406 21.0175 4.25486 20.9865 4.42601 20.905L21.426 12.905C21.5978 12.8243 21.7431 12.6963 21.8448 12.536C21.9466 12.3758 22.0006 12.1899 22.0006 12C22.0006 11.8102 21.9466 11.6243 21.8448 11.464C21.7431 11.3038 21.5978 11.1758 21.426 11.095V11.095Z"
                    fill="#111111"
                  />
                </svg>
              </form>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default DetailPost;
