import React, { useState } from 'react';
import { Container, Form, Col, Row, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Signup = () => {

    const API = import.meta.env.VITE_BASE_URL;
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password_hash: "",
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("State", formData)
        fetch(`${API}/users`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
            
        })
            .then(res => res.json())
            .then(res => {
                // console.log(res)
                // setFormData((prev) => ({
                //     username: '',
                //     email: '',
                //     password_hash: ''
                // }))
                if(res.user.user_id){
                    const { user, token } = res
                    setUser(user)
                    setToken(token)
                    setFormData((prev) => ({
                        username: '',
                        email: '',
                        password_hash: ''
                    }))
                } else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
            navigate('/')
    }


    return (
        <Container style={{ marginTop: "50px"}}>
            <Row>
                <Col md={6}>
                <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Enter your username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            name="password_hash"
                            value={formData.password_hash}
                            onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Signup;