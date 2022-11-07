import { Request } from "express"

export type TClient = {
    id: string;
    name: string;
    email: string;
    role: string;
  };

  export type TPolicy = {
    id: string;
    amountInsured: number;
    inceptionDate: string;
    installmentPayment: boolean;
    clientId: string;
  };

export interface IAuth extends Request {
  auth?: Record<string,any>
}