import React from 'react';
import { Image } from 'cloudinary-react';
import { Link, useNavigate } from 'react-router-dom';

function ProfileImage(props) {
  const navigate = useNavigate();
  return (
    <Link to={`/profile/${props.username}`}>
      <Image
        cloud_name={'projekiso'}
        publicId={'user/profiles/' + props.publicId}
        fetch-format="auto"
        quality="auto"
        className={`user-image ${props.className ? props.className : ''}`}
      />
    </Link>
  );
}

export default ProfileImage;
