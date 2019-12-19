import React from 'react';

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
            <div key={index} className="col-sm-4 col-lg-4">
            <div className="card mb-4">
            <img
            src={item.image_filename}
            className="card-img-top"
            alt={`${item.name} image`}
          />
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
          </div>
        </div>
            </div>
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