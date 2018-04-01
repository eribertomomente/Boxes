/**
	Questo file definisce l'oggetto e i metdodi di SnakeGame, un'istanza di una partita a snake.
**/

// costruttore
function SnakeGame(bodyLength, FieldDimension){
	this.snake = new Snake(bodyLength);
	this.field = new Field(FieldDimension);
}

/*
	determina se la testa dello snake ed il target si compenetrano
	in caso affermativo ritorna True, altrimenti False
*/
SnakeGame.prototype.isEatingTarget = function(){

	var head = this.snake.body[0];
	var target = this.field.target;

	head.updateMatrixWorld( true );
	target.updateMatrixWorld( true );
	target.geometry.computeBoundingBox();
	head.geometry.computeBoundingBox();

	var headBox = head.geometry.boundingBox.applyMatrix4(head.matrix);
	var targetBox = target.geometry.boundingBox.applyMatrix4(target.matrix);

	return(targetBox.intersectsBox(headBox));

}
