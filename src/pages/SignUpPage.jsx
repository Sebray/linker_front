import React, { useState, useEffect } from "react";
import {Form, Card, Button, Container, Row, Col} from "react-bootstrap";
import axios from "axios";
import Select from "react-select";
import {useNavigate} from "react-router-dom";

const SignUpPage=() => {
    const [errors, setErrors] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        password2: "",
    });

    const [account, setAccount] = useState({
        birthday: "",
        cityId: "",
        email:"",
        firstName:"",
        lastName:"",
        password:"",
        password2: "",
        description:"",
    });

    const [password2, setPassword2] = useState("")
    const [needRefresh, setNeedRefresh] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [countries, setCountries] = useState();
    const [cities, setCities] = useState();
    const [countryId, setCountryId] = useState(0);
    const navigate = useNavigate();

    useEffect(
        ()=>{
            if (needRefresh){
                refresh()
                setNeedRefresh(false)
            }
        },
        [needRefresh]
    )

    const refresh =async()=> {
        setIsLoading(true)
        {
            if (!!!countries)
                await axios.get('http://localhost:8080/api/countries', {
                    headers: {
                        Authorization: 'Bearer_' + localStorage.getItem("token"),
                        'Access-Control-Allow-Origin': "*",
                        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                    }
                },).then((countries) => {
                    debugger;
                    setCountries(countries.data);
                }).catch(error => {
                    console.log("Не удалось получить список стран")
                })

            if (countryId !== 0) {
                await axios.get('http://localhost:8080/api/cities', {
                    params: {"countryId": countryId},
                    headers: {
                        Authorization: 'Bearer_' + localStorage.getItem("token"),
                        'Access-Control-Allow-Origin': "*",
                        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                    }
                }).then((cities) => {
                    debugger;
                    setCities(cities.data);
                }).catch(error => {
                    console.log("Не удалось получить список городов")
                })
            }
            setIsLoading(false)
        }
    }
    const submitFormData = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        const newErrors = findFormErrors()
        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors)
        }
        else {
            axios.post('http://localhost:8080/api/reg', account,  {
                headers: {
                    'Access-Control-Allow-Origin': "*",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                }
            }).then((account) => {
                alert("На вашу почту отправлена ссылка для завершения регистрации. Перейдите по ней и авторизируйтесь")
                navigate('/', {replace: false})
            }).catch(error => {
                if(error.response)
                    navigate('/', {replace: true});
                console.log(error)})
        }
    };

    const findFormErrors = () => {
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        const { firstName, lastName, password, email } = account
        const newErrors = {}
        if (!reg.test(email)) newErrors.email = 'Введите корректную почту'
        if ( !firstName || firstName === '' ) newErrors.firtName = 'Введите имя'
        if ( !lastName || lastName === '' ) newErrors.lastName = 'Введите фамилию'
        if ( !password || password === '' ) newErrors.password = 'Введите пароль'
        else if (password !== password2) newErrors.password2 = 'Пароли не совпадают'
        return newErrors
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setAccount(values => ({...values, [name]: value}))
    }

    return (
        <Col  md={{ span: 4, offset: 4 }} className="custom-margin">
            <Card className="" style={{marginTop: "3%"}}>
                <Form className="px-2 shadow-lg rounded-3"
                      onSubmit={submitFormData}>
                    <h2>Регистрация</h2>
                    <Form.Group className="mb-3">
                        <Form.Label>Имя:</Form.Label>
                        <Form.Control name="firstName" onChange={handleChange}
                                      placeholder="Введите имя"
                                      isValid={errors.firstName !== ""}
                                      isInvalid={!!errors.firstName}/>
                        <Form.Control.Feedback type="invalid">
                            Введите имя
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Фамилия:</Form.Label>
                        <Form.Control name="lastName" onChange={handleChange}
                                      placeholder="Введите фамилию"
                                      isValid={errors.lastName !== ""}
                                      isInvalid={!!errors.lastName}/>
                        <Form.Control.Feedback type="invalid">
                            Введите фамилию
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="w-25 mb-3">
                        <Form.Label>Дата Рождения:</Form.Label>
                        <Form.Control name="birthday"
                                      onChange={handleChange}
                                      type="date"
                        />
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="formBasicEmail">
                        <Form.Label>Почта:</Form.Label>
                        <Form.Control name="email" onChange={handleChange}
                                      type="email" placeholder="Введите почту"
                                      isValid={errors.email !== ""}
                                      isInvalid={!!errors.email}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="formBasicPassword">
                        <Form.Label>Пароль:</Form.Label>
                        <Form.Control name="password" onChange={handleChange}
                                      type="password" placeholder="Введите пароль"
                                      isValid={errors.password !== ""}
                                      isInvalid={!!errors.password}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control name="password2" onChange={(e) => setPassword2(e.target.value)}
                                      type="password" className="" placeholder="Повторите пароль"
                                      isValid={errors.password2 !== "" && errors.password2 === errors.password}
                                      isInvalid={!!errors.password2}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.password2}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Select getOptionValue={option => option.id}
                            getOptionLabel={option => option.name}
                            placeholder="Выберите страну"
                            options={countries}
                            onChange={(e)=>{setCountryId(e.id); setNeedRefresh(true)}}
                    />
                    {countryId !== 0 && <Select getOptionValue={option => option.id}
                                                getOptionLabel={option => option.name}
                                                placeholder="Выберите город"
                                                options={cities}
                                                onChange={(e)=>{debugger; setAccount(values => ({...values, ["cityId"]: e.id}))}}
                    />
                    }
                    <Form.Group className="mt-3">
                    <textarea className="w-100" name="description" onChange={handleChange}
                              placeholder="Расскажите о себе"/>
                    </Form.Group>
                    <Button className="mb-4 float-end" variant="primary" type="submit">
                        Зарегистрироваться
                    </Button>
                </Form>
            </Card>
        </Col>
    );
};

export {SignUpPage}