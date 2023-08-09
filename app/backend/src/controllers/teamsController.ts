import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

export default class TeamsController {
  constructor(private teamsService = new TeamsService()) {}

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const teams = await this.teamsService.findAll();
    return res.status(200).json(teams.data);
  };

  public async getbyId(req: Request, res: Response): Promise<Response> {
    const teamId = +req.params.id;
    const team = await this.teamsService.findById(teamId);
    return res.status(200).json(team.data);
  }
}
