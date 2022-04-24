// Read environment variables from .env file,
// and access them by process.env.ENV_NAME
import "dotenv/config";

// Bot framework Koishi
import { App as Koishi, Time } from "koishi";

// Plugins
import adapterOnebot from "@koishijs/plugin-adapter-onebot";
import databaseSQLite from "@koishijs/plugin-database-sqlite";
//import rateLimit from "@koishijs/plugin-rate-limit";

// Modules
import * as dataModel from "./util/dataModel";
import * as command from "./controller/command";
import * as reply from "./controller/reply";
import * as debug from "./controller/debug";
import * as manage from "./controller/manage";
import * as fun from "./controller/fun";
import * as mcCmdHelper from "./controller/mcCmdHelper";

// Create a Koishi app
const app = new Koishi({
	delay: {
		character: 10 * Time.second,
		message: 10 * Time.second,
	},
	help: false,
});

// Install Onebot adapter plugin and configure it
app.plugin(adapterOnebot, {
	protocol: "ws",
	selfId: process.env.SELF_ID,
	endpoint: process.env.ENDPOINT,
});

// Install database plugin
app.plugin(databaseSQLite, {
	path: process.env.DB_PATH,
});

app.plugin(dataModel);
app.plugin(command);
app.plugin(reply);
app.plugin(debug);
app.plugin(manage);
app.plugin(fun);
app.plugin(mcCmdHelper);

// Start running the app.
app.start();
