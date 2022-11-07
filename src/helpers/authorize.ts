import { IAuth } from './../types/index';
import { expressjwt } from 'express-jwt';
import { Response, NextFunction, Request } from 'express';
import { secret } from './utils';


export const authorize = (roles: string[] | string) => {
  const formatedRoles: string[] = typeof roles === 'string' ? [roles] : roles;
  return [
    expressjwt({ secret, algorithms: ['HS256'] }),

    async (req: IAuth, res: Response, next: NextFunction) => {
      if (formatedRoles.length && !formatedRoles.includes(req.auth?.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    },
  ];
};

