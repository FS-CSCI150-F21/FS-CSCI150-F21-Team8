import AuctionData from '../models/auction.js';

// httpstatus.com for codes
export const getAuction = async (req, res) => {
    try {
        // get auction by filters (id, name, tags, etc )
        console.log('test')
        res.status(200).json('hello world')
    } catch (error) {
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