import React, { Component } from 'react';
import _ from 'lodash';

import Item from '../classes/Item.js';

import Counter from './Counter.jsx';
import Shop from './Shop.jsx';
import Stash from './Stash.jsx';
import Equipment from './Equipment.jsx';

const config = {

};

class App extends Component {
	state = {
		count: 0,
		damage: 1,
		speed: 3,
		time: 0,
		equippedItems: [ new Item({
			id: 0,
			damage: 1,
			speed: 3
		})],
		itemsInStash: [ new Item({
			id: 1,
			damage: 2,
			speed: 3
		}),
		new Item({
			id: 2,
			damage: 1,
			speed: 2
		})]
	};


	constructor() {
		// console.log('---- constructor running - App');
		super(...arguments);
		this.startTimer();

	}

	startTimer() {
		setTimeout(() => {
			this.increaseTime();
			this.startTimer();
			this.handleTimeIncrease();
		}, 1000);
	}

	increaseTime() {
		this.setState({
			time: ++this.state.time
		});
		// console.log(this.state.time);
	}

	handleTimeIncrease() {
		// Every {speed}, deal {damage}
		if (this.state.time % this.state.speed === 0) {
			this.handleIncreaseCount();
		}
	}

	canAfford( cost ) {
		// console.log(`Can you afford ${cost}? ${cost < this.state.count}`);
		if ( cost <= this.state.count ) {
			return true;
		} else {
			return false;
		}
	}

	handleSpendCount( cost, callback ) {
		if ( this.canAfford( cost ) ) {
			// console.log('You can afford it, performing callback');
			this.setState({
				count: this.state.count - cost
			});
			callback();
		}
	}

	getDamageCost() {
		return this.state.damage * 10;
	}

	getSpeedCost() {
		if (this.state.speed === 1) {
			return 0;
		}
		return 10 + (Math.pow(6 - this.state.speed, 2) * 10);
	}

	render() {
		// console.log('---- render running - App');

		return (
			<div>
				<Counter 
					count={this.state.count}
					onIncreaseCount={this.handleIncreaseCount}
				/>
				<Equipment
					equippedItems={this.state.equippedItems}
				/>
				<Stash 
					itemsInStash={this.state.itemsInStash}
					equipItem={this.handleEquipItem}
					onBuyIncreaseSpeed={this.handleBuyIncreaseSpeed}
					onBuyIncreaseDamage={this.handleBuyIncreaseDamage}
					onSpendCount={this.handleSpendCount}
					damageCost={this.getDamageCost()}
					speedCost={this.getSpeedCost()}
				/>
			</div>
		);
	}

	// Handles requests to increase the count in the state
	handleIncreaseCount = () => {
		// console.log("Request to increase count")
		this.setState({
			count: this.state.count + this.state.damage
		})
	}

	// Handles requests to increase the speed in the state
	handleIncreaseSpeed = () => {
		// console.log("Request to increase speed")
		if ( this.state.speed > 1 ) {
			this.setState({
				speed: --this.state.speed
			})
		}
	}

	// Handles requests to increase the damage in the state
	handleIncreaseDamage = () => {
		// console.log("Request to increase damage")
		this.setState({
			damage: ++this.state.damage
		})
	}

	handleBuyIncreaseDamage = (cost) => {
		// console.log(`Request to increase DAMAGE for ${cost}`);
		this.handleSpendCount( cost, () => this.handleIncreaseDamage());
	}

	handleBuyIncreaseSpeed = (cost) => {
		// console.log(`Request to increase SPEED for ${cost}`);
		this.handleSpendCount( cost, () => this.handleIncreaseSpeed());
	}

	handleEquipItem = (itemToEquip) => {
		const stash = this.state.itemsInStash;
		const unequippedItems = this.unequipAllEquippedItems();
		this.equipItem( itemToEquip );
		let updatedStash = this.removeItemFromStash( itemToEquip, stash ).updatedStash;
		updatedStash = this.addItemsToStash( unequippedItems, updatedStash );
		

		this.setState({
			itemsInStash: updatedStash
		});

		this.updateStats( itemToEquip );


	}

	updateStats( newItem ) {
		// console.log( `******Updating damage to ${newItem.damage}`, newItem);
		this.setState({
			damage: newItem.damage,
			speed: newItem.speed
		})
	}
	
	// Unequip all items
	unequipAllEquippedItems() {
		let removedItems = [];
		this.state.equippedItems.forEach( item => {
			removedItems.push( this.unequipItem( item ) );
		});

		return removedItems;
	}

	// Remove the given item from the equipped item array and return it
	unequipItem( item ) {
		let newEquipment = this.state.equippedItems;
		const itemToUnequipIndex = _.findIndex( newEquipment, equippedItem => equippedItem.id === item.id);
		const unequippedItem = newEquipment.splice( itemToUnequipIndex, 1 ); // remove the item to equip

		this.setState({
			equippedItems: newEquipment
		});

		return unequippedItem;
	}

	// Equip item
	equipItem( item ) {
		let updatedEquipment = this.state.equippedItems;
		updatedEquipment.push( item );
		this.setState({
			equippedItems: updatedEquipment
		});
	}

	// Remove item from stash
	removeItemFromStash( item, stash ) {
		let updatedStash = stash;
		const stashItemIndex = _.findIndex( updatedStash, stashItem => stashItem.id === item.id);
		const removedItem = updatedStash.splice( stashItemIndex, 1 ); // remove the item to equip

		return {
			removedItem,
			updatedStash
		};
	}

	// Add items to stash
	addItemsToStash( items, stash ) {
		let updatedStash = stash;
		updatedStash.push( ...items.reduce( function(updatedStash, item) { this.addItemToStash( item, updatedStash ) } ) );
		return updatedStash;
	}

	// Add item to stash
	addItemToStash( item, stash ) {
		let updatedStash = stash;
		updatedStash.push( item );

		return updatedStash;
	}
}

export default App;