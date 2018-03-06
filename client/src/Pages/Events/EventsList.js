import React, { Component } from 'react';
import EventCard from './EventCard';
import EventTable from './EventTable';
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
            var data = [];
            for(var event_id in this.props.events) {
                var event = this.props.events[event_id];
                data.push({
                    id: events_count,
                    name: event.name,
                    link: "event/" + event.id
                });

                events_count += 1;
            }

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
