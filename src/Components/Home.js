// import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
import { Image, Video } from 'cloudinary-react';
import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import '../css/Home.css';
import profilImage from '../Image/profil.jpg';

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

  return (
    <div className={'container'}>
      <h1>Home</h1>
      <Card style={{ width: '42.5rem' }}>
        <Card.Body>
          <div className="card-head">
            <img className={"image"} src={profilImage} alt="Profil Image" />
            <div className="user">
              <Card.Title>Card Title</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
            </div>
          </div>
          <div className="post-image">
            <Image style={{ width: '40rem' }} cloud_name={'projekiso'} publicId="sample" fetch-format="auto" quality="auto"/>
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
            <img className={"image"} src={profilImage} alt="Profil Image" />
            <div className="user">
              <Card.Title>Card Title</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
            </div>
          </div>
          <div className="post-image">
          <Video style={{ width: '40rem' }} cloudName={'projekiso'} publicId="samples/elephants" controls={true} quality="auto" />
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
};

export default Home;
