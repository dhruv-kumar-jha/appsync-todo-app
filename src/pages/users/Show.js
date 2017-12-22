import React from 'react';
import { Link } from "react-router-dom";
import { graphql, compose } from "react-apollo";
import UserQuery from "graphql/queries/user";
import UsersQuery from "graphql/queries/users";
import Loading from 'components/common/Loading';
import deleteUserMutation from "graphql/mutations/deleteUser";
import List from 'components/app/List';


const ShowUserPage = (props) => {

  const deleteUser = () => {
    if ( window.confirm('Are you sure you want to delete this user?') ) {
      props.mutate({
        variables: { id: props.match.params.id },
        optimisticResponse: {
          __typename: 'Mutation',
          deleteUser: {
            __typename: 'User',
            id: props.data.user.id,
            name: props.data.user.name,
            email: props.data.user.email,
          },
        },
        refetchQueries: [{ query: UsersQuery }],
        update: (proxy, { data: { deleteUser } }) => {
          const query = UsersQuery;
          const data = proxy.readQuery({ query });
          data.users = data.users.filter(user => user.id !== deleteUser.id);
          proxy.writeQuery({ query, data });
        },
      })
      .then( res => {
        props.history.push('/');
      })
      .catch( res => {
        console.log('res',res);
      });
    }
  }


  if ( props.data.user ) {
    const { user } = props.data;
    return (
      <div>

        <h1>{ user.name }'s Todos</h1>
        <p className="sub-heading">These are all the todos associated with this user.</p>

        <div style={{ marginTop: 20 }}>
          <Link to={`/users/${user.id}/edit`} className="button button--yellow size--medium">Update User Details</Link>
          <button
            className="button button--danger size--medium"
            style={{ marginLeft: 20 }}
            onClick={ deleteUser }
          >Delete this User</button>
        </div>

        { user.lists && user.lists.length > 0 &&
        <div className="component--lists">
          { user.lists.map( list => <List key={list.id} data={list} /> ) }
        </div>
        }

        { user.lists && user.lists.length < 1 &&
          <div className="empty--data">No List(s) has been added by this User.</div>
        }

      </div>
    );
  }

  else {
    return (
      <Loading />
    );
  }

}


export default compose(
  graphql( UserQuery, { options: (props) => {
    return { variables: { id: props.match.params.id }
  } } } ),
  graphql(deleteUserMutation)
)(ShowUserPage);

