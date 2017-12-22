import gql from 'graphql-tag';

export default gql`
mutation ($id: ID!, $name: String!, $description: String, $date: String, $status: Boolean) {
  createItem(
    list_id: $id
    name: $name
    description: $description
    date: $date
    status: $status
  ) {
    __typename
    id
    name
    description
    date
    status
  }
}`;
