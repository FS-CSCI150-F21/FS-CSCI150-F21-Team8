import React, { Component, useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../App';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating'


const Signin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState();
	const [authState, setAuthState] = useContext(AuthContext)
	// console.log(test)
	useEffect(() => {
		const loggedInUser = localStorage.getItem("user");
		if (loggedInUser){
			const foundUser = JSON.parse(loggedInUser);
			setUser(foundUser);
			setAuthState(true)
		}
	}, []);
	
	const handleLogout = () => {
		setAuthState(false)
		setUser();
		setEmail("");
		setPassword("");
		localStorage.clear();
	};
	const handleSubmit = async e => {
		e.preventDefault();
		const user = { email, password };

		document.getElementById("error").innerHTML = "";
		axios.get('https://bdh-server.herokuapp.com/user/login?email='+user.email+"&password="+user.password)
				.then((response) => {
					console.log(response.data._doc)
					setUser(response.data._doc);
					if (response.data.message === "Passwords match") {
						// user.id = response.data._doc._id
						localStorage.setItem("user", JSON.stringify(response.data._doc))
						localStorage.setItem("email", JSON.stringify(response.data._doc.email))
						setAuthState(true)
					};
					
				})
				.catch((res) => {
					if (user.password === "" && user.email === ""){document.getElementById("error").innerHTML = "Must provide email. <br> Must provide password."}
					else if (user.email === ""){document.getElementById("error").innerHTML = "Must provide email."}
					else if (user.password === ""){document.getElementById("error").innerHTML = "Must provide password."}
					else{document.getElementById("error").innerHTML = "The email or password is incorrect. Please try again."}
					console.log(res)
				})
	};
	
	if (user){
		//window.location = '/';
		return (
			<div className='log'>
				<img src={user.profilePicture} class="profilepic"></img> 
		
				<div className='LogoutBody'>
					<div className="Logouttext">
						{user.displayName} is logged in
					</div>
					<div className="LogoutButton">
						<button onClick = {handleLogout}>logout</button>
					</div>
				</div>
			</div>
		);
	}
	return (
				<div className="login-wrap" style={{textAlign:"center"}}>
					<div className="login-html" >
						{/* <input id="tab-1" type="radio" name="tab" className="sign-in" checked/> */}
						{/* <label for="tab-1" className="tab"> Sign In</label> */}
						{/* <input id="tab-2" type="radio" name="tab" className="sign-up"/><label for="tab-2" className="tab">Sign up</label> */}
							<form className="login-form" onSubmit={(e) => handleSubmit(e)}>
								<div className="sign-in-htm">
									<div className="group">
										<input 
										type="email" 
										placeholder="email" 
										onChange={(e) => setEmail(e.target.value)}
										value={email}
										id="email"
										className="input"
										/>
									</div>
									<div className="group">
										<input 
											type="password" 
											placeholder="password" 
											onChange={(e) => setPassword(e.target.value)}
											value={password}
											id="pass"
											className="input"
											/>
									</div>
									<div clasNames="group">
										<button className="button">Sign in</button>
									</div>
									<div className="hr"></div>
									<div className="foot-lnk">
										{/* <a href="#forgot"> Forgot Password?</a> */}
										<Link to="/forgot">Forgot Password?</Link>
									</div>
								</div>
							</form>
							<p id="error"></p>
					</div>
				</div>
			);
};

export default Signin