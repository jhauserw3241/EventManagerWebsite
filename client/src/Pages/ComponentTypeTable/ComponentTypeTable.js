import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import fire from './../../fire';
import './../../CSS/Table.css';

class ComponentTypeTable extends Component {
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
                name: "Component"
            },
        ]

        var component_count = 0;
        var data = [];
        for(var component_id in this.props.components) {
            var component = this.props.components[component_id];
            data.push({
                id: component_id,
                num: component_count,
                name: component.name,
            });

            component_count += 1;
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
            <div className="ComponentTypeTable">
                <table className="items-table">
                    <thead>
                        <tr
                            className="table-tr"
                            style={headerRowStyle}>
                            {columns.map(column =>
                                <th
                                    className="table-th"
                                    style={columnWidthStyle}>{column.name}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(d =>
                            <tr
                                className="table-tr"
                                style={((d["num"] % 2) === 0) ? row1Style : row2Style}>
                                {columns.map(column =>
                                    <td
                                        className="table-td"
                                        style={columnWidthStyle}>
                                        {d[column.key]}
                                    </td> 
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ComponentTypeTable;