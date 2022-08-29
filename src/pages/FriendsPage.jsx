import React, {useState, useEffect} from 'react';
import {Button, ButtonGroup, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Helmet} from "react-helmet";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom"
import moment from "moment";

const FriendsPage = () => {
    const [needRefresh, setNeedRefresh] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [accounts, setAccounts] = useState([]);
    const [accountForSearch, setAccountForSearch] = useState({
        firstName:null,
        lastName:null,
        age:null,
        city:{
            id:null,
            name:null,
            countryId:null
        },
    })

    useEffect(
        ()=>{
            if (needRefresh){
                refresh()
                setNeedRefresh(false)
            }
        },
        [needRefresh]
    )
    const refresh = async()=>{
        setIsLoading(true)
        await axios.get('http://localhost:8080/api/friends',  {
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
        setIsLoading(false)
    }

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
            <Helmet title="Список друзей"/>
            <h2>Друзья</h2>
            <Row>
                <div className="d-flex" style={{maxWidth:1000}}>
                    <Col  md={{ span: 10, offset: 0 }} className="pt-3 custom-margin">
                        {accounts.map((item) => <RenderListItem key={item.id} value={item}/>)}
                    </Col>
                </div>
            </Row>
        </Container>)}

export {FriendsPage};