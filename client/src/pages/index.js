import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from '../components/Navbar/NavbarElements'
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import { Button } from 'bootstrap';



class Home extends React.Component {

    state = {
        auctionName: '',
        auctionDescription: '',
        posts: []
    };
    componentDidMount = () => {
        this.getAuction();
    };
    getAuction = () => {
        {/*https://bdh-server.herokuapp.com/auction/get?num=10 */ }
        {/*http://localhost:5000/auction/get?num=20 */}

        axios.get('https://bdh-server.herokuapp.com/auction/get?num=20')
            .then((response) => {
                const data = response.data;
                this.setState({ posts: data });
                console.log(this.state.posts);
                console.log("data has been received");
            })
            .catch(() => {
                console.log("data has not been received");
            })

    };
    display = (posts) => {
        console.log(!posts.length)
        if (!posts.length) return null;

        return posts.map((post, index) => (
            <Grid key={index} xs={12} sm={6} md={4} lg={3}>
                <div className="cardwrapper">
                            <Card className="cardClass">
                                <Card.Img className="card-image" variant="top" src={post.auctionImages}/>
                                <Card.Body className="card-body">
                                    <Card.Title>{post.auctionName}</Card.Title>
                                    <Typography className="card-description" variant="body2" color="textSecondary">
                                        {post.auctionDescription}
                                        <NavLink to={{ pathname: '/auctionpagebuyer', state: {auction: post}}}>
                                            <button className="card-btn" variant="primary"> View Auction</button>
                                        </NavLink>

                                    </Typography>
                                </Card.Body>
                            </Card>
                </div>
            </Grid>)
        );
    };


    render() {
        return (
            <div className="homeBody">
                <h1>Home</h1>
                <Grid className="gridDisplay" container justify="center" spacing={4}>
                    {this.display(this.state.posts)}
                </Grid>
            </div>
        )
    }
}

export default Home