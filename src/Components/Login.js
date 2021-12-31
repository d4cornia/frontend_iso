import React from 'react'
import {Form, Button} from 'react-bootstrap'
import loginimage from '../Image/login.jpg'
import '../css/Login.css'

const Login = () =>{
    return (
        <div>
            <div className={'background'} >

            </div>
            <div className={'container'} >
                <div className={'row'}>
                    <div className={'image col-sm-12 col-md-5 col-lg-5'} >
                        <img className={'image-login d-none d-md-block'} src={loginimage} style={{"width": '80%'}}/>
                    </div>
                    <div className={'login col-sm-12 col-md-6 col-lg-6'} style={{"margin-top" : '5%', "padding" : '3%'}}>
                        <h3 className={"center"}>Login</h3>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
    
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Login