/**
 * Modified from code from Nathan Bean
 */

import React, { Component } from 'react';
import './../../CSS/Overlay.css';

export default class Overlay extends Component {
    render() {
        var visibleClass = (this.props.visible) ? 'active' : '';

        return (
            <div className={`overlay ${visibleClass}`}>
                <div className={`overlay-dialog ${visibleClass}`} id={this.props.id}>
                    <div className="overlay-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.props.title}</h5>
                            <button
                                type="button"
                                className="close"
                                onClick={() => 
                                    this.props.updateAddModalVisibility(false)}
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}