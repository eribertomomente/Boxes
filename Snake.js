/**
	DEFINIZIONI:
		- origin: obj indipendente che si muove
		- stalker: array in cui vengono tracciate le ultime n posizioni di un obj origin
		- follower: obj che assume le stesse posizioni di un obj origin con un ritardo di n posizioni
**/

function Snake (bodyLength=3){
	var body = createBody(bodyLength);
	this.body = body;
	this.stalkers = createMultipleStalkers(body);
}

/*
	muove il corpo dello snake seguendo gli spostamenti della testa
*/
function moveBody(snake){
	for (var i=0; i<snake.body.length-1; i++){
		moveFollower(snake.body[i], snake.stalkers[i], snake.body[i+1]);
	}
}

/*
	TODO non funziona
	true se lo snake è passato sopra il suo corpo
	false altrimenti
*/
function isEatingHimself(snake){
	var head = snake.body[0].position;
	for (var i = 1; i < snake.body.length; i++){
		if (head == snake.body[i].position){
			return true;
		}
	}
	return false;
}

/*
	PRIVATE
	crea il corpo di uno snake
*/
function createBody(bodyLength){
	var geometry = new THREE.BoxGeometry(1,1,1);
	var material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe:true } );
	var cubes=[];
	for ( i=0; i<bodyLength; i++ ){
		cubes[i] = new THREE.Mesh( geometry, material );
		scene.add(cubes[i]);
		cubes[i].position.set(0,0,0);
	}
	return cubes;
}


/*
	PRIVATE
	crea un array di stalkers
	ogni stalker è relativo a un elemento di body
*/
function createMultipleStalkers(body){
	var stalkers=[];
	for (var i = 0; i < body.length-1; i++){
		stalkers[i] = createStalker(body[i]);
	}
	return stalkers;
}


/*
	PRIVATE
	crea un array stalker di origin
	lo stalker appena creato avrà tutte le sue posizioni uguali pari alla posizione iniziale di origin
	questo permette il ritardo	voluto nel tracciare le posizioni di origin
*/
function createStalker(origin){
	var delay = 20;
	var stalker = [];
	for(var i = 0; i < delay; i++) {
	    stalker.push(origin.position.clone());
	}
	return stalker;
}


/*
	PRIVATE
	inserisce in coda all'array stalker la posizione attuale di origin
	rimuove la posizione in tesa
*/
function updateStalker(origin, stalker){
	stalker.shift();
	stalker.push(origin.position.clone());
}

/*
	PRIVATE
	esegue un passo del follower
*/
function moveFollower(origin, stalker, follower){
	var x = stalker[0].x;
	var y = stalker[0].y;
	var z = stalker[0].z;
	follower.position.set(x,y,z);
	updateStalker(origin, stalker);
}