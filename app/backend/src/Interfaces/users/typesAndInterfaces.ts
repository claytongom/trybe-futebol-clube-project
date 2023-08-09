import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

export interface IDecode extends JwtPayload {
  role?: string;
}

export interface IAuthRequest extends Request {
  user?: IDecode;
}

export type TypeLogin = {
  email: string;
  password: string;
};

export type TypeToken = {
  token: string;
};
