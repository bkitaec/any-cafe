import { resolver } from 'graphql-sequelize';
import to from 'await-to-js';

import { User } from '../../models';

export const Query = {
    getProfile: resolver(User, {
        before: async (findOptions, {}, {user}) => {
            findOptions.where = {id: user.id};
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
            let err;
            [err, user] = await to(user.comparePassword(password));
            if(err) {
              console.log(err);
              throw new Error(err);
            }

            user.login = true;//to let the directive know to that this user is authenticated without an authorization header
            return user;
        }
    }),
};
