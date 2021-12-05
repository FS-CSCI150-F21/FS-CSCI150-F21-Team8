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
import CountdownTimer from '../components/Navbar/CountdownTimer/CountdownTimer';

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

	/********copying auction data ****************************/
	const auction2 = {
		_id: location.state.auction._id,
        auctionName: location.state.auction.auctionName,
        auctionDescription: location.state.auction.auctionDescription,
        auctionImages: location.state.auction.auctionImages,
        author: location.state.auction.author,
    	startingBid:  location.state.auction.startingBid,
        dateClose:  location.state.auction.dateClose,
        biddingHistory: location.state.auction.biddingHistory,
    }
  
	/**********************Post Bid Logic  ***********************************/

	const loggedinuser = JSON.parse(localStorage.getItem('user')) //retrieve info of currently logged in user

	let put_params = {
		bid:{
			userBidding: "",
			bidAmount: 0,
		}
	};

	var highestBid = ''
	if (location.state.auction.biddingHistory[0] == null){
		highestBid = location.state.auction.startingBid;
	}
	else{
		highestBid = location.state.auction.biddingHistory[location.state.auction.biddingHistory.length-1].bidAmount
	}

	const validateInputs = (put_params) => {
		if (put_params.bid.bidAmount === '' 
		|| put_params.bid.bidAmount === '0'
		|| put_params.bid.bidAmount <= location.state.auction.startingBid
		|| (isNaN(put_params.bid.bidAmount))
		) {
			return true
		} else {
			return false
		}
	}
	const [valid, setValid] = useState(0);
	

	const placeBid= (event) => {
		event.preventDefault();
		if (validateInputs(put_params)){
			setValid(1)
			if(isNaN(put_params.bid.bidAmount)){
				setValid(2)
			}
		}
		else{
			setValid(0)
			if(location.state.auction.biddingHistory[0] == null){
				if(put_params.bid.bidAmount > location.state.auction.startingBid){
					console.log("input number is high enough") //bid amount is acceptable
					setValid(5)
					axios.put(`https://bdh-server.herokuapp.com/auction/update?id=${location.state.auction._id}`, put_params).then((response)=>{
                    	console.log(response.data.message)
                    	})
				}
				
			}
			else{
				if (put_params.bid.bidAmount <= location.state.auction.biddingHistory[location.state.auction.biddingHistory.length-1].bidAmount) {
				setValid(1)
				}
				console.log("input number is high enough") //bid amount is acceptable
				setValid(5)
				console.log(location.state.auction._id)
				axios.put(`https://bdh-server.herokuapp.com/auction/update?id=${location.state.auction._id}`, put_params).then((response)=>{
                    console.log(response.data.message)
					highestBid = location.state.auction.biddingHistory[location.state.auction.biddingHistory.length-1].bidAmount
					setValid(5)
                    })
			}
		}
	};

	if (valid === 5) {
        console.log('redirect')
        return <Redirect to={{ 
            pathname: '/', 
            state: {auction: auction2}
        }}/>
    }

	/**********************Redirect Auction Page Logic **********************/

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

						<div className="bidBody">
						<div className = "auctionTimer">
							<div> Time Until Auction Closes </div>
							<CountdownTimer countdownTimestampMs={timestamp}/>
							<div> </div>
							<div> Current Highest Bid: ${location.state.auction.biddingHistory[location.state.auction.biddingHistory.length -1].bidAmount} </div>
						</div>

							<div classname="PostBids">
								
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
				<Container className="ProductDescriptionContent">
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

					<div className ="bidBody">
						<div className = "auctionTimer">
							<div> Time Until Auction Closes </div>
							<CountdownTimer countdownTimestampMs={timestamp}/>
							<div> </div>
							<div> Current Highest Bid: ${highestBid} </div>
						</div>
						<div className="PostBids">
							<Form onSubmit={placeBid}>
								<div>
									<input  
									type="text"
									placeholder = "Bid Amount"
									name="Bids"
							
									onChange={(event)=>{
										put_params.bid.userBidding = loggedinuser._id
										put_params.bid.bidAmount = event.target.value
									}}
									/>
								</div>
								<div>
                   					<input type='submit'></input>
								</div>
							</Form>
							{valid === 1 && <div>Bid Amount is Too Low</div>}
            				{valid === 2 && <div>Bid must be a number.</div>}
						</div>
					</div>	
				</Container>
			</div> 
		</div> //end Body 

  	) //end return
}; //end function AuctionPageBuyer