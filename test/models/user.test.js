const { expect } = require('chai');
const bcrypt = require('bcrypt');

const models = require('../../src/models');
const testDB = require('../test-db')(models);

describe('UserModel', () => {
  before(() => testDB.connect());

  after(() => testDB.disconnect());

  describe('when creating an User', () => {
    const baseUser = {
      email: 'some-email@email.com',
      password: 'aabbccdd',
    };

    it('should create the model', () => {
      const user = new models.User(baseUser);

      expect(user.email).to.be.equal(baseUser.email);
      expect(user.password).to.be.equal(baseUser.password);
    });
  });

  describe('authenticate', () => {
    const password = 'test1234';
    const baseUser = {
      email: 'some-email@email.com',
      password: bcrypt.hashSync(password, 1),
    };

    before(async () => {
      await new models.User(baseUser).save();
    });

    after(() => models.User.deleteMany());

    it('should authenticate correctly', async () => {
      const user = await models.User.authenticate(baseUser.email, password);

      expect(user.email).to.be.equal(baseUser.email);
    });

    it('should throw an error if user does not exist', async () => {
      let error;
      try {
        await models.User.authenticate('wrong-email@email.com', 'wrong-password');
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.equal('User not found');
    });

    it('should throw an error if wrong password', async () => {
      let error;
      try {
        await models.User.authenticate(baseUser.email, 'wrong-password');
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.equal('Incorrect password');
    });
  });
});
