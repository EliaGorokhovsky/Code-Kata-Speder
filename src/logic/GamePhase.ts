/**
 * The phases of the game (basically conveys whose turn it is)
 */
enum GamePhase {
	AWAITING_CORRECT_GRAPH_FROM_SPIDER,
	AWAITING_SPIDER_MOVE,
	AWAITING_ANT_MOVE,
	FINISHED
}
