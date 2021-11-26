import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'

const Signin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState();
	
	useEffect(() => {
		const loggedInUser = localStorage.getItem("user");
		if (loggedInUser){
			const foundUser = JSON.parse(loggedInUser);
			setUser(foundUser);
		}
	}, []);
	
	const handleLogout = () => {
		setUser({});
		setEmail("");
		setPassword("");
		localStorage.clear();
	};
	const handleSubmit = async e => {
		e.preventDefault();
		const user = { email, password };

		document.getElementById("error").innerHTML = "";
		axios.get('/user/login?email='+user.email+"&password="+user.password)
				.then((response) => {
					setUser(response.data);
					if (response.data.message === "Passwords match") {localStorage.setItem("user", JSON.stringify(user))};
				})
				.catch(() => {
					if (user.password === "" && user.email === ""){document.getElementById("error").innerHTML = "Must provide email. <br> Must provide password."}
					else if (user.email === ""){document.getElementById("error").innerHTML = "Must provide email."}
					else if (user.password === ""){document.getElementById("error").innerHTML = "Must provide password."}
					else{document.getElementById("error").innerHTML = "The email or password is incorrect. Please try again."}
				})
	};
	
	if (user){
		//window.location = '/';
		return (
			<div>
			{user.email} is logged in
			<button onClick = {handleLogout}>logout</button>
			</div>
		);
	}
	return (
				<div className="login-wrap">
					<div className="login-html">
						<input id="tab-1" type="radio" name="tab" className="sign-in" checked/>
						<label for="tab-1" className="tab"> Sign In</label>
						<input id="tab-2" type="radio" name="tab" className="sign-up"/><label for="tab-2" className="tab">Sign up</label>
							<form className="login-form" onSubmit={(e) => handleSubmit(e)}>
								<div className="sign-in-htm">
									<div className="group">
										<label for="email" className="label">Email</label>
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
										<label for="pass" className="label">Password</label>
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
										<a href="#forgot"> Forgot Password?</a>
									</div>
								</div>
							</form>
							<p id="error"></p>
					</div>
				</div>
			);
};

export default Signin