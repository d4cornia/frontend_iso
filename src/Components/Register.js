import React from 'react';
import { Form, Button } from 'react-bootstrap';
import registerimage from '../Image/register.jpg';
import '../css/Register.css';
import axios from 'axios';

const Register = () => {
  const reigster = async (obj) => {
    const temp = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/users/register`, {
      username: obj.username,
      name: obj.name,
      email: obj.email,
      age: obj.age,
      description: obj.description,
      password: obj.password,
      confirm_password: obj.confirm_password,
    })

    console.log(temp)
  }

  return (
    <div>
      <div className={'background-reg'}></div>
      <div className={'container'}>
        <div className={'row'}>
          <div className={'image col-sm-12 col-md-5 col-lg-5'}>
            <img
              className={'image-login d-none d-md-block'}
              src={registerimage}
              style={{ width: '80%' }}
            />
          </div>
          <div
            className={'register col-sm-12 col-md-6 col-lg-6'}
            style={{ 'margin-top': '1%', padding: '3%' }}>
            <h3 className={'center'}>Register</h3>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" />
                <Form.Text className="text-muted">
                  {"We'll never share your username with anyone else."}
                </Form.Text>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" />
                <Form.Label>Birth Date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
