import React, { Component } from 'react';
import PartnerTable from './../PartnerTable/PartnerTable';
import fire from './../../fire';

class EventPartnerComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event_id: this.props.match.params.event_id,
            partners: [],
            owner_id: "",
        }
        
        this.allowEdit = this.allowEdit.bind(this);
        this.removeEdit = this.removeEdit.bind(this);
    }

    componentDidMount() {
        var self = this;

        // Get event partner's names
        fire.database().ref("events").child(this.state.event_id).on("value", function(data) {
            var event = data.val();

            self.setState({
                owner_id: event.owner_id,
                partners: event.partners,
            });
        });
    }

    allowEdit(partner_id) {
        fire.database().ref("events").child(this.state.event_id).child("partners").child(partner_id).update({
            priv: "Edit",
        });
    }

    removeEdit(partner_id) {
        fire.database().ref("events").child(this.state.event_id).child("partners").child(partner_id).update({
            priv: "View",
        });
    }

    render() {        
	    return(
            <PartnerTable
                id={this.state.id}
                owner_id={this.state.owner_id}
                partners={this.state.partners}
                allowEdit={this.allowEdit}
                removeEdit={this.removeEdit} />
        );
    }
}

export default EventPartnerComponent;