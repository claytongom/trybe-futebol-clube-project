import { IMatchesModel } from '../Interfaces/matches/IMatcheModel';
import { ServiceRes } from '../Interfaces/ServiceResponse';
import IMatch from '../Interfaces/matches/IMatch';
import MatchesModel from '../models/matchesModel';

export interface IMatchesService {
  findAll(inProgress?: boolean): Promise<ServiceRes<IMatch[]>>;
  finishMatch(id: number): Promise<ServiceRes<{ message: string }>>;
  updateScoreMatch(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceRes<{ message: string }>>;
  addNewMatch(match: IMatch): Promise<ServiceRes<IMatch>>;
}

export default class MatchesService implements IMatchesService {
  constructor(private matchesModel: Omit<IMatchesModel, 'findById'> = new MatchesModel()) {}

  public async findAll(inProgress?: boolean): Promise<ServiceRes<IMatch[]>> {
    if (inProgress === undefined) {
      const data = await this.matchesModel.findAll();
      return { status: 'SUCCESSFUL', data };
    }
    const data = await this.matchesModel.getInProgress(inProgress);
    return { status: 'SUCCESSFUL', data };
  }

  public async finishMatch(id: number): Promise<ServiceRes<{ message: string }>> {
    await this.matchesModel.finishMatch(id);
    const data = { message: 'Finished' };
    return { status: 'SUCCESSFUL', data };
  }

  public async updateScoreMatch(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceRes<{ message: string }>> {
    await this.matchesModel.updateScoreMatch(id, homeTeamGoals, awayTeamGoals);
    const data = { message: 'Match Score updated successfully' };
    return { status: 'SUCCESSFUL', data };
  }

  public async addNewMatch(match: IMatch): Promise<ServiceRes<IMatch>> {
    const updatedMatch: IMatch = {
      id: match.id,
      homeTeamId: match.homeTeamId,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamId: match.awayTeamId,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: true,
    };

    const data = await this.matchesModel.addNewMatch(updatedMatch);

    return {
      status: 'OK',
      data,
    };
  }
}
