import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import fire from './../../fire';
import './../../CSS/PartnerTable.css';

class PartnerTable extends Component {
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
        var user = fire.auth().currentUser;
        if(!user) {
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

        var numColumns = (user.uid === this.props.owner_id) ? (columns.length + 1) : columns.length;

        var columnWidthStyle = {
            width: 100 / numColumns + "%"
        };
        
	    return(
            <div className="PartnerTable">
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
                                    {(user.uid === this.props.owner_id) ? 
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
                                            {((user.uid === this.props.owner_id) && (d["priv"] !== "Owner")) ?
                                                <div>
                                                    <button
                                                        className="btn btn-success"
                                                        onClick={() => this.props.allowEdit(d["id"])}
                                                        disabled={d["priv"] === "Edit"}>
                                                        <i className="fa fa-edit"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => this.props.removeEdit(d["id"])}
                                                        disabled={d["priv"] === "View"}>
                                                        <i className="fa fa-eye"></i>
                                                    </button>
                                                </div> : null }
                                            {((user.uid === this.props.owner_id) && (d["priv"] === "Owner")) ?
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

export default PartnerTable;