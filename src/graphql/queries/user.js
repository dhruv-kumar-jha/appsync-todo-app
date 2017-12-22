import gql from 'graphql-tag';

export default gql`
query user( $id: ID! ) {
  user( id: $id ) {
    __typename
    id
    name
    email
    phone
    address
    lists {
      id
      name
      description
      items {
        id
        name
        description
        date
        status
      }
    }
  }
}`;
