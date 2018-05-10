import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import fire from './../../fire';
import './../../CSS/PartnerTable.css';

class LinkedProjectsTable extends Component {
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
                key: "type",
                name: "Type"
            },
        ]

        var projects_count = 0;
        var data = [];
        for(var project_id in this.props.projects) {
            var project = this.props.projects[project_id];
            data.push({
                id: project_id,
                num: projects_count,
                name: project.name,
                type: project.type,
                link: project.link,
            });

            projects_count += 1;
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
            <div className="LinkedProjectTable">
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
                                                <Link
                                                    className="items-txt"
                                                    to={d["link"]}>
                                                    {d[column.key]}
                                                </Link>
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

export default LinkedProjectsTable;