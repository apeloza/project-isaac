import React from 'react';

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
       if(email.length === 0 || password.length === 0) 
        return;

        const loginPackage = {
            email: email,
            password: password
        }

      fetch(url, {
        method: "POST",
        data: loginPackage,
        url: '/login'
      }).then(response => {
        if(response.ok){
          return response.json();
        }
        throw new Error("Issue with network response. Oops!")
      }).then(response => {
        console.log(response);
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
                        <input type="text" name="email" id="Email"/>
                    </div>
                    <div className="col-sm-12">
                        <label htmlFor="password" className="mr-2">Password</label>
                        <input type="password" name="password" id="Password"/>
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