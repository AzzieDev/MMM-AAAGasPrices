/* Magic Mirror
 * Module: MMM-AAAGasPrices
 *
 * By AzzieDevelopment
 * MIT Licensed.
 */

const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
	start: function () {
		console.log("MMM-AAAGasPrices helper started...");
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "GET_GAS_PRICE") {
			this.getGasPrice(payload);
		}
	},

	getGasPrice: async function (config) {
		console.log(`MMM-AAAGasPrices: Requesting data for MapID ${config.mapId}...`);

		const url = `https://gasprices.aaa.com/index.php?premiumhtml5map_js_data=true&map_id=${config.mapId}&ver=6.8.3`;

		try {
			const response = await fetch(url, {
				headers: {
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
				}
			});

			if (!response.ok) {
				throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
			}

			const rawText = await response.text();

			// PARSING LOGIC:
			// Matches "map_data", optional spaces, colon, optional spaces
			// Captures the object { ... }
			// Matches optional spaces, comma, optional spaces, "groups"
			const regex = /map_data\s*:\s*(\{[\s\S]*?\})\s*,\s*groups/gm;

			const match = regex.exec(rawText);

			if (match && match[1]) {
				const mapData = JSON.parse(match[1]);

				// Construct the key (e.g., st13 for County ID 13)
				// Ensure config.countyId exists to avoid "stundefined"
				const countyId = config.countyId || "";
				const key = "st" + countyId;

				if (mapData[key]) {
					const result = {
						name: mapData[key].name,
						// Remove $ sign and trim whitespace
						price: mapData[key].comment.replace("$", "").trim()
					};

					console.log(`MMM-AAAGasPrices: Success! Found ${result.name}: $${result.price}`);
					this.sendSocketNotification("GAS_PRICE_RESULT", result);
				} else {
					console.error(`MMM-AAAGasPrices: County ID "${countyId}" (Key: ${key}) not found in map data.`);
					// Send null to indicate error
					this.sendSocketNotification("GAS_PRICE_RESULT", null);
				}
			} else {
				console.error("MMM-AAAGasPrices: Regex failed. The data format might have changed.");
				console.error("DEBUG snippet: " + rawText.substring(0, 150));
			}

		} catch (error) {
			console.error("MMM-AAAGasPrices Error:", error);
		}
	}
});
