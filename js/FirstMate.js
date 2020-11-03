var torpedo_status = 0;
var mine_status = 0;
var drones_status = 0;
var sonar_status = 0;
var sneak_status = 0;


function incrementTorpedoes() {
	if (torpedo_status == 3) {
		torpedo_status = 0
		document.getElementById('torpedoes-1').className = 'fm-empty third';
		document.getElementById('torpedoes-2').className = 'fm-empty third';
		document.getElementById('torpedoes-3').className = 'fm-empty third';
	}
	else {
		torpedo_status++;
		document.getElementById('torpedoes-' + torpedo_status).className = 'fm-full third';
	}
}

function incrementMines() {
	if (mine_status == 3) {
		mine_status = 0
		document.getElementById('mines-1').className = 'fm-empty third';
		document.getElementById('mines-2').className = 'fm-empty third';
		document.getElementById('mines-3').className = 'fm-empty third';
	}
	else {
		mine_status++;
		document.getElementById('mines-' + mine_status).className = 'fm-full third';
	}
}

function incrementDrones() {
	if (drones_status == 4) {
		drones_status = 0
		document.getElementById('drones-1').className = 'fm-empty fourth';
		document.getElementById('drones-2').className = 'fm-empty fourth';
		document.getElementById('drones-3').className = 'fm-empty fourth';
		document.getElementById('drones-4').className = 'fm-empty fourth';
	}
	else {
		drones_status++;
		document.getElementById('drones-' + drones_status).className = 'fm-full fourth';
	}
}

function incrementSonar() {
	if (sonar_status == 3) {
		sonar_status = 0
		document.getElementById('sonar-1').className = 'fm-empty third';
		document.getElementById('sonar-2').className = 'fm-empty third';
		document.getElementById('sonar-3').className = 'fm-empty third';
	}
	else {
		sonar_status++;
		document.getElementById('sonar-' + sonar_status).className = 'fm-full third';
	}
}

function incrementSneak() {
	if (sneak_status == 6) {
		sneak_status = 0
		document.getElementById('sneak-1').className = 'fm-empty sixth';
		document.getElementById('sneak-2').className = 'fm-empty sixth';
		document.getElementById('sneak-3').className = 'fm-empty sixth';
		document.getElementById('sneak-4').className = 'fm-empty sixth';
		document.getElementById('sneak-5').className = 'fm-empty sixth';
		document.getElementById('sneak-6').className = 'fm-empty sixth';
	}
	else {
		sneak_status++;
		document.getElementById('sneak-' + sneak_status).className = 'fm-full sixth';
	}
}