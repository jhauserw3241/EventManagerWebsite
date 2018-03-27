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
        var self = this;

        // Get event partner's names
        var eventPartnersRef = fire.database().ref("events").child(this.state.event_id).child("partners");
        eventPartnersRef.on("value", function(data) {
            if(data.val()) {
                // Get event partners info
                var partner_names = Object.values(data.val());
                var partner_info = partner_names.map(name => {
                    return (
                        {
                            name: name,
                            components: "All"
                        });
                });

                // Update partners list
                self.setState({ partners: partner_info });
            } else {
                self.setState({ partners: [] });
            }
        });

        // Get component partner's names
        var eventPartnersRef = fire.database().ref("events").child(this.state.event_id).child("components");
        eventPartnersRef.on("value", function(data) {
            if(data.val()) {
                var parnters = [];
                var components = data.val();
                for(var component_id in components) {
                    var component = components[component_id];
                    var comp_partners = component.partners ? component.partners : [];

                    for(var comp_partner_id in comp_partners) {
                        var comp_partner_name = comp_partners[comp_partner_id];
                        // Check if the partner is already in the list
                        for(var partner_id in partners) {
                            var partner = parnters[partner_id];
                            if(partner.name === comp_partner_name){
                                if(partner.components.getIndex(component.name) <= -1) {
                                    partner.components.push(component.name);
                                }
                            } else {
                                
                            }
                        }
                    }
                    var partner_names = Object.values(component.partners);
                    var partner_info = partner_names.map(name => {
                        return (
                            {
                                name: name,
                                components: "All"
                            });
                    });
                }

                // Update partners list
                self.setState({ partners: this.state.partners });
            } else {
                self.setState({ partners: this.state.partners });
            }
        });
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
                name: this.state.partners[partner_id].name,
                components: this.state.partners[partner_id].components,
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