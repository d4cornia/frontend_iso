import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

// ASSETS
import '../../css/Home.css';
import profileImage from '../../Image/profil.jpg';
// import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
import { Image, Video } from 'cloudinary-react';

// Firebase for UserReports
import { db } from '../../helper/fbconfig';
import { collection, getDocs, addDoc } from '@firebase/firestore';

// Components
import Post from '../Reusable/Post';
import AccountList from '../Reusable/AccountList';

const Home = (props) => {
  useEffect(() => {
    setIsFetchingData(true);
    // getReport();
    getPosts();
    setIsFetchingData(false);
  }, []);

  // Variables
  const [searchParams, setSearchParams] = useSearchParams();

  const [posts, setPosts] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const dataReport = collection(db, 'report');

  // AXIOS
  const fetchPostData = async () => {
    return await axios
      .post(
        `${process.env.REACT_APP_BASE_API_URL}/api/users/post/following`,
        {
          size: 20
        },
        {
          headers: {
            'x-auth-token': JSON.parse(localStorage.getItem('x-auth-token'))
          }
        }
      )
      .then((res) => {
        console.log(res.data.data);
        return res.data.data;
      });
  };

  const [report, setReport] = useState([]);
  // Reports(Firebase)
  const getReport = async () => {
    const data = await getDocs(dataReport);
    setReport(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
    );
  };

  const addReport = async (targetId) => {
    await addDoc(dataReport, {
      user_id: JSON.parse(localStorage.getItem('id')),
      reported_user_id: targetId,
      created_at: new Date(),
      deleted_at: null
    });
  };

  // Handler
  const masonryScript = () => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js';
    script.async = true;

    document.body.appendChild(script);
  };

  const showDetailPost = (id) => {
    props.showDetailPost(id);
  };

  const getPosts = async () => {
    const allPosts = await fetchPostData();
    setPosts((prevState) => [...allPosts]);
    masonryScript();
  };

  return (
    <div className={'content-container home'}>
      <div className="content-wrapper">
        <div
          className="posts-container js-masonry"
          data-masonry-options='{ "itemSelector": ".post-wrapper", "columnWidth": ".post-wrapper" }'>
          {!isFetchingData && (
            <div className="post-wrapper">
              <h3>
                Hello,{' '}
                <span className="fw-bold secondary-font" style={{ letterSpacing: '.1rem' }}>
                  {JSON.parse(localStorage.getItem('username'))}
                </span>
                !
              </h3>
              <h5 className="text-muted">How is it going?</h5>
            </div>
          )}
          {!isFetchingData &&
            posts.map((post, index) => {
              return (
                <div
                  className="post-wrapper"
                  key={post.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    showDetailPost(post.id);
                  }}>
                  <Post post={post} />
                </div>
              );
            })}
        </div>
      </div>
      {/* <Card style={{ width: '42.5rem' }}>
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
      </Card> */}

      {/* <button
        onClick={() => {
          widget.open();
        }}
        className="cloudinary-button">
        Upload files
      </button> */}
      {/*{report.map((rep)=> {*/}
      {/*  return (*/}
      {/*      <div>*/}
      {/*        <h1>id: {rep.id}</h1>*/}
      {/*        <h1>userid1: {rep.user_id}</h1>*/}
      {/*        <h1>userid2: {rep.reported_user_id}</h1>*/}
      {/*      </div>*/}
      {/*  );*/}
      {/*})}*/}
    </div>
  );
};

export default Home;
