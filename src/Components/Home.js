// import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
import { Image, Video } from 'cloudinary-react';
import React from 'react';

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
      <Image cloud_name={'projekiso'} publicId="sample" fetch-format="auto" quality="auto" />
      <hr />
      <Video cloudName={'projekiso'} publicId="samples/elephants" controls={true} quality="auto" />
      <hr />

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
