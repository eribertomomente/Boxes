/**
	Questo file definisce l'oggetto e i metdodi di SnakeGame, un'istanza di una partita a snake.
**/

// costruttore
function SnakeGame(x,y,z){
	this.snake = new Snake(x, y+3, z);	// sopra ai 3 strati di pavimento
	this.center = new THREE.Vector3(x, y, z);
	this.arena = new Arena(x,y,z);

	this.arena.floor.scale.set( 0.028, 0.028, 0.028 );
	this.snake.bodyObj.scale.set( 0.028, 0.028, 0.028 );

	scene.add(this.arena.floor);
	scene.add(this.snake.bodyObj);

	this.direction = 0;
}

SnakeGame.prototype.move = function(){

	/*
		var halfEdge1 = Math.floor(FIELD_DIMENSION/2);
		var halfEdge2 = FIELD_DIMENSION- halfEdge1;
		*/

		var dim = (FIELD_DIMENSION-8)/2;

		var posX = this.snake.body[0].position.x;
		var posZ = this.snake.body[0].position.z;
		var posY = this.snake.body[0].position.y;

		/**
			direzione può valere 4 valori:
				0 - verso dx
				1 - verso l'alto
				2 - verso sx
				3 - verso il basso
		**/
		switch(this.direction){
			case 0:
				if(posX >= this.center.x + dim - 0.5){
					this.direction = 1;
				}else{
					posX += SPEED;
				}
			break;
			case 1:
				if (posZ <= this.center.z - dim + 0.5){
					this.direction = 2;
				}else{
					posZ -= SPEED;
				}
			break;
			case 2:
				if(posX <= this.center.x - dim + 0.5){
					this.direction = 3;
				}else{
					posX -= SPEED;
				}
			break;
			case 3:
				if (posZ >= this.center.z + dim - 0.5){
					this.direction = 0;
				}else{
					posZ += SPEED;
				}
			break;
		}

		this.snake.body[0].position.set(posX, posY, posZ);

		this.snake.moveBody();

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
