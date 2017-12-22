import React from 'react';
import { graphql, compose } from "react-apollo";
import updateUserMutation from "graphql/mutations/updateUser";
import UserQuery from "graphql/queries/user";
import UsersQuery from "graphql/queries/users";
import Form from "./Form";
import Loading from 'components/common/Loading';


const UpdateUserPage = (props) => {

  const handleSubmit = ( data ) => {

    props.mutate({
      variables: data,
      optimisticResponse: {
        __typename: 'Mutation',
        updateUser: {
          __typename: 'User',
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          address: data.address || '',
          lists: data.items || [],
        },
      },
      refetchQueries: [{ query: UsersQuery }],
      update: (proxy, { data: { updateUser } }) => {
        const query = UsersQuery;
        const data = proxy.readQuery({ query });
        data.users = data.users.map(user => user.id !== updateUser.id ? user : { ...user, ...updateUser });
        proxy.writeQuery({ query, data });
      },
    })
    .then( res => {
      props.history.push('/');
    })
    .catch( res => {
      if ( res.graphQLErrors ) {
        const errors = res.graphQLErrors.map( error => error.message );
        console.log('errors',errors);
      }
    });

  }


  if ( ! props.data.user ) {
    return (<Loading message="Loading user details..." />);
  }


  const { id, name, email, phone, address } = props.data.user;

  return (
    <div>
      <h1>Update User: { props.data.user.name }</h1>
      <p className="sub-heading">Please make the changes below and click on update user.</p>

      <Form user={{ id, name, email, phone, address }} submit={ handleSubmit } />

    </div>
  )

}


export default compose(
  graphql( UserQuery, { options: (props) => {
    return { variables: { id: props.match.params.id }
  } } } ),
  graphql(updateUserMutation)
)(UpdateUserPage);
