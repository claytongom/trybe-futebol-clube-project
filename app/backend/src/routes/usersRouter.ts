import { Router } from 'express';
import UsersController from '../controllers/usersController';
import { validateLogin, isValidator } from '../middlewares/ValidateUser';
import AuthValidations from '../middlewares/Authentication';

const router = Router();
const usersController = new UsersController();

router.route('/')
  .post(validateLogin, isValidator, (req, res) => usersController.authenticate(req, res));

router.route('/role')
  .get(AuthValidations.token, (req, res) => usersController.getUserRoleById(req, res));

export default router;
