import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import './cards.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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

        axios.get('https://bdh-server.herokuapp.com/auction/get?num=10')
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
                <Row xs={1} md={2} className="g-4">
                    {/*    {Array.from({ length: 2 }).map((_, idx) => ( */}
                    <Col>
                            <Card>
                                <Card.Img variant="top" src="holder.js/100px160" />
                                <Card.Body>
                                    <Card.Title>{post.auctionName}</Card.Title>
                                    <Card.Text>
                                        {post.auctionDescription}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Img variant="top" src="holder.js/100px160" />
                            <Card.Body>
                                <Card.Title>{post.auctionName}</Card.Title>
                                <Card.Text>
                                    {post.auctionDescription}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* ))}  */}
                </Row>
            </div>)
        );
    };


    render() {
        return (
            <div>
                <h1>Home</h1>
                <div>
                    {this.display(this.state.posts)}
                </div>
            </div>
        )
    }
}

export default App