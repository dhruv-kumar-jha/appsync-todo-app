import gql from 'graphql-tag';

export default gql`
mutation ($id: ID!, $name: String!, $description: String) {
  createList(
    user_id: $id
    name: $name
    description: $description
  ) {
    __typename
    id
    name
    description
    items
  }
}`;
