import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default class Body extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			displayName: "",
			password: "",
			profilePicture: "",
			rating: "",
			phoneNumber: "",
			description: ""
		};
	}

	componentDidMount() {
			axios.get('http://localhost:5000/user/get?email=test7@gmail.com')
				.then((response) => {
					console.log(response.data);
					
					this.setState({
						displayName: response.data[0].displayName,
						email: response.data[0].email,
						password: response.data[0].password,
						phoneNumber: response.data[0].phoneNumber,
						description: response.data[0].description,
						rating: response.data[0].rating,
						profilePicture: response.data[0].profilePicture
					});

					console.log(this.state.displayName);
				})
				.catch(function (error) {
					console.log(error);
			});
	}

	render() {	
		return (
			// <div className="Body">
			// 	<div className="userProfilePicture">
			// 		<img src="https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg" class="img2"></img>
	
			// 		<tr className="update picture">
			// 			<td> </td>
			// 			<td></td>
			// 			<td></td>
			// 			<td></td>
			// 			<td>
			// 				<button> Update Picture </button>
			// 			</td>
			// 		</tr>
	
			// 		<tr className="displayUserName">
			// 			<td></td>
			// 			<td></td>
			// 			<td></td>
			// 			<td></td>
			// 			<td> John Doe </td>
			// 		</tr>
			// 	</div>
	
			// 	<div className="userInfo">
			// 		<table>
			// 			<tr className="userName">
			// 				<td> UserName </td>
			// 				<td colSpan="2"> <input type="text" value={this.state.displayName} readOnly="readyOnly"></input></td>
			// 			</tr>
	
			// 			{/* <tr className="Password">
			// 				<td> Password </td>
			// 				<td colSpan="2"> <input type="text" value={this.state.password} readOnly="readyOnly"></input></td>
			// 			</tr>
	
			// 			<tr className="forgotPassword">
			// 				<td></td>
			// 				<input type="text" value={this.state.password} readOnly="readyOnly"></input>
			// 			</tr> */}
	
			// 			<tr className="ProfileBio">
			// 				<td> Profile Bio (optional) </td>
			// 				<td colSpan="2"> <input type="text" value={this.state.description} readOnly="readyOnly"></input></td>
			// 			</tr>
	
			// 			<tr className="Rating">
			// 				<td> Rating </td>
			// 				<td colSpan="2"> <input type="text" value={this.state.rating} readOnly="readyOnly"></input></td>
			// 			</tr>
	
			// 			<tr className="Email">
			// 				<td> Email </td>
			// 				<td colSpan="2"> <input type="text" value = {this.state.email} readOnly="readyOnly" ></input></td>
			// 			</tr>
	
			// 			<tr className="PhoneNumber">
			// 				<td> Phone Number </td>
			// 				<td colSpan="2"> <input type="text" value={this.state.phoneNumber} readOnly="readyOnly"></input></td>
			// 			</tr>
	
			// 			<tr className="editProfileOption">
			// 				<td> </td>
			// 				<td>
			// 					<button> Edit your Profile</button>
			// 				</td>
			// 			</tr>
			// 		</table>
	
			// 	</div>
			// </div>

			<Container>
				<Form>
				
				<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					<Form.Label column sm="2">
					User Name
					</Form.Label>
					<Col sm="10">
					<Form.Control plaintext readOnly defaultValue={this.state.displayName} />
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					<Form.Label column sm="2">
					Email
					</Form.Label>
					<Col sm="10">
					<Form.Control plaintext readOnly defaultValue={this.state.email} />
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
					<Form.Label column sm="2">
					Password
					</Form.Label>
					<Col sm="10">
					<Form.Control type="password" placeholder={this.state.description} />
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mb-3" controlId="formPlaintextProfileBio">
					<Form.Label column sm="2">
					Profile Bio
					</Form.Label>
					<Col sm="10">
					<Form.Control plaintext readOnly defaultValue={this.state.description} />
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					<Form.Label column sm="2">
					Rating
					</Form.Label>
					<Col sm="10">
					<Form.Control plaintext readOnly defaultValue={this.state.rating} />
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					<Form.Label column sm="2">
					Phone Number
					</Form.Label>
					<Col sm="10">
					<Form.Control plaintext readOnly defaultValue={this.state.phoneNumber} />
					</Col>
				</Form.Group>
				
				</Form>

				<Button variant="primary">Edit your Profile</Button>{' '}
			</Container>
		);
	}
}