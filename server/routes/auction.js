import express from 'express'
// import multer from 'multer'
// import { v4 as uuidv4 } from 'uuid';
// import path from 'path'
import { createAuction, deleteAuction, getAuction, updateAuction } from '../controllers/auction.js'
// import cloudinary from '../cloudinary-cfg/cloudinary.js'


const router = express.Router()

// CRUD

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         // console.log('routing', req, file)
//         cb(null, 'auction-images/');
//     },
//     filename: function(req, file, cb) {
//         cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
//     }
// })

// const fileFilter = (req, file, cb) => {
//     // console.log('routing', req, file)
//     const allowedFileTypes =['image/jpeg', 'image/jpg', 'image/png']
//     if (allowedFileTypes.includes(file.mimetype)) {
//         cb(null, true)
//     } else {
//         cb(null, false)
//     }
// }
// let upload = multer({storage, fileFilter})
router.get('/get', getAuction);
router.delete('/:id', deleteAuction);
// router.post('/', upload.single("auctionImages"), createAuction);
router.post('/', createAuction);
router.put('/:id', updateAuction)

export default router;