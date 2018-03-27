import React, { Component } from 'react';
import fire from './../../fire';
import './../../CSS/Card.css';

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
        eventPartnersRef.orderByChild("name").on("value", (data) =>
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
                key: "components",
                name: "Components"
            },
        ]

        var people_count = 0;
        var data = [];
        for(var partner_id in this.state.partners) {
            data.push({
                id: partner_id,
                num: people_count,
                name: this.state.partners[partner_id],
                components: "All",
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
                        <table>
                            <thead>
                                <tr style={headerRowStyle}>
                                    {columns.map(column =>
                                        <th style={columnWidthStyle}>{column.name}</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(d =>
                                    <tr style={((d["num"] % 2) === 0) ? row1Style : row2Style}>
                                        {columns.map(column =>
                                            <td style={columnWidthStyle}>
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