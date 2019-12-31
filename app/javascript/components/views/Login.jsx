import React from 'react';

class Login extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            username: '',
            password: '',
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event){
        event.preventDefault();
    }

    render(){
        return(
            <>
            <div className="row">
                <h5>Admin Login</h5>
            </div>
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-sm-12">
                        <label htmlFor="username" className="mr-2">Username</label>
                        <input type="text" name="username" id="Username"/>
                    </div>
                    <div className="col-sm-12">
                        <label htmlFor="password" className="mr-2">Password</label>
                        <input type="password" name="password" id="Password"/>
                    </div>
                </div>
                <div className="row">
                    <button className="btn btn-primary">Login</button>
                </div>
            </form>
            
            
            </>
        )
    }

}

export default Login;