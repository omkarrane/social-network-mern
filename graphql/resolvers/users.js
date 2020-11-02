const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const User = require('../../models/User');
const { JWT_SECRET } = require('../../config');
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators');

module.exports = {
  Mutation: {
    async register(parent, { registerInput: { username, email, password, confirmPassword } }, context, info) {
      const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);

      if (!valid)
        throw new UserInputError('Errors', { errors });

      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username is already used', {
          errors: {
            username: 'This username is taken'
          }
        });
      }
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString()
      });

      const result = await newUser.save();
      const token = jwt.sign({
        id: result.id,
        email: result.email,
        username: result.username
      }, JWT_SECRET, { expiresIn: '1h' });

      return {
        ...result._doc,
        id: result._id,
        token
      }
    },

    async login(parent, { username, password }, context, info) {
      const { valid, errors } = validateLoginInput(username, password);

      if (!valid)
        throw new UserInputError('Errors', { errors });

      
    }
  }
} 