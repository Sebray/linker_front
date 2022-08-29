import React, {useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/css/bootstrap.min.css"

const LoginPage = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useState({
        password: "",
        email: ""
    })
    const [error, setError] = useState(false)
    const [validated, setValidated] = useState(false);

    const changeError = () =>{
        if(error)
            setError(!error);
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setAccount(values => ({...values, [name]: value}))
    }

    const handleSubmit = async(event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            setValidated(true);
        } else {
            await axios.post('http://localhost:8080/api/auth/login', account).then((val) => {
                debugger;
                localStorage.setItem("token", val.data.token)
                 navigate('/account', {replace: true});
            }).catch(() =>{
                setError(true)})
        }
    };

    return (
        <Container>
            <Row>
                <Col  md={{ span: 4, offset: 4 }} className="custom-margin">
                    <Card className="" style={{marginTop:"15%"}} >
                        <Form noValidate validated={validated}  className="was-validated px-2 shadow-lg rounded-3"
                              onSubmit={handleSubmit} onClick={changeError}>
                            <h2>Вход</h2>
                            {error && <span className="mb-3" style={{color:"red"}}>Введён неправильный логин или пароль</span>}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Электронная почта:</Form.Label>
                                <Form.Control name="email" autoComplete="off" onChange={handleChange}
                                              type="email" placeholder="Введите электронную почту"
                                              required/>
                                <Form.Control.Feedback type="invalid">
                                    Введите корректный адрес электронной почты
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Пароль:</Form.Label>
                                <Form.Control name="password" onChange={handleChange}
                                              type="password" placeholder="Пароль"
                                              required/>
                                <Form.Control.Feedback type="invalid">
                                    Введите пароль
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3 ms-2" controlId="formBasicPassword">
                                <Link to="/account/new">Регистрация</Link>
                            </Form.Group>
                            <Button className="mb-3 float-end"  variant="primary" type="submit">
                                Войти
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export {LoginPage};