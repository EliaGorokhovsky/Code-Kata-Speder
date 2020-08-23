
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
let graph

getGraph = async () => {
	let res = await (await fetch(`${window.location.href.split("?")[0]}api/spiderweb?key=hello_there`, {method: "POST"})).text();
	console.log(res);
	let res2 = await (await fetch(`${window.location.href.split("?")[0]}api/view/web?key=hello_there`, {method: "GET"})).text();
	console.log(res2);
	return res;
}

getGraph();

function draw() {
	//TODO:
}
