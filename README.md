# MMM-AAAGasPrices

A [MagicMirror²](https://github.com/MichMich/MagicMirror) module that retrieves and displays current gas price averages for a specific US county using data from AAA.

<img width="551" height="208" alt="image" src="https://github.com/user-attachments/assets/1a10f633-f9ad-4183-8460-f09dca698b81" />

## Features

* **Live Data:** Scrapes the latest average price from AAA's daily reports.
* **Granular:** Supports specific county-level data (not just state averages).
* **Customizable:** Toggle county names, change icons, and adjust refresh rates.

## Installation

1. Navigate to your MagicMirror `modules` directory:

    ```bash
    cd ~/MagicMirror/modules
    ```

2. Clone this repository:

    ```bash
    git clone https://github.com/AzzieDev/MMM-AAAGasPrices.git
    ```

3. Navigate into the new directory:

    ```bash
    cd MMM-AAAGasPrices
    ```

4. Install dependencies:

    ```bash
    npm install
    ```

## Dependencies

* [node-fetch](https://www.npmjs.com/package/node-fetch) (v2)

## Configuration

Add the following to your `config/config.js` file:
a

```javascript
{
    module: "MMM-AAAGasPrices",
    position: "top_left",
    config: {
        mapId: "22",            // ID for the State (22 = Maryland)
        countyId: "13",         // ID for the County (13 = Harford)
        updateInterval: 21600000, // Update every 6 hours (in ms)
        overrideIcon: "fa-gas-pump", // FontAwesome icon
        showCountyName: true,    // Show "Harford" text next to price
        gasText: "Gas"          // Text to append after county name (default: "Gas")
    }
}
```

## How to Find Your IDs

This module uses AAA's internal map IDs. You must find the specific ID numbers for your state and county.

### Step 1: Find your Map ID (State)

Each of the 50 US states are listed in the table below. DC is only tracked on the "state-wide" level, which I have not implemented scraping for yet (see Future Plans section below). US Territories such as Puerto Rico don't have their gas prices tracked by AAA.

| State | Map ID |
| :--- | :--- |
| Alabama | 2 |
| Alaska | 4 |
| Arizona | 5 |
| Arkansas | 6 |
| California | 7 |
| Colorado | 8 |
| Connecticut | 9 |
| Delaware | 10 |
| Florida | 1 |
| Georgia | 11 |
| Hawaii | 12 |
| Idaho | 13 |
| Illinois | 14 |
| Indiana | 15 |
| Iowa | 16 |
| Kansas | 18 |
| Kentucky | 19 |
| Louisiana | 20 |
| Maine | 21 |
| Maryland | 22 |
| Massachusetts | 23 |
| Michigan | 24 |
| Minnesota | 25 |
| Mississippi | 26 |
| Missouri | 27 |
| Montana | 28 |
| Nebraska | 29 |
| Nevada | 30 |
| New Hampshire | 31 |
| New Jersey | 32 |
| New Mexico | 33 |
| New York | 34 |
| North Carolina | 35 |
| North Dakota | 36 |
| Ohio | 37 |
| Oklahoma | 38 |
| Oregon | 39 |
| Pennsylvania | 40 |
| Rhode Island | 41 |
| South Carolina | 42 |
| South Dakota | 43 |
| Tennessee | 44 |
| Texas | 45 |
| Utah | 46 |
| Vermont | 47 |
| Virginia | 48 |
| Washington | 49 |
| West Virginia | 50 |
| Wisconsin | 51 |
| Wyoming | 52 |

### Step 2: Find your County ID

1. Replace MAP_ID in this URL with the ID from the table above.
    `https://gasprices.aaa.com/index.php?premiumhtml5map_js_data=true&map_id=MAP_ID`
3. Open that URL in a new browser tab. It will display the raw data configuration with a JSON at the bottom.
4. Search (Ctrl+F) for your county name (e.g., "Harford").
5. You will find it inside an object key like `st13`. The number `13` is your **County ID**.

## Future Plans (Not Implemented but you are welcome to PR)

* Retrieve state-wide average cost (will enable support for District of Columbia, which doesn't have the gas prices tracked for individual wards (though AAA may have used to, as the map with ID 17 has each ward listed)
* Retrieve state-level EV average cost from <https://sheets.googleapis.com/v4/spreadsheets/1R5Km2MEFBMJoaptRSPbKhJSLCgMcyPEyITFSvAvUdHo/values/Sheet1!A:F?key=AIzaSyB6scf9i9c1kA7ZLvw4SAMLSFCvWhKc0Eo>

## License

MIT
