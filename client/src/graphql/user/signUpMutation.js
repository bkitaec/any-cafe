import gql from 'graphql-tag';

export default gql`
    mutation signUpMutation($data: UserInput!) {
        result: createUser(data: $records) {
            id: Int
            name
            email
            password
            company
            token
        }
    }
`;
