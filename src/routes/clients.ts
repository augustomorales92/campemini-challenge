import express, { Request, Response, NextFunction } from 'express';

import { getClients } from '../helpers/utils';
import { IFetch, TClient } from '../types';
import { authorize } from '../helpers/authorize';
import { allRoles } from '../helpers/roles';

const router = express.Router();

router.all('/*', authorize(allRoles), async (req: IFetch, res: Response, next: NextFunction) => {
  try{
    const clients: TClient[] = await getClients();
    req.clients = clients
    next()
  }catch(e){
    next(e)
  }
});
// GET USER BY USERID
router.get(
  '/clientId/:id',
  async (req: IFetch, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const { clients } = req;
      const client: TClient | undefined = clients.find(
        (e: TClient) => e.id === id,
      );
      if (!client) {
        return res.status(404).send({message:'Client not found'});
      }
      res.send(client);
    } catch (e) {
      next(e);
    }
  },
);

// GET USER BY USERNAME
router.get(
  '/clientName/:name',
  async (req: IFetch, res: Response, next: NextFunction) => {
    const { name } = req.params;
    try {
      const { clients } = req;
      const client: TClient | undefined = clients.find(
        (e: TClient) => e.name === name,
      );
      if (!client) {
        return res.status(404).send({message:'Client not found'});
      }
      res.send(client);
    } catch (e) {
      next(e);
    }
  },
);

export default router;
