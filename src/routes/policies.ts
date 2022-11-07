import express, { Request, Response, NextFunction } from 'express';
import { getClients, getPolicies } from '../helpers/utils';
import { TClient, TPolicy } from '../types';
import { authorize } from '../helpers/authorize';
import { adminRol } from '../helpers/roles';

const router = express.Router();

router.all('/*',authorize(adminRol))

// GET POLICY LINKED TO USERNAME
router.get(
  '/:clientName',
  async (req: Request, res: Response, next: NextFunction) => {
    const { clientName } = req.params;
    try {
      const clients: TClient[] = await getClients();
      const client: TClient | undefined = clients.find(
        (e: TClient) => e.name === clientName,
      );
      if (!client) {
        return res.status(404).send({message:'Client not found'});
      }

      const policies: TPolicy[] = await getPolicies();
      const policiesRes: TPolicy[] = policies.filter(
        (e: TPolicy) => e.clientId === client?.id,
      );

      policiesRes.length
        ? res.send(policiesRes)
        : res.status(204).send({ message: 'associated policies not found' });
    } catch (e) {
      next(e);
    }
  },
);

  // GET USER LINKED TO A POLICY NUMBER
  router.get(
    '/client/:policyNumber',
    async (req: Request, res: Response, next: NextFunction) => {
      const { policyNumber } = req.params;
      try {
        const policies: TPolicy[] = await getPolicies();
        const policy: TPolicy | undefined = policies?.find(
          (e: TPolicy) => e.id === policyNumber,
        );
        if(!policy){
            return res.status(404).send({message:'Policy not found'});
        }
        const clients: TClient[] = await getClients();
        const client: TClient | undefined = clients?.find(
          (e: TClient) => e.id === policy?.clientId,
        );
        res.send(client);
      } catch (e) {
        next(e);
      }
    },
  );

  export default router;
