
let num_cols = 15;
let num_rows = 15;

let alpha_islands = [17, 21, 27, 28, 32, 38, 42, 53, 91, 93, 96, 98, 106, 108, 111, 123, 127, 131, 132, 133, 153, 167, 172, 176, 180, 192, 197, 201, 203, 208, 213];

window.onload = function() {
	var maps = document.getElementsByClassName('map');
	for (let i = 0; i < maps.length; i++) {
		MakeMap(maps[i]);
	}
	
	var clickable_maps = document.getElementsByClassName('clickable-map');
	for (let i = 0; i < clickable_maps.length; i++) {
		MakeClickableMap(clickable_maps[i], "OnMapClick");
	}
};

function MakeMap(map) {
	for (let r = 0; r < num_rows; r++) {
		map.innerHTML += '<tr>';
		for (let c = 0; c < num_cols; c++) {
			let id = r * num_cols + c;
			if (alpha_islands.includes(id)){
				map.innerHTML += '<div class="checkbox island" id="box-' + id + '"></div>';
			}
			else map.innerHTML += '<div class="checkbox sea" id="box-' + id + '"></div>';
		}
		map.innerHTML += '</tr>';
	}
}

function MakeClickableMap(map, callback) {
	console.log("making map")
	for (let r = 0; r < num_rows; r++) {
		map.innerHTML += '<tr>';
		for (let c = 0; c < num_cols; c++) {
			let id = r * num_cols + c;
			if (alpha_islands.includes(id)){
				map.innerHTML += '<div class="checkbox island" id="box-' + id + '"></div>';
			}
			else map.innerHTML += '<div class="checkbox sea" id="box-' + id + '" onclick="' + callback + '(' + id + ')"></div>';
		}
		map.innerHTML += '</tr>';
	}
}