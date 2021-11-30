import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from '../components/Navbar/NavbarElements'
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';



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

                            <Card>
                                <Card.Img variant="top" src={post.auctionImages}/>
                                <Card.Body>
                                    <Card.Title>{post.auctionName}</Card.Title>
                                    <Typography variant="body2" color="textSecondar">
                                        {post.auctionDescription}
                                        <NavLink to={{
                                            pathname: '/auctionpagebuyer',
                                            state: {auction: post}
                                        }}>
                                            Place Bid
                                        </NavLink>

                                    </Typography>
                                </Card.Body>
                            </Card>
    
            </Grid>)
        );
    };


    render() {
        return (
            <div className="homeBody">
                <h1>Home</h1>
                <Grid container justify="center" spacing={4}>
                    {this.display(this.state.posts)}
                </Grid>
            </div>
        )
    }
}

export default Home