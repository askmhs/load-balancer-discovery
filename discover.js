/*
* @Author: askmhs
* @Date:   2018-11-23 23:53:05
* @Last Modified by:   Muhammad Harits Syaifulloh
* @Last Modified time: 2018-11-24 01:30:55
*/

import request from "request";
import rp from "request-promise";
import servers from "./register";

/**
 * Check server healthy each 10 seconds
 */
module.exports = () => {
	setInterval(() => {
		const promises = [];

		servers.map((server, index) => {
			promises.push(
				rp(server.url).then(result => {
					console.log(`${server.url} is REACHABLE!`);

					/**
					 * Set status to be true while the server is reachable
					 */
					servers[index].status = true;
				}).catch(error => {
					console.log(`${server.url} is UNREACHABLE!`);

					/**
					 * Set status to be false while the server is unreachable
					 */
					servers[index].status = false;
				})
			);
		});

		Promise.all(promises).then(() => {
			console.log("=====================");
		}).catch(error => {
			console.error("An error occurred while discover the services!");
		});
	}, 10000);
};