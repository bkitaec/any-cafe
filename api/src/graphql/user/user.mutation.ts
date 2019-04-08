import to from 'await-to-js';
import { resolver } from 'graphql-sequelize';

import { User } from '../../models';
import { authenticateFacebook } from '../../auth';

export const Mutation = {
    createUser: resolver(User, {
      before: async (findOptions, { record }) => {
        let err, user;
        [err, user] = await to(User.create(record) );
        if (err) {
          throw err;
        }
        findOptions.where = { id:user.id };
        return findOptions;
      },
      after: (user) => {
        user.login = true;
        return {
            token: user.getToken()
        };
      }
    }),
    editProfile: resolver(User, {
      before: (findOptions, { record }) => {
        if(!record.id) {
            throw 'user.id is required';
        }
        findOptions.where = { id: record.id };
        return findOptions;
      },
      after: async (user, { record }) => {
        let err, userUpdated;
        [err, userUpdated] = await to(user.update(record) );
        if (err) {
          throw err;
        }
        return userUpdated;
      }
    }),
    authFacebook: resolver(User, {
        before: async (findOptions, _, { fullContext }) => findOptions,
        after: async (user, { accessToken }, { fullContext: { req, res } }) => {
            req.body = {
              ...req.body,
              access_token: accessToken,
            };
            let [err, facebookInfo] = await to(authenticateFacebook(req, res));
            const { data = null, info = null } = facebookInfo || {};

            if (data) {
              [err, user] = await to(User.upsertFbUser(data));
            }

            if (info) {
              switch (info.code) {
                case 'ETIMEDOUT':
                  return (new Error('Failed to reach Facebook: Try Again'));
                default:
                  return (new Error('something went wrong with Facebook OAuth'));
              }
            } else if(err || !user) {
              throw new Error(err);
            }
            return {
              token: user.getToken(),
            };
        }
    }),
};
