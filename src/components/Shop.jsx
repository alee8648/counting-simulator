import React, { Component } from 'react';
import ShopItem from './ShopItem.jsx';

class Shop extends Component {

	constructor() {
		super(...arguments);
	}

	render() {
		console.log('---- render running - Shop', this.props);

		return (
			<div className="shop__wrapper">
				<div className="shop">
					<h2 className="shop__heading">Shop</h2>
				</div>
				<div className="shop__inventory">
					<ShopItem
						name="Increase damage"
						buyAction={this.props.onBuyIncreaseDamage}
						cost={this.props.damageCost}
					/>
					<ShopItem
						name="Increase speed"
						buyAction={this.props.onBuyIncreaseSpeed}
						cost={this.props.speedCost}
					/>
				</div>
			</div>
		);
	}
}

export default Shop;