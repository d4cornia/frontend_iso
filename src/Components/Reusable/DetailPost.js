import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// Assets
import '../../css/components/detailPost.css';
import { Image, Video } from 'cloudinary-react';

// Dummy Image
import dummyImage from '../../Image/bgregister.jpg';
import ProfileImage from './ProfileImage';

function DetailPost() {
  // variables
  const [searchParams, setSearchParams] = useSearchParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const postId = searchParams.get('post');
  }, []);

  // Handler

  const sendMessage = async () => {
    const textValue = document.querySelector('.chat-input').value;
    document.querySelector('.chat-input').value = '';
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
      } else sendMessage();
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
  return (
    <div className="detailpost-container">
      <div className="detailpost-image_container">
        <img src={dummyImage} alt="" className="detailpost-image_content" />
      </div>
      <div className="detailpost-content">
        <div className="detailpost-content_header">
          <div className="detailpost-content_header-image">
            <ProfileImage publicId="default-user" username="yosss" />
          </div>
          <div className="detailpost-content_header-user">
            <div className="detailpost-content_header-user_username fw-bold">Username</div>
            <div className="detailpost-content_header-user_followers fw-bold text_small text-muted">
              Followers
            </div>
          </div>
        </div>
        <div className="detailpost-content_wrapper">
          <div className="detailpost-content_caption">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, vero.</p>
            <span className="fw-bold text-muted text_small">2h ago</span>
          </div>
          <div className="detailpost-content_comments">
            <div className="card-caption_action">
              <div className={`card-caption_action-button`}>
                <svg
                  className={`action-button-icon filled ${post.isLiked ? 'selected' : ''}`}
                  viewBox="0 0 1024 1024"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M923 283.6C909.596 252.564 890.269 224.439 866.1 200.8C841.913 177.091 813.396 158.249 782.1 145.3C749.648 131.819 714.841 124.919 679.7 125C630.4 125 582.3 138.5 540.5 164C530.5 170.1 521 176.8 512 184.1C503 176.8 493.5 170.1 483.5 164C441.7 138.5 393.6 125 344.3 125C308.8 125 274.4 131.8 241.9 145.3C210.5 158.3 182.2 177 157.9 200.8C133.7 224.412 114.368 252.544 101 283.6C87.1 315.9 80 350.2 80 385.5C80 418.8 86.8 453.5 100.3 488.8C111.6 518.3 127.8 548.9 148.5 579.8C181.3 628.7 226.4 679.7 282.4 731.4C375.2 817.1 467.1 876.3 471 878.7L494.7 893.9C505.2 900.6 518.7 900.6 529.2 893.9L552.9 878.7C556.8 876.2 648.6 817.1 741.5 731.4C797.5 679.7 842.6 628.7 875.4 579.8C896.1 548.9 912.4 518.3 923.6 488.8C937.1 453.5 943.9 418.8 943.9 385.5C944 350.2 936.9 315.9 923 283.6V283.6Z"
                    fill="#111111"
                    onClick={() => {
                      // ganti Toggle Like
                      // likePost(post.id);
                    }}
                  />
                </svg>
                <p className="action-button-text text-muted fw-bold">{post.likesCtr} likes</p>
              </div>
            </div>
            <div className="detailpost-content_comments-header">
              <div className="fw-bold text-muted">Comments</div>
              <div className="fw-bold text-muted text_small">1.3k</div>
            </div>
            <div className="detailpost-content_comments-content">
              <div className="card-comments_item">
                <Image
                  cloud_name={'projekiso'}
                  publicId={'user/profiles/default-user'}
                  fetch-format="auto"
                  quality="auto"
                  className="card-comments_item-profile"
                />
                <p className="card-comments_item-content">
                  <span className="card-comments_item-content_sender fw-bold">username</span>
                  Lorem ipsum dolor sit amet.
                </p>
                <p className="card-comments_item-createdTime text_small fw-bold">2h ago</p>
              </div>
              <div className="card-comments_item">
                <Image
                  cloud_name={'projekiso'}
                  publicId={'user/profiles/default-user'}
                  fetch-format="auto"
                  quality="auto"
                  className="card-comments_item-profile"
                />
                <p className="card-comments_item-content">
                  <span className="card-comments_item-content_sender fw-bold">username</span>
                  Lorem ipsum dolor sit amet.
                </p>
                <p className="card-comments_item-createdTime text_small fw-bold">2h ago</p>
              </div>

              <div className="card-comments_item">
                <Image
                  cloud_name={'projekiso'}
                  publicId={'user/profiles/default-user'}
                  fetch-format="auto"
                  quality="auto"
                  className="card-comments_item-profile"
                />
                <p className="card-comments_item-content">
                  <span className="card-comments_item-content_sender fw-bold">username</span>
                  Lorem ipsum dolor sit amet.
                </p>
                <p className="card-comments_item-createdTime text_small fw-bold">2h ago</p>
              </div>

              <div className="card-comments_item">
                <Image
                  cloud_name={'projekiso'}
                  publicId={'user/profiles/default-user'}
                  fetch-format="auto"
                  quality="auto"
                  className="card-comments_item-profile"
                />
                <p className="card-comments_item-content">
                  <span className="card-comments_item-content_sender fw-bold">username</span>
                  Lorem ipsum dolor sit amet.
                </p>
                <p className="card-comments_item-createdTime text_small fw-bold">2h ago</p>
              </div>

              <div className="card-comments_item">
                <Image
                  cloud_name={'projekiso'}
                  publicId={'user/profiles/default-user'}
                  fetch-format="auto"
                  quality="auto"
                  className="card-comments_item-profile"
                />
                <p className="card-comments_item-content">
                  <span className="card-comments_item-content_sender fw-bold">username</span>
                  Lorem ipsum dolor sit amet.
                </p>
                <p className="card-comments_item-createdTime text_small fw-bold">2h ago</p>
              </div>

              <div className="card-comments_item">
                <Image
                  cloud_name={'projekiso'}
                  publicId={'user/profiles/default-user'}
                  fetch-format="auto"
                  quality="auto"
                  className="card-comments_item-profile"
                />
                <p className="card-comments_item-content">
                  <span className="card-comments_item-content_sender fw-bold">username</span>
                  Lorem ipsum dolor sit amet.
                </p>
                <p className="card-comments_item-createdTime text_small fw-bold">2h ago</p>
              </div>

              <div className="card-comments_item">
                <Image
                  cloud_name={'projekiso'}
                  publicId={'user/profiles/default-user'}
                  fetch-format="auto"
                  quality="auto"
                  className="card-comments_item-profile"
                />
                <p className="card-comments_item-content">
                  <span className="card-comments_item-content_sender fw-bold">username</span>
                  Lorem ipsum dolor sit amet.
                </p>
                <p className="card-comments_item-createdTime text_small fw-bold">2h ago</p>
              </div>

              <div className="card-comments_item">
                <Image
                  cloud_name={'projekiso'}
                  publicId={'user/profiles/default-user'}
                  fetch-format="auto"
                  quality="auto"
                  className="card-comments_item-profile"
                />
                <p className="card-comments_item-content">
                  <span className="card-comments_item-content_sender fw-bold">username</span>
                  Lorem ipsum dolor sit amet.
                </p>
                <p className="card-comments_item-createdTime text_small fw-bold">2h ago</p>
              </div>

              <div className="card-comments_item">
                <Image
                  cloud_name={'projekiso'}
                  publicId={'user/profiles/default-user'}
                  fetch-format="auto"
                  quality="auto"
                  className="card-comments_item-profile"
                />
                <p className="card-comments_item-content">
                  <span className="card-comments_item-content_sender fw-bold">username</span>
                  Lorem ipsum dolor sit amet.
                </p>
                <p className="card-comments_item-createdTime text_small fw-bold">2h ago</p>
              </div>

              <div className="card-comments_item">
                <Image
                  cloud_name={'projekiso'}
                  publicId={'user/profiles/default-user'}
                  fetch-format="auto"
                  quality="auto"
                  className="card-comments_item-profile"
                />
                <p className="card-comments_item-content">
                  <span className="card-comments_item-content_sender fw-bold">username</span>
                  Lorem ipsum dolor sit amet.
                </p>
                <p className="card-comments_item-createdTime text_small fw-bold">2h ago</p>
              </div>

              <div className="card-comments_item">
                <Image
                  cloud_name={'projekiso'}
                  publicId={'user/profiles/default-user'}
                  fetch-format="auto"
                  quality="auto"
                  className="card-comments_item-profile"
                />
                <p className="card-comments_item-content">
                  <span className="card-comments_item-content_sender fw-bold">username</span>
                  Lorem ipsum dolor sit amet.
                </p>
                <p className="card-comments_item-createdTime text_small fw-bold">2h ago</p>
              </div>
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
              onClick={sendMessage}
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
    </div>
  );
}

export default DetailPost;
