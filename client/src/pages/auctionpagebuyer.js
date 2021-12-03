import React, {useState,useEffect} from 'react';
import { Redirect } from 'react-router';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from "react-router";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import axios from "axios";
import { FaTags } from 'react-icons/fa';
import { Table } from '@mui/material';


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

export default function AuctionPageBuyer () {

	let location = useLocation();
  	console.log(location);  //testing if post from home page passed properly

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
  

	/**********************Redirect Auction Page Logic **********************/

	const loggedinuser = JSON.parse(localStorage.getItem('user')) //retrieve info of currently logged in user

	//if noones logged in, only display the auction details, time left, and price. No postbid option
	if (loggedinuser === null){
		return (
			<div className="Body">
				<div className="itempicture">
					<img src={location.state.auction.auctionImages} class="img2"></img> 
				</div>
	
				<div className="ProductDescription">
					<Container>
						<Form classname="auctionDetails">
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

						<div classname="bid-and-timer-wrapper">
							<div classname="auctionTimer">
							enter some sort of highest bid
							</div>

							<div classname="postBid">
							post bid button
							</div>
						</div>
					</Container>
				</div> 
			</div> //end Body 
	
		  ) //end return
	}


	//if logg in user is the author, go to seller's page
	if (loggedinuser._id === location.state.auction.author) {
        console.log ("this is a seller's item")//verify the logged in user is the seller of they
		return <Redirect to={{
			pathname: '/auctionpageseller',
			state: {auction: location.state.auction}
		}}/>
    } 
	
	//else, the logged in user is a buyer, return the buyer's page
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
							<Col sm="" >
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
				</Container>

			</div> 
		</div> //end Body 

  	) //end return
}; //end function AuctionPageBuyer