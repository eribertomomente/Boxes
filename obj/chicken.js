

function Chicken (x=0, z=0){
	this.geometry = new THREE.BoxGeometry(1,1,1);
	this.body = new THREE.Object3D();
	this.body.add(this.createFeet());
	this.body.add(this.createChest());
	this.body.add(this.createHead());


	
}

Chicken.prototype.createFeet = function (x=0,z=0){
	var feet = new THREE.Object3D();
	var material = new THREE.MeshBasicMaterial( { color: 0xff7614 } );
	// var dx = createFoot(material);
	var dx = this.createFoot(material );
	var sx = this.createFoot(material);
	dx.position.set(2+x,0,z);
	sx.position.set(-2+x,0,z);
	feet.add(dx);
	feet.add(sx);
	return feet;
}


Chicken.prototype.createFoot = function(material){
	var foot = new THREE.Object3D();

	//pianta del piede
	for (var i = -1; i <= 1; i++){
		for (var j = 0; j < 2; j++) {
			var footPiece = new THREE.Mesh( this.geometry, material );
			foot.add(footPiece);
			footPiece.position.set(i,0,j);
		}		
	}

	// punta del piede
	var footFinger = new THREE.Mesh( this.geometry, material );
	foot.add(footFinger);
	footFinger.position.set(0,0,2);

	// gamba
	for (var i = 1; i <= 3; i++) {
		var leg = new THREE.Mesh( this.geometry, material );
		foot.add(leg);
		leg.position.set(0,i,0);
	}	

	return foot;
}


Chicken.prototype.createChest = function(){
	var chest = new THREE.Object3D();
	var grey_material = new THREE.MeshBasicMaterial( { color: 0xdddddd } );

	//busto
	for (var z = -4; z <=4; z++){
		for (var x = -3; x <= 3; x++) {
			for (var y = 0; y < 6; y++) {
				var piece = new THREE.Mesh( this.geometry, grey_material );
				
				chest.add(piece);
				piece.position.set(x,y+4,z);
			}
		}		
	}

	// ali
	var wing_material = new THREE.MeshBasicMaterial( { color: 0xffffff });
	var wing_dx = this.createWing(wing_material);
	var wing_sx = this.createWing(wing_material);
	chest.add(wing_dx);
	chest.add(wing_sx);
	wing_dx.position.set(-4,5,-2);
	wing_sx.position.set(4,5,-2);
	
	return chest;

}

Chicken.prototype.createWing = function(material){
	var wing = new THREE.Object3D();

	//pianta del piede
	for (var z = 0; z < 6; z++){
		for (var y = 0; y < 4; y++) {
			var piece = new THREE.Mesh( this.geometry, material );
			wing.add(piece);
			piece.position.set(0,y,z);
		}
	}	

	return wing;
}

Chicken.prototype.createHead = function(){
	var head = new THREE.Object3D();
	var head_material = new THREE.MeshBasicMaterial( { color: 0xffffff } );

	// testa
	for (var z = 0; z < 3; z++){
		for (var x = 0; x < 5; x++) {
			for (var y = 0; y < 6; y++) {
				
				if ( !((x==0 || x==4) && (y==4) && (z==2) )){
					var piece = new THREE.Mesh( this.geometry, head_material );
					head.add(piece);
					piece.position.set(x,y,z);
				}
			}
		}		
	}

	// occhi
	var eye_material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
	var dx_eye = new THREE.Mesh( this.geometry, eye_material );
	var sx_eye = new THREE.Mesh( this.geometry, eye_material );
	head.add(sx_eye);
	head.add(dx_eye);
	dx_eye.position.set(0,4,2);
	sx_eye.position.set(4,4,2);

	// becco

	var red_material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
	var orange_material = new THREE.MeshBasicMaterial( { color: 0xff7614 } );
	var yellow_material = new THREE.MeshBasicMaterial( { color: 0xf4ce42 } );
	// parte superiore
	for (var x = 0; x < 3; x++) {
		var piece = new THREE.Mesh( this.geometry, yellow_material );
		head.add(piece);
		piece.position.set(x+1,3,3);
	}
	// parte inferiore
	for (var x = 0; x < 3; x++) {
		var piece = new THREE.Mesh( this.geometry, orange_material );
		head.add(piece);
		piece.position.set(x+1,2,3);
	}
	// colletto
	var piece = new THREE.Mesh( this.geometry, red_material );
	head.add(piece);
	piece.position.set(2,1,3);



	head.position.set(-2,8,4);

	return head;
}