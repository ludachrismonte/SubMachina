
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

function undoRadio() {
	if (enemy_path.length > 1) {
		let to_undo = enemy_path.pop();
		document.getElementById('radio-box-' + to_undo).className = 'radio-box radio-not-visited';
		if (enemy_path.length >= 1) {
			document.getElementById('radio-box-' + enemy_path[enemy_path.length -1]).className = 'radio-box radio-enemy-x';
			if (enemy_path.length > 1) {
				if (enemy_path[enemy_path.length - 1] === enemy_path[enemy_path.length - 2] + 1) { previous_direction_enemy = "east"; }
				else if (enemy_path[enemy_path.length - 1] === enemy_path[enemy_path.length - 2] - 1) { previous_direction_enemy = "west"; }
				else if (enemy_path[enemy_path.length - 1] === enemy_path[enemy_path.length - 2] + num_cols) { previous_direction_enemy = "south"; }
				else if (enemy_path[enemy_path.length - 1] === enemy_path[enemy_path.length - 2] - num_cols) { previous_direction_enemy = "north"; }
			}
			else previous_direction_enemy = "";
		}
	}
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