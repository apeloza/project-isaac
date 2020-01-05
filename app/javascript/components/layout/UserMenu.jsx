import React from 'react';
import Logout from '../views/auth/Logout';
import Login from '../views/auth/Login';

class UserMenu extends React.Component{
  constructor(props){
    super(props);
  }

  render(){

        //render either the login or logout here, as necessary
    let contextualLogin = <Login updateCurrentUser={this.props.updateCurrentUser}/>
    if(this.props.currentUser !== null){
      contextualLogin = <Logout updateCurrentUser={this.props.updateCurrentUser} currentUser={this.props.currentUser} />
    } 

    return(
      <div id="UserMenu" className="mb-2">
      {contextualLogin}
      </div>
    )
  }
}

export default UserMenu;