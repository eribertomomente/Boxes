

function Arrow (x, z){
	this.geometry = new THREE.BoxGeometry(1,1,1);
	this.body = new THREE.Object3D();
	material = new THREE.MeshBasicMaterial( { color: 0xff0000, transparent: true, opacity: 0.2 } );
	arrow = this.createArrow(5,7,material);
	arrow.position.set(x,0,z);
	this.body.add(arrow);
	
}

Arrow.prototype.createArrow = function (cono, gambo, material){
	pivot = new THREE.Object3D();

	for (var i = 0; i < cono; i++) {
		pivot.add(this.createCircle(i, i+0.5, material));
	}
	for (var i = 0; i < gambo; i++) {
		pivot.add(this.createCircle(i+cono, Math.floor(cono/5), material));
	}
	return pivot;
}

Arrow.prototype.createCircle = function (y, halfEdge, material){
	var base = new THREE.Object3D();
	for (var i = -halfEdge; i <halfEdge; i++){
		for (var j = -halfEdge; j < halfEdge; j++) {
			var block = new THREE.Mesh( this.geometry, material );
			base.add(block);
			block.position.set(i,y,j);
		}		
	}

	return base;
}