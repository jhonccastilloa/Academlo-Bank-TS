import { Router } from 'express';
import { historyTransfer, login, register } from '../controllers/users.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/:id/history', historyTransfer);


export default router