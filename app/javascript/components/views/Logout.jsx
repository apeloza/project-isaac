import React from 'react';

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
              return response.json();
            }
            throw new Error("Issue with network response. Oops!")
          }).then(response => {
            console.log(response);
        }).catch(error => console.log(error.message));
    }

    render(){
        return(
            <button onClick={this.handleLogout} className="btn btn-primary">Logout</button>
        )
    }
}

export default Logout;