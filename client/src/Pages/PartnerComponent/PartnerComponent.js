import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import fire from './../../fire';
import './../../CSS/PartnerTable.css';

class PartnerComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            headerColor: "#1C191E",
            rowColor1: "white",
            rowColor2: "#DAE1E8",
        }
    }

    render() {
        // Revert to home page if the user isn't logged in
        if(!fire.auth().currentUser) {
            return (
                <Redirect to='/home' />
            );
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
        for(var partner_id in this.props.partners) {
            var partner = this.props.partners[partner_id];
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
        var numColumns = (cur_user_id === this.props.owner_id) ? (columns.length + 1) : columns.length;

        var columnWidthStyle = {
            width: 100 / numColumns + "%"
        };
        
	    return(
            <div className="PartnerComponent">
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
                                    {(cur_user_id === this.props.owner_id) ? 
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
                                            {((cur_user_id === this.props.owner_id) && (d["priv"] === "Edit")) ?
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => this.props.removeEdit(d["id"])}>
                                                    Remove Edit
                                                </button> : null }
                                            {((cur_user_id === this.props.owner_id) && (d["priv"] === "View")) ? 
                                                <button
                                                    className="btn btn-success"
                                                    onClick={() => this.props.allowEdit(d["id"])}>
                                                    Allow Edit
                                                </button> : null }
                                            {((cur_user_id === this.props.owner_id) && (d["priv"] === "Owner")) ?
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

export default PartnerComponent;