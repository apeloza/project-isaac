import React from 'react';
import Modal from 'react-modal';

class Item extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            showModal : false,
        };

        Modal.setAppElement('#ReactRoot');

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
        return(
            <div className="col-sm-4 col-lg-4">
              <div className="card mb-4" onClick={this.handleOpenModal}>
                <img
                src={this.props.item.image_filename}
                className="card-img-top pixel-image"
                alt={`${this.props.item.name} image`}
                />
                <div className="card-body">
                  <h5 className="card-title">{this.props.item.name}</h5>
                </div>
              </div>
              <Modal
              isOpen={this.state.showModal}
              closeTimeoutMS={800}
              contentLabel={this.props.item.name}>
                <button className="btn btn-danger modal-btn-close" aria-label="Close" onClick={this.handleCloseModal}>X</button>
                <div className="modal-header item-modal-header">
                    <div className="image-container">
                        <img className="item-modal-image pixel-image" src={this.props.item.image_filename}/>
                    </div>
                </div>
                <h2 align="center" className="item-name mt-1">{this.props.item.name}</h2>
                <h5 align="center"><em>"{this.props.item.tagline}</em>"</h5>
                <div className="item-description-box mt-4">
                <p>{this.props.item.description}</p>
                </div>
        
              </Modal>
            </div>
        )
    }
}

export default Item;