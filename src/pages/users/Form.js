import React from 'react';
import Loading from 'components/common/Loading';


class Form extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: false,
      error: false,
      user: {}
    }
    this.hadleInputChange = this.hadleInputChange.bind(this);
    this.submit = this.submit.bind(this);
  }


  hadleInputChange( name, event ) {
    this.setState({ user: { ...this.state.user, [name]: event.target.value } });
  }


  submit(e) {
    e.preventDefault();

    if ( ! this.props.user && ( ! this.state.user.name || ! this.state.user.email || ! this.state.user.password ) ) {
      this.setState({ error: true });
      return;
    }
    else if ( this.props.user && this.props.user.id ) {
      this.setState({ error: false });
    }
    else {
      this.setState({ error: false });
    }


    if ( this.props.user && this.props.user.id ) {
      this.setState({ error: false, loading: true });
      this.props.submit({ ...this.props.user, ...this.state.user });
    }
    else {
      this.setState({ loading: true });
      this.props.submit( this.state.user );
    }


  }


  render() {

    const user = this.props.user || this.state.user;

    return (
      <div>

        { this.state.error &&
          <div className="error">Please enter all the required fields.</div>
        }

        <form className="form--wrapper" method="POST" onSubmit={ this.submit } autoComplete="off">

          { this.state.loading &&
            <Loading message={ user.id ? "Updating user details..." : "Adding new user.. please wait." } />
          }

          { ! this.state.loading &&
          <div>

            <div className="input">
              <label htmlFor="name">Full Name (required)</label>
              <input type="text" id="name" name="name" defaultValue={ user.name ? user.name : '' } placeholder="John Doe" onChange={ (e) => { this.hadleInputChange('name', e) } } />
            </div>

            <div className="input">
              <label htmlFor="email">Email Address (required)</label>
              <input type="text" id="email" name="email" defaultValue={ user.email ? user.email : '' } placeholder="john.doe@gmail.com" onChange={ (e) => { this.hadleInputChange('email', e) } } />
            </div>

            { ! user.id &&
            <div className="input">
              <label htmlFor="password">Password (required)</label>
              <input type="password" id="password" name="password" defaultValue={ user.password ? user.password : '' } placeholder="Passw0rd" onChange={ (e) => { this.hadleInputChange('password', e) } } />
            </div>
            }

            <div className="input">
              <label htmlFor="phone">Phone Number</label>
              <input type="text" id="phone" name="phone" defaultValue={ user.phone ? user.phone : '' } placeholder="+1 111 2222 333" onChange={ (e) => { this.hadleInputChange('phone', e) } } />
            </div>

            <div className="input">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" defaultValue={ user.address ? user.address : '' } placeholder="Springfield" onChange={ (e) => { this.hadleInputChange('address', e) } } />
            </div>

            <div className="input">
              <button type="submit" className="button size--large button--green">{ user.id ? 'Update User' : 'Add User' }</button>
            </div>

          </div>
          }

        </form>

      </div>
    )
  }

}



export default Form;
