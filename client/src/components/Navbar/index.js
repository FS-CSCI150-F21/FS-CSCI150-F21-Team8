import React from 'react'
//import { NavLink } from 'react-router-dom'
//import logo from './dog.jpg';
import './img.css';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements'
import './img.css'

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavLink to="/">
                    <img src="data:image/png;base64,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" class="img1"></img>
                    {/*<img src={require("../../components/Navbar/dog.jpg")} alt="fresno dog" />*/}
                </NavLink> {/*idk why this doesn't work*/}
                <Bars />


                <NavMenu>
                 <NavLink to="/about" activeStyle >Help</NavLink>

                    {/*<NavLink to="/signup" activeStyle>SignUp</NavLink>*/}
                    {/*<NavLink to="/login" activeStyle>Login</NavLink>*/}


                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/signup">SignUp</NavBtnLink>
                    <NavBtnLink to="/login">Signin</NavBtnLink>
                </NavBtn>

                </Nav>
        </>
        )

}

export default Navbar