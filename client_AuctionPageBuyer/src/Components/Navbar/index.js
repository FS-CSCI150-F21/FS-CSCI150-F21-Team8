import React from 'react'
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './navbarelements';

const Navbar = () => {
    return (
        <>
            <Nav> 
                <NavLink to="/">
                    <h1> Logo </h1>
                </NavLink>
                <Bars />
                <NavMenu> 
                    <NavLink to="/about" activeStyle>
                        About
                    </NavLink>
                    <NavLink to="/services" activeStyle>
                        services
                    </NavLink>
                    <NavLink to="/contact-us" activeStyle>
                        contact us
                    </NavLink>
                    <NavLink to="/sign-up" activeStyle>
                        sign up
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to='signin'> Sign in </NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;
