import SequelizeTeams from '../database/models/teamsModel';
import SequelizeMatches from '../database/models/matchesModel';
import { ILeaderboardModel } from '../Interfaces/leaderboard/LeaderboardModel';
import IMatch from '../Interfaces/matches/IMatch';

export default class LeaderboardModel implements Omit<ILeaderboardModel, 'findById' | 'findAll'> {
  private model = SequelizeMatches;

  public async getMatchesWithTeamStats(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      where: { inProgress: false },
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
}
