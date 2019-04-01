import { resolver } from 'graphql-sequelize';
import to from 'await-to-js';

import { User } from '../../models';

export const Query = {
    getProfile: resolver(User, {
        before: async (findOptions, {}, { userAuth }) => {
            findOptions.where = { id: userAuth.id };
            return findOptions;
        },
        after: (user) => {
            return user;
        }
    }),
    loginUser: resolver(User, {
        before: async (findOptions, { email }) => {
            findOptions.where = {email};
            return findOptions;
        },
        after: async (user, { password }) => {
            let err = null;
            [err, user] = await to(user.comparePassword(password));
            if(err) {
              throw new Error(err);
            }
            user.login = true;//to let the directive know to that this user is authenticated without an authorization header
            return user;
        }
    }),
};
