import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class AuctionPageBody extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		  	name: null,
		  	description: null,
		  	authorName: null
		};
	  }
//https://bdh-server.herokuapp.com/auction/get?num=10
	  componentDidMount(){
		axios.get(`http://localhost:5000/auction/${"6180adb25dbbb54dcbc4bbb0"}`)
		  .then((response) => {
			  this.setState({
				name: response.data.auctionName,
				description: response.data.auctionDescription,
				author: response.data.author
		 	 	});
			});
		axios.get(`http://localhost:5000/user/${"6170f830743ed8a8f4de9db9"}`)
		  .then((response) => {
			  this.setState({
				authorName: response.data.displayName
				});
			});
	  }
	
	render () {
		return (
			<div className="Body">
        	    <div className="itempicture">
            		<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5GueTtKoNOiHAe0ExNxfXHiFJF6o4gc2Hng&usqp=CAU" class="img2"></img> 
            	</div>

				<div className="ProductDescription">
					<Container>
						<Form>
							<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
								<Form.Label column sm="2"> Item Name </Form.Label>
								<Col sm="10">
									<Form.Control plaintext readOnly defaultValue={this.state.name} />
								</Col>
							</Form.Group>

							<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
								<Form.Label column sm="2"> Item Description </Form.Label>
								<Col sm="10">
									<Form.Control plaintext readOnly defaultValue={this.state.description} />
								</Col>
							</Form.Group>

							<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
								<Form.Label column sm="2"> Item Name </Form.Label>
								<Col sm="10">
									<Form.Control plaintext readOnly defaultValue={this.state.name} />
								</Col>
							</Form.Group>
							
						</Form>
					</Container>
				</div>
			</div>
		)//end return
	}//end render
}//end function

// 			<div className="Body">
//         	    <div className="itempicture">
//             		<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5GueTtKoNOiHAe0ExNxfXHiFJF6o4gc2Hng&usqp=CAU" class="img2"></img> 
//             	</div>

// 				<div className="ProductDescription">

// 					<table>
// 						<tr className="ItemName">
// 							<td colSpan="2">  </td>
// 						</tr>
		
// 						<tr className="ItemDescription">
// 							<td colSpan="2"> <input type="text"></input></td>
// 						</tr>
// 						<tr className="SellerProfile">
// 							<td> <a href=""> <img src="https://discountdoorhardware.ca/wp-content/uploads/2018/06/profile-placeholder-3.jpg" class="img3"></img></a></td>
// 							<td> AuthorName </td>
// 							<td> <a href=""> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGsRk74PQxlaZfG2MV4KnQxkwc7kZmioYnQg&usqp=CAU" class="img4"></img></a></td>
// 						</tr>
// 						<tr className="Bidding">
// 							<td></td>
// 							<td> </td>
// 							<td>  
// 								<input type="text"></input>
// 								<button> Place Bid</button>
// 							</td>
// 						</tr>
// 					</table>
// 				</div>
// 			</div>
// 		)
// 	}
// } 

