import { Router } from 'express';
import MatchesController from '../controllers/matchesController';
import AuthValidations from '../middlewares/Authentication';
import MatchValidations from '../middlewares/ValidateMatch';

const router = Router();
const matchesController = new MatchesController();

router.route('/')
  .post(
    AuthValidations.token,
    MatchValidations.teamsInfoValidate,
    (req, res) => matchesController.addNewMatch(req, res),
  )
  .get((req, res) => matchesController.getAll(req, res));

router.route('/:id')
  .patch(
    AuthValidations.token,
    (req, res) => matchesController.updateScoreMatch(req, res),
  );

router.route('/:id/finish')
  .patch(
    AuthValidations.token,
    (req, res) => matchesController.finishMatch(req, res),
  );

export default router;
