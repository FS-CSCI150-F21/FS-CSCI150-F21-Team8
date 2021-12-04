import {useState} from 'react'
import axios from 'axios'
import '../App.css';
import { Redirect } from 'react-router';
import { textAlign } from '@mui/system';
const validateInputs = (auction) => {
    if (auction.auctionName === '' 
    || auction.auctionDescription === ''
    || auction.auctionImages === ''
    || auction.tags[0] === '' || auction.tags[1] === ''
    || auction.condition === '' 
    || (isNaN(auction.startingBid))
    ) {
        return true
    } else {
        return false
    }
    
}

export default function Create() {

    const user = JSON.parse(localStorage.getItem('user'))
    const [auction, setAuction] = useState({
        auctionName: '',
        auctionDescription: '',
        auctionImages: '',
        author: user ? user._id : '',
        tags: ['',''],
        condition: '',
        startingBid: '',
    })
    const [valid, setValid] = useState(0)
    if (user === undefined) {
        return <Redirect to="/login"/>
    }

    const redirectToEdit = () => {
        console.log('redirect')
        return <Redirect to={{ 
            pathname: '/auctionpageseller', 
            state: {auction: auction}
        }}/>
    }

    if (valid === 5) {
        console.log('redirect')
        return <Redirect to={{ 
            pathname: '/auctionpageseller', 
            state: {auction: auction}
        }}/>
    }

    const createAuction = (event) => {
        event.preventDefault();
        if (validateInputs(auction)){
            console.log('Something is blank or the starting bid is not a number')
            setValid(1)
            if (isNaN(auction.startingBid)) {
                setValid(2)
            }
        } else {
            setValid(0)
            const put_params = {
                currentAuctions: ''
            }
            const iform = new FormData();
            iform.append("file", auction.auctionImages)
            iform.append("upload_preset", "auction")
            const post_body = auction;
            let url = ''
            axios.post("https://api.cloudinary.com/v1_1/bdh-images/image/upload", iform).then((res)=>{
                console.log(res.data.url)
                url = res.data.url
                setAuction({...auction, auctionImages: url})
                post_body.auctionImages = url
                console.log(post_body)
                // console.log(auction)
                axios.post('https://bdh-server.herokuapp.com/auction/', post_body).then((res)=>{
                    console.log('post')
                    console.log(res)
                    put_params.currentAuctions = res.data._id
                    console.log(put_params)
                    axios.put(`https://bdh-server.herokuapp.com/user/update?id=${auction.author}`, put_params).then(()=>{
                        console.log('put')
                        // redirectToEdit()
                        setValid(5)
                    })
                    
                })
            }).catch((res)=>{
                console.log('caught', res)
            })
        }
    }

    return (
        <div style={{textAlign:"center"}} className="createauction">
            <div>
                <img src = {auction.auctionImages} alt = {""}></img>
            </div>
            <form onSubmit={createAuction} encType="multipart/form-data">
                <div>
                <input  
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="auctionImages"
                    multiple = {false}

                    onChange={(event)=>{
                        setAuction({...auction, auctionImages: event.target.files[0]})
                    }}
                />
                </div>
                
                <input
                    type="text"
                    placeholder="Auction Name"
                    name="auctionName"
                    value={auction.auctionName}
                    onChange={(event)=>{
                        setAuction({...auction, auctionName: event.target.value})
                    }}
                
                />
                <input
                    type="text"
                    placeholder="Starting Price"
                    name="startingBid"
                    value={auction.startingBid}
                    onChange={(event)=>{
                        setAuction({...auction, startingBid: event.target.value})
                    }}
                
                />
                <div>
                    <textarea
                        type="text"
                        placeholder="Description"
                        name="auctionDescription"
                        value={auction.auctionDescription}
                        rows="5"
                        cols="100"
                        onChange={(event)=>{
                            setAuction({...auction, auctionDescription: event.target.value})
                        }}
                    />
                </div>
                <div>
                    <select
                        id="tags_subject"
                        name="tags_sub"
                        onChange={(event)=>{
                            setAuction({...auction, tags: [event.target.value, auction.tags[1]]})
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
                            setAuction({...auction, tags: [auction.tags[0], event.target.value]})
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
                            setAuction({...auction, condition: event.target.value})
                        }}
                    >
                        <option value="" selected>Condition</option>
                        <option value="Unused">Unused</option>
                        <option value="Used">Used</option>

                    </select>
                </div>
                <div>
                    <input type='submit'></input>
                </div>
                
            </form>
            {valid === 1 && <div>Something is blank, try again.</div>}
            {valid === 2 && <div>Starting Price must be a number.</div>}
        </div>
      );

}

