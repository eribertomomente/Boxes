/**
	Questo file definisce l'oggetto e i metdodi di Field, il terreno da gioco di una partita a snake.
	Field è composto da:
		- base: rappresenta il terreno sottostante allo snake
		- target: rappresenta l'oggetto che deve mangiare lo snake
**/


/**
	TODO per semplicità imposto il terreno da gioco sul piano x,y. Modificare in seguito se non opportuno.
**/


/*
	costruttore
*/
function Field(dimension){
	var geometry = new THREE.BoxGeometry(1,1,1);
	var material = new THREE.MeshBasicMaterial( { color: 0x111111, wireframe:false } );

	var halfEdge1 = Math.floor(dimension/2);
	var halfEdge2 = dimension- halfEdge1;

	var field = new Array(dimension);	// field è un array bidimensionale quadrato
	for (var i = -halfEdge1; i < halfEdge2; i++) {
		field[i] = new Array(dimension);
		for (var j = -halfEdge1; j < halfEdge2; j++) {
			// inserisco nella posizione (i,j) il quadrato corrispondente
			field[i][j] = new THREE.Mesh( geometry, material );
			// aggiungo il quadrato alla scena per renderlo visibile
			scene.add(field[i][j]);
			// sposto il quadrato nella sua posizione
			field[i][j].position.set(i,j,-1);
		}
	}
	this.base = field;
	this.target = createTarget(dimension);
}

/*
	restituisce un oggetto target
*/
function createTarget(dimension){
	var posX = Math.round((Math.random()*dimension) - dimension/2);
	var posY = Math.round((Math.random()*dimension) - dimension/2);

	var geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
	var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
	var cube = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );

	cube.position.set(posX,posY,0);
	scene.add(cube);
	return cube;
}

/*
	anima il target
*/
function rotateTarget(cube, speed=0.08) {
	cube.rotation.x -= speed * 2;
	cube.rotation.y -= speed;
	cube.rotation.z -= speed * 3;
}