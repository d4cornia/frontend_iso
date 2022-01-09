import React, { useEffect, useState, Suspense } from 'react';
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

const Home = () => {
  useEffect(() => {
    setIsFetchingData(true);
    // getReport();
    getPosts();
    getFollowers();
    setIsFetchingData(false);
  }, []);
  // Variables
  const [report, setReport] = useState([]);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const dataReport = collection(db, 'report');

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

  // AXIOS

  // Get Post cma untuk awal saja, untuk update data selanjutnya bisa di dalam component post,
  // Nanti pas user refresh halaman baru get post ini kepanggil lagi jdi urutan post gk bakal berubah kecuali user refresh halamannya
  const getPosts = () => {
    // Cuma masukkin dummy, klo misal mau disambungin, yg axios yg di uncomment
    setPosts([
      ...posts,
      {
        id: 1,
        user: {
          isFollowing: false,
          username: 'robby',
          followersCtr: '1.3k',
          image_id: 'robby_pfoish'
        },
        dateNow: '1h',
        cloudinary_id: 'post-dummy',
        isLiked: true,
        likesCtr: '835',
        caption:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, soluta? Corporis, tempore consequuntur? Dolores, adipisci!',
        comments: [
          {
            id: 3,
            user: {
              image_id: 'default-user',
              username: 'Yoyuu'
            },
            comment: 'Lorem ipsum dolor sit amet.',
            dateNow: '3m ago'
          },

          {
            id: 2,
            user: {
              image_id: 'default-user',
              username: 'd4cornia'
            },
            comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            dateNow: '7m ago'
          }
        ]
      }
    ]);

    // const axiosResponse = await axios
    //   .post(
    //     `${process.env.REACT_APP_BASE_API_URL}/api/users/post/following`,
    //     {
    //       size: 10
    //     },
    //     {
    //       headers: {
    //         'x-auth-token': JSON.parse(localStorage.getItem('x-auth-token'))
    //       }
    //     }
    //   )
    //   .then((res) => {
    //     return res.data.data;
    //   });
    // // Waktu itu aku kesusahan gimana caranya pake useState array of object, nnti coba cari bareng" ae
    // setPosts(axiosResponse);
  };

  const getFollowers = () => {
    setFollowers([
      ...followers,
      {
        id: 1,
        username: 'Yosuu',
        subtitle: '1.3k',
        image_id: 'default-user',
        onlineStatus: true
      }
    ]);
  };

  // Reports(Firebase)
  const getReport = async () => {
    const data = await getDocs(dataReport);
    setReport(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // const addReport = async () => {
  //   await addDoc(dataReport, {
  //     user_id: id1,
  //     reported_user_id: id2,
  //     created_at: new Date(),
  //     deleted_at: null
  //   });
  // };

  // Handler

  return (
    <div className={'content-container center-items'}>
      <div className="content-wrapper">
        <div className="posts-container">
          {!isFetchingData &&
            posts.map((post) => {
              return <Post key={post.id} post={post} />;
            })}
        </div>
        <div className="followers-container">
          {!isFetchingData && (
            <AccountList accounts={followers} title="Followers" subtitle={'1.1k followers'} />
          )}
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

      <button
        onClick={() => {
          widget.open();
        }}
        className="cloudinary-button">
        Upload files
      </button>
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
