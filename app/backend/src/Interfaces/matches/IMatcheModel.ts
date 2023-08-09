import { ICRUDModelReader } from '../ICrudModel';
import IMatch from './IMatch';

export interface IMatchesModelBase extends ICRUDModelReader<IMatch> {
  addNewMatch(match: IMatch): Promise<IMatch>
}

export interface IInProgressMatchesModel {
  getInProgress(inProgress: boolean): Promise<IMatch[]>
  finishMatch(id: number): Promise<void>
}

export interface IScoreMatchesModel {
  updateScoreMatch(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number
  ): Promise<void>
}

export interface IMatchesModel
  extends IMatchesModelBase, IInProgressMatchesModel, IScoreMatchesModel {}
