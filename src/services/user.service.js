class UserService {
  constructor({ models }) {
    this.UserModel = models.User;
  }

  /**
   * Login
   *
   * @param {string} email
   * @param {string} password
   */
  login(email, password) {
    return this.UserModel.authenticate(email, password)
      .catch((error) => {
        console.error(error);
        throw new Error('Invalid login');
      });
  }
}

module.exports = UserService;
