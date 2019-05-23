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
		console.log('---- constructor running - App');
		super(...arguments);
		this.startTimer();

		this.newItem = new Item({});
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
		console.log(this.state.time);
	}

	handleTimeIncrease() {
		// Every {speed}, deal {damage}
		if (this.state.time % this.state.speed === 0) {
			this.handleIncreaseCount();
		}
	}

	canAfford( cost ) {
		console.log(`Can you afford ${cost}? ${cost < this.state.count}`);
		if ( cost <= this.state.count ) {
			return true;
		} else {
			return false;
		}
	}

	handleSpendCount( cost, callback ) {
		if ( this.canAfford( cost ) ) {
			console.log('You can afford it, performing callback');
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
		console.log('---- render running - App');

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
		console.log("Request to increase count")
		this.setState({
			count: this.state.count + this.state.damage
		})
	}

	// Handles requests to increase the speed in the state
	handleIncreaseSpeed = () => {
		console.log("Request to increase speed")
		if ( this.state.speed > 1 ) {
			this.setState({
				speed: --this.state.speed
			})
		}
	}

	// Handles requests to increase the damage in the state
	handleIncreaseDamage = () => {
		console.log("Request to increase damage")
		this.setState({
			damage: ++this.state.damage
		})
	}

	handleBuyIncreaseDamage = (cost) => {
		console.log(`Request to increase DAMAGE for ${cost}`);
		this.handleSpendCount( cost, () => this.handleIncreaseDamage());
	}

	handleBuyIncreaseSpeed = (cost) => {
		console.log(`Request to increase SPEED for ${cost}`);
		this.handleSpendCount( cost, () => this.handleIncreaseSpeed());
	}

	handleEquipItem = (id) => {
		console.log(`Request to equip item with id ${id}`);
		let newStash = this.state.itemsInStash;
		this.state.equippedItems.forEach( item => {
			newStash.push( item );
		})
		let itemIndex = _.findIndex( newStash, item => item.id === id);
		let equipItem = newStash.splice( itemIndex, 1 ); // remove the item to equip
		this.setState({
			itemsInStash: newStash
		});
		this.setState({
			equippedItems: equipItem
		});

		this.updateStats( equipItem[0] );
	}

	updateStats( newItem ) {
		console.log( `******Updating damage to ${newItem.damage}`, newItem);
		this.setState({
			damage: newItem.damage,
			speed: newItem.speed
		})
	}
}

export default App;