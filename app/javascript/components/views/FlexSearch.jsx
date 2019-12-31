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

    onChange(event) {
      this.setState({ [event.target.name]: event.target.value });
      this.onSubmit(event); //send out a search even on a change event after cataloguing the change
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

        const allResults = searchResults.items.map((item, index) => (
          <Item key={index} item={item} />
        ));

        //wrapper to conditionally display the search results header
        const allResultsWithHeader = 
        <>
        <div className="row">
        <h5 className="col-sm-12">Returned {searchResults.result_count} items in {searchResults.time_taken} ms.</h5>
        </div>
        <div className="row">
        {allResults}
        </div>
        </>


        const noResults = (
          <div className="row">
            <h5>Try a search above to begin!</h5>
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
                  {searchResults.items.length > 0 ? allResultsWithHeader : noResults}
            </>
            
        )
    }
}

export default FlexSearch;