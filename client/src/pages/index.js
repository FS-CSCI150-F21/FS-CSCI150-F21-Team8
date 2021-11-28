import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from '../components/Navbar/NavbarElements'
import styled from 'styled-components';



class App extends React.Component {

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
            <div key={index}>

                {/*card try*/}
                <Row xs={2} md={2} className="g-4">
                    {/*    {Array.from({ length: 2 }).map((_, idx) => ( */}
                    <Col>
                            <Card>
                                <Card.Img variant="top" src={post.auctionImages}/>
                                <Card.Body>
                                    <Card.Title>{post.auctionName}</Card.Title>
                                    <Card.Text>
                                        {post.auctionDescription}
                                        <NavLink to={{
                                            pathname: '/auctionpagebuyer',
                                            state: {auction: post}
                                        }}>
                                            Place Bid
                                        </NavLink>

                                    </Card.Text>
                                </Card.Body>
                            </Card>
                    </Col>

                    <Col>
                            <Card>
                                <Card.Img variant="top" src={post.auctionImages}/>
                                <Card.Body>
                                    <Card.Title>{post.auctionName}</Card.Title>
                                    <Card.Text>
                                        {post.auctionDescription}
                                        <NavLink to={{
                                            pathname: '/auctionpagebuyer',
                                            state: {auction: post}
                                        }}>
                                            Place Bid
                                        </NavLink>

                                    </Card.Text>
                                </Card.Body>
                            </Card>
                    </Col>
                </Row>
            </div>)
        );
    };


    render() {
        return (
            <div className="homeBody">
                <h1>Home</h1>
                <div>
                    {this.display(this.state.posts)}
                </div>
            </div>
        )
    }
}

export default App