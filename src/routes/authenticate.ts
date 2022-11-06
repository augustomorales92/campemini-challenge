import express, { Request, Response, NextFunction } from 'express';
import { authenticate } from '../helpers/utils';


const router = express.Router();

// AUTHENTICATE
router.post('/', async (req: Request, res: Response) => {
  const clientExist = await authenticate(req.body);
  clientExist
    ? await res.json(clientExist)
    : res.status(400).json({ message: 'Email or Name is incorrect' });
});

export default router;