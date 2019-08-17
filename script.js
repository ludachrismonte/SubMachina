

//~~~~~~~~~~~~~~~~~~~~~~ CAPTAIN ~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

let alpha_islands = [17, 21, 27, 28, 32, 38, 42, 53, 91, 93, 96, 98, 106, 108, 111, 123, 127, 131, 132, 133, 153, 167, 172, 176, 180, 192, 197, 201, 203, 208, 213];

let map =  document.getElementById('captain-map');
for (let r = 0; r < 15; r++) {
  map.innerHTML += '<tr>';
  for (let c = 0; c < 15; c++) {
  	let id = r * 15 + c;
  	if (alpha_islands.includes(id)){
		map.innerHTML += '<div class="checkbox island" id="box-' + id + '"></div>';
  	}
    else map.innerHTML += '<div class="checkbox sea" id="box-' + id + '" onclick="check(' + id + ')"></div>';
  }
  map.innerHTML += '</tr>';
}

function check(i) {
	let to_move_to = document.getElementById('box-' + i);
	if (to_move_to.className === 'dot') {
		return;
	}
	let items = document.getElementsByClassName('x');
	for (let i = 0; i < items.length; i++) {
		items[i].className = 'dot';
	}
	to_move_to.className = 'x';
}


//~~~~~~~~~~~~~~~~~~~~~~ RADIO OPERATOR ~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

let radio_cols = 29;
let radio_rows = 29;

let radio_map =  document.getElementById('radio-operator-grid');
for (let r = 0; r < radio_rows; r++) {
	radio_map.innerHTML += '<tr>';
		for (let c = 0; c < radio_cols; c++) {
			radio_map.innerHTML += '<div class="radio-box radio-not-visited" id="radio-box-' + (r * radio_cols + c) + '"></div>';
		}
	radio_map.innerHTML += '</tr>';
}

let current_row = Math.floor(radio_rows / 2);
let current_col = Math.floor(radio_cols / 2);

document.getElementById('radio-box-' + (current_row * radio_cols + current_col)).className = 'radio-box radio-visited';

function radioNorth() {
	console.log("north");
	current_row--;
	document.getElementById('radio-box-' + (current_row * radio_cols + current_col)).className = 'radio-box radio-visited';
}

function radioEast() {
	console.log("east");
	current_col++;
	document.getElementById('radio-box-' + (current_row * radio_cols + current_col)).className = 'radio-box radio-visited';
}

function radioSouth() {
	console.log("south");
	current_row++;
	document.getElementById('radio-box-' + (current_row * radio_cols + current_col)).className = 'radio-box radio-visited';
}

function radioWest() {
	console.log("west");
	current_col--;
	document.getElementById('radio-box-' + (current_row * radio_cols + current_col)).className = 'radio-box radio-visited';
}


//~~~~~~~~~~~~~~~~~~~~~~ FIRST MATE  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

let torpedo_status = 0;
let mine_status = 0;
let drones_status = 0;
let sonar_status = 0;
let sneak_status = 0;


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

function toggleHealth(i) {
	let elem = document.getElementById('health-bar-' + i);
	if (elem.className === 'health-bar bad'){
		elem.className = 'health-bar good';
	}
	else elem.className = 'health-bar bad';
}

function toggleEB(id) {
	let elem = document.getElementById('eb-' + id);
	if (elem.className === 'engineer-box'){
		elem.className = 'engineer-box damaged';
	}
	else elem.className = 'engineer-box';
}