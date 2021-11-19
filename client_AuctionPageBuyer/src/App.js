import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import axios from "axios";

import Body from "./Components/Body/body";
import navbar from "./Components/Navbar/navbar";
import './index.css'



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: null,
      description: null,
      author: null,
      authorName: null
    };
  }
  
  componentDidMount(){
    axios.get(`http://localhost:5000/auction/${"6180adb25dbbb54dcbc4bbb0"}`)
      .then(response => this.setState({
        name: response.data.auctionName,
        description: response.data.auctionDescription,
        author: response.data.author
      }),
      axios.get(`http://localhost:5000/user/${"6170f830743ed8a8f4de9db9"}`)
      .then(response => this.setState({
        authorName: response.data.displayName
      })
    )
    )
  }
  
  render(){
    const {name} = this.state;
    const {description} = this.state;
    const {authorName} = this.state;
    return (
      <div className="App">
          < navbar/>
        
          <div className="Body">
            <div className="itempicture">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5GueTtKoNOiHAe0ExNxfXHiFJF6o4gc2Hng&usqp=CAU" class="img2"></img> 
            </div>

			      <div className="ProductDescription">
				      <table>
					      <tr className="ItemName">
						      <td colSpan="2"> {name}</td>
					      </tr>
		
					      <tr className="ItemDescription">
						      <td colSpan="2"> {description} </td>
					      </tr>

					      <tr className="SellerProfile">
						      <td> <a href=""> <img src="https://discountdoorhardware.ca/wp-content/uploads/2018/06/profile-placeholder-3.jpg" class="img3"></img></a></td>
						      <td> {authorName}</td>
						      <td> <a href=""> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGsRk74PQxlaZfG2MV4KnQxkwc7kZmioYnQg&usqp=CAU" class="img4"></img></a></td>
					      </tr>

					      <tr className="Bidding">
						      <td></td>
						      <td> </td>
						      <td>  
							      <input type="text"></input>
							      <button> Place Bid</button>
						      </td>
					      </tr>
				      </table>
			      </div>
		      </div>
        </div>
    )
  }
    
}
  
export default App;