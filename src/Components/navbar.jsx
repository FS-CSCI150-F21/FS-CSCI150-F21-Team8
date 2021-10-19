import React, { Component } from './node_modules/react'
import './css/Main.css'


class Navbar extends Component {
    render() {
        return (
            <nav className="navbar">
                <a href="#home">Logo (Return Home)</a>
                <a href="#ProfilePicture">Profile Picture</a>
            </nav>
        )
    }
}

export default Navbar