
let canvas = document.getElementById("canvas");
let renderer = canvas.getContext("2d");
renderer.strokeStyle = "#000";

function resizeProcedure() {
	if (window.innerWidth < window.innerHeight) {
		canvas.width = window.innerWidth;
		canvas.height = window.innerWidth;
	} else {
		canvas.height = window.innerHeight;
		canvas.width = window.innerHeight;
	}
}

resizeProcedure();
window.onresize = resizeProcedure;

// TODO: get graph
let graph;

function draw() {
	//TODO:
}
