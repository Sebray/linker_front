import {NavLink, Outlet, useNavigate} from 'react-router-dom';
import {Nav, NavDropdown, Navbar} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/dropDownChild.css"
import {Footer} from "./Footer";

const Layout = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar className="top-0" bg="dark" variant="dark" expand="sm" collapseOnSelect>
                <Navbar.Brand style={{marginLeft: "3%", fontSize: "150%"}}>
                    <NavLink className="nav-link text-decoration-none text-reset" to="/">Linker</NavLink>
                </Navbar.Brand>

                <Navbar.Toggle className="coloring"/>
                {!!localStorage.getItem("token") &&
                    <div className="d-flex text-white" style={{marginLeft: "70%"}}>
                        <NavDropdown id="basic-nav_dropdown"
                                     className="my-auto h5"
                                     title="Вы">

                            <NavDropdown.Item style={{width: "150px"}}
                                              onClick={() => navigate(`/account`)}>Профиль
                            </NavDropdown.Item>
                            <NavDropdown.Item style={{width: "150px"}}
                                              onClick={() => navigate(`/friends`)}>Друзья
                            </NavDropdown.Item>
                            <NavDropdown.Item style={{width: "150px"}}
                                              onClick={() => navigate(`/accounts`)}>Люди
                            </NavDropdown.Item>
                            <NavDropdown.Item style={{width: "150px"}}
                                              onClick={() => navigate(`/`)}>Диалоги
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={() => {localStorage.removeItem('token');
                                    navigate('/')}}>Выход
                            </NavDropdown.Item>
                        </NavDropdown>
                    </div>}
            </Navbar>

            <main style={{minHeight: "81.5vh"}}>
                <Outlet/>
            </main>

            <Footer/>
        </div>
    )
}

export {Layout}