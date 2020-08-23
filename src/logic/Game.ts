import {Spiderweb} from "./Spiderweb";
import {GamePhase} from "./GamePhase";

export class Game {

	private _gamePhase = GamePhase.AWAITING_CORRECT_GRAPH_FROM_SPIDER;
	get gamePhase(): GamePhase { return this._gamePhase }

	constructor(readonly spiderweb: Spiderweb) {
		//TODO: initialization stuff
		this._gamePhase = GamePhase.AWAITING_ANT_MOVE; //TODO: who moves first, ant or spider?
	}

	//TODO: methods to handle input from spider and from ants and update this object accordingly

}
