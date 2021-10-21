import AuctionData from '../models/auction.js';

// httpstatus.com for codes
export const getAuction = async (req, res) => {
    // const name = req.params.auctionName
    console.log('a')
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
    console.log('a', req.body)
    const newAuction = new AuctionData(auction);
    try {
        await newAuction.save()
        console.log('b')
        res.status(201).json(newAuction);
    } catch (error) {
        console.log('c')
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