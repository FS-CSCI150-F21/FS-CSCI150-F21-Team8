import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from "react-router";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';


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
	const [value,setValue] = React.useState(2);
	const [hover,setHover] = React.useState(-1);

  let location = useLocation();
  console.log(location);  //testing if post from home page passed properly
  
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
									<Form.Control plaintext readOnly defaultValue={location.state.auction.author} />
								</Col>
								<Col sm="">
									<Box sx={{ width: 200, display: 'flex', alighnItems: 'center',}}>
										<Rating name="read-rating" value = {value} readOnly precision={0.5} />
									</Box>
								</Col>
							</Form.Group>
							
						</Form>
					</Container>
				</div>
			</div>

  ) //end return

}; //end function AuctionPageBuyer