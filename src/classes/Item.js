class Item {
	constructor(args) {
		this.name = Item.generateRandomName();
		this.damage = args.damage;
		this.speed = args.speed;
		this.id = args.id;
	}

	static generateRandomName() {
		const adjectives = [ 'Pointy', 'Stabby', 'Loving', 'Widow\'s', 'Tickling', 'Big' ];
		const nouns = [ 'Stick', 'Club', 'Piece', 'Sword', 'Spear', 'Bow', 'Nunchuks'];
		const suffixes = [ 'of Stabbing', 'for Stabbing', 'of Pain', 'of Love', 'from Mordor', 'that Broke', 'who Must Eat' ];
		return `${ Item.getRandomItemFromArray( adjectives) } ${ Item.getRandomItemFromArray( nouns) } ${ Item.getRandomItemFromArray( suffixes) }`;
	}

	static getRandomItemFromArray( array ) {
		const randomIndex = Math.floor( Math.random() * array.length );
		return array[ randomIndex ];
	}
}

export default Item;