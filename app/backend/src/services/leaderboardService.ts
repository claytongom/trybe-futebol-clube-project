import ILeaderboardTypes from '../Interfaces/leaderboard/ILeaderboard';
import { ServiceRes } from '../Interfaces/ServiceResponse';
import LeaderboardModel from '../models/leaderboardModel';
import { ILeaderboardModel } from '../Interfaces/leaderboard/LeaderboardModel';
import LeaderboardBuilder from '../utils/leaderboard-utils';
import TeamsModel from '../models/teamsModel';

export default class LeaderboardService {
  private _leaderboard: ILeaderboardTypes[] = [];

  constructor(
    private leaderboardModel: Omit<ILeaderboardModel,
    'findById' | 'findAll'> = new LeaderboardModel(),
  ) {}

  public async homeStatus(): Promise<ServiceRes<ILeaderboardTypes[]>> {
    this._leaderboard = await this.homeLeaderboard();
    const data = this.sort();
    return {
      status: 'SUCCESSFUL',
      data,
    };
  }

  async awayStatus(): Promise<ServiceRes<ILeaderboardTypes[]>> {
    this._leaderboard = await this.awayLeaderboard();
    const data = this.sort();
    return {
      status: 'SUCCESSFUL',
      data,
    };
  }

  private async homeLeaderboard(): Promise<ILeaderboardTypes[]> {
    const matches = await this.leaderboardModel.getMatchesWithTeamStats();
    const teams = await new TeamsModel().findAll();
    return teams.reduce((acc, team) => {
      const homeStats = matches.filter((match) => team.id === match.homeTeamId);
      const leaderboardBuilder = new LeaderboardBuilder(homeStats, team.id, 'home');
      acc.push({ name: team.teamName,
        totalPoints: leaderboardBuilder.totalPoints,
        totalGames: homeStats.length,
        totalVictories: leaderboardBuilder.totalVictories,
        totalDraws: leaderboardBuilder.totalDraws,
        totalLosses: leaderboardBuilder.totalLosses,
        goalsFavor: leaderboardBuilder.goalsFavor,
        goalsOwn: leaderboardBuilder.goalsOwn,
        goalsBalance: leaderboardBuilder.goalsBalance,
        efficiency: leaderboardBuilder.efficiency,
      });
      return acc;
    }, [] as ILeaderboardTypes[]);
  }

  private async awayLeaderboard(): Promise<ILeaderboardTypes[]> {
    const matches = await this.leaderboardModel.getMatchesWithTeamStats();
    const teams = await new TeamsModel().findAll();
    return teams.reduce((acc, team) => {
      const awayStatus = matches.filter((match) => team.id === match.awayTeamId);
      const leaderboardBuilder = new LeaderboardBuilder(awayStatus, team.id, 'away');
      acc.push({ name: team.teamName,
        totalPoints: leaderboardBuilder.totalPoints,
        totalGames: awayStatus.length,
        totalVictories: leaderboardBuilder.totalVictories,
        totalDraws: leaderboardBuilder.totalDraws,
        totalLosses: leaderboardBuilder.totalLosses,
        goalsFavor: leaderboardBuilder.goalsFavor,
        goalsOwn: leaderboardBuilder.goalsOwn,
        goalsBalance: leaderboardBuilder.goalsBalance,
        efficiency: leaderboardBuilder.efficiency,
      });
      return acc;
    }, [] as ILeaderboardTypes[]);
  }

  private sort(): ILeaderboardTypes[] {
    return this._leaderboard.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      } if (a.totalVictories !== b.totalVictories) {
        return b.totalVictories - a.totalVictories;
      } if (a.goalsBalance !== b.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.goalsFavor - a.goalsFavor;
    });
  }
}
