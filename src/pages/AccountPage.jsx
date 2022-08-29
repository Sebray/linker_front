import React, {useState, useEffect} from 'react';
import {Button, ButtonGroup, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Helmet} from "react-helmet";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom"
import moment from "moment";

const AccountPage = () => {
    const [needRefresh, setNeedRefresh] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [acc, setAcc] = useState({
        firstName:"",
        lastName:"",
        birthday:0,
        city:{
            id:0,
            name:"",
            countryId:0
        },
        description:"",
    });
    const {id} = useParams();


    useEffect(
        ()=>{
            if (needRefresh){
                refresh()
                setNeedRefresh(false)
            }
        },
        [needRefresh]
    )

    const refresh =async()=>{
        setIsLoading(true)
        {
            await axios.get('http://localhost:8080/api/account/' + id,  {
                headers: {
                    Authorization: 'Bearer_' + localStorage.getItem("token"),
                    'Access-Control-Allow-Origin': "*",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                }
            }).then((account) => {
                setAcc(account.data);
            }).catch(error => {
                if(error.response)
                    navigate('/', {replace: true});
                console.log(error)})
        }
        setIsLoading(false)
    }

    return (
        <Container>
            <Helmet title="Личные данные"/>
            {isLoading?<div>Страница грузится...</div>:

                <Row>
                    <Col  md={{ span: 8, offset: 2 }} className="custom-margin">
                        <Card className="mb-5" style={{marginTop: "20px"}}>
                            <Form style={{fontSize:"135%"}} className="h5 px-2 shadow-lg rounded-3">
                                <div className="d-flex justify-content-center mb-3">
                                    <h2>Личные данные</h2>
                                </div>

                                <div className="mb-3 w-50 me-5" >
                                    <div className="d-flex">
                                        <span className="me-1">Имя: </span>
                                        {acc.firstName}
                                    </div>
                                </div>
                                <div className="mb-3 w-50 me-5" >
                                    <div className="d-flex">
                                        <span className="me-1">Фамилия: </span>
                                        {acc.lastName}
                                    </div>
                                </div>
                                {!!acc.birthday &&
                                    <div className="mb-3 w-50 me-5" >
                                        <div className="d-flex">
                                            <span className="me-1">Дата рождения: </span>
                                            {moment(acc.birthday).format('DD MMMM, YYYY')}
                                        </div>
                                    </div>
                                }
                                {!!acc.city && acc.city.id !==0 && <div className="mb-3 w-50 me-5" >
                                    <div className="d-flex">
                                        <span className="me-1">Город: </span>
                                        {acc.city.name}
                                    </div>
                                </div>}
                                {acc.description !== "" && <div className="mb-3 w-75 me-5" >
                                    <div className="d-flex">
                                        <span className="me-1">Описание: </span>
                                        {acc.description}
                                    </div>
                                </div>}
                                <ButtonGroup  className=" my-2 mt-4  float-end">
                                    <Button variant="primary" onClick={() => navigate(`/account/update`)}>
                                        <span style={{fontSize:"135%"}}>Изменить</span>
                                    </Button>
                                </ButtonGroup>
                            </Form>
                        </Card>
                    </Col>
                </Row>}
        </Container>
    );
};

export {AccountPage}