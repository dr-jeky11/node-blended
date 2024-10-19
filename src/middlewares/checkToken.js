// import createHttpError from 'http-errors';
// import { findSession, findUserById } from '../services/users';

// const checkToken = async (req, res, next) => {
//   const authHeader = req.get('Authorization');
//   if (!authHeader) {
//     next(createHttpError(401, 'Unauthorized'));
//     return;
//   }
//   const [bearer, token] = authHeader.split(' ');

//   if (bearer !== 'Bearer' || !token) {
//     next(createHttpError(401, 'Unauthorized'));
//     return;
//   }

//   const session = await findSession(token);
//   if (!session) {
//     next(createHttpError(401, 'Unauthorized'));
//     return;
//   }

//   const isAccessTokenExpired = new Date() > session.accessTokenValidUntil;

//   if (!isAccessTokenExpired) {
//     next(createHttpError(401, 'Unauthorized'));
//     return;
//   }

//   const user = await findUserById(session.userId);

//   if (!user) {
//     next(createHttpError(401, 'Unauthorized'));
//     return;
//   }

//   req.user = user;
//   next();
// };
