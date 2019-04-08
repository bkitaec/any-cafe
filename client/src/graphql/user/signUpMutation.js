import gql from 'graphql-tag';

export default gql`
    mutation signUpMutation($record: UserCreateInput!) {
        result: createUser(record: $record) {
            token
        }
    }
`;
