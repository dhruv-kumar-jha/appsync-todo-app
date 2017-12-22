import gql from 'graphql-tag';

export default gql`
mutation ($name: String!, $email: String!, $password: String!, $phone: String, $address: String) {
  createUser(
    name: $name
    email: $email
    password: $password
    phone: $phone
    address: $address
  ) {
    __typename
    id
    name
    email
    phone
    address
  }
}`;
