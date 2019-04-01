import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from "graphql";
import { User } from "../../models";
import to from 'await-to-js';

export class isUserOwnerDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;//This is confusing javascript syntax here is a link that describes what is going on: https://javascript.info/destructuring-assignment
    field.resolve = async function (...args) {
      const [user, { data }, { userAuth }] = args;

      if (userAuth && data && userAuth.id === data.id) {
        const result = await resolve.apply(this, args);
        return result;
      }

      if (user && userAuth && userAuth.id === user.dataValues.id) {
          const result = await resolve.apply(this, args);
          return result;
      }

      throw new Error('You must be the owner to get or update this information');
    };
  }
}

export class IsAuthDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(...args) {
      let [, {}, { userAuth }] = args;
      if(!userAuth){
        throw new Error('User not authenticated');
      }

      let [err, authUser] = await to(User.findOne({where: {id: userAuth.id}}));
      if(!authUser){
         throw new Error('JWT token received, User not found, and not authenticated');
      }

      args[2].authUser = authUser;
      return resolve.apply(this, args);
    };
  }
}
