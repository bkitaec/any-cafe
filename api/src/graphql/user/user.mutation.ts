import to from 'await-to-js';
import { resolver } from 'graphql-sequelize';

import { User } from '../../models';
import { authenticateFacebook } from '../../auth/passport';

export const Mutation = {
    createUser: resolver(User, {
      before: async (findOptions, { data }) => {
        let err, user;
        [err, user] = await to(User.create(data) );
        if (err) {
          throw err;
        }
        findOptions.where = { id:user.id };
        return findOptions;
      },
      after: (user) => {
        user.login = true;
        return user;
      }
    }),
    editProfile: resolver(User, {
      before: (findOptions, { data }) => {
        console.log('$$$ before.data', data);
        if(!data.email) {
            throw 'user.email is required';
        }
        findOptions.where = { email: data.email };
        return findOptions;
      },
      after: async (user, { data }) => {
        let err, userUpdated;
        [err, userUpdated] = await to(user.update(data) );
        if (err) {
          throw err;
        }
        return userUpdated;
      }
    }),
    authFacebook: resolver(User, {
        before: async (findOptions) => findOptions,
        after: async (user, { accessToken }, { req, res }) => {
            req.body = {
              ...req.body,
              access_token: accessToken,
            };

            let [err, { data, info }] = await to(authenticateFacebook(req, res));

            if (data) {
              [err, user] = await to(User.upsertFbUser(data));
            }

            if (info || !user) {
              console.log(info);
              switch (info.code) {
                case 'ETIMEDOUT':
                  return (new Error('Failed to reach Facebook: Try Again'));
                default:
                  return (new Error('something went wrong with Facebook OAuth'));
              }
            } else if(err) {
              console.log(err);
              throw new Error(err);
            }

            user.login = true;
            return user;
        }
    }),
};
