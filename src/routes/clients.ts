import express, { Request, Response, NextFunction } from 'express';

import { getClients } from '../helpers/utils';
import { TClient } from '../types';
import authorize from '../helpers/authorize';
import { allRoles } from '../helpers/roles';

const router = express.Router();

router.all('/*',authorize(allRoles))
// GET USER BY USERID
router.get(
  '/clientId/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const clients: TClient[] = await getClients();
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
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.params;
    try {
      const clients: TClient[] = await getClients();
      const client: TClient | undefined = clients.find(
        (e: TClient) => e.name === name,
      );
      if (!client) {
        return res.status(404).send({message:'Client not found'});
      }
      res.send(client);
    } catch (e) {
      // aca fallo algo fuerte
      next(e);
    }
  },
);

export default router;
