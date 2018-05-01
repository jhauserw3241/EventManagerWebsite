import React, { Component } from 'react';
import PartnerTable from './../PartnerTable/PartnerTable';
import fire from './../../fire';
import './../../CSS/Card.css';
import './../../CSS/PartnerTable.css';

class ProductPartnerComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product_id: this.props.match.params.product_id,
            partners: [],
            owner_id: "",
        }
        
        this.allowEdit = this.allowEdit.bind(this);
        this.removeEdit = this.removeEdit.bind(this);
    }

    componentDidMount() {
        var self = this;

        // Get event partner's names
        fire.database().ref("products").child(this.state.product_id).on("value", function(data) {
            var event = data.val();

            self.setState({
                owner_id: event.owner_id,
                partners: event.partners,
            });
        });
    }

    allowEdit(partner_id) {
        fire.database().ref("products").child(this.state.product_id).child("partners").child(partner_id).update({
            priv: "Edit",
        });
    }

    removeEdit(partner_id) {
        fire.database().ref("products").child(this.state.product_id).child("partners").child(partner_id).update({
            priv: "View",
        });
    }

    render() {
	    return(
            <PartnerTable
                id={this.state.product_id}
                owner_id={this.state.owner_id}
                partners={this.state.partners}
                allowEdit={this.allowEdit}
                removeEdit={this.removeEdit} />
        );
    }
}

export default ProductPartnerComponent;