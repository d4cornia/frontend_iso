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
  const [id1, setId1] = useState('');
  const [id2, setId2] = useState('');

  const dataReport = collection(db, 'report');

  useEffect(() => {
    getReport();
  }, []);

  const addReport = async () => {
    await addDoc(dataReport, {
      user_id: id1,
      reported_user_id: id2,
      created_at: new Date(),
      deleted_at: null
    });
  };

  return (
    <div className={'content-container center'}>
      <Navigation />
      {/* <input
        placeholder="id user 1"
        type="id1"
        onChange={(event) => {
          setId1(event.target.value);
        }}
      />
      <input
        placeholder="id user 2"
        type="id2"
        onChange={(event) => {
          setId2(event.target.value);
        }}
      />
      <button onClick={addReport}>Report User</button>
      <h1>Home</h1>
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
            <Image
              style={{ width: '40rem' }}
              cloud_name={'projekiso'}
              publicId="sample"
              fetch-format="auto"
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
      </button>*/}
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
