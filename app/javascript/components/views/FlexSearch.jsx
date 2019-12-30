import React from 'react';
import Item from './Item';

class FlexSearch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          searchTerms: "",
          searchResults: [],
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
      this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
      event.preventDefault();
      const { searchTerms } = this.state;
      const url ="/items/search?q=" + searchTerms;
       if(searchTerms.length === 0) 
      return;

      fetch(url, {
        method: "GET",
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

      const { searchResults } = this.state;
        const allResults = searchResults.map((item, index) => (
          <Item key={index} item={item} />
        ));

        const noResults = (
          <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
            <h4>
              No results were returned.
            </h4>
          </div>
        );
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
                <div className="row">
                  {searchResults.length > 0 ? allResults : noResults}
                </div>
            </>
            
        )
    }
}

export default FlexSearch;