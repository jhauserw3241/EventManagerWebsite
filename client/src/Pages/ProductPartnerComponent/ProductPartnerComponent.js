import React, { Component } from 'react';
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
            headerColor: "#1C191E",
            rowColor1: "white",
            rowColor2: "#DAE1E8",
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
        // Revert to home page if the user isn't logged in
        if(!fire.auth().currentUser) {
            window.location = "/";
        }

        // Get data
        var columns= [
            {
                key: "name",
                name: "Name"
            },
            {
                key: "role",
                name: "Role"
            },
        ]

        var people_count = 0;
        var data = [];
        for(var partner_id in this.state.partners) {
            var partner = this.state.partners[partner_id];
            data.push({
                id: partner_id,
                num: people_count,
                name: partner.name,
                role: partner.role,
                priv: partner.priv,
            });

            people_count += 1;
        }

        // Update CSS options
        var headerRowStyle = {
            "backgroundColor": this.state.headerColor,
            "color": "white"
        };

        var row1Style = {
            "backgroundColor": this.state.rowColor1
        }

        var row2Style = {
            "backgroundColor": this.state.rowColor2
        }

        var cur_user_id = fire.auth().currentUser.uid;
        var numColumns = (cur_user_id === this.state.owner_id) ? (columns.length + 1) : columns.length;

        var columnWidthStyle = {
            width: 100 / numColumns + "%"
        };
        
	    return(
            <div className="ProductPartnerComponent">
                <div className="container">
                    <div className="content">
                        <table className="partner-table">
                            <thead>
                                <tr
                                    className="partner-tr"
                                    style={headerRowStyle}>
                                    {columns.map(column =>
                                        <th
                                            className="partner-th"
                                            style={columnWidthStyle}>{column.name}</th>
                                    )}
                                    {(cur_user_id === this.state.owner_id) ? 
                                        <th
                                            className="partner-th"
                                            style={columnWidthStyle}>
                                            Privilege Level
                                        </th> : null}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(d =>
                                    <tr
                                        className="partner-tr"
                                        style={((d["num"] % 2) === 0) ? row1Style : row2Style}>
                                        {columns.map(column =>
                                            <td
                                                className="partner-td"
                                                style={columnWidthStyle}>
                                                {d[column.key]}
                                            </td> 
                                        )}
                                        <td
                                            className="partner-td"
                                            style={columnWidthStyle}>
                                            {((cur_user_id === this.state.owner_id) && (d["priv"] === "Edit")) ?
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => this.removeEdit(d["id"])}>
                                                    Remove Edit
                                                </button> : null }
                                            {((cur_user_id === this.state.owner_id) && (d["priv"] === "View")) ? 
                                                <button
                                                    className="btn btn-success"
                                                    onClick={() => this.allowEdit(d["id"])}>
                                                    Allow Edit
                                                </button> : null }
                                            {((cur_user_id === this.state.owner_id) && (d["priv"] === "Owner")) ?
                                                d["priv"] : null }
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductPartnerComponent;