// const jwt = require('jsonwebtoken');

// const { jwtKey } = config.get('app');

// export const authorization = async (request, h) => {
//   let token = request.headers['authorization'];
//   token = token.split(' ')[1];
//   let decoded = {};
//   try {
//     decoded = jwt.verify(token, jwtKey);
//   } catch (err) {
//     //console.log('---------------in catch', 'oooooo', token);
//     throw Boom.unauthorized(Messages.tokenExpired);
//   }

//   logger.info('authorization', decoded);
//   const deactivatedToken = await User.checkDeactivatedToken(token);
//   if (deactivatedToken) {
//     throw Boom.unauthorized(deactivatedToken.deactivateReason);
//   }
//   const user = await User.checkToken(token);
//   if (user) {
//     return h.authenticated({ credentials: { user, token } });
    
//   } else throw Boom.unauthorized(Messages.unauthorizedUser);
// };
// module.exports.generateToken = data =>
// console.log("too===",data)
//   jwt.sign(data, gagan, { algorithm: HS512, expiresIn: '90d' });

// module.exports.decodeToken = token => jwt.verify(token, config.app.jwtKey);
// export const successAction = (data, message = 'OK') => ({
//   statusCode: 200,
//   message,
//   data: data ? data : undefined
// });

// export const failAction = errorMessage => {
//   // if (errorMessage === Messages.userNotVerified) {
//   //   const error = Boom.badRequest(Messages.userNotVerified);
//   //   error.output.statusCode = 471; // Assign a custom error code
//   //   error.reformat();
//   //   throw error;
//   // } else {
//   throw Boom.badRequest(errorMessage);
// };

// export const failActionJoi = (request, h, error) => {
//   let errorMessage = '';
//   if (error.output.payload.message.indexOf('[') > -1) {
//     errorMessage = error.output.payload.message.substr(error.output.payload.message.indexOf('['));
//   } else {
//     errorMessage = error.output.payload.message;
//   }
//   errorMessage = errorMessage.replace(/"/g, '');
//   errorMessage = errorMessage.replace('[', '');
//   errorMessage = errorMessage.replace(']', '');
//   error.output.payload.message = errorMessage;
//   delete error.output.payload.validation;
//   throw Boom.badRequest(errorMessage);
// };

// export const socketFailAction = (message, type, statusCode = '', data) => ({
//   statusCode: statusCode ? statusCode : 400,
//   status: false,
//   message,
//   type: type,
//   data: data ? data : undefined
// });

// export const socketsuccessAction = (message, type, data, statusCode = '') => ({
//   statusCode: statusCode ? statusCode : 200,
//   status: true,
//   message,
//   type: type,
//   data: data ? data : undefined
// });

