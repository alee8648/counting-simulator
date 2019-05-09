import React, { Component } from 'react';

class ShopItem extends Component {

	constructor() {
		super(...arguments);
	}

	getShopItemName() {
		return this.props.name;
	}

	getButtonText() {
		if (this.isDisabled()) {
			return `Maximum reached`;
		}
		return `Buy for ${this.props.cost}`;
	}

	isDisabled() {
		return (this.props.cost === 0);
	}

	render() {
		console.log('---- render running - ShopItem', this.props);

		return (
			<div className="shop-item__wrapper">
				<div className="shop-item">
					<h3 className="shop-item__heading">{this.getShopItemName()}</h3>
					<button className="shop-item__buy" onClick={() => this.props.buyAction(this.props.cost)} disabled={this.isDisabled()}>{this.getButtonText()}</button>
				</div>
			</div>
		);
	}
}

export default ShopItem;