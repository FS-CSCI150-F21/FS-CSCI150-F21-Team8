import express from 'express'
import { deleteUser, getUser, createUser } from '../controllers/user.js'

const router = express.Router()

// CRUD
// these routes may change, more might will most likely be added - this is just a outline
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.post('/', createUser);

export default router;