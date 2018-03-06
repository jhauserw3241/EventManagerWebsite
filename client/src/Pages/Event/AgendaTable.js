import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../CSS/EventTable.css';

class AgendaTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            headerColor: "#1C191E",
            rowColor1: "white",
            rowColor2: "#DAE1E8"
        }
    }
    
    render() {
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
            width: 100 / this.props.columns.length + "%"
        };

        console.log(this.props.data);
        
        return(
            <div className="AgendaTable">
                <table>
                    <thead>
                        <tr style={headerRowStyle}>
                            {this.props.columns.map(column =>
                                <th style={columnWidthStyle}>{column.name}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data.map(d =>
                            <tr style={((d["id"] % 2) === 0) ? row1Style : row2Style}>
                                {this.props.columns.map(column =>
                                    <td style={columnWidthStyle}>
                                        <Link to={d["link"]}>{d[column.key]}</Link>
                                        { this.props.deleteEvent ?
                                            <button
                                                className="btn btn-danger table-delete-btn"
                                                onClick={(event) => this.props.deleteEvent(event, d["id"])}>
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

export default AgendaTable;
