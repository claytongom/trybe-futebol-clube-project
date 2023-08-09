import { Request, Response } from 'express';
import mapStatus from '../utils/map-status-http';
import UsersService from '../services/usersService';
import { IAuthRequest } from '../Interfaces/users/typesAndInterfaces';

export default class UsersController {
  constructor(private usersService = new UsersService()) {}

  public async authenticate(req: Request, res: Response): Promise<Response> {
    const user = await this.usersService.authenticate(req.body);
    const statusCode = mapStatus(user.status);
    return res.status(statusCode).json(user.data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getUserRoleById(req: IAuthRequest | any, res: Response): Promise<Response> {
    const user = await this.usersService.findById(req.user);
    return res.status(200).json(user.data);
  }
}
