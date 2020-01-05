import React from 'react';
import { updateCSRF } from '../../helpers/auth';

class Login extends React.Component{
    constructor(props){
      super(props);
        
      this.state = {
          email: '',
          password: '',
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
          <>
          <div className="row">
            <h5>Login</h5>
          </div>
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-sm-12">
                  <label htmlFor="email" className="mr-2">Email</label>
                  <input onChange={this.onChange} type="text" name="email" id="Email"/>
              </div>
              <div className="col-sm-12">
                  <label htmlFor="password" className="mr-2">Password</label>
                  <input onChange={this.onChange} type="password" name="password" id="Password"/>
              </div>
            </div>
            <div className="row">
                <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
          </>
      )
  }

}

export default Login;