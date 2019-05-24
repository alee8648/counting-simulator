import React, { Component } from 'react';
import StashItem from './StashItem.jsx';

class Stash extends Component {

	constructor() {
		super(...arguments);
	}

	render() {
		// console.log('---- render running - Stash', this.props);

		let stashInventory = [];
		this.props.itemsInStash.forEach( (item, index) => {
			stashInventory.push(
				<StashItem
					key={index}
					item={item}
					equipItem={this.props.equipItem}
				/>
			)
		})

		return (
			<div className="shop__wrapper">
				<div className="shop">
					<h2 className="shop__heading">Stash</h2>
				</div>
				<div className="shop__inventory">
					{stashInventory}
					{/*<StashItem
						name="Basic rod"
						buyAction={this.props.onBuyIncreaseDamage}
						cost={this.props.damageCost}
					/>
					<StashItem
						name="Shiny butter knife"
						buyAction={this.props.onBuyIncreaseSpeed}
						cost={this.props.speedCost}
					/>*/}
				</div>
			</div>
		);
	}
}

export default Stash;