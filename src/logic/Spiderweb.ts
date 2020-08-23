import * as util from "./util";
import {getDistance} from "./util";

/**
 * Represent a spider web
 * Includes a list of nodes, of type SpiderwebNode,
 * and an adjacency map, which gives the indices of
 * each adjacent node for each node index
 */
export class Spiderweb {

	nodes: Array<SpiderwebNode>; ///The list of nodes in the web, to be referenced by index
	sim: any;

	/**
	 * Construct a Spiderweb
	 * @param adjacencies the adjacency map, listing the adjacent indices for each node
	 */
	constructor(public adjacencies: Array<Array<number>>) {
		this.nodes = util.range(adjacencies.length).map(key => new SpiderwebNode(key, Math.random(), Math.random()));
		this.update()
	}

	update() {
		util.range(1).forEach(() => {stepForce(this, 1, 0.3, 0.6, 0.2, 0.01);});
	}
}

/**
 * Represent a node of the spiderweb
 * Contains a certain number of ants, 
 * as well as any pheromones ants have placed
 */
class SpiderwebNode {

	ants = 0;
	pheromones: Array<number> = [];
	vx = 0;
	vy = 0;

	constructor(public index: number, public x: number, public y: number) {

	}

} 

/**
 * Validates a graph based on an adjacency map according the following rules:
 * A graph is valid if: 
 *  - All nodes have at least one adjacency (non-isolation)
 *  - If a node is connected to another, that node shares the connection (symmetry)
 *  - There exists a path of connections between any two nodes (connectivity)
 * If any of these fail, returns false; otherwise true
 */
export function validateGraph(adjacencies: Array<Array<number>>): boolean {
	for (let i = 0; i < adjacencies.length; i++) {
		// Ensure non-isolation
		if (adjacencies[i].length == 0) return false;
		// Ensure symmetry
		adjacencies[i].forEach(j => {
			if (!adjacencies[j].includes(i)) return false;
		});
	}
	// TODO: ensure connectivity
	return true;
}

function stepForce(web: Spiderweb, springConstant: number, restingLength: number, invisibleRestingLength: number,
				   invisibleSpringConstant: number, dt: number, vdecay = 0.8) {
	// Update positions
	web.nodes.forEach(node => {
		node.x = Math.min(Math.max(0, node.x + dt * node.vx), 1);
		node.y = Math.min(Math.max(0, node.y + dt * node.vx), 1);
		node.vx *= vdecay;
		node.vy *= vdecay;
	})
	// Force
	web.nodes.forEach(node1 => {
		web.nodes.forEach(node2 => {
			if (node1.x != node2.x || node1.y != node2.y) {
				let k;
				let l;
				if (web.adjacencies[node1.index].includes(node2.index)) {
					k = springConstant;
					l = restingLength;
				} else {
					k = invisibleSpringConstant;
					l = invisibleRestingLength;
				}
				let r = getDistance(node1.x, node1.y, node2.x, node2.y);
				let f = k * (r - l);
				// console.log(`Node: ${node1.x}, ${node1.y}, 2 ${node2.x}, ${node2.y}, force ${f}`);
				let dx = node2.x - node1.x;
				let dy = node2.y - node1.y;
				node1.vx += f * dx / r;
				node1.vy += f * dy / r;
			}
		});
	});

	// // Gravitational force
	// web.nodes.forEach(node1 => {
	// 	web.nodes.forEach(node2 => {
	// 		if (node1.x != node2.x || node1.y != node2.y) {
	// 			let r = getDistance(node1.x, node1.y, node2.x, node2.y);
	// 			let f = gravitationalConstant / r / r;
	// 			// console.log(`Node: ${node1.x}, ${node1.y}, 2 ${node2.x}, ${node2.y}, force ${f}`);
	// 			let dx = node2.x - node1.x;
	// 			let dy = node2.y - node1.y;
	// 			node1.vx += f * dx / r;
	// 			node1.vy += f * dy / r;
	// 		} else {
	// 			node1.vx -= Math.random() * 0.001;
	// 			node1.vy -= Math.random() * 0.001;
	// 		}
	// 	});
	// });
	// Spring force
	// for (let i = 0; i < web.adjacencies.length; i++) {
	// 	web.adjacencies[i].forEach(j => {
	// 		let node1 = web.nodes[i];
	// 		let node2 = web.nodes[j];
	// 		if (node1.x != node2.x || node1.y != node2.y) {
	// 			let r = getDistance(node1.x, node1.y, node2.x, node2.y);
	// 			let f = springConstant * (r - restingLength);
	// 			// console.log(`Node: ${node1.x}, ${node1.y}, 2 ${node2.x}, ${node2.y}, force ${f}`);
	// 			let dx = node2.x - node1.x;
	// 			let dy = node2.y - node1.y;
	// 			node1.vx += f * dx / r;
	// 			node1.vy += f * dy / r;
	// 		}
	// 	});
	// }
}