

let path = [];
let previous_direction = "";
let mine_enabled = false;

function OnMapClick(dest_id) {
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

function toggleHealth(i) {
	let elem = document.getElementById('health-bar-' + i);
	if (elem.className === 'health-bar bad'){
		elem.className = 'health-bar good';
	}
	else elem.className = 'health-bar bad';
}