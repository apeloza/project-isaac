import React from 'react';
import Item from './Item';

//Component that displays/interacts with the My Build feature, to track an Isaac build
class MyBuild extends React.Component {
  constructor(props){
    super(props);
  }

  render(){

    //map of the items inside of currentBuild
    const currentBuild = this.props.currentBuild.map((item, itemIndex) => (
      <Item key={itemIndex} currentBuild={this.props.currentBuild} addItem={this.props.addItem} aesthetic={this.props.aesthetic} removeItem={this.props.removeItem} item={item}/>
    ));

    return(
      <>
        <h4>My Build</h4>
        <div className="row">
        {currentBuild}
        </div>
      </>
    )
  }
}

export default MyBuild;