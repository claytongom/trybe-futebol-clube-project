import { ITeamsModel } from '../Interfaces/teams/ITeamModel';
import SequelizeTeams from '../database/models/teamsModel';
import ITeam from '../Interfaces/teams/ITeam';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  public async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams.map((team) => team.toJSON());
  }

  public async findById(id: number): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);
    return team?.toJSON() || null;
  }
}
