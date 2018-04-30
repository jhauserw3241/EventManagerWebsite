import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../CSS/EventTable.css';

class ProductsTable extends Component {
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
        
        return(
            <div className="ProductsTable">
                <table className="products-table">
                    <thead>
                        <tr
                            className="products-tr"
                            style={headerRowStyle}>
                            {this.props.columns.map(column =>
                                <th
                                    className="products-th"
                                    style={columnWidthStyle}>
                                    {column.name}
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data.map(d =>
                            <tr
                                className="products-tr"
                                style={((d["num"] % 2) === 0) ? row1Style : row2Style}>
                                {this.props.columns.map(column =>
                                    <td
                                        className="products-td"
                                        style={columnWidthStyle}>
                                        <div className="colorBox" style={{"backgroundColor": d["color"]}}></div>
                                        <Link className="table-txt" to={d["link"]}>{d[column.key]}</Link>
                                        { this.props.deleteProduct ?
                                            <button
                                                className="btn btn-danger table-delete-btn"
                                                onClick={(event) => this.props.deleteProduct(event, d["id"])}>
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

export default ProductsTable;