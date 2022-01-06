import React,{useEffect, useState, useRef} from 'react';
import { Form, Button } from 'react-bootstrap';
import profilImage from 'Image/profil.jpg';
import 'css/Profile.css';
import Validator from 'helper/validator';
import CustomInput from 'Components/Reusable/CustomInput';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Image, Video } from 'cloudinary-react';
import registerImageSrc from 'Image/new-register.jpg';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import { data } from 'jquery';
import {useLocation, useSearchParams} from 'react-router-dom';

const EditProfile = (param) => {
    const name = useRef();
    const description = useRef();
    const age = useRef();
    const old_password = useRef();
    const new_password = useRef();
    const confirm_password = useRef();

    const genID = (length, mode) => {
        const alphabets= 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
        let key= '';
    
        for (let i= 0; i < length; i++) {
            let hash= Math.floor(Math.random()*2)+1;
            let model= Math.floor(Math.random()*2)+1;
            let randAlpha= Math.floor(Math.random()*alphabets.length);
    
            if (hash === 1 || mode == 2) {
                key += Math.floor(Math.random()*10);
            } else if(mode != 2) {
                if (model === 1) key+= alphabets[randAlpha];
                else key += alphabets[randAlpha];
            }
        }
    
        return key;
    };

    const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: 'projekiso',
          uploadPreset: 'upload-profiles',
          public_id: genID(100,1)
        },
        async(error, result) => {
          if (!error && result && result.event === 'success') {
            console.log('Done! Here is the image info: ', result.info);
            //Panggil API baru
            const updateImage = async() => {
                const temp = await axios.patch(
                  `${process.env.REACT_APP_BASE_API_URL}/api/users/profile/image/update`, {
                    new_image_id: result.info.public_id.substring(14)
                  },{
                      headers: {
                          'x-auth-token': JSON.parse(localStorage.getItem('x-auth-token'))
                      }
                  }
                ).then((res) => {
                    console.log(res);
                })
            }
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
  const getData = async() => {
    const temp = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}/api/users/profile/${JSON.parse(localStorage.getItem('username'))}`, {
          headers: {
              'x-auth-token': JSON.parse(localStorage.getItem('x-auth-token'))
          }
      }
    ).then((res) => {
      console.log(res)
      setDataProfile(res.data.data);
      setDataProfileUser(res.data.data.profile);
      setPosts(res.data.data.posts);
    })
  }
  useEffect(async() => {
    
    await getData();
    setFetchingProfile(false);
  }, []);

  console.log(dataProfileUser.name)

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

        if(!isError)
        {
            const updateProfile = async() => {
                const temp = await axios.patch(
                  `${process.env.REACT_APP_BASE_API_URL}/api/users/profile/update`, {
                    name: name.current.value,
                    description: description.current.value,
                    age: age.current.value

                  },{
                      headers: {
                          'x-auth-token': JSON.parse(localStorage.getItem('x-auth-token'))
                      }
                  }
                ).then((res) => {
                  // console.log(res)
 
                })
            }
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
            <svg
              className="register-logo"
              viewBox="0 0 292 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.24127e-06 248.511L292 248.511L292 279.574L3.88342e-06 279.574L5.24127e-06 248.511Z"
                fill="#212529"
              />
              <path
                d="M149.013 187.675C135.096 187.675 123.565 184.991 114.42 179.623C105.275 174.256 98.4159 166.9 93.8433 157.556C89.2707 148.013 86.9844 137.178 86.9844 125.051C86.7856 106.76 91.8552 91.7501 102.193 80.0204C112.73 68.0919 128.337 62.1277 149.013 62.1277C169.092 62.1277 184.301 67.8931 194.639 79.424C205.176 90.9549 210.444 106.164 210.444 125.051C210.444 136.78 208.258 147.417 203.884 156.959C199.51 166.502 192.751 174.057 183.605 179.623C174.46 184.991 162.929 187.675 149.013 187.675ZM149.013 162.029C157.76 162.029 164.42 160.14 168.993 156.363C173.764 152.586 176.945 147.814 178.536 142.049C180.126 136.084 180.921 130.12 180.921 124.156C180.921 117.993 180.126 111.929 178.536 105.965C176.945 100.001 173.764 95.1299 168.993 91.3525C164.42 87.5751 157.76 85.6865 149.013 85.6865C140.066 85.6865 133.207 87.6745 128.436 91.6507C123.863 95.4281 120.682 100.299 118.893 106.263C117.303 112.029 116.507 117.993 116.507 124.156C116.507 130.12 117.303 136.084 118.893 142.049C120.682 147.814 123.863 152.586 128.436 156.363C133.207 160.14 140.066 162.029 149.013 162.029Z"
                fill="#212529"
              />
              <path
                d="M267.563 49.7021C257.347 49.7021 250.582 47.2578 247.268 42.369C243.955 37.4803 242.298 31.5052 242.298 24.4437C242.298 17.9253 243.955 12.2218 247.268 7.33309C250.858 2.44435 257.623 0 267.563 0C276.951 0 283.302 2.44435 286.616 7.33309C290.205 12.2218 292 17.9253 292 24.4437C292 31.5052 290.205 37.4803 286.616 42.369C283.302 47.2578 276.951 49.7021 267.563 49.7021Z"
                fill="#212529"
              />
            </svg>
            { !fetchingProfile && 
            <Form className="register-form" onSubmit={handleSubmit}>
              <h2 className={'register-form-title fw-bold'}>Edit Profile</h2>
              <Image
                cloud_name={'projekiso'}
                publicId={"user/profiles/" + dataProfileUser.image_id} 
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
                defaultValue={18}
              />

              <Button variant="primary" type="submit" className="form-control">
                Submit Change
              </Button>
            </Form>
            }
          </div>
        </div>
        
      </div>

    </div>
  );
};

export default EditProfile;
