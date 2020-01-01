import React from 'react';
import Modal from 'react-modal';
import ItemAltar from '../../../assets/images/items/item_altar'; //template image for the item modal

class Item extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            showModal : false, // modal boolean for the item
        };

        Modal.setAppElement('#ReactRoot'); //used for accessibility to let screen readers know what is hidden by the modal

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        
    }

    handleOpenModal(){
        this.setState({showModal: true});
    }

    handleCloseModal(){
        this.setState({showModal: false});
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
              <div onClick={this.handleOpenModal}>
                <img
                src={this.props.item.image_filename}
                className="card-img-top pixel-image"
                alt={`${this.props.item.name} image`}
                />
                <div className="item-card-title">
                  {this.props.item.name}
                </div>
              </div>
              <Modal
              isOpen={this.state.showModal}
              closeTimeoutMS={800}
              onRequestClose={this.handleCloseModal}
              contentLabel={this.props.item.name}>
                <button className="btn btn-danger modal-btn-close" aria-label="Close" onClick={this.handleCloseModal}>X</button>
                <div className="modal-header">
                    <div className="item-modal-header">
                    <div className="image-container">
                        <img className="item-modal-image pixel-image" src={this.props.item.image_filename}/>
                    </div>
                    <div className="image-container">
                        <img className="pixel-image item-altar" src={ItemAltar}/>
                    </div>  
                    </div>
                    
                </div>
                <div className="item-modal-title">{this.props.item.name}</div>
                <div className="item-modal-tagline"><em>"{this.props.item.tagline}</em>"</div>
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