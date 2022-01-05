import React from 'react';
import { Form, Button } from 'react-bootstrap';
import profilImage from '../Image/profil.jpg';
import '../css/Profile.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Profile = () => {
  return (
    <div className={'container'}>
      <h3 className={'center'}>Profile</h3>
        <div className={"profile"}>
          <div className="profile-photo">
            <img className={"profile-image"} src={profilImage} alt="Profil Image" />
          </div>
          <div className={"profile-description"}>
            <div className="profile-username">
              <h5>joesentosa1511</h5>
              <Button variant="secondary" type="submit" className="form-control" >Edit Profile</Button>
            </div>
            <div className="followers">
                <h6 className='count'>6 posts</h6>
                <h6 className='count'>9,694 followers</h6>
                <h6 className='count'>1,522 following</h6>
            </div>
            <div className="profile-name">
              <h4>Joe Sentosa</h4>
            </div>
          </div>
        </div>
        <div className="profile-post">
        <Container>
          <Row>
            <Col xs={4} sm={4} md={4} lg={4}>
              <img className={"post"} src={profilImage} alt="Profil Image" />
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
              <img className={"post"} src={profilImage} alt="Profil Image" />
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
              <img className={"post"} src={profilImage} alt="Profil Image" />
            </Col>
          </Row>
        </Container>
        </div>
    </div>
  );
};

export default Profile;
