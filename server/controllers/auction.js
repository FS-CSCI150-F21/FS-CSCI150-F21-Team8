import AuctionData from '../models/auction.js';

// httpstatus.com for codes
export const getAuction = async (req, res) => {
    // const name = req.params.auctionName
    try {
        // get auction by filters (id, name, tags, etc )
        const auction = await AuctionData.findOne({}).exec()
        console.log(auction)
        res.status(200).json(auction);
    } catch (error) {
        console.log(error.message)
        res.status(404).json({message: error.message})     
    }
}

export const createAuction = async (req, res) => {
    const auction = req.body;
    const newAuction = new AuctionData(auction);
    try {
        await newAuction.save()
        res.status(201).json(newAuction);
    } catch (error) {
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
        const auction = await AuctionData.findOne({id: req.params.id}).exec()
        if (req.body.auctionDescription){
            auction.auctionDescription = req.body.auctionDescription
        }
        if (req.body.highestBidder) {
            auction.highestBidder = highestBidder
        }
        if (req.body.auctioName){
            auction.auctionName = req.body.auctionName
        }
        await auction.save()
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}