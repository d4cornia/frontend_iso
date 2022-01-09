import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import profilImage from '../../Image/profil.jpg';
import '../../css/Profile.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Image, Video } from 'cloudinary-react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import { data } from 'jquery';
import { useLocation, useSearchParams, useNavigate, navigate } from 'react-router-dom';

const Profile = (param) => {
  const [dataProfile, setDataProfile] = useState([]); // Data Following dan Followers
  const [dataProfileUser, setDataProfileUser] = useState([]); //Data Profile

  const params = useLocation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  // console.log(params.pathname.substring(9));

  useEffect(() => {
    const getData = async () => {
      const temp = await axios
        .get(
          `${process.env.REACT_APP_BASE_API_URL}/api/users/profile/${params.pathname.substring(9)}`,
          {
            headers: {
              'x-auth-token': JSON.parse(localStorage.getItem('x-auth-token'))
            }
          }
        )
        .then((res) => {
          // console.log(res)
          setDataProfile(res.data.data);
          setDataProfileUser(res.data.data.profile);
          setPosts(res.data.data.posts);
        });
    };
    getData();
  }, []);

  console.log(dataProfileUser.image_id);

  return (
    <div>
      <div className={'container'}>
        <h3 className={'center'}>Profile</h3>
        <div className={'profile'}>
          <div className="profile-photo">
            {/* <img className={'profile-image'} src={profilImage} alt="Profil Image" /> */}
            <Image
              cloud_name={'projekiso'}
              publicId={'user/profiles/' + dataProfileUser.image_id}
              fetch-format="auto"
              quality="auto"
              className="profilepict"
            />
          </div>
          <div className={'profile-description'}>
            <div className="profile-username">
              <h5>{dataProfileUser.username}</h5>
              <Button
                variant="secondary"
                type="submit"
                className="form-control"
                onClick={() => {
                  navigate('/editProfile');
                }}>
                Edit Profile
              </Button>
            </div>
            <div className="followers">
              <h6 className="count">{dataProfile.postsCtr} posts</h6>
              <h6 className="count">{dataProfileUser.followersCtr} followers</h6>
              <h6 className="count">{dataProfileUser.followingCtr} following</h6>
            </div>
            <div className="profile-name">
              <h4>{dataProfileUser.name}</h4>
            </div>
          </div>
        </div>
        <div className="profile-post">
          <Container>
            <Row>
              {posts.map((post) => {
                if (parseInt(post.status) == 1) {
                  return (
                    <Col xs={4} sm={4} md={4} lg={4}>
                      <Image
                        cloud_name={'projekiso'}
                        publicId={'user/posts/' + post.cloudinary_id}
                        fetch-format="auto"
                        quality="auto"
                        className="post"
                      />
                    </Col>
                  );
                } else if (parseInt(post.status) == 2) {
                  <Col xs={4} sm={4} md={4} lg={4}>
                    <Video
                      cloudName={'projekiso'}
                      publicId={'user/posts/' + post.cloudinary_id}
                      controls={true}
                      quality="auto"
                      className="post"
                    />
                  </Col>;
                }
              })}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Profile;
