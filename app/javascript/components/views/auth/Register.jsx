import React from 'react';

//registration form
class Register extends React.Component{
    constructor(props){
      super(props);

      this.state = {
        email: '',
        password: '',
        password_confirmation: '',
      }

      this.handleRegister = this.handleRegister.bind(this);
      this.onChange       = this.onChange.bind(this);
    }

    //matches state to input
    onChange(event){
      this.setState({ [event.target.name]: event.target.value });
    }

    //register a new user
    handleRegister(event){
      event.preventDefault();

      const { email, password, password_confirmation } = this.state; //grab our fields from state

      //packaged up to be sent to Devise which needs the user wrapper
      const registrationPackage = {
        user: {
          email: email,
          password: password,
          password_confirmation: password_confirmation
        }
      }

      const token = document.querySelector('meta[name="csrf-token"]').content;
      const url = '/users';

      //send request for new registration
      fetch(url, {
        method: "POST",
        headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(registrationPackage)
      }).then(response => {
        if(response.ok){
          return response.json();
        }
        throw new Error("Issue with network response. Oops!")
      }).then(response => {
        this.setState({searchResults: response} ) // our results are set to state here
      }).catch(error => console.log(error.message));
    }

    render(){
        return(
        <>
          <div className="row">
            <h5>Register</h5>
          </div>
          <form onSubmit={this.handleRegister}>
            <div className="row">
              <div className="col-6">
                <label htmlFor="email" className="mr-2">Email</label>
                <input onChange={this.onChange} className="form-control" type="text" name="email" id="NewEmail"/>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="password" className="mr-2">Password</label>
                <input onChange={this.onChange} className="form-control" type="password" name="password" id="NewPassword"/>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="password_confirmation" className="mr-2">Confirm Password</label>
                <input onChange={this.onChange} className="form-control" type="password" name="password_confirmation" id="PasswordConfirmation"/>
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2">Register</button>
          </form>
        </>
        )
    }

}

export default Register;