import * as bcrypt from 'bcryptjs';
import { ServiceRes } from '../Interfaces/ServiceResponse';
import JwtToken from '../utils/jwt-token';
import UsersModel from '../models/usersModel';
import { TypeLogin, TypeToken } from '../Interfaces/users/typesAndInterfaces';

export default class UsersService {
  private jwt: JwtToken;
  private model: UsersModel;

  constructor() {
    this.jwt = new JwtToken();
    this.model = new UsersModel();
  }

  async authenticate(userInfo:TypeLogin): Promise<ServiceRes<TypeToken>> {
    const { email, password } = userInfo;
    const user = await this.model.findByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { status: 'INVALID_USER_DATA', data: { message: 'Invalid email or password' } };
    }

    const token = this.jwt.sign({ id: user.id });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  async findById(id: number): Promise<ServiceRes<object>> {
    const user = await this.model.findById(id);

    if (!user) {
      return { status: 'NOT_FOUND', data: { message: 'User not found' } };
    }

    return { status: 'SUCCESSFUL', data: { role: user.role } };
  }
}
