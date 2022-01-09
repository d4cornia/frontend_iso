import React from 'react';
import { Image } from 'cloudinary-react';
import { useNavigate } from 'react-router-dom';

function ProfileImage(props) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/profile/${props.username}`);
      }}>
      <Image
        cloud_name={'projekiso'}
        publicId={'user/profiles/' + props.publicId}
        fetch-format="auto"
        quality="auto"
        className={`user-image ${props.className}`}
      />
    </div>
  );
}

export default ProfileImage;
