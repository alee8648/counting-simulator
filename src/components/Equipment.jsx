import React, { Component } from 'react';
import EquippedItem from './EquippedItem.jsx';


class Equipment extends Component {
	constructor() {
		super(...arguments);
	}

	render() {
		// console.log('---- render running - Equipment');
		let equippedItems = [];

		this.props.equippedItems.forEach( (item, index) => {
			equippedItems.push( (
				<EquippedItem 
					key={index}
					name={item.name}
					damage={item.damage}
					speed={item.speed}
					id={item.id}
					equipItem={this.props.equipItem}
				/>
			) );
		});
		

		return (
			<div className="equipment">
				<h2 className="equipment__heading">Equipment</h2>
				{equippedItems}
			</div>
		);
	}
}

export default Equipment;