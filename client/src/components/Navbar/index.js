import React from 'react'
import './img.css';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements'
import './img.css'
import { useContext } from 'react';
import { AuthContext } from '../../App';

const Navbar = () => {
    const [authState, setAuthState] = useContext(AuthContext)
    return (
        <>
            <Nav>
                <NavLink to="/">
                    <img src="https://res.cloudinary.com/bdh-images/image/upload/v1638056313/etc/dog_ige1lb.jpg" className="img1" alt="Home"></img>
                </NavLink>
                <Bars />


                <NavMenu>
                 <NavLink to="/about" activeStyle >Help</NavLink>
                </NavMenu>

                <NavBtn>
                    {!authState && <NavBtnLink to="/signup">SignUp</NavBtnLink>}
                    <NavBtnLink to="/login"> 
                        {!authState ? "Sign In" : "Log Out"}
                    </NavBtnLink>
                    {authState && <NavBtnLink to="/createAuction">Create Auction</NavBtnLink>}
                    {authState && <NavBtnLink to="/profile">Profile</NavBtnLink>}
                </NavBtn>

                </Nav>
        </>
        )

}

export default Navbar