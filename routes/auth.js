import { Router } from 'express';
import passport from 'passport';

import * as controller from '../controllers/auth';
import passportService from '../lib/passport';

const router = Router();

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

router.post('/signin', requireSignin, controller.signin);
router.post('/signup', controller.signup);

export default router;
