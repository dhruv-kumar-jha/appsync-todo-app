import gql from 'graphql-tag';

export default gql`
mutation ($id: ID!) {
  deleteUser(id: $id) {
    __typename
    id
    name
    email
  }
}`;
