import React from 'react';
import { graphql } from "react-apollo";
import createUserMutation from "graphql/mutations/createUser";
import UsersQuery from "graphql/queries/users";
import Form from "./Form";

const CreateUserPage = (props) => {

  const handleSubmit = ( data ) => {
    console.log('handleSubmit',data);

    props.mutate({
      variables: data,
      optimisticResponse: {
        __typename: 'Mutation',
        createUser: {
          __typename: 'User',
          id: Math.random().toString(36).substring(7),
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          address: data.address || '',
          lists: [],
        },
      },
      refetchQueries: [{ query: UsersQuery }],
      update: (proxy, { data: { createUser } }) => {
        const query = UsersQuery;
        const data = proxy.readQuery({ query });
        data.users.push(createUser);
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




  return (
    <div>
      <h1>Add New User</h1>
      <p className="sub-heading">Please enter the details below to add new user.</p>

      <Form submit={ handleSubmit } />

    </div>
  )

}



export default graphql(createUserMutation)(CreateUserPage);


/*
export default graphql(
  createUserMutation,
  {
    options: {
      refetchQueries: [{ query: UsersQuery }],
      update: (proxy, { data: { createUser } }) => {
        const query = UsersQuery;
        const data = proxy.readQuery({ query });
        data.users.push(createUser);
        proxy.writeQuery({ query, data });
      }
    },
    props: (props) => ({
      createUser: (user) => {
        return props.mutate({
          variables: user,
          optimisticResponse: () => ({
            createUser: {
              phone: '', address: '', __typename: 'User', lists: [],
              ...user,
              id: Math.random().toString(36).substring(7)
            }
          }),
        })
      }
    })
  }
)(CreateUserPage);
*/

/*
    props.mutate({
      variables: data,
      optimisticResponse: {
        __typename: 'Mutation',
        createUser: {
          __typename: 'User',
          id: 'loading',
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          address: data.address || '',
        },
      },
      updateQueries: {
        users: (previousResult, { mutationResult }) => {
          const newUser = mutationResult.data.createUser;
          const result = previousResult.users.push(newUser);
          console.log('result',result);
          return result;
        }
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







    props.mutate({
      // mutation: createUserMutation,
      variables: data,
      // update: (proxy, { data: { createUser } }) => {
      //   const data = proxy.readQuery({ query: UsersQuery });
      //   data.users.push({...createUser, lists: []});
      //   proxy.writeQuery({ query: UsersQuery, data });
      // },
    })
    .then( res => {
      console.log('THEN', res);
      props.history.push('/');
    });

    props.mutate({
      variables: data,
    })
    .then( res => {
      console.log('THEN', res);
      props.history.push('/');
    });


*/
