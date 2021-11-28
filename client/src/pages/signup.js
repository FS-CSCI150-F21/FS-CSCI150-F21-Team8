import React, { Component } from 'react';
import axios from 'axios'
{/*include hashing system bcrypt*/}
class App extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            displayName: '',
            password: ''
        }
        this.changeUsername = this.changeUsername.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    changeUsername(event) {
        this.setState({
            displayName:event.target.value
        })
    }

    changePassword(event) {
        this.setState({
            password: event.target.value
        })
    }
    changeEmail(event) {
        this.setState({
            email: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault()

        const registered = {
            email: this.state.email,
            displayName: this.state.displayName,
            password: this.state.password
        }

        axios.post("https://bdh-server.herokuapp.com/user", registered)
            .then(response => console.log(response.data))

        window.location = '/'; {/*should return person home */}
    }
    render() {
        return (
            <div>
                <div>
                    <div>
                        <form onSubmit={this.onSubmit}>
                            <input type="email" placeholder="email" onChange={this.changeEmail}
                                value={this.state.email}/> <br/>
                            <input type="text" placeholder="username" onChange={this.changeUsername}
                                value={this.state.displayName}/> <br/>
                            <input type="password" placeholder="password" onChange={this.changePassword}
                                value={this.state.password} /><br />
                            <input type="submit" value="submit"/>
                        </form>
                    </div>
                </div>
            </div>
            );
    }
}
export default App;