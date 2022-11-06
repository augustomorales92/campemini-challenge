import jwt from 'jsonwebtoken';
import fetch from 'cross-fetch';
import dotenv from 'dotenv';
import { TClient } from '../../types';

dotenv.config();

export const secret = process.env.SECRET || 'SECRET'

export const getClients = async () => {
  try {
    const response = await fetch(
      'https://www.mocky.io/v2/5808862710000087232b75ac',
    );
    const json = await response.json();
    const clients = json.clients;
    return clients;
  } catch (e) {
    throw new Error(e);
  }
};

export const getPolicies = async () => {
  try {
    const response = await fetch(
      'https://www.mocky.io/v2/580891a4100000e8242b75c5',
    );
    const json = await response.json();

    const policies = json.policies;
    return policies;
  } catch (e) {
    throw new Error(e);
  }
};

export const authenticate = async ({ email, name }: Partial<TClient>) => {
  const clients: TClient[] = await getClients();
  const client: TClient | undefined = clients.find(
    (e: TClient) => e.email === email && e.name === name,
  );
  if (client) {
    const token = jwt.sign({ sub: client.id, role: client.role }, secret);
    return {
      ...client,
      token,
    };
  }
};
