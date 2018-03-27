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
	true se lo snake è passato sopra il suo corpo
	false altrimenti
*/
function isEatingHimself(snake, direction){

	/**
		per vedere se si sta mangiando, controllo se almeno uno dei due spigoli frontali
		della testa sono all'interno di uno dei cubi che compongono il corpo dello snake
	**/
	var width = snake.body[0].geometry.parameters.width / 2;

	// vertice destro (pensando il cubo rivolto verso l'alto)
	var v1x = snake.body[0].position.x + ((direction < 2) ? + width : - width);
	var v1y = snake.body[0].position.y + ((direction%3 == 0) ? - width : + width);
	//vertice sinistro (pensando il cubo rivolto verso l'alto)
	var v2x = snake.body[0].position.x + ((direction%3 == 0) ? + width : - width);
	var v2y = snake.body[0].position.y + ((direction < 2) ? + width : - width);

	for (var i = 1; i < snake.body.length; i++){
		var body = snake.body[i];
		var cond1 = (v1x <= body.position.x + body.geometry.parameters.width / 2)&&(v1x >= body.position.x - body.geometry.parameters.width / 2)&&(v1y <= body.position.y + body.geometry.parameters.width / 2)&&(v1y >= body.position.y - body.geometry.parameters.width / 2);
		var cond2 = (v2x <= body.position.x + body.geometry.parameters.width / 2)&&(v2x >= body.position.x - body.geometry.parameters.width / 2)&&(v2y <= body.position.y + body.geometry.parameters.width / 2)&&(v2y >= body.position.y - body.geometry.parameters.width / 2);
		if (cond1 || cond2){
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
