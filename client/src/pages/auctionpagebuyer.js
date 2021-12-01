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
	
	// state2 = {
	// 	_id: location.state.auction._id,
	// 	auctionName: location.state.auction.auctionName, 
	// 	auctionDescription: location.state.auction.auctionDescription,
	// 	auctionImages: location.state.auction.auctionImages,
	// 	datePosted: location.state.auction.datePosted,
	// 	author: location.state.auction.author,
	// 	biddingHistory: location.state.auction.biddingHistory,
	// 	tags: location.state.auction.tags,
	// 	condition : location.state.auction.condition,
	// 	startingBid: location.state.auction.startingBid,
	// 	dateClose: location.state.auction.dateClose,
	// };

	if (loggedinuser._id === location.state.auction.author) {
        console.log ("this is a seller's item")//verify the logged in user is the seller of they
		return <Redirect to={{
			pathname: '/auctionpageseller',
			state: {auction: location.state.auction}
		}}/>
			
		// return (
		// 	<div className="Body">
		// 		<div className="itempicture">
		// 			<img src={location.state.auction.auctionImages} class="img2"></img> 
		// 		</div>
	
		// 		<div className="ProductDescription">
		// 			<Container>
		// 				<Form>
		// 				<Form.Group as={Row} className="mb-3" controlId="formPlaintextItemName">
		// 						<Form.Label column sm="3"> SellerPage </Form.Label>
		// 						<Col sm="">
		// 							<Form.Control plaintext readOnly defaultValue={location.state.auction.auctionName} />
		// 						</Col>
		// 					</Form.Group>
		// 					<Form.Group as={Row} className="mb-3" controlId="formPlaintextItemName">
		// 						<Form.Label column sm="3"> Item Name </Form.Label>
		// 						<Col sm="">
		// 							<Form.Control plaintext readOnly defaultValue={location.state.auction.auctionName} />
		// 						</Col>
		// 					</Form.Group>
	
		// 					<Form.Group as={Row} className="mb-3" controlId="formPlaintextDescription">
		// 						<Form.Label column sm="3"> Item Description </Form.Label>
		// 						<Col sm="">
		// 							<Form.Control plaintext readOnly defaultValue={location.state.auction.auctionDescription} />
		// 						</Col>
		// 					</Form.Group>
	
		// 					<Form.Group as={Row} className="mb-3" controlId="formPlaintextAuthor">
		// 						<Form.Label column sm="3"> Author Name </Form.Label>
		// 						<Col sm="">
		// 							<Form.Control plaintext readOnly defaultValue={user.displayName} />
		// 						</Col>
		// 						<Col sm="">
		// 							<Box sx={{ width: 200, display: 'flex', alighnItems: 'center',}}>
		// 								<Rating name="read-rating" value = {user.rating} readOnly precision={0.5}/>
		// 								<Box sx={{ml: 2}}> {labels[user.rating]} </Box>
		// 							</Box>
		// 						</Col>
		// 					</Form.Group>
	
		// 				</Form>
		// 			</Container>
		// 		</div>
		// 	</div>
		//   ) //end return
    } //if logged in user is the author, go to seller's display page
  	return (
    	<div className="Body">
        	<div className="itempicture">
            	<img src={location.state.auction.auctionImages} class="img2"></img> 
            </div>

			<div className="ProductDescription">
				<Container>
					<Form>
						<Form.Group as={Row} className="mb-3" controlId="formPlaintextItemName">
							<Form.Label column sm="3"> Item Name </Form.Label>
							<Col sm="">
								<Form.Control plaintext readOnly defaultValue={location.state.auction.auctionName} />
							</Col>
						</Form.Group>

						<Form.Group as={Row} className="mb-3" controlId="formPlaintextDescription">
							<Form.Label column sm="3"> Item Description </Form.Label>
							<Col sm="">
								<Form.Control plaintext readOnly defaultValue={location.state.auction.auctionDescription} />
							</Col>
						</Form.Group>

						<Form.Group as={Row} className="mb-3" controlId="formPlaintextAuthor">
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