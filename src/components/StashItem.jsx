import React, { Component } from 'react';

class StashItem extends Component {

	constructor() {
		super(...arguments);
	}

	getStashItemName() {
		return this.props.name;
	}

	getButtonText() {
		if (!this.isEnabled()) {
			return `Unavailable`;
		}
		return `Equip`;
	}

	isEnabled() {
		// return (this.props.cost === 0);
		return true;
	}

	render() {
		console.log('---- render running - StashItem', this.props);

		return (
			<div className="shop-item__wrapper">
				<div className="shop-item">
					<h3 className="shop-item__heading">{this.getStashItemName()}</h3>
					<p>Damage: {this.props.damage}<br />
					Speed: {this.props.speed}</p>
					<button className="shop-item__buy" onClick={() => this.props.equipItem(this.props.id)} disabled={!this.isEnabled()}>{this.getButtonText()}</button>
				</div>
			</div>
		);
	}
}

export default StashItem;