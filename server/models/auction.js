import mongoose from 'mongoose'

const generateClose = () => {
    const d = new Date()
    d.setDate(d.getDate() + 28)
    return d
}

const auctionSchema = mongoose.Schema({
    auctionName: {
        type: String,
        default: '',
        required: true,
    },
    auctionDescription: {
        type: String,
        default: '',
        required: true,
    },
    auctionImages: {
        type: Array,
        of: Buffer,
        default: [],
    }, // not sure if correct (need data type for array of images)
    datePosted: {
        type: Date,
        default: Date.now()
    },
    dateClose: {
        type: Date,
        default: generateClose, // default is 4 weeks after post
    },
    author: {
        type: mongoose.Schema.ObjectId, // not too sure on this, but want to have the author field reference to actual user in db
        default: null,
        required: true,
    },
    highestBidder: {
        type: Object,
        of: {
            userBidding: {
                type: mongoose.Schema.ObjectId,
                default: null,
                required: true,
            },
            bidAmount: {
                type: Number,
                default: 0,
                required: true,
            },
            default: {}
        },
        
    },
    biddingHistory: {
        type: Array,
        of: {
            type: Object,
            of: {
                userBidding: {
                    type: mongoose.Schema.ObjectId,
                    default: null,
                    required: true, 
                },
                bidAmount: {
                    type: Number,
                    default: 0,
                    required: true,
                }
            },
            default: {}
        }
    },        
    tags: {
        type: Array,
        of: String,
        default: [],
    },
    condition: {
        type: String,
        default: '',
    },
    startingBid: {
        type: Number,
        default: 0,
        required: true,
    }
}, { collection: 'auctions'})

const AuctionData = mongoose.model('auction', auctionSchema);

export default AuctionData