// import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
import { Image, Video } from 'cloudinary-react';
import React, { useEffect, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import 'css/Home.css';
import profilImage from 'Image/profil.jpg';

import { db } from 'helper/fbconfig';
import { collection, getDocs, addDoc } from '@firebase/firestore';
import Navigation from 'Components/Reusable/Navigation';

const Home = () => {
  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName: 'projekiso',
      uploadPreset: 'upload-posts',
      public_id: 'random gen'
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        console.log('Done! Here is the image info: ', result.info);
      }
    }
  );

  const getReport = async () => {
    const data = await getDocs(dataReport);
    setReport(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const [report, setReport] = useState([]);

  const dataReport = collection(db, 'report');

  useEffect(() => {
    getReport();
  }, []);

  // const addReport = async () => {
  //   await addDoc(dataReport, {
  //     user_id: id1,
  //     reported_user_id: id2,
  //     created_at: new Date(),
  //     deleted_at: null
  //   });
  // };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    console.log(e.target.commentText.value);
  };
  const toggleCommentButton = (e) => {
    if (e.target.value.length > 0 && !allowPost) {
      setAllowPost(true);
    } else {
      setAllowPost(false);
    }
  };

  const [isFollowing, setIsFollowing] = useState(false); // database
  const [showComments, setShowComments] = useState(false); //dipisah per item
  const [allowPost, setAllowPost] = useState(false); // dipisah per item

  const isLiked = true;

  return (
    <div className={'content-container center-items'}>
      <Navigation profileImage={profilImage} selected="home" />
      <Card className="post-card">
        <Card.Body>
          <div className="card-head">
            <img className={'card-head_image'} src={profilImage} alt="Profil Image" />
            <div className="card-head_profile">
              <h5 className="card-head_profile-name">Joe Sentosa</h5>
              <p className="card-head_profile-followers text_small fw-bold text-muted">
                18k Followers • {isFollowing && <span>Following</span>}{' '}
                {!isFollowing && (
                  <span
                    className="follow-button link"
                    onClick={() => {
                      setIsFollowing(true); // ganti call api
                    }}>
                    Follow
                  </span>
                )}
              </p>
              <p className="post-created fw-bold text-muted">2h</p>
            </div>
          </div>
          <div className="card-content">
            <Image
              cloud_name={'projekiso'}
              publicId="sample"
              fetch-format="auto"
              quality="auto"
              className="card-content_image"
            />
          </div>
          <div className="card-caption">
            <div className="card-caption_action">
              <div className="card-caption_action-like-button">
                <svg
                  className={`like-icon`}
                  viewBox="0 0 1024 1024"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M923 283.6C909.596 252.564 890.269 224.439 866.1 200.8C841.913 177.091 813.396 158.249 782.1 145.3C749.648 131.819 714.841 124.919 679.7 125C630.4 125 582.3 138.5 540.5 164C530.5 170.1 521 176.8 512 184.1C503 176.8 493.5 170.1 483.5 164C441.7 138.5 393.6 125 344.3 125C308.8 125 274.4 131.8 241.9 145.3C210.5 158.3 182.2 177 157.9 200.8C133.7 224.412 114.368 252.544 101 283.6C87.1 315.9 80 350.2 80 385.5C80 418.8 86.8 453.5 100.3 488.8C111.6 518.3 127.8 548.9 148.5 579.8C181.3 628.7 226.4 679.7 282.4 731.4C375.2 817.1 467.1 876.3 471 878.7L494.7 893.9C505.2 900.6 518.7 900.6 529.2 893.9L552.9 878.7C556.8 876.2 648.6 817.1 741.5 731.4C797.5 679.7 842.6 628.7 875.4 579.8C896.1 548.9 912.4 518.3 923.6 488.8C937.1 453.5 943.9 418.8 943.9 385.5C944 350.2 936.9 315.9 923 283.6V283.6ZM512 814.8C512 814.8 156 586.7 156 385.5C156 283.6 240.3 201 344.3 201C417.4 201 480.8 241.8 512 301.4C543.2 241.8 606.6 201 679.7 201C783.7 201 868 283.6 868 385.5C868 586.7 512 814.8 512 814.8Z"
                    fill="#111111"
                  />
                </svg>
                <svg
                  className={`like-icon filled ${isLiked ? 'selected' : ''}`}
                  viewBox="0 0 1024 1024"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M923 283.6C909.596 252.564 890.269 224.439 866.1 200.8C841.913 177.091 813.396 158.249 782.1 145.3C749.648 131.819 714.841 124.919 679.7 125C630.4 125 582.3 138.5 540.5 164C530.5 170.1 521 176.8 512 184.1C503 176.8 493.5 170.1 483.5 164C441.7 138.5 393.6 125 344.3 125C308.8 125 274.4 131.8 241.9 145.3C210.5 158.3 182.2 177 157.9 200.8C133.7 224.412 114.368 252.544 101 283.6C87.1 315.9 80 350.2 80 385.5C80 418.8 86.8 453.5 100.3 488.8C111.6 518.3 127.8 548.9 148.5 579.8C181.3 628.7 226.4 679.7 282.4 731.4C375.2 817.1 467.1 876.3 471 878.7L494.7 893.9C505.2 900.6 518.7 900.6 529.2 893.9L552.9 878.7C556.8 876.2 648.6 817.1 741.5 731.4C797.5 679.7 842.6 628.7 875.4 579.8C896.1 548.9 912.4 518.3 923.6 488.8C937.1 453.5 943.9 418.8 943.9 385.5C944 350.2 936.9 315.9 923 283.6V283.6Z"
                    fill="#111111"
                  />
                </svg>
              </div>
              <p className="like-count text-muted">100k likes</p>
            </div>
            <p className="card-caption_content">
              <span className="post-sender fw-bold">joesentosa1511 </span>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat accusantium
              perspiciatis id minus quo provident officia voluptas tempore, architecto explicabo
              iure optio ab quos nostrum consectetur amet dicta necessitatibus alias!
            </p>
          </div>
          <div className={`card-comments ${showComments ? 'show' : ''}`}>
            <p className="text-muted fw-bold">Comments Section</p>
            <p className="empty-state-text">Be the first to comment...</p>
            <div className="card-comments_item">
              <img className={'card-comments_item-profile'} src={profilImage} alt="Profil Image" />
              <p className="card-comments_item-content">
                <span className="card-comments_item-content_sender fw-bold">joesentosa1511 </span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga esse laudantium
                placeat, temporibus dolorum expedita quibusdam laboriosam minus nostrum! Pariatur
                ipsa odio quo repellendus asperiores molestias, aut inventore molestiae accusamus
                ducimus perspiciatis distinctio veritatis nisi, enim dolorem ipsam explicabo unde.
                Itaque provident neque quidem in? Labore doloribus atque harum debitis!
              </p>
              <p className="card-comments_item-createdTime text_small fw-bold">8m ago</p>
            </div>
            {showComments && (
              <p
                className="link fw-bold text-muted text-center"
                onClick={() => {
                  setShowComments(false);
                }}>
                Hide Comments
              </p>
            )}
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
              onBlur={toggleCommentButton}
              onInput={toggleCommentButton}></textarea>
            <p className={`post-comment ${allowPost ? '' : 'disabled'}`}>Post Comment</p>
          </form>
        </Card.Footer>
      </Card>
      <hr />
      <Card style={{ width: '42.5rem' }}>
        <Card.Body>
          <div className="card-head">
            <img className={'image'} src={profilImage} alt="Profil Image" />
            <div className="user">
              <Card.Title>Card Title</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
            </div>
          </div>
          <div className="post-image">
            <Video
              style={{ width: '40rem' }}
              cloudName={'projekiso'}
              publicId="samples/elephants"
              controls={true}
              quality="auto"
            />
          </div>
        </Card.Body>
        <Card.Footer>
          <div className="caption">
            <h6>joesentosa1511 </h6>
            <div className="isi-caption">
              <h6>Bunga yg indah...</h6>
            </div>
          </div>
        </Card.Footer>
      </Card>

      <button
        onClick={() => {
          widget.open();
        }}
        className="cloudinary-button">
        Upload files
      </button>
    </div>
  );
  {
    /*{report.map((rep)=> {*/
  }
  {
    /*  return (*/
  }
  {
    /*      <div>*/
  }
  {
    /*        <h1>id: {rep.id}</h1>*/
  }
  {
    /*        <h1>userid1: {rep.user_id}</h1>*/
  }
  {
    /*        <h1>userid2: {rep.reported_user_id}</h1>*/
  }
  {
    /*      </div>*/
  }
  {
    /*  );*/
  }
  {
    /*})}*/
  }
};

export default Home;
