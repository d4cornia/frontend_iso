import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileImage(props) {
  const navigate = useNavigate();
  return (
    <Image
      cloud_name={'projekiso'}
      publicId={'user/profiles/' + props.publicId}
      fetch-format="auto"
      quality="auto"
      className={props.className}
      onClick={navigate(`/profile/${props.username}`)}
    />
  );
}

export default ProfileImage;
