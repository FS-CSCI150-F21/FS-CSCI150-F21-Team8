import React from 'react'

const Body = () => {
	return (
		<div className="Body">
            <div className="userProfilePicture">
			<img src="https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg" class="img2"></img> 

			<tr className="update picture">
						<td> </td>
						<td></td>
						<td></td>
						<td></td>
						<td>  
							<button> Update Picture </button>
						</td>
			</tr>
		
			<tr className="displayUserName">
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td> John Doe </td>
			</tr>
            </div>

			<div className="userInfo">
				<table>
					<tr className="userName">
					<td> UserName </td>
						<td colSpan="2"> <input type="text"></input></td>
					</tr>
		
					<tr className="Password">
					<td> Password </td>
						<td colSpan="2"> <input type="text"></input></td>
					</tr>

					<tr className ="forgotPassword">
						<td></td>
						<input type="text"></input>
					</tr>

					<tr className="ProfileBio">
					<td> Profile Bio (optional) </td>
						<td colSpan="2"> <input type="text"></input></td>
					</tr>

					<tr className="Rating">
					<td> Rating </td>
						<td> <a href=""> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGsRk74PQxlaZfG2MV4KnQxkwc7kZmioYnQg&usqp=CAU" class="img4"></img></a></td>
					</tr>

					<tr className="Email">
					<td> Email </td>
						<td colSpan="2"> <input type="text"></input></td>
					</tr>

					<tr className="PhoneNumber">
					<td> Phone Number </td>
						<td colSpan="2"> <input type="text"></input></td>
					</tr>

					<tr className="editProfileOption">
						<td> </td>
						<td>  
							<button> Edit your Profile</button>
						</td>
					</tr>
				</table>
					
			</div>
		</div>
	)
}
  
  export default Body
