import React, {useState, useEffect} from 'react';
import {Button, ButtonGroup, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Helmet} from "react-helmet";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom"
import moment from "moment";

const PeoplePage = () => {
    const navigate = useNavigate();
    const [needRefresh, setNeedRefresh] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [accounts, setAccounts] = useState([]);
    const [accountForSearch, setAccountForSearch] = useState(
    //     {
    //     firstName:null,
    //     lastName:null,
    //     age:null,
    //     city:{
    //         id:null,
    //         name:null,
    //         countryId:null
    //     },
    // }
    )

    useEffect(
        ()=>{
            debugger;
            if (needRefresh)
            {
                refresh()
                setNeedRefresh(false)
            }
        },
        [needRefresh]
    )
    const refresh = async()=>{
        if (accounts.length < 1)
        await axios.get('http://localhost:8080/api/accounts',  {
            params:{accountForSearch},
            headers: {
                Authorization: 'Bearer_' + localStorage.getItem("token"),
                'Access-Control-Allow-Origin': "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            }
        }).then((account) => {
            setAccounts(account.data.content);
        }).catch(error => {
            // if(error.response)
            //     navigate('/', {replace: true});
            console.log(error)})
    }


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setAccountForSearch(values => ({...values, [name]: value}))
    }

    const handleSubmit = async(event) => {
        debugger;
        axios.get('http://localhost:8080/api/accounts',  {
            params:{
                firstName:accountForSearch["firstName"],
                lastName:accountForSearch["lastName"],
                age:accountForSearch["age"],
            },
            headers: {
                Authorization: 'Bearer_' + localStorage.getItem("token"),
                'Access-Control-Allow-Origin': "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            }
        }).then((account) => {
            debugger;
            setAccounts(account.data.content);
        }).catch(error => {
            // if(error.response)
            //     navigate('/', {replace: true});
            console.log(error)})
    };

    function RenderListItem(props) {
        return (
            <div className="border py-2" style={{minWidth:800,marginLeft:9, marginBottom:10 ,boxShadow:"0px 1px 5px"}}>
                <div className="ms-3 pt-2" style={{fontSize:20}}>{props.value.lastName} {props.value.firstName}</div>
                {!!props.value.birthday && <div className="ms-3 pt-2"
                                                style={{fontSize: 20}}>{moment(props.value.birthday).format('DD MMMM, YYYY')}</div>
                }{!!props.value.city && <div className="ms-3 pt-2" style={{fontSize: 18}}>{props.value.city.name}</div>
            }</div>
        );
    }

    return (
        <Container>
            <Helmet title="Список соискателей"/>
            <Row>
                <div className="d-flex" style={{maxWidth:1000}}>
                    <Col  md={{ span: 10, offset: 0 }} className="pt-3 custom-margin">
                        {accounts.map((item) => <RenderListItem key={item.id} value={item}/>)}

                    </Col>
                    <Col  md={{ span: 5, offset: 1 }} className=" custom-margin">
                        <Card className="mb-5 " style={{marginTop: "20px"}}>
                                    <Form  className="px-2 shadow-lg rounded-3"
                                          onSubmit={handleSubmit}>
                                        <h2>Фильтр</h2>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Имя:</Form.Label>
                                            <Form.Control name="firstName" onChange={handleChange}
                                                          placeholder="Имя"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Фамилия:</Form.Label>
                                            <Form.Control name="lastName" onChange={handleChange}
                                                          placeholder="Фамилия"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Возраст:</Form.Label>
                                            <Form.Control name="age" type="number" onChange={handleChange}
                                                          placeholder="Возраст"
                                            />
                                        </Form.Group>
                                        <Button className="mb-3 float-end"  variant="primary" type="submit">
                                            Войти
                                        </Button>
                                    </Form>
                                </Card>
                    </Col>
                </div>
            </Row>
        </Container>)}

export {PeoplePage};