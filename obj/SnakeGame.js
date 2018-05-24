/**
	Questo file definisce l'oggetto e i metdodi di SnakeGame, un'istanza di una partita a snake.
**/

// costruttore
function SnakeGame(x,y,z){
	this.center = new THREE.Vector3(x, y, z);

	this.snake = new Snake(x, y+3, z);	// sopra ai 3 strati di pavimento
	this.arena = new Arena(x,y,z);
	this.target = this.createTarget();

	this.arena.floor.scale.set(0.028, 0.028, 0.028);
	this.snake.bodyObj.scale.set(0.028, 0.028, 0.028);
	this.target.scale.set(0.028, 0.028, 0.028);

	scene.add(this.arena.floor);
	scene.add(this.snake.bodyObj);
	scene.add(this.target);

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

		// gestione mela
		if(this.isEatingTarget()){

			scene.remove(this.target);
			this.target.geometry.dispose();
			this.target.material.dispose();
			this.target = this.createTarget();
			this.target.scale.set(0.028, 0.028, 0.028);
			scene.add(this.target);

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

	var headBox = head.geometry.boundingBox.applyMatrix4(head.matrix).applyMatrix4(this.snake.bodyObj.matrix);
	var targetBox = target.geometry.boundingBox.applyMatrix4(target.matrix);

	return(targetBox.intersectsBox(headBox));

}

/*
	creazione del target
*/
SnakeGame.prototype.createTarget = function(){

	var dim = (FIELD_DIMENSION-8);

	var posX = this.center.x + Math.round((Math.random()*dim) - dim/2);
	var posZ = this.center.z + Math.round((Math.random()*dim) - dim/2);

	var geometry = new THREE.BoxGeometry(1,1,1);
	var material = new THREE.MeshBasicMaterial( {color: 0xff0000});

	var cube = new THREE.Mesh( geometry, material);

	cube.position.set(posX * 0.028, (this.center.y+3) * 0.028, posZ * 0.028);

	return cube;

}
