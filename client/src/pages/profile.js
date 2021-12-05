import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating'
import { Button, Container, Form, Image, Row, Col } from 'react-bootstrap';

const labels = {
	1: 'Horrendous',
	1.5: 'Poor',
	2: 'Poor+',
	2.5: "OK",
	3: 'OK+',
	3.5: "Good",
	4: 'Good+',
	4.5: 'Excellent',
	5: 'Excellent+'
};

export default class ProfilePage extends React.Component {
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
			let user = JSON.parse(localStorage.getItem('user'))
			console.log(user._id)
			// axios.get('http://localhost:5000/user/get?email=test7@gmail.com')
			axios.get(`https://bdh-server.herokuapp.com/user/get?id=${user._id}`)
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
			<div className='profilebody'>
			<Container>
				<Row>
				<Col xs={6} md={4}>
				<img src={this.state.profilePicture} alt = {""} class="img2"></img>
				</Col>

				<Col>
				<Form>
				<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					<Form.Label column sm="2">
					User Name
					</Form.Label>
					<Col sm="10">
					<Form.Control plaintext readOnly value={this.state.displayName} />
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					<Form.Label column sm="2">
					Email
					</Form.Label>
					<Col sm="10">
					<Form.Control plaintext readOnly value={this.state.email} />
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
					<Form.Label column sm="2">
					Password
					</Form.Label>
					<Col sm="10">
						*******************
					<Link to="/EditProfile"><button className="pwbutton">
					Change your password
					</button>
					</Link>
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
					<div className="profileRating">
						<Box sx={{ width: 200, display: 'flex', alighnItems: 'center',}}>
							<Rating name="read-rating" value = {this.state.rating} readOnly precision={0.5}/>
							<Box sx={{ml: 2}}> {labels[this.state.rating]} </Box>
						</Box>
					</div>
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					<Form.Label column sm="3">
					Phone Number
					</Form.Label>
					<Col sm="9">
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
			</div>
		);
	}
}