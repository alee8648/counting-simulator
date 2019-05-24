import React, { Component } from 'react';


class EquippedItem extends Component {
	constructor() {
		super(...arguments);
	}

	render() {
		// console.log('---- render running - EquippedItem');

		return (
			<div className="equipment-item">
				<h3>{this.props.name}</h3>
				<p>Damage: {this.props.damage}</p>
				<p>Speed: {this.props.speed}</p>
				<p>Crit: 0%</p>
			</div>
		);
	}
}

export default EquippedItem;