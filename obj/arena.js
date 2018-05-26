

function Arena (x=0, y=0, z=0){
	this.geometry = new THREE.BoxGeometry(1,1,1);
	dark_material = new THREE.MeshBasicMaterial( { color: 0xf4b042 } );
	light_material = new THREE.MeshBasicMaterial( { color: 0xf2c680 } );
	this.floor = new THREE.Object3D();

	/** strato inferiore **/
	var floor0 = this.createFloor(dark_material, FIELD_DIMENSION);
	this.floor.add(floor0);
	floor0.position.set(x,y,z);

	/** secondo strato **/
	var floor1 = this.createFloor(light_material, FIELD_DIMENSION-8);
	this.floor.add(floor1);
	floor1.position.set(x,y+1,z);

	/** terzo strato o pavimento dell'arena **/
	var floor2 = this.createFloor(light_material, FIELD_DIMENSION-8);
	this.floor.add(floor2);
	floor2.position.set(x,y+2,z);

}


Arena.prototype.createFloor = function(material, dim){
	var base = new THREE.Mesh( this.geometry, material );
	base.scale.x = dim;
	base.scale.z = dim;

	return base;
}
