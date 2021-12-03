import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Form, Image, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditProfile() {

	const [displayName, setDisplayName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [profilePicture, setProfilePicture] = useState('');
	const [rating, setRating] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [description, setDescription] = useState('');
	const [loading, setLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [data, setData] = useState(null);

	const user = JSON.parse(localStorage.getItem('user'))
	console.log(user._id)
	const handleSubmit = () => {
		setLoading(true);
		setIsError(false);
		const data = {
		  displayName: displayName,
		  password: password,
		  email: email,
		  phoneNumber: phoneNumber,
		  description: description,
		  rating: rating,
		  profilePicture: profilePicture
		  
		}
		axios.put('https://bdh-server.herokuapp.com/user/update?id=${user._id}', data).then(res => {
		  setData(res.data);
		  setDisplayName('');
		  setEmail('');
		  setPassword('');
		  setProfilePicture('');
		  setRating('');
		  setDescription('');
		  setPhoneNumber('');
		  setLoading(false);
		}).catch(err => {
		  setLoading(false);
		  setIsError(true);
		});
	  }

// export default class Profile extends React.Component {
// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			email: "",
// 			displayName: "",
// 			password: "",
// 			profilePicture: "",
// 			rating: "",
// 			phoneNumber: "",
// 			description: ""
// 		};
// 	}

	// componentDidMount() {
	// 		// axios.get('http://localhost:5000/user/get?email=test1@gmail.com')
	// 		axios.get('https://bdh-server.herokuapp.com/user/get?email=test1@gmail.com')
	// 			.then((response) => {
	// 				console.log(response.data);
					
	// 				this.setState({
	// 					displayName: response.data[0].displayName,
	// 					email: response.data[0].email,
	// 					password: response.data[0].password,
	// 					phoneNumber: response.data[0].phoneNumber,
	// 					description: response.data[0].description,
	// 					rating: response.data[0].rating,
	// 					profilePicture: response.data[0].profilePicture
	// 				});

	// 				console.log(this.state.displayName);
	// 			})
	// 			.catch(function (error) {
	// 				console.log(error);
	// 		});
	// }

	// render() {	
		return (

			<Container>
				<Row>
				<Col xs={6} md={4}>
				<a href=""><img src="https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg" class="img3"></img></a>
				<input  
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="ProfilePicture"
                    multiple = {false}

                    onChange={e => setProfilePicture(e.target.value)} />
				</Col>

				<Col>
				<Form>
				<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
				<Form.Label column sm="2">
					User Name
					</Form.Label>
					<Col sm="10">
					<input
					type="text"
					className="form-control"
					id="displayName"
					placeholder="Change User name"
					value={displayName}
					onChange={e => setDisplayName(e.target.value)} />
					{/* <Col sm="10"> */}
					{/* <Form.Control plaintext defaultValue= "" />  */}
					</Col>
					{/* <Form.Label column sm="2">
					User Name
					</Form.Label>
					<Col sm="10">
					<Form.Control plaintext defaultValue={this.state.displayName} /> */}
				</Form.Group>

				{/* <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					<Form.Label column sm="2">
					Email
					</Form.Label>
					<Col sm="10">
					<input
					type="text"
					className="form-control"
					id="email"
					placeholder="Change email"
					value={email}
					onChange={e => setEmail(e.target.value)} />
					</Col>
					</Form.Group> */}

				<Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
					<Form.Label column sm="2">
					Password
					</Form.Label>
					<Col sm="10">
					<input
					type="text"
					className="form-control"
					id="password"
					placeholder="Change password"
					value={password}
					onChange={e => setPassword(e.target.value)} />
					{/* <Form.Control plaintext defaultValue= "" />  */}
					</Col>
					</Form.Group>

				<Form.Group as={Row} className="mb-3" controlId="formPlaintextProfileBio">
					<Form.Label column sm="2">
					Profile Bio
					</Form.Label>
					<Col sm="10">
					<input
					type="text"
					className="form-control"
					id="description"
					placeholder="Change Profile Bio"
					value={description}
					onChange={e => setDescription(e.target.value)} />
					{/* <Form.Control plaintext defaultValue= "" />  */}
					</Col>
					</Form.Group>

				{/* <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					<Form.Label column sm="2">
					Rating
					</Form.Label>
					<Col sm="10">
					<input
					type="text"
					className="form-control"
					id="rating"
					placeholder="view rating"
					value={rating}
					onChange={e => setRating(e.target.value)} />
					</Col>
					</Form.Group> */}

				<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					<Form.Label column sm="3">
					Phone Number
					</Form.Label>
					<Col sm="9">
					<input
					type="text"
					className="form-control"
					id="phoneNumber"
					placeholder="Change Phone Number"
					value={phoneNumber}
					onChange={e => setPhoneNumber(e.target.value)} />
					{/* <Form.Control plaintext defaultValue= "" />  */}
					</Col>
					</Form.Group>

				{/* <Button type="submit" onClick={handleSubmit} disabled={loading}>{loading ? 'Loading...' : 'Update'}</Button> */}

				</Form>
				</Col>
				<Button type="submit" onClick={handleSubmit} disabled={loading}>{loading ? 'Loading...' : 'Update'}</Button>
				{/* <Button variant="primary">Edit your Profile</Button>{' '} */}
				</Row>

			</Container>
		);
	}
// }

export default EditProfile;