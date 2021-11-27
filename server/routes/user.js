import express from 'express'
// import multer from 'multer'
// import { v4 as uuidv4 } from 'uuid';
// import path from 'path'
import { deleteUser, getUser, createUser, updateUser, loginUser } from '../controllers/user.js'

const router = express.Router()

// CRUD
// these routes may change, more might will most likely be added - this is just a outline

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         // console.log('routing', req, file)
//         cb(null, 'user-images/');
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

router.get('/get', getUser);
router.get('/login', loginUser)
router.delete('/:id', deleteUser);
// router.post('/', upload.single("profilePicture"), createUser);
router.post('/', createUser);
router.put('/:id', updateUser);
export default router;