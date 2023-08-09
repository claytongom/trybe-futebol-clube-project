import { IUsersModel } from '../Interfaces/users/IUsersModel';
import SequelizeUsers from '../database/models/usersModel';
import IUser from '../Interfaces/users/IUser';

export default class UsersModel implements Omit<IUsersModel, 'findAll'> {
  private model = SequelizeUsers;

  public async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (user) {
      return user;
    }
    return null;
  }

  public async findById(id: IUser['id']): Promise<IUser | null> {
    const user = await this.model.findByPk(id, { raw: true });
    if (user) {
      return user;
    }
    return null;
  }
}
