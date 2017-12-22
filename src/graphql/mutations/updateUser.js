import gql from 'graphql-tag';

export default gql`
mutation ($id: ID!, $name: String, $email: String, $phone: String, $address: String) {
  updateUser(
    id: $id
    name: $name
    email: $email
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
