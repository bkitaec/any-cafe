import { mutateData } from 'utils/redux/action-utils';

import signUpMutation from 'graphql/user/signUpMutation';

export const USER_SIGN_UP_START = '@@anycafe/app/USER_SIGN_UP_START';
export const USER_SIGN_UP = '@@anycafe/app/USER_SIGN_UP';

export const userSignUpAction = (record) =>
    mutateData(USER_SIGN_UP_START, USER_SIGN_UP, signUpMutation, 'Registration successfull!')({ record });
