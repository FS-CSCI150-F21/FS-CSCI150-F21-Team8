import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from "react-router";



export default function AuctionPageBuyer () {
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
							<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
								<Form.Label column sm="2"> Item Name </Form.Label>
								<Col sm="10">
									<Form.Control plaintext readOnly defaultValue={location.state.auction.auctionName} />
								</Col>
							</Form.Group>

							<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
								<Form.Label column sm="2"> Item Description </Form.Label>
								<Col sm="10">
									<Form.Control plaintext readOnly defaultValue={location.state.auction.auctionDescription} />
								</Col>
							</Form.Group>

							<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
								<Form.Label column sm="2"> Author Name </Form.Label>
								<Col sm="10">
									<Form.Control plaintext readOnly defaultValue={location.state.auction.author} />
								</Col>
							</Form.Group>
							
						</Form>
					</Container>
				</div>
			</div>

  ) //end return

}; //end function AuctionPageBuyer