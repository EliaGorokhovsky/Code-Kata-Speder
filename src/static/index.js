
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

sendGraph = async () => {
	return await (await fetch(`${window.location.href.split("?")[0]}api/spiderweb?key=hello_there`, {method: "POST"})).text();
}

async function main() {
	let graph = JSON.parse(await (await fetch(`${window.location.href.split("?")[0]}api/view/web?key=hello_there`, {method: "GET"})).text());
	graph.nodes.forEach(node => {
		renderer.beginPath();
		renderer.arc(node.x * canvas.width, node.y * canvas.width, 20, 0, 2*Math.PI);
		renderer.fill();
	});
	for (let i = 0; i < graph.adjacencies.length; i++) {
		graph.adjacencies[i].forEach(j => {
			renderer.beginPath();
			renderer.moveTo(graph.nodes[i].x * canvas.width, graph.nodes[i].y * canvas.width);
			renderer.lineTo(graph.nodes[j].x * canvas.width, graph.nodes[j].y * canvas.width);
			renderer.stroke();
		});
	}
}

sendGraph().then(main);


function draw() {
	//TODO:
}
