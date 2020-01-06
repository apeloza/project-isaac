import React from 'react';
import { updateCSRF } from '../../../helpers/auth';

//login fields found in the top right (if not logged in)
class Login extends React.Component{
    constructor(props){
      super(props);
        
      this.state = {
          email: "",
          password: "",
      }

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }

    //assigns input fields to associated state
    onChange(event){
      this.setState({ [event.target.name]: event.target.value });
    }

    //attempt to login
    onSubmit(event){
      event.preventDefault();
      const { email, password } = this.state;
      if(email.length === 0 || password.length === 0) //invalid request so don't bother sending it
          return;

      //has to be wrapped in a user for Devise
      const loginPackage = {
          user:{
              email: email,
              password: password
          }
      }

      const token = document.querySelector('meta[name="csrf-token"]').content;
      const url = "/users/sign_in";

      fetch(url, {
          method: "POST",
          body: JSON.stringify(loginPackage),
          headers: {
              "X-CSRF-Token": token,
              "Content-Type": "application/json",
          },
      }).then(response => {
          if(response.ok){
            updateCSRF(response);
            return response.json();
          }
          throw new Error("Issue with network response. Oops!")
      }).then(response => {
          this.props.updateCurrentUser(response.email);
      }).catch(error => console.log(error.message));
      }

    render(){

      return(
          <form onSubmit={this.onSubmit} className="form-inline d-flex justify-content-end">
            <input onChange={this.onChange} className="mr-2 form-control" placeholder="Email" type="text" name="email" id="Email"/>
            <input onChange={this.onChange} className="mr-2 form-control" placeholder="Password" type="password" name="password" id="Password"/>
            <button type="submit" className="btn btn-light">Login</button>
          </form>
      )
  }

}

export default Login;