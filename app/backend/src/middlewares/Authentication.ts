import { NextFunction, Response } from 'express';
import JwtToken from '../utils/jwt-token';
import { IDecode, IAuthRequest } from '../Interfaces/users/typesAndInterfaces';

export default class AuthValidations {
  static token(req: IAuthRequest, res: Response, next: NextFunction): Response | void {
    const { authorization: token } = req.headers;

    const jwt = new JwtToken();

    if (!AuthValidations.hasToken(token)) {
      return res.status(401).json(
        {
          message: 'Token not found' },
      );
    }

    try {
      const decoded = jwt.verify(token?.split(' ')[1] || '') as IDecode;
      if (!decoded) throw new Error('Token must be a valid token');
      req.user = decoded.id;

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }

  private static hasToken(token: string | undefined): boolean {
    if (!token) return false;
    return true;
  }
}
