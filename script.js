

//~~~~~~~~~~~~~~~~~~~~~~ CAPTAIN ~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

let num_cols = 15;
let num_rows = 15;

let alpha_islands = [17, 21, 27, 28, 32, 38, 42, 53, 91, 93, 96, 98, 106, 108, 111, 123, 127, 131, 132, 133, 153, 167, 172, 176, 180, 192, 197, 201, 203, 208, 213];

let map =  document.getElementById('captain-map');
for (let r = 0; r < num_rows; r++) {
  map.innerHTML += '<tr>';
  for (let c = 0; c < num_cols; c++) {
  	let id = r * 15 + c;
  	if (alpha_islands.includes(id)){
		map.innerHTML += '<div class="checkbox island" id="box-' + id + '"></div>';
  	}
    else map.innerHTML += '<div class="checkbox sea" id="box-' + id + '" onclick="check(' + id + ')"></div>';
  }
  map.innerHTML += '</tr>';
}

let path = [];
let previous_direction = "";
let mine_enabled = false;

function check(dest_id) {
	let dest = document.getElementById('box-' + dest_id);
	if (dest.className === 'checkbox mine') {
		detonateMine(dest_id);
		return;
	}
	if (mine_enabled) {
		dropMine(dest_id);
		return;
	}
	if (dest.className !== 'checkbox sea') {
		return;
	}
	if (path.length === 0) {
		dest.className = 'checkbox x';
		path.push(dest_id);
		return;
	}
	cur_loc = path[path.length - 1];

	requested_dir = "";
	if (dest_id === cur_loc + 1) { requested_dir = "east"; }
	else if (dest_id === cur_loc - 1) { requested_dir = "west"; }
	else if (dest_id === cur_loc + num_cols) { requested_dir = "south"; }
	else if (dest_id === cur_loc - num_cols) { requested_dir = "north"; }
	if (requested_dir === "") {
		return;
	}

	if ((previous_direction === "" && (requested_dir === "east" || requested_dir === "west"))
	 || (previous_direction === "east" && requested_dir === "east")
	 || (previous_direction === "west" && requested_dir === "west")) {
		document.getElementById('box-' + cur_loc).className = 'checkbox east-west';
	}
	if ((previous_direction === "" && (requested_dir === "south" || requested_dir === "north"))
	 || (previous_direction === "south" && requested_dir === "south")
	 || (previous_direction === "north" && requested_dir === "north")) {
		document.getElementById('box-' + cur_loc).className = 'checkbox north-south';
	}
	if ((previous_direction === "east" && requested_dir === "north")
	 || (previous_direction === "south" && requested_dir === "west")) {
		document.getElementById('box-' + cur_loc).className = 'checkbox north-west';
	}
	if ((previous_direction === "south" && requested_dir === "east")
	 || (previous_direction === "west" && requested_dir === "north")) {
		document.getElementById('box-' + cur_loc).className = 'checkbox north-east';
	}
	if ((previous_direction === "east" && requested_dir === "south")
	 || (previous_direction === "north" && requested_dir === "west")) {
		document.getElementById('box-' + cur_loc).className = 'checkbox south-west';
	}
	if ((previous_direction === "north" && requested_dir === "east")
	 || (previous_direction === "west" && requested_dir === "south")) {
		document.getElementById('box-' + cur_loc).className = 'checkbox south-east';
	}
	dest.className = 'checkbox x';
	path.push(dest_id);
	previous_direction = requested_dir;
}

function enableMine() {
	mine_enabled = true;
}

function dropMine(dest_id) {
	if (path.length) {
		let okay_differences = [1, -1, num_cols, num_cols + 1, num_cols - 1, -num_cols, -num_cols + 1, -num_cols - 1];
		if (okay_differences.includes(dest_id - path[path.length - 1])) {
			document.getElementById('box-' + dest_id).className = 'checkbox mine';
			mine_enabled = false;
		}
	}
}

function detonateMine(dest_id) {
	document.getElementById('box-' + dest_id).className = 'checkbox explosion';
	setTimeout(function(){ document.getElementById('box-' + dest_id).className = 'checkbox sea'; }, 400);
}

function surface() {
	previous_direction = "";
	while (path.length > 1) {
		let to_clear = document.getElementById('box-' + path.shift());
		to_clear.className = 'checkbox sea';
	}
}

function undoPath() {
	if (path.length) {
		let to_undo = path.pop();
		document.getElementById('box-' + to_undo).className = 'checkbox sea';
		if (path.length) {
			document.getElementById('box-' + path[path.length -1]).className = 'checkbox x';
			if (path.length > 1) {
				if (path[path.length - 1] === path[path.length - 2] + 1) { previous_direction = "east"; }
				else if (path[path.length - 1] === path[path.length - 2] - 1) { previous_direction = "west"; }
				else if (path[path.length - 1] === path[path.length - 2] + num_cols) { previous_direction = "south"; }
				else if (path[path.length - 1] === path[path.length - 2] - num_cols) { previous_direction = "north"; }
			}
			else previous_direction = "";
		}
	}
}


//~~~~~~~~~~~~~~~~~~~~~~ RADIO OPERATOR ~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

let radio_cols = 29;
let radio_rows = 29;

let radio_map = document.getElementById('radio-operator-grid');
for (let r = 0; r < radio_rows; r++) {
	radio_map.innerHTML += '<tr>';
	for (let c = 0; c < radio_cols; c++) {
		radio_map.innerHTML += '<div class="radio-box radio-not-visited" id="radio-box-' + (r * radio_cols + c) + '"></div>';
	}
	radio_map.innerHTML += '</tr>';
}

let enemy_path = [];
let previous_direction_enemy = "";

resetRadio();

function resetRadio() {
	previous_direction_enemy = "";
	while (enemy_path.length > 1) {
		enemy_path.pop();
	}
	for (let i = 0; i < radio_rows * radio_cols; i++) {
		document.getElementById('radio-box-' + i).className = 'radio-box radio-not-visited';
	}
	start_id = (Math.floor(radio_rows / 2) * radio_cols + Math.floor(radio_cols / 2));
	document.getElementById('radio-box-' + start_id).className = 'radio-box radio-enemy-x';
	enemy_path.push(start_id);
}

function radioMove(requested_dir) {
	let current_id = enemy_path[enemy_path.length - 1];
	let new_id = -1;
	if (requested_dir === "north") { new_id = current_id - radio_cols; }
	else if (requested_dir === "east") { new_id = current_id + 1; }
	else if (requested_dir === "south") { new_id = current_id + radio_cols; }
	else if (requested_dir === "west") { new_id = current_id - 1; }
	if (enemy_path.includes(new_id)){
		return;
	}
	if ((previous_direction_enemy === "" && (requested_dir === "east" || requested_dir === "west"))
	 || (previous_direction_enemy === "east" && requested_dir === "east")
	 || (previous_direction_enemy === "west" && requested_dir === "west")) {
		document.getElementById('radio-box-' + current_id).className = 'radio-box radio-east-west';
	}
	else if ((previous_direction_enemy === "" && (requested_dir === "south" || requested_dir === "north"))
	 || (previous_direction_enemy === "south" && requested_dir === "south")
	 || (previous_direction_enemy === "north" && requested_dir === "north")) {
		document.getElementById('radio-box-' + current_id).className = 'radio-box radio-north-south';
	}
	else if ((previous_direction_enemy === "east" && requested_dir === "north")
	 || (previous_direction_enemy === "south" && requested_dir === "west")) {
		document.getElementById('radio-box-' + current_id).className = 'radio-box radio-north-west';
	}
	else if ((previous_direction_enemy === "south" && requested_dir === "east")
	 || (previous_direction_enemy === "west" && requested_dir === "north")) {
		document.getElementById('radio-box-' + current_id).className = 'radio-box radio-north-east';
	}
	else if ((previous_direction_enemy === "east" && requested_dir === "south")
	 || (previous_direction_enemy === "north" && requested_dir === "west")) {
		document.getElementById('radio-box-' + current_id).className = 'radio-box radio-south-west';
	}
	else if ((previous_direction_enemy === "north" && requested_dir === "east")
	 || (previous_direction_enemy === "west" && requested_dir === "south")) {
		document.getElementById('radio-box-' + current_id).className = 'radio-box radio-south-east';
	}
	document.getElementById('radio-box-' + new_id).className = 'radio-box radio-enemy-x';
	previous_direction_enemy = requested_dir;
	enemy_path.push(new_id);
}

let trail = document.getElementById("radio-operator-trail");

window.onkeypress = function(event) {
	if (event.keyCode == 114) {
		if (trail.style.pointerEvents === 'none') {
			trail.style.pointerEvents = 'auto';
		}
		else trail.style.pointerEvents = 'none';
	}
}

dragElement(document.getElementById("radio-operator-trail"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
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