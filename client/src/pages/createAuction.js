import {useState} from 'react'
import axios from 'axios'
// import Box from '@mui/material/Box'
// import TextField  from '@mui/material/TextField'
// import Button from '@mui/material/Button'
// import { MenuItem, FormControl, Checkbox, FormControlLabel, Select, InputLabel, formGroupClasses } from '@mui/material'
import '../App.css';
import { Redirect } from 'react-router';
// import { width } from '@mui/system'
const validateInputs = (auction) => {
    // console.log(auction)
    // console.log((isNaN(auction.startingBid)))
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
    // console.log(user)
    const [auction, setAuction] = useState({
        auctionName: '',
        auctionDescription: '',
        auctionImages: '',
        author: user ? user._id : '',
        tags: ['',''],
        condition: '',
        startingBid: '',
    })

    // console.log(auction)
    if (user === undefined) {
        return <Redirect to="/login"/>
    }
    
    

    const createAuction = (event) => {
        event.preventDefault();

        
        // setAuction({...auction, author: '61908fbc6fbb7fd5a70545ec'})
        
        
        
        
        if (validateInputs(auction)){
            console.log('Something is blank or the starting bid is not a number')
        } else {
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
                    axios.put(`https://bdh-server.herokuapp.com/user/${auction.author}`, put_params).then(()=>{
                        console.log('put')
                    })
                })
            }).catch((res)=>{
                console.log('caught', res)
            })
            // .then(()=>{
                
            //     // const form = new FormData();
            //     // form.append('auctionName', auction.auctionName)
            //     // form.append('auctionDescription', auction.auctionDescription)
            //     // form.append('auctionImages', url)
            //     // form.append('author', auction.author)
            //     // form.append('tags', auction.tags)
            //     // form.append('condition', auction.condition)
            //     // form.append('startingBid', auction.startingBid)
            //     // console.log('form', form)
                
            // })
            // .then(()=>{
                
            // }).catch((res)=>{
    
            //     console.log('caught', res)
            // })
        }
        
        // console.log(auction)
    }

    return (
        <div>
            {/* <div>
                <img src = "http://localhost:5000/auction/get?id=619c5ec162de3922e95c3d33&image=1"></img>
            </div> */}
        <span className="image-box">
            <div>
                <img src = {auction.auctionImages} alt = {""}></img>
            </div>
            {/*   */}
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
            </span>

        {/* <span> */}
        
        {/* old components, may use in future */}
        {/* <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
            
            
            <span>
                <TextField
                    required
                    id="outlined-required"
                    label="Auction Name"
                    value={auction.auctionName}
                    onChange={(event)=>{
                        setAuction({...auction, auctionName: event.target.value})
                    }}
                />
                <TextField
                    required
                    id="outlined-read-only-input"
                    label="Starting Price"
                    value={auction.startingBid}
                    onChange={(event)=>{
                        setAuction({...auction, startingBid: event.target.value})
                    }}

                />
                
            </span>
            <div>
                <TextField
                sx={{ m: 1, minWidth: 500 }}
                id="outlined-disabled"
                label="Description"
                multiline
                rows={4}
                value={auction.auctionDescription}
                onChange={(event)=>{
                    setAuction({...auction, auctionDescription: event.target.value})
                }}
            />
            </div>
            <div>
            <span>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="condition-label">Condition</InputLabel>
                        <Select
                            labelId="condition-label"
                            id="condition-select"
                            label="Condition"
                            value={auction.condition}
                            onChange={(event)=>{
                                setAuction({...auction, condition: event.target.value})
                            }}
                        >
                        <MenuItem value={'Used'}>Used</MenuItem>
                        <MenuItem value={'Unused'}>Unused</MenuItem>
                    </Select>
                </FormControl>
            </span>
            <span>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="subject-label">Subject</InputLabel>
                        <Select
                            labelId="subject-label"
                            id="subject-select"
                            label="Subject"
                            value={auction.tags[0]}
                            onChange={(event)=>{
                                setAuction({...auction, tags: [event.target.value, auction.tags[1]]})
                            }}
                        >
                        <MenuItem value={'Computer Science'}>Computer Science</MenuItem>
                        <MenuItem value={'Computer Engineering'}>Computer Engineering</MenuItem>
                        <MenuItem value={'Music'}>Music</MenuItem>
                        <MenuItem value={'Biology'}>Biology</MenuItem>
                        <MenuItem value={'Chemistry'}>Chemistry</MenuItem>
                        <MenuItem value={'Other'}>Other</MenuItem>
                    </Select>
                </FormControl>
            </span>
            <span>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="type-label">Type</InputLabel>
                        <Select
                            labelId="type-label"
                            id="type-select"
                            label="Type"
                            value={auction.tags[1]}
                            onChange={(event)=>{
                                setAuction({...auction, tags: [auction.tags[0], event.target.value]})
                            }}
                        >
                        <MenuItem value={'Book'}>Book</MenuItem>
                        <MenuItem value={'Supplies'}>Supplies</MenuItem>
                        <MenuItem value={'Lab Equipment'}>Lab Equipment</MenuItem>
                        <MenuItem value={'Technology'}>Technology</MenuItem>
                        <MenuItem value={'Other'}>Other</MenuItem>
                    </Select>
                </FormControl>
            </span>
            </div>
            <div>
                <Button variant="contained" onClick={createAuction}>Create Auction</Button>
            </div>
        </Box>
        </span> */}
        </div>
      );

}

