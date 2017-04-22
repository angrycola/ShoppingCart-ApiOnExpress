import { Router } from 'express';

import * as controller from '../controllers/product';

const router = Router();

router.get('/', controller.indexProducts);

export default router;
