import React, { Component } from 'react';
import PersonInfoModal from './PersonInfoModal';
import LoginRequired from './../Login/LoginRequired';
import fire from './../../fire';
import './../../CSS/Card.css';

class PersonCard extends Component {
      constructor(props) {
            super(props);

            this.changePriv = this.changePriv.bind(this);
      }

      changePriv(newPriv) {
            var updates = {};
            updates["/users/" + this.props.id + "/status"] = newPriv;
            fire.database().ref().update(updates);
      }

	render() {
		return (
			<div className="PersonCard people-card">
                        <PersonInfoModal
                              key={this.props.id}
                              id={this.props.id}
                              first_name={this.props.first_name}
                              last_name={this.props.last_name}
                              email={this.props.email}
                              phone_number={this.props.phone_number}
                              address={this.props.address}
                              notes={this.props.notes}
                              pic={this.props.pic}
                              color={this.props.color} />

                        <div
                              className="people-card-img"
                              style={{ backgroundImage: `url(${this.props.pic})` }}
                              data-toggle="modal"
                              data-target={"#personInfoModal-" + this.props.id}></div>
                        <div
                              className="people-card-text"
                              data-toggle="modal"
                              data-target={"#personInfoModal-" + this.props.id}>
                              <strong>{this.props.first_name} {this.props.last_name}</strong><br />
                              {this.props.email}<br />
                              {this.props.phone_number}
                        </div>
                        <LoginRequired requiredRole="admin">
                              <div
                                    className="people-card-btns">
                                          {(this.props.priv === "member") ?
                                                <button
                                                      className="btn btn-success"
                                                      onClick={(event) => this.changePriv("admin")}>
                                                      <i class="fa fa-star" aria-hidden="true"></i>
                                                </button> : null
                                          }
                                          {(this.props.priv === "admin") ?
                                                <button
                                                      className="btn btn-danger"
                                                      onClick={(event) => this.changePriv("member")}>
                                                      <i class="fa fa-users" aria-hidden="true"></i>
                                                </button> : null
                                          }
                              </div>
                        </LoginRequired>
			</div>
		);
	}
}

export default PersonCard;
