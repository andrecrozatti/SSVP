const jwt = require('jsonwebtoken');
const AppError = require('../errors/AppError');
const { setUser } = require('../contexts/requestContext');

module.exports = async (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new AppError('Token not provided');

    const { token, user }= JSON.parse(authHeader.split(" ")[1]);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    request.user = user
    setUser(user)

    
    return next();
  } catch (err) {
    return response.status(401).json({ error: err.message });
  }
};
