import * as controller from '../controllers/auth';
import express from 'express';

const router = express.Router();

router.post('/signup', controller.signup);

export default router;
