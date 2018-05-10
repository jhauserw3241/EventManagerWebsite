import React, { Component } from 'react';
import LinkedProjectsTable from './../LinkedProjectsTable/LinkedProjectsTable';
import fire from './../../fire';

class EventLinkedProjectsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event_id: this.props.match.params.event_id,
            linked_projects: {},
            all_events: {},
            all_products: {},
        }
    }

    componentDidMount() {
        var self = this;

        // Get event linked projects and info for all events
        fire.database().ref("events").on("value", function(data) {
            var events = data.val() ? data.val() : {};
            var projects = {};

            for(var event_id in events) {
                // Check if the event is the current event
                if(event_id === self.state.event_id) {
                    var event = events[event_id];
                    projects = event.linked_projects ? event.linked_projects : {};
                }
            }

            self.setState({
                all_events: events,
                linked_projects: projects,
            });
        });

        // Get the info for all products
        fire.database().ref("products").on("value", (data) =>
            this.setState({ all_products: data.val() ? data.val() : {} }));
    }

    render() {
        var projects = [];

        // Get necessary information for linked projects
        for(var project_id in this.state.linked_projects) {
            var project_type = this.state.linked_projects[project_id];

            // Sort linked projects by project type
            if(project_type === "event") {
                var event = this.state.all_events[project_id];
                projects.push({
                    id: event.id,
                    name: event.name,
                    type: "Event",
                    link: "/event/" + event.id,
                })
            } else if(project_type === "product") {
                var product = this.state.all_products[project_id];
                projects.push({
                    id: product.id,
                    name: product.name,
                    type: "Product",
                    link: "/product/" + product.id,
                })
            }
        }

	    return(
            <LinkedProjectsTable
                id={this.state.event_id}
                projects={projects} />
        );
    }
}

export default EventLinkedProjectsComponent;
