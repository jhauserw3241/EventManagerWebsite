import React, { Component } from 'react';
import fire from './../../fire';
import './../../CSS/Card.css';
import './../../CSS/PartnerTable.css';

class PartnerComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event_id: this.props.match.params.event_id,
            partners: [],
            headerColor: "#1C191E",
            rowColor1: "white",
            rowColor2: "#DAE1E8",
        }
    }

    componentDidMount() {
        // Get event partner's names
        var eventPartnersRef = fire.database().ref("events").child(this.state.event_id).child("partners");
        eventPartnersRef.on("value", (data) =>
            this.setState({ partners: data.val() ? data.val() : [] }));
    }

    render() {
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

        var columnWidthStyle = {
            width: 100 / columns.length + "%"
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