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
        posts: [],
        search: '',
        tags: ['',''],
        condition: '',
        date: '1',
        query: 'num=20',
    };
    componentDidMount = () => {
        this.getAuction();
    };
    getAuction = () => {
        {/*https://bdh-server.herokuapp.com/auction/get?num=10 */ }
        {/*http://localhost:5000/auction/get?num=20 */}
        console.log(this.state)
        axios.get(`https://bdh-server.herokuapp.com/auction/get?${this.state.query}`)
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

    onSearch = (event) => {
        event.preventDefault()
        let tags = (this.state.tags[0] === '' && this.state.tags[1] === '') ? '' : `&tags[]=${this.state.tags[0]}&tags[]=${this.state.tags[1]}` 
        let q = `num=20&auctionName=${this.state.search}&condition=${this.state.condition}&datePosted=${this.state.date}${tags}`
        this.setState({...this.state, query: q}, ()=>{
            this.getAuction()
        })
    }

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
                <div style={{textAlign:"center", paddingBottom:"1rem"}}>
                    <form  >
                        <input
                        type="text"
                        placeholder="Auction Name"
                        name="auctionName"
                        value={this.state.search}
                        onChange={(event)=>{
                            this.setState({...this.state, search: event.target.value})
                        }}
                        />
                        <select
                        id="tags_subject"
                        name="tags_sub"
                        onChange={(event)=>{
                            this.setState({...this.state, tags: [event.target.value, this.state.tags[1]]})
                        }}
                    >
                        <option value="" selected>Subject</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Biology">Biology</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Computer Engineering">Computer Engineering</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Philosophy">Philosophy</option>
                        <option value="History">History</option>
                        <option value="Other">Other</option>

                    </select>
                    <select
                        id="tags_type"
                        name="tags_type"
                        onChange={(event)=>{
                            this.setState({...this.state, tags: [this.state.tags[0], event.target.value]})
                        }}
                    >
                        <option value="" selected>Type</option>
                        <option value='Book'>Book</option>
                        <option value='Supplies'>Supplies</option>
                        <option value='Lab Equipment'>Lab Equipment</option>
                        <option value='Technology'>Technology</option>
                        <option value='Other'>Other</option>

                    </select>
                    <select
                        id="tags_cond"
                        name="tags_cond"
                        onChange={(event)=>{
                            this.setState({...this.state, condition: event.target.value})
                        }}
                    >
                        <option value="" selected>Condition</option>
                        <option value="Unused">Unused</option>
                        <option value="Used">Used</option>

                    </select>

                    <select
                        id="date"
                        name="date"
                        onChange={(event)=>{
                            this.setState({...this.state, date: event.target.value})
                        }}
                    >
                        <option value="" selected>Time</option>
                        <option value="-1">Newest</option>
                        <option value="1">Oldest</option>

                    </select>
                        <span style={{paddingLeft: "1rem"}}>
                            {/* <input type='submit'></input> */}
                            <button onClick={this.onSearch}>Search</button>
                        </span>
                    </form>
                </div>
                <Grid className="gridDisplay" container justify="center" spacing={4}>
                    {this.display(this.state.posts)}
                </Grid>
            </div>
        )
    }
}

export default Home