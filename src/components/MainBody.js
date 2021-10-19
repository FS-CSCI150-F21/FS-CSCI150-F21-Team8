const MainBody = () => {
	return (
		<div className="mainBody">
			<div className="signUpBox">
				<table>
					<tr className="signIn">
						<td colSpan="2">Sign in</td>
					</tr>
					<tr>
						<td> Username: </td>
						<td> <input type="text"></input></td>
					</tr>
					<tr className="inputs">
						<td> Password: </td>
						<td> <input type="password"></input></td>
					</tr>
					<tr>
						<td colSpan="2"><button>Sign in</button></td>
					</tr>
					<tr className="link">
						<td> <a href="">Forgot you password?</a> </td>
						<td> <a href="">Don't have an account yet?</a> </td>
					</tr>
				</table>
					
			</div>
		</div>
	)
}
  
  export default MainBody