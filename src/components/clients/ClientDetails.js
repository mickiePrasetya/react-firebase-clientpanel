import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import Spinner from '../layouts/Spinner';
import classnames from 'classnames';

class ClientDetails extends Component {
	state = {
		showBalanceUpdate: false,
		balanceUpdateAmount: ''
	};

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	// Update Balance
	balanceSubmit = e => {
		e.preventDefault();

		// console.log(this.state.balanceUpdateAmount);
		const { client, firestore } = this.props;
		const { balanceUpdateAmount } = this.state;

		const clientUpdate = {
			balance: parseFloat(balanceUpdateAmount)
		};

		// Update in firestore
		firestore.update({ collection: 'clients', doc: client.id }, clientUpdate);
	};

	// Delete Client
	onDeleteClick = () => {
		const { client, firestore, history } = this.props;

		firestore
			.delete({ collection: 'clients', doc: client.id })
			.then(history.push('/'));
	};

	render() {
		const { client } = this.props;
		const { showBalanceUpdate, balanceUpdateAmount } = this.state;

		let balanceForm = '';
		// if balance form should display
		if (showBalanceUpdate) {
			balanceForm = (
				<form onSubmit={this.balanceSubmit}>
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							name="balanceUpdateAmount"
							placeholder="Add New Balance"
							value={balanceUpdateAmount}
							onChange={this.onChange}
						/>
						<div className="input-group-append">
							<input
								type="submit"
								value="Update"
								className="btn btn-outline-dark"
							/>
						</div>
					</div>
				</form>
			);
		} else {
			balanceForm = null;
		}

		if (client) {
			return (
				<div>
					<div className="row">
						<div className="col-md-6">
							<Link to="/" className="btn btn-link">
								<i className="fas fa-arrow-circle-left" /> Back to
								Dashboard
							</Link>
						</div>
						<div className="col-md-6">
							<div className="btn-group float-right">
								<Link
									to={`/client/edit/${client.id}`}
									className="btn btn-dark"
								>
									Edit
								</Link>
								<button
									className="btn btn-danger"
									onClick={this.onDeleteClick}
								>
									Delete
								</button>
							</div>
						</div>
					</div>
					<hr />
					<div className="card">
						<div className="card-header">
							<h3>
								{client.firstName} {client.lastName}
							</h3>
						</div>
						<div className="card-body">
							<div className="row">
								<div className="col-sm-6 col-md-8">
									<h4>
										Client ID:{' '}
										<span className="text-secondary">
											{client.id}
										</span>
									</h4>
								</div>
								<div className="col-sm-6 col-md-4">
									<h3 className="pull-right">
										Balance:{' '}
										<span
											className={classnames({
												'text-danger': client.balance > 0,
												'text-success': client.balance === 0
											})}
										>
											$
											{parseFloat(client.balance.toString()).toFixed(
												2
											)}
										</span>
										<small>
											{' '}
											<a
												href="#!"
												onClick={() =>
													this.setState({
														showBalanceUpdate: !this.state
															.showBalanceUpdate
													})
												}
											>
												<i className="fas fa-pencil-alt" />
											</a>
										</small>
									</h3>
									{/*  @todo - balanceForm */}
									{balanceForm}
								</div>
							</div>

							<hr />
							<ul className="list-group">
								<li className="list-group-item">
									Contact Email: {client.email}
								</li>
								<li className="list-group-item">
									Contact Phone: {client.phone}
								</li>
							</ul>
						</div>
					</div>
				</div>
			);
		} else {
			return <Spinner />;
		}
	}
}

ClientDetails.propTypes = {
	firestore: PropTypes.object.isRequired
};

export default compose(
	firestoreConnect(props => [
		{ collection: 'clients', storeAs: 'client', doc: props.match.params.id }
	]),
	connect(({ firestore: { ordered } }, props) => ({
		client: ordered.client && ordered.client[0]
	}))
)(ClientDetails);
