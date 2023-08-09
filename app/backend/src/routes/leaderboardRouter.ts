import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const router = Router();
const leaderboardController = new LeaderboardController();

router.route('/home')
  .get((req, res) => leaderboardController.homeLeaderboard(req, res));

router.route('/away')
  .get((req, res) => leaderboardController.awayLeaderboard(req, res));

export default router;
