import { resolver as rs } from 'graphql-sequelize';
import { User } from '../../models';
import to from 'await-to-js';

export const Mutation = {
    createUser: rs(User, {
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
    editProfile: rs(User, {
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
};
