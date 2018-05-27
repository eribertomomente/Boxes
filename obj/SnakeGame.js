/**
	Questo file definisce l'oggetto e i metdodi di SnakeGame, un'istanza di una partita a snake.
**/

// costruttore
function SnakeGame(){
	this.snakegame = new THREE.Object3D();

	this.snake = new Snake(0, 3, 0);	// sopra ai 3 strati di pavimento
	this.arena = new Arena(0, 0, 0);
	this.target = this.createTarget();

	this.snakegame.add(this.arena.floor);
	this.snakegame.add(this.snake.bodyObj);
	this.snakegame.add(this.target);

	scene.add(this.snakegame);

	this.direction = 0;
}

SnakeGame.prototype.move = function(){

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
				if(posX >= dim - 0.5){
					this.direction = 1;
				}else{
					posX += SPEED;
				}
			break;
			case 1:
				if (posZ <= - dim + 0.5){
					this.direction = 2;
				}else{
					posZ -= SPEED;
				}
			break;
			case 2:
				if(posX <= - dim + 0.5){
					this.direction = 3;
				}else{
					posX -= SPEED;
				}
			break;
			case 3:
				if (posZ >= dim - 0.5){
					this.direction = 0;
				}else{
					posZ += SPEED;
				}
			break;
		}

		// spostamento dello snake
		this.snake.body[0].position.set(posX, posY, posZ);
		this.snake.moveBody();

		if(this.snake.isEatingHimself(this.direction)){

			this.snakegame.remove(this.snake.bodyObj);
			this.snake = new Snake(0, 3, 0);
			this.snakegame.add(this.snake.bodyObj);

			this.destroyTarget();
			this.target = this.createTarget();
			this.snakegame.add(this.target);
			return;
		}

		// gestione target
		if(this.isEatingTarget()){

			this.destroyTarget();

			// creazione del nuovo target
			this.target = this.createTarget();
			this.snakegame.add(this.target);

			// lo snake deve ingrandirsi ora
			this.snake.isGettingBigger = true;
			// e deve farlo alla posizione sotto
			originPosition = this.snake.catchCurrentPosition();
		}

		if (this.snake.isGettingBigger){
			if (this.snake.isInOriginPosition(originPosition)){
				this.snake.addBodyPart(originPosition);
			}
		}

}

/*
	determina se la testa dello snake ed il target si compenetrano
	in caso affermativo ritorna True, altrimenti False
*/
SnakeGame.prototype.isEatingTarget = function(){

	var head = this.snake.bodyObj.children[0];
	var target = this.target;

	head.updateMatrixWorld( true );
	target.updateMatrixWorld( true );
	target.geometry.computeBoundingBox();
	head.geometry.computeBoundingBox();

	var headBox = head.geometry.boundingBox.applyMatrix4(head.matrix);
	var targetBox = target.geometry.boundingBox.applyMatrix4(target.matrix);

	return(targetBox.intersectsBox(headBox));

}

/*
	creazione del target
*/
SnakeGame.prototype.createTarget = function(){

	var dim = (FIELD_DIMENSION-8);

	var posX = Math.round((Math.random()*dim) - dim/2);
	var posZ = Math.round((Math.random()*dim) - dim/2);

	var geometry = new THREE.BoxGeometry(1,1,1);
	var material = new THREE.MeshBasicMaterial( {color: 0xff0000});

	var cube = new THREE.Mesh( geometry, material);

	cube.position.set(posX, 3, posZ);

	return cube;

}

/*
	rimozione del target
*/
SnakeGame.prototype.destroyTarget = function(){
	this.snakegame.remove(this.target);
	this.target.geometry.dispose();
	this.target.material.dispose();
}
