import express from 'express'
import { deleteUser, getUser, createUser, updateUser, loginUser, createOtpUser, checkUser } from '../controllers/user.js'

const router = express.Router()

router.get('/get', getUser);
router.get('/login', loginUser)
router.get('/auth/check', checkUser)

router.delete('/:id', deleteUser);

router.post('/', createUser);
router.post('/auth/create', createOtpUser)

router.put('/update', updateUser);

export default router;