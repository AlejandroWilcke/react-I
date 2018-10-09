//Classes
function Gun(name, image, ammo, maxAmmo, shotDamage, shootingSound, reloadingSound, emptySound){
	this.name = name;
	this.image = image;
	this.ammo = ammo;
	this.maxAmmo = maxAmmo;
	this.shotDamage = shotDamage;
	this.shootingSound = new Audio(shootingSound);
	this.reloadingSound = new Audio(reloadingSound);
	this.emptySound = new Audio(emptySound);

	this.shoot = function(){
		if(this.ammo>0){
			this.ammo--;
			loadGunAmmo(this);
			this.shootingSound.load();
			this.shootingSound.play();
			$("body").append(this.shotDamage + "<br>");
		}else{
			this.emptySound.load();
			this.emptySound.play();
		}
	}

	this.reload = function(){
		if(this.ammo<this.maxAmmo){
			this.ammo = this.maxAmmo;
			loadGunAmmo(this);
			this.reloadingSound.load();
			this.reloadingSound.play();
		}
	}
}

function Monster(name, image, health, maxHealth){
	this.name = name;
	this.image = image;
	this.health = health;
	this.maxHealth = maxHealth;
}

//Initials
var activeGun = 0;
var imgGun = $("#imgGun");
var lblAmmo = $("#lblAmmo");

//Gun objects
//name, image, ammo, maxAmmo, shotDamage, shootingSound, reloadingSound, emptySound.
var pistol = new Gun("Pistol", "assets/imgs/pistol.png", 12, 12, 15, "assets/audios/pistol.mp3", "assets/audios/reload.mp3", "assets/audios/empty.mp3");
var shotgun = new Gun("Shotgun", "assets/imgs/shotgun.png", 2, 2, 40, "assets/audios/shotgun.mp3", "assets/audios/reload.mp3", "assets/audios/empty.mp3");
var rifle = new Gun("Rifle", "assets/imgs/rifle.png", 1, 1, 90, "assets/audios/rifle.mp3", "assets/audios/reload.mp3", "assets/audios/empty.mp3");

//Monster objects
//name, image, health, maxHealth.

//Monster functions
loadMonster();

function loadMonster(){
	var newMonster = new Monster("Bobo", "assets/imgs/scary1.gif", 100, 100);
	var monsterImg = $("<img class='monster' src='" + newMonster.image + "'>");
	$("#container").append(monsterImg);
	monsterImg.on("click", function(){
		reduceHealth(newMonster, this);
	});	
}

function reduceHealth(monsterObj, monsterImg){
	if(monsterObj.health>0){
		switch(activeGun){
			case 1:
					monsterObj.health-=pistol.shotDamage;
					break;

			case 2:
					monsterObj.health-=shotgun.shotDamage;
					break;

			case 3:
					monsterObj.health-=rifle.shotDamage;
					break;
		}
	}else{
		$(monsterImg).remove();
	}
	console.log(monsterObj.health);
}

//Event Listeners
document.addEventListener("mousemove", setGunAtMouseLocation);
document.addEventListener("keydown", selectWeapon);
document.addEventListener("mousedown", shoot);

//Gun functions
function setGunAtMouseLocation(e){
	imgGun.css("left", e.clientX + "px");
	imgGun.css("top", e.clientY + "px");
}

function selectWeapon(e){
	switch(e.keyCode){
		case 49:
				activeGun = 1;
				loadGunImage(pistol);
				loadGunAmmo(pistol);
				break;

		case 50:
				activeGun = 2;
				loadGunImage(shotgun);
				loadGunAmmo(shotgun);
				break;

		case 51:
				activeGun = 3;
				loadGunImage(rifle);
				loadGunAmmo(rifle);
				break;

		case 82:
				reload();
				break;
	}
	
}

function shoot(){
	switch(activeGun){
		case 1:
				pistol.shoot();
				break;

		case 2:
				shotgun.shoot();		
				break;

		case 3:
				rifle.shoot();
				break;
	}
}

function reload(){
	switch(activeGun){
		case 1:
				pistol.reload();
				break;

		case 2:
				shotgun.reload();
				break;

		case 3:
				rifle.reload();
				break;
	}
}

function loadGunAmmo(gunObject){
	lblAmmo.text(gunObject.ammo + "/" + gunObject.maxAmmo);
}

function loadGunImage(gunObject){
	imgGun.attr("src", gunObject.image);
}