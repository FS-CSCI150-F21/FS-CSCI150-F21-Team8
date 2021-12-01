import express from 'express'
import { createAuction, deleteAuction, getAuction, updateAuction } from '../controllers/auction.js'


const router = express.Router()

router.get('/get', getAuction);
router.delete('/:id', deleteAuction);
router.post('/', createAuction);
router.put('/:id', updateAuction)

export default router;