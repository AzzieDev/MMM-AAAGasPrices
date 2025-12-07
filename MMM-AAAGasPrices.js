/* MagicMirror
 * Module: MMM-AAAGasPrices
 *
 * By AzzieDevelopment
 * MIT Licensed.
 */

Module.register("MMM-AAAGasPrices", {
    defaults: {
        mapId: "22",          // Default: Maryland
        countyId: "13",       // Default: Harford
        updateInterval: 21600000, // 6 hours (in milliseconds)
        overrideIcon: "fa-gas-pump",
        showCountyName: true,
        gasText: "Gas"        // Default text to append after county name
    },

    getStyles: function() {
        return [
            "font-awesome.css", // Ensures FontAwesome icons are available
            "MMM-AAAGasPrices.css" // Loads your custom CSS
        ];
    },

    start: function() {
        Log.info("Starting module: " + this.name);
        
        this.price = null;
        this.countyName = null;
        this.loaded = false;

        // Trigger the first fetch immediately
        this.getData();

        // Schedule the update timer
        setInterval(() => {
            this.getData();
        }, this.config.updateInterval);
    },

    getData: function() {
        this.sendSocketNotification("GET_GAS_PRICE", this.config);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "GAS_PRICE_RESULT") {
            if (payload) {
                this.price = payload.price;
                this.countyName = payload.name;
                this.loaded = true;
                Log.info("MMM-AAAGasPrices: Price received: " + this.price);
            }
            this.updateDom();
        }
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.className = "aaa-gas-container";

        // Loading State
        if (!this.loaded) {
            wrapper.innerHTML = "Loading Gas Prices...";
            wrapper.className += " dim small";
            return wrapper;
        }

        // 1. The Icon
        var icon = document.createElement("i");
        icon.className = "fa " + this.config.overrideIcon + " aaa-icon";
        wrapper.appendChild(icon);

        // 2. The Text Container
        var textWrapper = document.createElement("div");
        textWrapper.className = "aaa-text-wrapper";

        // Construct the Label Parts
        var labelParts = [];
        if (this.config.showCountyName && this.countyName) {
            labelParts.push(this.countyName);
        }
        if (this.config.gasText) {
            labelParts.push(this.config.gasText);
        }

        // Only create the label row if we have text to show
        if (labelParts.length > 0) {
            var nameSpan = document.createElement("div");
            nameSpan.className = "aaa-name xsmall dim";
            nameSpan.innerHTML = labelParts.join(" ");
            textWrapper.appendChild(nameSpan);
        }

        // The Price
        var priceSpan = document.createElement("div");
        priceSpan.className = "aaa-price bright medium";
        priceSpan.innerHTML = `$${this.price}`;
        textWrapper.appendChild(priceSpan);

        wrapper.appendChild(textWrapper);

        return wrapper;
    }
});
