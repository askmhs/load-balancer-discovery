/*
* @Author: askmhs
* @Date:   2018-11-20 18:03:53
* @Last Modified by:   Muhammad Harits Syaifulloh
* @Last Modified time: 2018-11-24 01:31:20
*/

import _ from "lodash";
import request from "request";
import servers from "./register";

let current = 0;

module.exports = (req, res) => {
	console.log(`Incoming request from ${req.headers.host}`);

	/**
	 * Filter available servers
	 */
	const available_servers = _.filter(servers, server => {
		return server.status === true;
	});

	/**
	 * Redirect request
	 */
	if (available_servers.length >= 1) {
		const _req = request({
			url: available_servers[current].url + req.url
		}).on("error", error => {
			res.status(500);
			res.json(error.message);
		});

		/**
		 * Counter
		 */
		current++;
		if (current === available_servers.length) current = 0;

		/**
		 * Continued to send the response
		 */
		req.pipe(_req).pipe(res);
	} else {
		res.status(500);
		res.json("All servers are unreachable!");
	}
};