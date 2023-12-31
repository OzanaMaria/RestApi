import axios from "axios";
import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthProvider";
import "./Register.css";

export default function SignUp() {
    const roleRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            const newUser = {
                email: emailRef.current.value,
            }
            axios.post('http://localhost:3000/users', newUser,
                {
                    headers: { "Content-Type": "application/json" }
                }
            )
            history("/");
        } catch (error) {
            setError(error.message);
        }

        setLoading(false);
    }

    return (
        <div className="page-container">
            <div className="blue-half"></div>
            <div className="yellow-half"></div>
            <div className="login-container">
                <Card id='card-container-login'>
                    <Card.Body className="card-body">
                        <h2 className='text-center mb-4'>New account</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}

                        <Form className="form-container" onSubmit={handleSubmit}>
                            <Form.Group id='credentials'>

                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    ref={emailRef}
                                    required
                                />
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    ref={passwordRef}
                                    required
                                />

                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control
                                    type='password'
                                    ref={passwordConfirmRef}
                                    required
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                type='submit'
                            >
                                Register
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>

                <div className='w-100 text-center mt-2' id='login-check'>
                    Already have an account? <Link to='/'>Log In</Link>
                </div>
            </div>
        </div>
    );
}