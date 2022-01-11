import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Components
import Logo from '../Reusable/Logo';
import { Button } from 'react-bootstrap';

// Helper
import { generateId } from '../../helper/functions';

function AddPostPopup(props) {
  // Variables
  const [publicId, setPublicId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [widget, setWidget] = useState({});

  useEffect(() => {
    const widgetCloud = window.cloudinary.createUploadWidget(
      {
        cloudName: 'projekiso',
        uploadPreset: 'upload-posts',
        public_id: generateId(100, 1)
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log(result);
          const publicIDs = result.info.public_id.replace('user/posts/', '');
          const imageUrls = result.info.secure_url;
          setPublicId(publicIDs);
          setImageUrl('');
          setImageUrl((prevState) => imageUrls);
        }
      }
    );

    setWidget(widgetCloud);
  }, []);

  useEffect(() => {
    setIsAddingPost(props.showing);
  }, [props.showing]);

  const handleSubmitAddPost = async (e) => {
    e.preventDefault();
    const data = {
      image_id: publicId,
      description: e.target.description.value
    };

    await axios
      .post(
        `${process.env.REACT_APP_BASE_API_URL}/api/users/post/upload`,
        {
          caption: data.description,
          cloudinary_id: data.image_id,
          type: 1,
          tag: data.description.match(/#[a-z0-9_]+/gi).join(',')
        },
        {
          headers: {
            'x-auth-token': JSON.parse(localStorage.getItem('x-auth-token'))
          }
        }
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.info(err);
      });
  };

  return (
    <div className={`addpost-popup ${!isAddingPost ? 'hidden' : ''}`}>
      <div
        className="bg-dimmed"
        onClick={() => {
          setIsAddingPost(false);
          props.closePopup();
        }}></div>
      <div className="addpost-container">
        <div
          className="addpost-image"
          key={imageUrl}
          onClick={() => {
            widget.open();
          }}>
          {imageUrl.length > 0 && (
            <img src={`${imageUrl}`} alt="" className="addpost-image_content" />
          )}
          {imageUrl.length === 0 && (
            <React.Fragment>
              <Logo className={'addpost-icon'} />
              <p className="text-muted fw-bold">Click to add image or video</p>
            </React.Fragment>
          )}
        </div>
        <div className="addpost-description">
          <form action="#" method="post" onSubmit={handleSubmitAddPost} className="form-addpost">
            <textarea
              name="description"
              className="addpost-textarea form-control"
              placeholder="What's the caption would be?"></textarea>
            <Button variant="primary" type="submit">
              Post
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPostPopup;
