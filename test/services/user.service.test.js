const { expect } = require('chai');
const bcrypt = require('bcrypt');

const models = require('../../src/models');
const testDB = require('../test-db')(models);

const UserService = require('../../src/services/user.service');

describe('UserService', () => {
  it('should be defined', () => {
    expect(UserService).to.exist;
  });

  const userService = new UserService({ models });

  before(() => testDB.connect());

  after(() => testDB.disconnect());

  describe('login', () => {
    const password = 'test1234';
    const baseUser = {
      email: 'some-email@email.com',
      password: bcrypt.hashSync(password, 1),
    };

    before(() => models.User.create(baseUser));

    after(() => models.User.deleteMany());

    it('should return the user', async () => {
      const user = await userService.login(baseUser.email, password);

      expect(user.email).to.be.equal(baseUser.email);
    });

    it('should throw an error if user does not exists', async () => {
      let error;
      try {
        await userService.login('wrong-email@email.com', password);
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.equal('Invalid login');
    });

    it('should throw an error if password does not match', async () => {
      let error;
      try {
        await userService.login(baseUser.email, 'wrong-password');
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.equal('Invalid login');
    });
  });
});
