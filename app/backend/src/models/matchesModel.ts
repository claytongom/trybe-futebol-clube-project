import SequelizeTeams from '../database/models/teamsModel';
import { IMatchesModel } from '../Interfaces/matches/IMatcheModel';
import SequelizeMatches from '../database/models/matchesModel';
import IMatch from '../Interfaces/matches/IMatch';

export default class MatchesModel implements Omit<IMatchesModel, 'findById'> {
  private model = SequelizeMatches;

  public async findAll(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        {
          model: SequelizeTeams,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: SequelizeTeams,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });

    return matches;
  }

  public async getInProgress(inProgress: boolean): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        {
          model: SequelizeTeams,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: SequelizeTeams,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
      where: { inProgress },
    });

    return matches;
  }

  public async finishMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  public async updateScoreMatch(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<void> {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  public async addNewMatch(match: IMatch): Promise<IMatch> {
    const newMatch = await this.model.create(match);
    return newMatch;
  }
}
