import React from 'react'
const About = () => {
    return (
        <div className="aboutbody">
			<legend style={{width: '150px', marginTop: '20px', color: '#ffffff',
				backgroundColor: '#13284c', padding: '3px 6px'}}>Return Policy</legend>
			<p style={{backgroundColor: '#fff', marginLeft: '25px',	paddingLeft: '10px',
	paddingTop: '5px', paddingBottom: '5px'}}>A Buyer may return an item purchased through Bulldog 
			Auctions, if the item received is substantially different
			from what it appeared to be in the listing. The Buyer must 
			notify the Seller of their intention to return the item within
			seven (7) days of purchase notification to receive a refund. 
			Right of return applies only to the original Buyer, and is 
			non-transferable.</p>
			<legend style={{width: '240px', color: '#ffffff',
				backgroundColor: '#13284c', padding: '3px 6px'}}>Payment Information</legend>
			<p style={{backgroundColor: '#fff', marginLeft: '25px',	paddingLeft: '10px',
				paddingTop: '5px', paddingBottom: '5px'}}>Option for payment will be implemented in the near future.
			Seller and Buyer will have the option to organize the details
			for payment. The format will be similar to OfferUp.</p>
			<legend style={{width: '70px', color: '#ffffff',
				backgroundColor: '#13284c', padding: '3px 6px'}}>FAQs </legend>
			<p style={{backgroundColor: '#fff', marginLeft: '25px',	paddingLeft: '10px',
				paddingTop: '5px', paddingBottom: '5px'}}><strong>How do you create an auction?</strong><br/>
			Click on the create Auction button on the top-left corner of the
			screen next to the profile button. The button will redirect you to
			a page where you can upload pictures, set the price and other various
			options for your auction. When you are done setting the auction options,
			simply click the submit button and the auction will be created.<br/><br/>
			<strong>How to set auction duration? </strong><br/>
			The duration of an auction can be set when creating the auction on the
			Create Auction page.<br/><br/>
			<strong>How to bid on an auction? </strong><br/>
			When you find a item you wish to bid on, click on it to go to the product&apos;s
			page. Click on the &quot;Enter Bid&quot; button.  <br/><br/>
			<strong>How will you know when you&apos;ve won the bid? </strong><br/>
			Check the &quot;Auctions Won&quot; section which can be accessed on your profile page.
			If you&apos;ve won an auction, it will be displayed there. <br/><br/>
			<strong>What happens once you&apos;ve won a bid? </strong><br/>
			Once you&apos;ve won a bid, you will be notified and given the information of the seller
			to plan on a way to transfer the item. The bid will also be placed within your 
			&quot;Auctions Won&quot; section of your profile.
			<br/>
			</p>
        </div>
    )
}

export default About