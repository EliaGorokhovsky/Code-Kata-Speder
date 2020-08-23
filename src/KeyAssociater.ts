import * as process from "process";

export enum Team {
	SPIDER,
	ANTS,
	ADMIN
}

export function getTeamFor(key: String): Team | null {
	switch (key) {
		case process.env.SPIDER_KEY: return Team.SPIDER;
		case process.env.ANT_KEY: return Team.ANTS;
		case process.env.ADMIN_KEY: return Team.ADMIN;
		default: return null;
	}
}
