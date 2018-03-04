import React, { Component } from 'react';
import EventCard from './EventCard';
import Toggle from 'react-bootstrap-toggle';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import EventTable from './EventTable';
import fire from './../../fire';
import './../../CSS/List.css';

class EventsList extends Component {	
	render() {
        if (this.props.org === "cards") {
            return (
				<div className="EventsList list-container">
                    {this.props.events.map(event =>
                        <EventCard
                            key={event.id}
                            id={event.id}
                            name={event.name}
                            color={event.color} />
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
                    name: "Event"
                }
            ]

            var events_count = 0;
            var data = this.props.events.map(function(event) {
                var temp = {
                    id: events_count,
                    name: event.name,
                    link: "event/" + event.id
                };

                events_count += 1;

                return temp;
            });

            return (
                <div className="EventsList">
                    <EventTable columns={columns} data={data} />
        
                    <main>
                        {this.props.children}
                    </main>
                </div>
            );
        }
	}
}

export default EventsList;
