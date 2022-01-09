import React, { useEffect, useState, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import profilImage from '../../Image/profil.jpg';
import '../../css/Profile.css';
import Validator from '../../helper/validator';
import CustomInput from '../Reusable/CustomInput';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Image, Video } from 'cloudinary-react';
import registerImageSrc from '../../Image/new-register.jpg';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Logo from '../Reusable/Logo';
import { data } from 'jquery';
import { Navigate, useLocation, useSearchParams, useNavigate } from 'react-router-dom';

const EditProfile = (param) => {
  const name = useRef();
  const description = useRef();
  const age = useRef();
  const old_password = useRef();
  const new_password = useRef();
  const confirm_password = useRef();
  const navigate = useNavigate();
  const genID = (length, mode) => {
    const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    let key = '';

    for (let i = 0; i < length; i++) {
      let hash = Math.floor(Math.random() * 2) + 1;
      let model = Math.floor(Math.random() * 2) + 1;
      let randAlpha = Math.floor(Math.random() * alphabets.length);

      if (hash === 1 || mode == 2) {
        key += Math.floor(Math.random() * 10);
      } else if (mode != 2) {
        if (model === 1) key += alphabets[randAlpha];
        else key += alphabets[randAlpha];
      }
    }

    return key;
  };

  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName: 'projekiso',
      uploadPreset: 'upload-profiles',
      public_id: genID(100, 1)
    },
    async (error, result) => {
      if (!error && result && result.event === 'success') {
        console.log('Done! Here is the image info: ', result.info);
        //Panggil API baru
        const updateImage = async () => {
          const temp = await axios
            .patch(
              `${process.env.REACT_APP_BASE_API_URL}/api/users/profile/image/update`,
              {
                new_image_id: result.info.public_id.substring(14)
              },
              {
                headers: {
                  'x-auth-token': JSON.parse(localStorage.getItem('x-auth-token'))
                }
              }
            )
            .then((res) => {
              console.log(res);
            });
        };
        updateImage();
        await getData();
      }
    }
  );

  const [dataProfile, setDataProfile] = useState([]); // Data Following dan Followers
  const [dataProfileUser, setDataProfileUser] = useState([]); //Data Profile
  const [fetchingProfile, setFetchingProfile] = useState(true);

  const params = useLocation();

  const [posts, setPosts] = useState([]);

  // console.log(params.pathname.substring(9));
  const getData = async () => {
    const temp = await axios
      .get(
        `${process.env.REACT_APP_BASE_API_URL}/api/users/profile/${JSON.parse(
          localStorage.getItem('username')
        )}`,
        {
          headers: {
            'x-auth-token': JSON.parse(localStorage.getItem('x-auth-token'))
          }
        }
      )
      .then((res) => {
        console.log(res);
        setDataProfile(res.data.data);
        setDataProfileUser(res.data.data.profile);
        setPosts(res.data.data.posts);
      });
  };
  useEffect(async () => {
    await getData();
    setFetchingProfile(false);
  }, []);

  console.log(dataProfileUser.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    let isError = false;

    if (name.current.state === -1) isError = true;
    else if (Validator.isEmpty(name.current.value)) {
      isError = true;
      name.current.showError(`Name is required`);
    }

    if (description.current.state === -1) isError = true;
    else if (Validator.isEmpty(description.current.value)) {
      isError = true;
      description.current.showError(`Description is required`);
    }

    if (!isError) {
      const updateProfile = async () => {
        const temp = await axios
          .patch(
            `${process.env.REACT_APP_BASE_API_URL}/api/users/profile/update`,
            {
              name: name.current.value,
              description: description.current.value,
              age: age.current.value
            },
            {
              headers: {
                'x-auth-token': JSON.parse(localStorage.getItem('x-auth-token'))
              }
            }
          )
          .then((res) => {
            // console.log(res)
            navigate('/profile/' + JSON.parse(localStorage.getItem('username')));
          });
      };
      updateProfile();
    }
  };

  return (
    <div className={'acontainer'}>
      <div className="register-container">
        <div className="register-image-container d-none d-xl-block">
          <img className="register-image" src={registerImageSrc} alt="Register" />
        </div>
        <div className="register-form-container">
          <div className="register-form-wrapper">
            <Logo className="logo" />
            {!fetchingProfile && (
              <Form className="register-form" onSubmit={handleSubmit}>
                <h2 className={'register-form-title fw-bold'}>Edit Profile</h2>
                <Image
                  cloud_name={'projekiso'}
                  publicId={'user/profiles/' + dataProfileUser.image_id}
                  fetch-format="auto"
                  quality="auto"
                  className="profilepict"
                  onClick={() => {
                    widget.open();
                  }}
                />

                <CustomInput
                  ref={name}
                  name="fullName"
                  label="Name"
                  defaultValue={dataProfileUser.name}
                />
                <CustomInput
                  ref={description}
                  name="description"
                  label="Description"
                  defaultValue={dataProfileUser.description}
                />
                <CustomInput
                  ref={age}
                  name="birth"
                  type="number"
                  label="Age"
                  defaultValue={dataProfileUser.age}
                />

                <Button variant="primary" type="submit" className="form-control">
                  Submit Change
                </Button>
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
