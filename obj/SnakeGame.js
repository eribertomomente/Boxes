/**
	Questo file definisce l'oggetto e i metdodi di SnakeGame, un'istanza di una partita a snake.
**/

// costruttore
function SnakeGame(bodyLength, FieldDimension){
	this.snake = new Snake(bodyLength);
	this.field = new Field(FieldDimension);
}