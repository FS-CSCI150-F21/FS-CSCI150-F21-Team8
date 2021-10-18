import mongoose from 'mongoose'

const auctionSchema = mongoose.Schema({
    auctionName: String,
    auctionDescription: String,
    auctionImages: [Buffer], // not sure if correct (need data type for array of images)
    datePosted: {
        type: Date,
        default: Date.now()
    },
    dateClose: Date,
    author: {
        type: mongoose.Schema.ObjectId, // not too sure on this, but want to have the author field reference to actual user in db
        ref: 'user'
    },
    currentBids: [{
        userBidding: mongoose.Schema.ObjectId, // not too sure on this, but want to have the array of users referenced in db
        bidAmount: Number
    }],
    rating: {
        type: Number,
        default: 0,
    },
    tags: [String],
    condition: String,
}, { collection: 'auctions'})

const AuctionData = mongoose.model('auction', auctionSchema);

export default AuctionData