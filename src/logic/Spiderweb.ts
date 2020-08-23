/**
 * Represent a spider web
 */
class Spiderweb {

	nodes: Array<SpiderwebNode>;

	constructor(public adjacencies: Array<Array<Number>>) {
		this.nodes = adjacencies.map(() => new SpiderwebNode());
	}

}

/**
 * Represent a node of the spiderweb
 */
class SpiderwebNode {

	ants = 0;
	pheromones: Array<Number> = [];

} 

/**
 * TODO: take in a parameter and validate the graph
 */
function validateGraph(adjacencies: Array<Array<Number>>): boolean {
	for (let i = 0; i < adjacencies.length; i++) {
		// Existence of adjacencies
		if (adjacencies[i].length == 0) return false;
		// Reflexivity
		for (let j = 0; j < adjacencies[i].length; j++) {
			if (!adjacencies[j].includes(i)) return false;
		}
	}
	// TODO: check connectivity
	return true;
}