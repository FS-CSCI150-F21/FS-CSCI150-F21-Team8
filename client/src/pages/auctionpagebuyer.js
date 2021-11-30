import React, {useState,useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from "react-router";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import axios from "axios";


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
  	//console.log(location);  //testing if post from home page passed properly

	const [user, setUser] = useState({
		_id: '',
		displayName: '',
		rating: '',
	});

	const getUserInfo = async () => {
		axios.get(`https://bdh-server.herokuapp.com/user/get?id=${location.state.auction.author}`) //retrieve auction's user information
		 .then((response) => {
			 console.log(response.data)
			//  setUser({...user, _id: response.data[0]._id});
			//  setUser({...user, displayName: response.data[0].displayName});
			//  setUser({...user, rating: response.data[0].rating});
			setUser(response.data[0])
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