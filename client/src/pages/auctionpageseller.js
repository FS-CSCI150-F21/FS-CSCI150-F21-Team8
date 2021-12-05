import React, {useState,useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from "react-router";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import axios from "axios";
import { NavLink } from '../components/Navbar/NavbarElements';
import CountdownTimer from '../components/Navbar/CountdownTimer/CountdownTimer';
//this page is where the seller is redirected to to view their auction

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

export default function AuctionPageSeller () {

	let location = useLocation();
  	console.log(location.state);  //testing if post from home page passed properly
	  //retrieving timestamp for countdowntimer
	let closedate = new Date(location.state.auction.dateClose)
	var timestamp = closedate.getTime();
	console.log(timestamp)	//verify retrieval of timestamp

	const [user, setUser] = useState({
		_id: '',
		displayName: '',
		rating: '',
	});

	const getUserInfo = async () => {
		axios.get(`https://bdh-server.herokuapp.com/user/get?id=${location.state.auction.author}`) //retrieve auction's user information
		 .then((response) => {
			console.log(response.data)
			setUser(response.data[0]);
			console.log("gathered Author Data")
			console.log(user)
		 })
		 .catch(() => {
			 console.log("user data has not been received");
		 })
	};//end getUserInfo
	
	useEffect(() => {
		getUserInfo();
	}, []);
  

	return (
			<div className="Body">
				<div className="itempicture">
					<img src={location.state.auction.auctionImages} class="img2"></img> 
				</div>
	
				<div className="ProductDescription">
					<Container>
						<Form>
							<Form.Group as={Row} className="auctionRows" controlId="formPlaintextItemName">
								<Form.Label column sm="3"> Item Name </Form.Label>
								<Col sm="">
									<Form.Control plaintext readOnly defaultValue={location.state.auction.auctionName} />
								</Col>
							</Form.Group>
	
							<Form.Group as={Row} className="auctionRows" controlId="formPlaintextDescription">
								<Form.Label column sm="3"> Item Description </Form.Label>
								<Col sm="">
								<Form.Control as="textarea" rows="5" plaintext readOnly defaultValue={location.state.auction.auctionDescription} />
								</Col>
							</Form.Group>
	
							<Form.Group as={Row} className="auctionRows" controlId="formPlaintextAuthor">
								<Form.Label column sm="3"> Author Name </Form.Label>
								<Col sm="">
									<Form.Control plaintext readOnly defaultValue={user.displayName} />
								</Col>
								<Col sm="">
									<Box sx={{ width: 200, display: 'flex', alighnItems: 'center',}}>
										<Rating name="read-rating" value = {user.rating} readOnly precision={0.5}/>
										<Box sx={{ml: 2}}> {labels[user.rating]} </Box>
									</Box>
								</Col>
							</Form.Group>
						</Form>

						<div className = "bidBody">
							<div>
							<div> Time Until Auction Closes </div>
							<CountdownTimer countdownTimestampMs={timestamp}/>
							<div> </div>
							</div>

							<div className = "editAuctionOption">
								<NavLink to={{ pathname: '/auctionpagesellerEdit', state: {auction: location.state.auction}}}>
                                    <button className="card-btn" variant="primary"> Edit Auction</button>
                                </NavLink>
							</div>
						</div>

					</Container>
				</div>
			</div>
		  ) //end return
	
}; //end function AuctionPageSeller