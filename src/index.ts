import "dotenv/config";
import * as process from "process";
import express = require("express");
import {Team, getTeamFor} from "./KeyAssociater";

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
	if (getTeamFor(<string> req.query.key) == Team.ANTS || !validateGraph([])) {
		res.send(false);
		return;
	}
	game = new Game(new Spiderweb([]));
	res.send(true);
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`http://127.0.0.1:${port}`)
