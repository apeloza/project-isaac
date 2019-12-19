import React from 'react';

class FlexSearch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          searchTerms: "",
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
      this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
      event.preventDefault();
      const url ="/search/flex"
      const { searchTerms } = this.state;
       if(searchTerms.length === 0) 
      return;

      const params = {
        searchTerms
      };

      fetch(url, {
        method: "GET",
        params: JSON.stringify(params)
      }).then(response => {
        if(response.ok){
          return response.json();
        }
        throw new Error("Issue with network response. Oops!")
      }).catch(error => console.log(error.message));
    }

    render(){
        return(
            <>
                <form onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="col-sm mb-2">
                      <input name="searchTerms" id="SearchTerms" onChange={this.onChange} placeholder="Search for items ..." type="text"/>
                      <button className="btn btn-primary ml-2" type="submit">Search</button>
                    </div>
                  </div>
                </form>
            </>
            
        )
    }
}

export default FlexSearch;