import React, { Component } from 'react';
import EventElement from './EventElement';
import Toggle from 'react-bootstrap-toggle';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import fire from './../../fire';
import './../../CSS/List.css';

class EventsList extends Component {	
	render() {
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
                </div>
			);
        } else {
            var columns = [{
                dataField: 'name',
                text: 'Event'
            }];

            var data = [];
            this.props.events.map(event =>
                data.push({
                    id: event.id,
                    name: <Link to={"/event/" + event.id}>{event.name}</Link>
            }));

            return (
                <div className="EventsList">
                    <BootstrapTable
                        keyField="id"
                        data={ data }
                        columns={ columns }
                        striped
                        hover
                        condensed
                        />
                </div>
			);
        }
	}
}

export default EventsList;
