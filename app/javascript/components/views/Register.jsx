import React from 'react';

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

        const { email, password, password_confirmation } = this.state;

        const registrationPackage = {
            user: {
                email: email,
                password: password,
                password_confirmation: password_confirmation
            }
        }

        const token = document.querySelector('meta[name="csrf-token"]').content;

        const url = '/users';

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
            console.log(response);
            this.setState({searchResults: response} )
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
                    <div className="col-sm-12">
                        <label htmlFor="email" className="mr-2">Email</label>
                        <input onChange={this.onChange} type="text" name="email" id="Email"/>
                    </div>
                    <div className="col-sm-12">
                        <label htmlFor="password" className="mr-2">Password</label>
                        <input onChange={this.onChange} type="password" name="password" id="Password"/>
                    </div>
                    <div className="col-sm-12">
                        <label htmlFor="password_confirmation" className="mr-2">Confirm Password</label>
                        <input onChange={this.onChange} type="password" name="password_confirmation" id="PasswordConfirmation"/>
                    </div>
                </div>
                <div className="row">
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>
            </form>
            </>
        )
    }

}

export default Register;