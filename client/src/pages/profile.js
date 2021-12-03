import React, {Link}  from 'react';
import axios from 'axios';
import { Button, Container, Form, Image, Row, Col } from 'react-bootstrap';


export default class Profile extends React.Component {
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
			// axios.get('http://localhost:5000/user/get?email=test7@gmail.com')
			axios.get('https://bdh-server.herokuapp.com/user/get?email=test7@gmail.com')
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

			<Container>
				<Row>
				<Col xs={6} md={4}>
				<a href=""><img src="https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg" class="img2"></img></a>
				</Col>

				<Col>
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
					{/* <Form.Control type="password" placeholder={this.state.description} /> */}
					<Button variant="primary">Change your Password</Button>{' '}
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
					<Form.Label column sm="5">
					Phone Number
					</Form.Label>
					<Col sm="10">
					<Form.Control plaintext readOnly defaultValue={this.state.phoneNumber} />
					</Col>
				</Form.Group>

				{/* <Button variant="primary" className="buttonE" >Edit your Profile</Button>{' '} */}
				</Form>
				</Col>
				<Link to="/EditProfile"><button>
              	Edit your profile
            	</button>
				</Link>

				{/* <Button variant="primary" className="button1" >Edit your Profile</Button>{' '} */}
				{/* <Button variant="primary">Edit your Profile</Button>{' '} */}
				</Row>

				{/* <Row>
				<Col>
				<Button variant="primary">Change Profile Picture</Button>{' '}
				</Col>
				</Row> */}

			</Container>
		);
	}
}