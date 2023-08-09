import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';
import mapStatus from '../utils/map-status-http';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public async homeLeaderboard(req: Request, res: Response): Promise<Response> {
    const result = await this.leaderboardService.homeStatus();
    const { status, data } = result;
    const statusCode = mapStatus(status);
    return res.status(statusCode).json(data);
  }

  public async awayLeaderboard(req: Request, res: Response): Promise<Response> {
    const result = await this.leaderboardService.awayStatus();
    const { status, data } = result;
    const statusCode = mapStatus(status);
    return res.status(statusCode).json(data);
  }
}
