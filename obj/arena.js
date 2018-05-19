

function Arena (x=0, y=0, z=0){
	this.geometry = new THREE.BoxGeometry(1,1,1);
	dark_material = new THREE.MeshBasicMaterial( { color: 0xf4b042 } );
	light_material = new THREE.MeshBasicMaterial( { color: 0xf2c680 } );
	this.floor = new THREE.Object3D();

	/** strato inferiore **/
	var floor0 = this.createFloor(dark_material,35, 0);
	this.floor.add(floor0);
	floor0.position.set(x,y,z);

	/** secondo strato **/
	var floor1 = this.createFloor(light_material,27, 1);
	this.floor.add(floor1);
	floor1.position.set(x,y,z);

	/** terzo strato o pavimento dell'arena **/
	var floor2 = this.createFloor(light_material,27, 2);
	this.floor.add(floor2);
	floor2.position.set(x,y,z);
	
}


Arena.prototype.createFloor = function(material, dim, h){
	var base = new THREE.Object3D();
	halfDim1 = Math.floor(dim/2);
	halfDim2 = dim - halfDim1;
	for (var i = -halfDim1; i <halfDim2; i++){
		for (var j = -halfDim1; j < halfDim2; j++) {
			var block = new THREE.Mesh( this.geometry, material );
			base.add(block);
			block.position.set(i,h,j);
		}		
	}

	return base;
}