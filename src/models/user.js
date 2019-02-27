const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
}, { collectionName: 'users' });

User.static('authenticate', async function authenticate(email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new Error('Incorrect password');
  }

  return user;
});

module.exports = mongoose.model('users', User);
