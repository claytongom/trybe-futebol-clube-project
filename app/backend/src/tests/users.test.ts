import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UsersService from '../services/usersService';
import { loginExemplo, token } from './mocks/userMocks';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Users API Tests', () => {
  const usersService = new UsersService();

  afterEach(() => {
    sinon.restore();
  });

  describe('POST /login', () => {
    it('should return a token when the endpoint is called', async function() {
      sinon.stub(usersService, 'authenticate').resolves(token as any);

      const response = await chai
        .request(app)
        .post('/login')
        .send(loginExemplo);

      expect(response).to.have.status(200);
      expect(response.body.token).to.equal(token);
    });
  });
});
