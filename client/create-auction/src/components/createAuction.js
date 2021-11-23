import {useState} from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import TextField  from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { MenuItem, FormControl, Checkbox, FormControlLabel, Select, InputLabel } from '@mui/material'
export default function Create() {
    const [auction, setAuction] = useState({
        auctionName: '',
        auctionDescription: '',
        auctionImages: [],
        author: '',
        tags: ['',''],
        condition: '',
        startingBid: 0,
    })

    const createAuction = () => {
        // setAuction({...auction, tags: [subject, type]})
        setAuction({...auction, author: '6170f830743ed8a8f4de9db9'})
        let put_params = {
            currentAuctions: '',
        };
        axios.post('http://localhost:5000/auction/', auction).then((res)=>{
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
        // console.log(auction)
    }
    return (
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
            <span>
            <Button 
            sx = {{m: 2}}
            variant="outlined">Upload Image</Button>
            </span>
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
      );

}