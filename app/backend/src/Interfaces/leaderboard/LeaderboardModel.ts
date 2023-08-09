import { ICRUDModelReader } from '../ICrudModel';
import IMatch from '../matches/IMatch';
import IHomeLeaderboard from './ILeaderboard';

export interface ILeaderboardModel extends ICRUDModelReader<IHomeLeaderboard> {
  getMatchesWithTeamStats(): Promise<IMatch[]>
}
