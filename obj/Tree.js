function Tree (x=0, z=0){
	this.trunck = createTrunk(x,z);
	this.leaves = createLeaves(x,z);
	
}


function createTrunk(OriginX,OriginZ){
	var geometry = new THREE.BoxGeometry(2,1,2);
	var trunk_material = new THREE.MeshBasicMaterial();
	trunk_material.map = new THREE.TextureLoader().load('images/trunk_texture.png');
	for (var i = 0; i < TRUNK_HEIGHT; i++) {
		var trunk_part = new THREE.Mesh( geometry, trunk_material );
		scene.add(trunk_part);
		trunk_part.position.set(OriginX,i,OriginZ);
	}

}

function createLeaves(OriginX,OriginZ){
	var geometry = new THREE.BoxGeometry(1,1,1);
	var leave_material = new THREE.MeshBasicMaterial();
	leave_material.map = new THREE.TextureLoader().load('images/leave_texture.png');

	//foglie inferiori
	for (var y = 0; y < LEAVES_HALF_HEIGHT; y++) {
		for (var x = -(y+1); x <= (y+1); x++) {
			for (var z = -(y+1); z <= (y+1); z++) {
				var leave = new THREE.Mesh( geometry, leave_material );
				scene.add(leave);
				leave.position.set(	OriginX+x,
									TRUNK_HEIGHT+y,
									OriginZ+z);
			}
		}
	}

	//foglie superiori
	for (var y = LEAVES_HALF_HEIGHT-1;  Math.ceil(y) >= 0; y-=0.5) {
		var inc = Math.ceil(y);
		for (var x = -(inc+1); x <= (inc+1); x++) {
			for (var z = -(inc+1); z <= (inc+1); z++) {
				var leave = new THREE.Mesh( geometry, leave_material );
				scene.add(leave);
				leave.position.set(	OriginX+x,
									TRUNK_HEIGHT + 2*LEAVES_HALF_HEIGHT -y*2,
									OriginZ+z);
			}
		}
	}

	//foglie in cima
	var leave = new THREE.Mesh( geometry, leave_material );
	scene.add(leave);
	leave.position.set(	OriginX,
						TRUNK_HEIGHT+2*LEAVES_HALF_HEIGHT+2,
						OriginZ);
}