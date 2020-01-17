import React from 'react';
import Item from './Item';

class Items extends React.Component {

    constructor(props){
      super(props);
      this.state = {
          items: [], //array of all items that will be received from the server
      };

      this._isMounted = false; //used to avoid memory leaks
    }

    componentDidMount(){
      this._isMounted = true; // set to true once component is loaded
      const url = "/items/index";
      this._isMounted && fetch(url)  
      .then(response => {
          if(response.ok) {
              return response.json();
          }
          throw new Error("Issue with network response. Oops!");
      })
      .then(response => this.setState({items: response})) //if we got items back from server, set them as the master list of items
    }

    render() {
      const { items } = this.state;

      //map each item onto an Item component
      const allItems = items.map((item, index) => (
        <Item key={index} item={item} addItem={this.props.addItem} removeItem={this.props.removeItem} currentBuild={this.props.currentBuild} />
      ));

      //placeholder message for initial pageload
      const noItems = (
        <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
          <h4>
            Just a moment, populating item list ...
          </h4>
        </div>
      );

        return(
          <div className="item-grid">
            {items.length > 0 ? allItems : noItems}
          </div>
        );
    }
}

export default Items;