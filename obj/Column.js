function Column (x=0, z=0){
	this.geometry = new THREE.BoxGeometry(1,1,1);
	// this.material = new THREE.MeshBasicMaterial( { color: 0xff7614 } );
	this.material = new THREE.MeshBasicMaterial( { color: 0xaaaaaa } );

	this.col = new THREE.Object3D();
	h=0; // global
	this.col.add(this.createBase());
	this.col.add(this.createUpperBase());
	this.col.add(this.createPeek());
}

Column.prototype.createBase = function(){
	var pivot = new THREE.Object3D();

	for (var i = 9; i > 0; i-=2) {
		var bloc = new THREE.Mesh( this.geometry, this.material );
		pivot.add(bloc);
		bloc.scale.set(i,2,i);
		bloc.position.set(0,h,0);
		h+=2;
	}
	return pivot;
}

Column.prototype.createUpperBase = function(){
	h-=1;
	var pivot = new THREE.Object3D();

	for (var i = 3; i < 9; i+=2) {
		var bloc = new THREE.Mesh( this.geometry, this.material );
		pivot.add(bloc);
		bloc.scale.set(i,1,i);
		bloc.position.set(0,h,0);
		h+=1;
	}
	return pivot;
}

Column.prototype.createPeek = function(){
	h+=1;
	var pivot = new THREE.Object3D();
	var inch_h = 4;
	for (var i = 9; i > 0; i-=2) {
		var bloc = new THREE.Mesh( this.geometry, this.material );
		pivot.add(bloc);
		bloc.scale.set(i,inch_h,i);
		bloc.position.set(0,h,0);
		h+=inch_h;
		inch_h+=2;
	}
	return pivot;
}
