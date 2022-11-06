import type { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (typeof err === 'string') {
    return res.status(400).json({ message: err });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Invalid Token' });
  }
  return res.status(500).json({ message: err.message });
};

export const noRoutedMatched: ErrorRequestHandler = (err, req, res, next) => {
  res.status(404).send({ error: 'No routes matched' });
  res.end();
};
