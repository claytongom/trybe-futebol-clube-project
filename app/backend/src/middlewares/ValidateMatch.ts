import { NextFunction, Request, Response } from 'express';
import mapStatus from '../utils/map-status-http';
import TeamsModel from '../models/teamsModel';
import { ITeamsModel } from '../Interfaces/teams/ITeamModel';

export default class MatchValidations {
  static async teamsInfoValidate(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      return res
        .status(mapStatus('CONFLICT'))
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const teamsModel: ITeamsModel = new TeamsModel();

    const teams = await teamsModel.findAll();
    const homeTeam = teams.find((team) => team.id === homeTeamId);
    const awayTeam = teams.find((team) => team.id === awayTeamId);

    if (!homeTeam || !awayTeam) {
      return res
        .status(mapStatus('NOT_FOUND'))
        .json({ message: 'There is no team with such id!' });
    }

    next();
  }
}
