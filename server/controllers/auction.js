import AuctionData from '../models/auction.js';
// import path from 'path'
// import cloudinary from '../cloudinary-cfg/cloudinary.js'
// httpstatus.com for codes
export const getAuction = async (req, res) => {

    try {
        let query = AuctionData.find()
        let sort = {'datePosted': 1}
        let num = 1
        if (req.query.num) {
            if (req.query.num > 20) {
                num = 20
            } else {
                num = parseInt(req.query.num)
            }
        }
        if (req.query.id) {
            query.where("_id", `${req.query.id}`)
        }
        if (req.query.auctionName) {
            query.where('auctionName', `${req.query.auctionName}`).regex(`(?i)${req.query.auctionName}`)
        }
        if (req.query.dateClose) {
            sort['dateClose'] = parseInt(req.query.dateClose)
        }
        if (req.query.datePosted) {
            if (req.query.datePosted == 0 && req.query.dateClose) {
                delete sort.datePosted
            } else if (req.query.datePosted == -1) {
                sort['datePosted'] = parseInt(req.query.datePosted)
            }
        }
        if (req.query.tags) {
            query.where('tags', req.query.tags)
        }
        
        const auction = await query.sort(sort).limit(num).exec()
        // console.log(auction.auctionImages)
        // if (req.query.image) {
            // res.sendFile("auction-images/" + auction[0].auctionImages, {root: process.cwd()})
            // console.log(auction)
            // res.status(200).json(auction.auctionImages)
        // } else {
            res.status(200).json(auction);
        // }
        
    } catch (error) {
        console.log(error.message)
        res.status(404).json({message: error.message})     
    }
}

export const createAuction = async (req, res) => {

    
    // console.log(req.body)
    // console.log('images: ',req.body.auctionImages)
    try {
        const auction = req.body;
        const newAuction = new AuctionData(auction);
        await newAuction.save()
        res.status(201).json(newAuction);
    } catch (error) {
        // console.log(error)
        res.status(409).json({message: error.message})     
    }
}

export const deleteAuction = async (req, res) => {
    // deleting by id, will change to add more later
    const id = req.params.id;
    try {
        await AuctionData.findByIdAndRemove(id).exec();
        res.status(200).json({message: 'Auction Deleted.'});
    } catch (error) {
        res.status(500).json({message: error.message})     
    }
}

export const updateAuction = async (req, res) => {
    try {
        // console.log(req.query.id)
        let query = AuctionData.find()
        if (req.query.id) {
            query.where("_id", `${req.query.id}`)
        }
        if (req.query.email) {
            query.where('email', `${req.query.email}`)
        }
        // console.log(req.query)
        const auction = await AuctionData.findOne(query).exec()
        if (req.body.auctionDescription){
            auction.auctionDescription = req.body.auctionDescription
        }
        if (req.body.highestBidder) {
            auction.highestBidder = highestBidder
        }
        if (req.body.auctionName){
            auction.auctionName = req.body.auctionName
        }
        if (req.body.author){
            auction.author = req.body.author
        }
        await auction.save()
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}