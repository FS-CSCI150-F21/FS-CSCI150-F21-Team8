import React, {useState,useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from "react-router";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import axios from "axios";
import { Redirect } from 'react-router';

//this page is where the seller is redirected to if they want to edit the auction

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

export default function AuctionPageSellerEdit () {
    
	let location = useLocation();
  	console.log(location.state.auction);  //testing if post from home page passed properly

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
    
    /*************edit auction logic ****************/
     const [auction, setAuction] = useState({ 
		auctionName: location.state.auction.auctionName,
        auctionDescription: location.state.auction.auctionDescription,
        auctionImages: location.state.auction.auctionImages
	});
    
	
    const editAuction= (event) => {
		event.preventDefault()
        const iform = new FormData();
        iform.append("file", auction.auctionImages)
        iform.append("upload_preset", "auction")
		let url = ''
		axios.post("https://api.cloudinary.com/v1_1/bdh-images/image/upload", iform).then((res)=>{
			url = res.data.url
			setAuction({...auction, auctionImages: url})
			auction.auctionImages = url
			console.log("below is current auction images")
			console.log(auction.auctionImages)
			axios.put(`https://bdh-server.herokuapp.com/auction/update?id=${location.state.auction._id}`, auction).then((response)=>{
				console.log(response.data.message)
				console.log(location.state.auction.auctionImages)
				})
		})
    }

	/*****************Delete Auction Logic *****************************/
	const handleDelete = () => {
		console.log("attempting delete")
		axios.delete(`https://bdh-server.herokuapp.com/auction/delete?id=${location.state.auction._id}`).then((response)=>{
			console.log(response.data.message)
			console.log(location.state.auction.auctionName)
		})

	}

	return (
			<div className="Body">
				<div className="itempicture">
					<img src={auction.auctionImages} class="img2"></img> 
				</div>
	
				<div className="ProductDescription">
					<Container>
						<Form onSubmit={editAuction} encType="multipart/form-data">
							<Form.Group as={Row} className="auctionRows" controlId="formPlaintextItemName">
								<Form.Label column sm="3"> Item Name </Form.Label>
								<Col sm="">
                                    <textarea type="text" rows="1" cols="60"
                                        placeholder={location.state.auction.auctionName} value={auction.auctionName}
                                        onChange={(event) =>{
                                            setAuction({...auction, auctionName: event.target.value})
                                        }} />
								</Col>
							</Form.Group>
	
							<Form.Group as={Row} className="auctionRows" controlId="formPlaintextDescription">
								<Form.Label column sm="3"> Item Description </Form.Label>
								<Col sm="">
                                <textarea type="text" rows="5" cols="60" 
                                        placeholder={location.state.auction.auctionDescription} value={auction.auctionDescription}
                                        onChange={(event) =>{
                                            setAuction({...auction, auctionDescription: event.target.value})
                                        }} />
								</Col>
							</Form.Group>

                            <Form.Group as={Row} className="auctionRows" controlId="formPlaintextImage">
								<Form.Label column sm="3"> Auction Image </Form.Label>
								<Col sm="">
                                <input  
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    name="auctionImages"
                                    multiple = {false}

                                    onChange={(event)=>{
                                        setAuction({...auction, auctionImages: event.target.files[0]})
                                    }}
                />
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
                            <input type='submit'></input>
		
						</Form>

						<div className = "bidBody">
							<div>
								
							</div>

							<div>
							<button type="submit" onClick={handleDelete} >Delete Auction</button>
							</div>
						</div>

					</Container>
				</div>
			</div>
		  ) //end return
	
}; //end function AuctionPageSellerEdie