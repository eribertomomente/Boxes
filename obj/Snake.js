/**
	DEFINIZIONI:
		- origin: obj indipendente che si muove
		- stalker: array in cui vengono tracciate le ultime n posizioni di un obj origin
		- follower: obj che assume le stesse posizioni di un obj origin con un ritardo di n posizioni
**/

function Snake (bodyLength=3){
	this.body = this.createBody(bodyLength);
	this.stalkers = this.createMultipleStalkers();
}


/*
	muove il corpo dello snake seguendo gli spostamenti della testa
*/
Snake.prototype.moveBody = function (){
	for (var i=0; i<this.body.length-1; i++){
		this.moveFollower(i);
	}
}


/*
	true se lo snake è passato sopra il suo corpo
	false altrimenti
*/
Snake.prototype.isEatingHimself = function(direction){

	/**
		per vedere se si sta mangiando, controllo se almeno uno dei due spigoli frontali
		della testa sono all'interno di uno dei cubi che compongono il corpo dello snake
	**/
	var width = this.body[0].geometry.parameters.width / 2;

	// vertice destro (pensando il cubo rivolto verso l'alto)
	var v1x = this.body[0].position.x + ((direction < 2) ? + width : - width);
	var v1y = this.body[0].position.y + ((direction%3 == 0) ? - width : + width);
	//vertice sinistro (pensando il cubo rivolto verso l'alto)
	var v2x = this.body[0].position.x + ((direction%3 == 0) ? + width : - width);
	var v2y = this.body[0].position.y + ((direction < 2) ? + width : - width);

	for (var i = 2; i < this.body.length; i++){
		var body = this.body[i];
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
Snake.prototype.createBody = function(bodyLength){
	var geometry = new THREE.BoxGeometry(1,1,1);
	var material = new THREE.MeshBasicMaterial( );
	material.map = new THREE.TextureLoader().load('images/boa_texture.jpg');
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
Snake.prototype.createMultipleStalkers = function(){
	var stalkers=[];
	for (var i = 0; i < this.body.length-1; i++){
		stalkers[i] = this.createStalker(this.body[i]);
	}
	return stalkers;
}


/*
	PRIVATE
	crea un array stalker di origin
	lo stalker appena creato avrà tutte le sue posizioni uguali pari alla posizione iniziale di origin
	questo permette il ritardo	voluto nel tracciare le posizioni di origin
*/
Snake.prototype.createStalker = function(origin){
	var delay = 20;
	var stalker = [];
	for(var i = 0; i < delay; i++) {
	    stalker.push(origin.position.clone());
	}
	return stalker;
}


/*
	PRIVATE
	inserisce in coda all'array stalker la posizione attuale del cubo alla posizione passata
	rimuove la posizione in testa
*/
Snake.prototype.updateStalker = function(index){
	this.stalkers[index].shift();
	this.stalkers[index].push(this.body[index].position.clone());
}

/*
	PRIVATE
	esegue un passo del follower del cubo alla posizione index
*/
Snake.prototype.moveFollower = function(index){
	var x = this.stalkers[index][0].x;
	var y = this.stalkers[index][0].y;
	var z = this.stalkers[index][0].z;
	this.body[index+1].position.set(x,y,z);
	this.updateStalker(index);
}
