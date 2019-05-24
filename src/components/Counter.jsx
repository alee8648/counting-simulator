import React, { Component } from 'react';

class Counter extends Component {

	constructor() {
		super(...arguments);
	}

	getCount() {
		return this.props.count;
	}

	// Set a class on the counter based on the current count
	getCounterClassName() {
		let count = Math.floor( this.props.count / 10 );
		return `counter-size--${count}`;
	}

	render() {
		// console.log('---- render running - Counter', this.props);

		return (
			<div className="counter__wrapper">
				<div className="counter">
					<button id="count-value" className={this.getCounterClassName()} onClick={() => this.props.onIncreaseCount()}>{this.getCount()}</button>
				</div>
			</div>
		);
	}
}

export default Counter;