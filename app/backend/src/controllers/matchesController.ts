import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';
import mapStatus from '../utils/map-status-http';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async getAll(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    let isInProgress;
    if (inProgress === 'true') {
      isInProgress = true;
    } else if (inProgress === 'false') {
      isInProgress = false;
    } else {
      isInProgress = undefined;
    }

    const result = await this.matchesService.findAll(isInProgress);
    const { status, data } = result;
    const statusCode = mapStatus(status);
    return res.status(statusCode).json(data);
  }

  public async finishMatch(req: Request, res: Response): Promise<Response> {
    const result = await this.matchesService.finishMatch(+req.params.id);
    const { status, data } = result;
    const statusCode = mapStatus(status);
    return res.status(statusCode).json(data);
  }

  public async updateScoreMatch(req: Request, res: Response): Promise<Response> {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { id } = req.params;
    const result = await this.matchesService.updateScoreMatch(+id, homeTeamGoals, awayTeamGoals);
    const { status, data } = result;
    const statusCode = mapStatus(status);
    return res.status(statusCode).json(data);
  }

  public async addNewMatch(req: Request, res: Response): Promise<Response> {
    const result = await this.matchesService.addNewMatch(req.body);
    const { status, data } = result;
    const statusCode = mapStatus(status);
    return res.status(statusCode).json(data);
  }
}
