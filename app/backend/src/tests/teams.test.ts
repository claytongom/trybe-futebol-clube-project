import * as sinon from 'sinon';
import * as chai from 'chai';

const chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeams from '../database/models/teamsModel';
import { allTeams } from './mocks/teamMocks';
import UsersService from '../services/usersService';
import { loginExemplo, token } from './mocks/userMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste Teams', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('testa retorno de todos os times', async function() {
    sinon.stub(SequelizeTeams, 'findAll').resolves(allTeams as any);

    const { status } = await chai.request(app).get('/teams');
    expect(status).to.eq(200);
  });

  it('testa retorno de um time por ID', async function() {
    sinon.stub(SequelizeTeams, 'findByPk').resolves( allTeams[0] as any);

    const { status } = await chai.request(app).get('/teams/5');
    expect(status).to.eq(200);
  });
});
