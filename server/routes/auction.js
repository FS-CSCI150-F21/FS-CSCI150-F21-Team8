import express from 'express'
import { createAuction, deleteAuction, getAuction, updateAuction } from '../controllers/auction.js'

const router = express.Router()

// CRUD
// these routes may change, more might will most likely be added - this is just a outline
router.get('/:id', getAuction);
router.delete('/:id', deleteAuction);
router.post('/', createAuction);
router.put('/:id', updateAuction)

export default router;