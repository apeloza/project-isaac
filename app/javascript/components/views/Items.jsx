import React from 'react';
import Item from './Item';

class Items extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            items: [],
        };
    }

    componentDidMount(){
        const url = "/items/index";
        fetch(url)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error("Issue with network response. Oops!");
        })
        .then(response => this.setState({items: response}))
    }

    render() {
        const { items } = this.state;
        const allItems = items.map((item, index) => (
          <Item key={index} item={item} />
        ));

        const noItems = (
            <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
              <h4>
                No items were returned. Try again with the search above.
              </h4>
            </div>
          );

          return(
            <div className="col-sm-10">
              <div className="row">
              {items.length > 0 ? allItems : noItems}
              </div>
            </div>
          );
    }
}

export default Items;