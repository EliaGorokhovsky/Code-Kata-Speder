/**
 * Represent a spider web
 * Includes a list of nodes, of type SpiderwebNode,
 * and an adjacency map, which gives the indices of
 * each adjacent node for each node index
 */
class Spiderweb {

	nodes: Array<SpiderwebNode>; ///The list of nodes in the web, to be referenced by index

	/**
	 * Construct a Spiderweb
	 * @param adjacencies the adjacency map, listing the adjacent indices for each node
	 */
	constructor(public adjacencies: Array<Array<Number>>) {
		this.nodes = adjacencies.map(() => new SpiderwebNode());
	}

}

/**
 * Represent a node of the spiderweb
 * Contains a certain number of ants, 
 * as well as any pheromones ants have placed
 */
class SpiderwebNode {

	ants = 0;
	pheromones: Array<Number> = [];

} 

/**
 * Validates a graph based on an adjacency map according the following rules:
 * A graph is valid if: 
 *  - All nodes have at least one adjacency (non-isolation)
 *  - If a node is connected to another, that node shares the connection (symmetry)
 *  - There exists a path of connections between any two nodes (connectivity)
 * If any of these fail, returns false; otherwise true
 */
function validateGraph(adjacencies: Array<Array<Number>>): boolean {
	for (let i = 0; i < adjacencies.length; i++) {
		// Ensure non-isolation
		if (adjacencies[i].length == 0) return false;
		// Ensure symmetry
		for (let j = 0; j < adjacencies[i].length; j++) {
			if (!adjacencies[j].includes(i)) return false;
		}
	}
	// TODO: ensure connectivity
	return true;
}