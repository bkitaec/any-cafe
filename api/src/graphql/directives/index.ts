import { isUserOwnerDirective, IsAuthDirective } from './auth.directive';

export const schemaDirectives = {
    isAuth: IsAuthDirective,
    isUserOwner: isUserOwnerDirective
};