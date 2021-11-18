import React from 'react'

const Body = () => {
	return (
		<div className="Body">
            <div className="itempicture">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5GueTtKoNOiHAe0ExNxfXHiFJF6o4gc2Hng&usqp=CAU" class="img2"></img> 
            </div>

			<div className="ProductDescription">

				<table>
					<tr className="ItemName">
						<td colSpan="2">  </td>
					</tr>
		
					<tr className="ItemDescription">
						<td colSpan="2"> <input type="text"></input></td>
					</tr>
					<tr className="SellerProfile">
						<td> <a href=""> <img src="https://discountdoorhardware.ca/wp-content/uploads/2018/06/profile-placeholder-3.jpg" class="img3"></img></a></td>
						<td> AuthorName </td>
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
	)
}
  
  export default Body

