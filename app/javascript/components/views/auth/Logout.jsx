import React from 'react';
import { updateCSRF } from '../../../helpers/auth';

class Logout extends React.Component{
  constructor(props){
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(){
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const url = "/users/sign_out"
    fetch(url, {
      method: "DELETE",
      headers: {
          "X-CSRF-Token": token,
      },
    }).then(response => {
      if(response.ok){
          updateCSRF(response); //update CSRF so our login actions continue to work without refreshing
          return response.text(); //empty response from a logout action
      }
      throw new Error("Issue with network response. Oops!")
    }).then(response => {
      this.props.updateCurrentUser(null); //sets all views to non-user
    }).catch(error => console.log(error.message));
  }

  render(){
    return(
      <div className="pull-right">
        <span className="mr-2">{this.props.currentUser}</span>
        <button onClick={this.handleLogout} className="btn btn-light">Logout</button>
      </div>
    )
  }
}

export default Logout;