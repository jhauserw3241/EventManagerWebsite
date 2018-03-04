import React, { Component } from 'react';
import EventElement from './EventElement';
import Toggle from 'react-bootstrap-toggle';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import EventTable from './EventTable';
import fire from './../../fire';
import './../../CSS/List.css';

class EventsList extends Component {	
	render() {
        console.log(this.props.org);

        if (this.props.org === "cards") {
            return (
				<div className="EventsList list-container">
                    {this.props.events.map(event =>
                        <EventElement
                            org={this.props.org}
                            key={event.id}
                            id={event.id}
                            name={event.name}
                            type={event.type}
                            completed_date={event.completed_date} />
                    )}

                    <main>
                        {this.props.children}
                    </main>
                </div>
			);
        } else {
            var columns= [
                {
                    key: "name",
                    name: "Name"
                }, {
                    key: "date",
                    name: "Date"
                }, {
                    key: "blank",
                    name: "Blank"
                }
            ]

            var rows = [
                {
                    id: 0,
                    name: "Temp",
                    date: "2/14/15",
                    blank: "testing",
                    link: "event/0"
                },
                {
                    id: 1,
                    name: "Outreach",
                    date: "8/3/19",
                    blank: "this is a test",
                    link: "event/1"
                },
                {
                    id: 2,
                    name: "conference",
                    date: "8/3/19",
                    blank: "this is a test",
                    link: "event/1"
                }
            ]

            return (
                <div className="EventsList">
                    <EventTable columns={columns} data={rows} />
        
                    <main>
                        {this.props.children}
                    </main>
                </div>
            );
        }
	}
}

export default EventsList;
