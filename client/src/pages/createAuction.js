import {useState} from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import TextField  from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { MenuItem, FormControl, Checkbox, FormControlLabel, Select, InputLabel } from '@mui/material'
import '../App.css';
const validateInputs = (auction) => {
    console.log(auction)
    if (auction.auctionName === '' 
    || auction.auctionDescription === ''
    || auction.auctionImages === ''
    || auction.tags[0] === '' || auction.tags[1] === ''
    || auction.condition === ''
    ) {
        return true
    } else {
        return false
    }
}

export default function Create() {


    const [auction, setAuction] = useState({
        auctionName: '',
        auctionDescription: '',
        auctionImages: null,
        author: '61908fbc6fbb7fd5a70545ec',
        tags: ['',''],
        condition: '',
        startingBid: 0,
    })

    

    const createAuction = () => {
        // setAuction({...auction, author: '61908fbc6fbb7fd5a70545ec'})
        const put_params = {
            currentAuctions: ''
        }
        console.log(auction)
        if (validateInputs(auction)){
            console.log('something is blank')
        } else {
            
            axios.post('http://localhost:5000/auction/', auction).then((res)=>{
                console.log('post')
                console.log(res)
                put_params.currentAuctions = res.data._id
                console.log(put_params)
            }).then(()=>{
                axios.put(`http://localhost:5000/user/${auction.author}`, put_params).then(()=>{
                    console.log('putted')
                })
            }).catch(()=>{

                console.log('caught')
            })
        }
        
        // console.log(auction)
    }

    // const imageHandler = (event) => {
    //     const file = event.target.files[0]
    //     const formData = new FormData()
    //     formData.append('image', file)

    //     fetch('http://localhost:5000/image', {
    //         method: 'POST',
    //         body: formData,
    //         headers: {
    //             'Accept': 'multipart/form-data',
    //         },
    //         credentials: 'include'
    //     }).then((res) => res.json())
    //     .then((res) => {
    //         setUploadStatus(res.msg)
    //     }).catch(error => {
    //         console.error(error)
    //     })
    // }
    return (
        <div>
        <span className="image-box">
            <div>
                <img src = {auction.auctionImages} alt = {""}></img>
            </div>
                <input  
                    className="image-box"
                    type ="file"
                    accept = ".png, .jpg, .jpeg"
                    name = "image"
                    multiple = {false}

                    onChange={(event)=>{
                        // console.log(event.target.value)
                        // console.log(event.target.name)
                        setAuction({...auction, auctionImages: event.target.files[0]})
                    }}
                />
            </span>
        <span>
        
        <Box
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
        </span>
        </div>
      );

}


// import React, { useState } from "react";

// const AddNew = () => {
//   const [file, setFile] = useState(null);
//   const fileHandler = event => {
//     console.log(event.target.files[0]);
//     let reader = new FileReader();
//     reader.onload = function(e) {
//       setFile(e.target.result);
//     };
//     reader.readAsDataURL(event.target.files[0]);
//   };

//   return (
//     <div className="addNew">
//       <img src={file} alt={""} />
//       <input accept = ".png, .jpg, .jpeg" type="file" onChange={fileHandler} />
//     </div>
//   );
// };

// export default AddNew;