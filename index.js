/*
* @Author: askmhs
* @Date:   2018-11-20 14:48:56
* @Last Modified by:   askmhs
* @Last Modified time: 2018-11-24 01:04:35
*/

import restify from "restify";
import handler from "./handler";
import discover from "./discover";

/**
 * Creating server
 */
const server = restify.createServer({
	"name": "load-balancer-discovery"
});

/**
 * Routers
 */
server.get("*", handler);
server.post("*", handler);

/**
 * Starting server
 */
server.listen(1234, () => {
	console.log("Server started at port 1234!\nService discovery will run every 10 seconds");
	discover();
});
