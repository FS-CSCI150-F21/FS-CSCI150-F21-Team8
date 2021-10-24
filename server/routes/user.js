import express from 'express'
import { deleteUser, getUser, createUser, updateUser } from '../controllers/user.js'

const router = express.Router()

// CRUD
// these routes may change, more might will most likely be added - this is just a outline
router.get('/:displayName', getUser);
router.delete('/:id', deleteUser);
router.post('/', createUser);
router.put('/:displayName', updateUser);
export default router;