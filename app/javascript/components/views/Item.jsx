import React from 'react';
import Modal from 'react-modal';
import ItemAltar from '../../../assets/images/items/item_altar'; //template image for the item modal

//Items, both the modal and the thumbnail are located here
class Item extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        showModal : false, // modal boolean for the item
        isItemInBuild: false,
    };

    Modal.setAppElement('#ReactRoot'); //used for accessibility to let screen readers know what is hidden by the modal

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.isItemInBuild = this.isItemInBuild.bind(this);
  }

  componentDidMount(){
    //check if item is still in build
    this.isItemInBuild();
  }

  componentDidUpdate(){
    //check if item is still in build
    this.isItemInBuild();
  }

  handleOpenModal(){
      this.setState({showModal: true});
  }

  handleCloseModal(){
      this.setState({showModal: false});
  }

  //takes no argument because it is evaluating this.props.item
  isItemInBuild(){
    const itemIndex = this.props.currentBuild.findIndex(item => item.name === this.props.item.name) // find the first instance of an item with matching name
    const isItemInBuild = itemIndex === -1 ? false : true; //if itemIndex is -1 then item is not present

    //it is important that we check this or we will have an infinite loop due to componentDidUpdate
    if(this.state.isItemInBuild !== isItemInBuild) this.setState({isItemInBuild: isItemInBuild});
  }

  render(){
    const activatedItemStats = (
      <div>
        <h5>Active</h5>
        <h5>Recharge Rate {this.props.item.recharge}</h5>
      </div>
    );
    const passiveItemStats = (
      <h5>Passive</h5>
    );

    return(
      <div className="item-card">
        
        {/* thumbnail here */}
        <div onClick={this.handleOpenModal}>
          <img src={this.props.item.image_filename} className="card-img-top pixel-image" alt={`${this.props.item.name} image`} />
          <div className="item-card-title">
            {this.props.item.name}
          </div>
        </div> 
        <div className="item-btn-container">
        <button onClick={() => this.props.addItem(this.props.item)} className="btn btn-light item-btn">+</button>
        <button disabled={!this.state.isItemInBuild} onClick={() => this.props.removeItem(this.props.item)} className="btn btn-light item-btn">-</button>
        </div>

        {/* modal here */}
        <Modal
        isOpen={this.state.showModal}
        closeTimeoutMS={800}
        onRequestClose={this.handleCloseModal}
        contentLabel={this.props.item.name}>
          <div className="modal-header item-modal-header">
            <button className="btn btn-close modal-btn-close" aria-label="Close" onClick={this.handleCloseModal}>X</button>
            <div className="item-modal-image-container">
                <img className="item-modal-image top pixel-image" src={this.props.item.image_filename}/>
                <img className="item-modal-image bottom pixel-image" src={ItemAltar}/>
            </div>
          </div>
          <div className="item-modal-title">{this.props.item.name}</div>
          <div className="item-modal-tagline">&quot;{this.props.item.tagline}&quot;</div>
          {this.props.item.is_activated === 'Yes' ? activatedItemStats : passiveItemStats}
          <div className="item-description-box mt-4">
            <p>{this.props.item.description}</p>
          </div>
        </Modal>

      </div>
    )
  }
}

export default Item;