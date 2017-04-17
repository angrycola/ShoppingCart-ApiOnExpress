import { Router } from 'express';
import passport from 'passport';

import * as controller from '../controllers/auth';
import passportService from './lib/passport';

const router = Router();
const requireAuth = passport.authenticate('jwt', { session: false });

router.post('/signup', controller.signup);

export default router;
