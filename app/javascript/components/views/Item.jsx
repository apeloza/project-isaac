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
                className="card-img-top"
                alt={`${this.props.item.name} image`}
                />
                <div className="card-body">
                  <h5 className="card-title">{this.props.item.name}</h5>
                </div>
              </div>
              <Modal
              isOpen={this.state.showModal}
              contentLabel={this.props.item.name}>
                  <h2>{this.props.item.name}</h2>
                  <h5><em>{this.props.item.tagline}</em></h5>
                  <button className="btn btn-primary" onClick={this.handleCloseModal}>Close</button>
              </Modal>
            </div>
        )
    }
}

export default Item;