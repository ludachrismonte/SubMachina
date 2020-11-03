function toggleEB(id) {
	let elem = document.getElementById('eb-' + id);
	if (elem.className === 'engineer-box'){
		elem.className = 'engineer-box damaged';
	}
	else elem.className = 'engineer-box';
}