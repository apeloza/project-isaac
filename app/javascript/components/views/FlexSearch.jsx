import React from 'react';
import Item from './Item';

class FlexSearch extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        searchTerms: "",
        searchResults: {
          items: [],
          result_count: 0,
          time_taken: 0,
        },
      }

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }

    //updates state to match input fields
    onChange(event) {
      this.setState({ [event.target.name]: event.target.value });
      this.onSubmit(event); //send out a search even on a change event after cataloguing the change
    }

    //start a search
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
        this.setState({searchResults: response} ) //hand over search results to state here
    }).catch(error => console.log(error.message));
  }

    render(){
      const { searchResults } = this.state; //grab search results out of state

      //map of our results, used below
      const allResults = searchResults.items.map((item, index) => (
        <Item key={index} item={item} />
      ));

      //wrapper around results
      const allResultsWithHeader = 
      <div>
        <div className="row">
          <div className="col">
            <p>Returned {searchResults.result_count} items in {searchResults.time_taken} ms.</p>
          </div>
        </div>
        <div className="row">
        {allResults}
        </div>
      </div>

      //placeholder before a search is started
      const noResults = (
        <div className="row">
          <div className="col">
            <p>Try a search above to begin!</p>
          </div>
        </div>
      );
      return(
          <div>
            <form className="form form-inline mb-2" onSubmit={this.onSubmit}>
              <input name="searchTerms" id="SearchTerms" onChange={this.onChange} placeholder="Search for items ..." type="text" className="form-control flex-grow-1" />
              <button className="btn btn-primary ml-2" type="submit">Search</button>
            </form>
            {searchResults.items.length > 0 ? allResultsWithHeader : noResults} 
          </div>
          
      )
    }
}

export default FlexSearch;