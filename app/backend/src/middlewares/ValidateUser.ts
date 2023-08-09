import validator from 'validator';
import { NextFunction, Request, Response } from 'express';
import { TypeLogin } from '../Interfaces/users/typesAndInterfaces';

export function validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
  const { email, password } = req.body as TypeLogin;

  if (!(email && password)) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
}

export function isValidator(req: Request, res: Response, next: NextFunction): Response | void {
  const { email, password } = req.body as TypeLogin;

  if (!validator.isEmail(email) || !validator.isLength(password, { min: 6 })) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
}
