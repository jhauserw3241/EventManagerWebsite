import React, { Component } from 'react';
import ItemCard from './ItemCard';
import ItemsTable from './ItemsTable';
import './../../CSS/List.css';

class ItemsList extends Component {	
	render() {
        if (this.props.org === "cards") {
            return (
				<div className="list-container">
                    {Object.values(this.props.items).map(item =>
                        <ItemCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            color={item.color}
                            linkPrefix={this.props.linkPrefix} />
                    )}
                </div>
			);
        } else {
            return (
                <div className="List">
                    <ItemsTable
                        dashboardName={this.props.dashboardName}
                        linkPrefix={this.props.linkPrefix}
                        items={this.props.items}
                        deleteItem={this.props.deleteItem} />
                </div>
            );
        }
	}
}

export default ItemsList;
