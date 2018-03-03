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
            var columns = [{
                dataField: 'name',
                text: 'Event'
            }];

            var data = this.props.events.map(function(event) {
                return ({
                    id: event.id,
                    name: <Link to={"/event/" + event.id}>{event.name}</Link>
                })
            });

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
        
                    <main>
                        {this.props.children}
                    </main>
                </div>
			);
        }
	}
}

export default EventsList;
