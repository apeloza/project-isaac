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
      console.log('submitting ...');
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
            <div>
                <form onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="col-sm">
                      <input name="searchTerms" id="SearchTerms" onChange={this.onChange} placeholder="Search for items ..." type="text"/>
                      <button type="submit">Search</button>
                    </div>
                  </div>
                </form>
            </div>
            
        )
    }
}

export default FlexSearch;