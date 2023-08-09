import { Router } from 'express';
import TeamsController from '../controllers/teamsController';

const router = Router();
const teamsController = new TeamsController();

router.route('/')
  .get((req, res) => teamsController.getAll(req, res));

router.route('/:id')
  .get((req, res) => teamsController.getbyId(req, res));

export default router;
