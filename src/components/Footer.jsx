import {Nav} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/css/bootstrap.min.css"
const Footer = () => {
    return (
        <div
            className="container-fluid p-2 mx-0 bg-dark text-white" >
            <Nav style={{fontSize:"125%"}} className="m-0 opacity-50">
                <div className="py-2 px-1">© 2022 Copyright:</div>
                <Nav.Link className="nav-link text-decoration-none text-reset" href="https://vk.com/sebray"> Свиридов Андрей</Nav.Link>
            </Nav>
        </div>
    );
};

export {Footer};