import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../CSS/EventTable.css';

class EventTable extends Component {
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
            "background-color": this.state.headerColor,
            "color": "white"
        };

        var row1Style = {
            "background-color": this.state.rowColor1
        }

        var row2Style = {
            "background-color": this.state.rowColor2
        }

        var columnWidthStyle = {
            width: 100 / this.props.columns.length + "%"
        };
        
        return(
            <div className="EventTable">
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
                            <tr style={((d["id"] % 2) == 0) ? row1Style : row2Style}>
                                {this.props.columns.map(column =>
                                    <td style={columnWidthStyle}><Link to={d["link"]}>{d[column.key]}</Link></td> 
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default EventTable;