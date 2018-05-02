import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../CSS/Table.css';

class ItemsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            headerColor: "#1C191E",
            rowColor1: "white",
            rowColor2: "#DAE1E8"
        }
    }
    
    render() {
        // Get columns
        var columns= [
            {
                key: "name",
                name: this.props.dashboardName
            }
        ]

        // Get data
        var items_count = 0;
        var data = [];
        for(var item_id in this.props.items) {
            var item = this.props.items[item_id];
            data.push({
                id: item.id,
                num: items_count,
                name: item.name,
                link: this.props.linkPrefix + item.id,
                color: item.color,
            });

            items_count += 1;
        }

        // Set table styles
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
            <div className="ItemsTable">
                <table className="items-table">
                    <thead>
                        <tr
                            className="table-tr"
                            style={headerRowStyle}>
                            {columns.map(column =>
                                <th
                                    className="table-th"
                                    style={columnWidthStyle}>
                                    {column.name}
                                </th>
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
                                        <div className="colorBox" style={{"backgroundColor": d["color"]}}></div>
                                        <Link className="table-txt" to={d["link"]}>{d[column.key]}</Link>
                                        { this.props.deleteItem ?
                                            <button
                                                className="btn btn-danger table-delete-btn"
                                                onClick={(event) => this.props.deleteItem(event, d["id"])}>
                                                <i class="fa fa-trash"></i>
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

export default ItemsTable;