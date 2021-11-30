import React, {useState,useEffect} from 'react';
import { Redirect } from 'react-router';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from "react-router";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import axios from "axios";


//this page is where the seller is redirected to if they want to edit the auction

export default function AuctionPageSeller () {

	let location = useLocation();

	return(
		<div>
			{location.state.auction.author}
		</div>
	)//end return
	
}; //end function AuctionPageSeller