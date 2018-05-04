import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import fire from './../../fire';
import './../../CSS/ComponentTypeTable.css';

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
                link: "/" + this.props.item + "/" + this.props.item_id + "/component/" + component_id
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

        // Provide column for delete button if the user can edit
        var numColumns = this.props.canEdit() ? (columns.length + 1) : columns.length;

        var columnWidthStyle = {
            width: 100 / numColumns + "%"
        };
        
	    return(
            <div className="ComponentTypeTable">
                <table className="type-table">
                    <thead>
                        <tr
                            className="type-tr"
                            style={headerRowStyle}>
                            {columns.map(column =>
                                <th
                                    className="type-th"
                                    style={columnWidthStyle}>{column.name}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(d =>
                            <tr
                                className="type-tr"
                                style={((d["num"] % 2) === 0) ? row1Style : row2Style}>
                                {columns.map(column =>
                                    <td
                                        className="type-td"
                                        style={columnWidthStyle}>
                                        <Link className="type-txt" to={d["link"]}>
                                            {d["name"]}
                                        </Link>
                                        { this.props.canEdit() ?
                                        <button
                                            className="btn btn-danger type-delete-btn"
                                            onClick={(event) => this.props.deleteItem(event, d["id"])}>
                                            Delete
                                        </button> : null }
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