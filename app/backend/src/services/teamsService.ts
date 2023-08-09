import ITeam from '../Interfaces/teams/ITeam';
import { ServiceRes } from '../Interfaces/ServiceResponse';
import { ITeamsModel } from '../Interfaces/teams/ITeamModel';
import TeamsModel from '../models/teamsModel';

export default class TeamsService {
  constructor(private teamsModel: ITeamsModel = new TeamsModel()) {}

  public async findAll(): Promise<ServiceRes<ITeam[]>> {
    const data = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data };
  }

  public async findById(id: number): Promise<ServiceRes<ITeam | null>> {
    const data = await this.teamsModel.findById(id);
    return { status: 'SUCCESSFUL', data };
  }
}
