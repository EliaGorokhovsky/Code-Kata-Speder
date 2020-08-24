import "dotenv/config";
import * as process from "process";
import express = require("express");
import {Team, getTeamFor} from "./KeyAssociater";
import {Spiderweb, validateGraph} from "./logic/Spiderweb";
import {Game} from "./logic/Game";
import {GamePhase} from "./logic/GamePhase";


const app = express();
let game : Game | null;

app.use(express.static("src/static"));

/**
 * Resets the game as long as the admin key is supplied
 */
app.post("/api/reset", (req, res) => {
	if (getTeamFor(<string> req.body.query) != Team.ADMIN) {
		res.send(false);
		return;
	}
	game = null;
	res.send(true);
});

/**
 * Returns the current phase of the game
 * Basically is whose turn it is
 */
app.get("/api/phase", (req, res) => {
	if (game == null) {
		res.send(GamePhase[GamePhase.AWAITING_CORRECT_GRAPH_FROM_SPIDER]);
	} else {
		res.send(GamePhase[game.gamePhase]);
	}
});

/**
 * Allows the user to send over a spiderweb if they are the spider
 * Sends back whether their web was accepted or not
 * TODO: do this
 */
app.post("/api/spiderweb", (req, res) => {
	let adjacencies = [
		[1, 2, 3, 4, 5],
		[0, 2, 3],
		[0, 1, 3],
		[0, 1, 2, 6],
		[0, 5],
		[0, 4],
		[3, 7, 8, 9],
		[6, 8],
		[6, 7, 9],
		[6, 8]
	]
	if (getTeamFor(<string> req.query.key) == Team.ANTS || !validateGraph(adjacencies)) {
		res.send(false);
		return;
	}
	game = new Game(new Spiderweb(adjacencies));
	res.send(true);
});

/**
 * Handles requests to view the spiderweb
 */
app.get("/api/view/web", (req, res) => {
	if (getTeamFor(<string> req.query.key) != Team.ADMIN) {
		res.send(false);
		return;
	}
	game?.spiderweb.update();
	res.json(game?.spiderweb);
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`http://127.0.0.1:${port}`)
