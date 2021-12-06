# Exchange rate calculator

## Description

[DEMO](https://danijelcvit.github.io/exchange-rate-app/)

<p align="center"><img src="./public/exchange-app.gif" ></p>

The goal of this project is to build a small exchange rate app. The user should be able to track the latest currency values expressed in their selected base currency (e.g. most recent value of the 1 EUR expressed in USD). Also it should be possible to convert any amount from one currency into another currency based on the current rate. Finally some historical data (day, month, etc.) could be shown as a chart.

## Development

To run this project locally you will need to open `index.html` in your browser using a local server. LiveServer, `http-server`, `study-lenses`, or any other local static server will work.

## Structure

Let's run through the folders:

```
.
├── public
│   ├── fakt-pro-fonts/
│   ├── logo7.png
│   └── style.css
│
├── src
│   ├── api
│   │   └── index.js
│   ├── components
│   │   ├── Chart.js
│   │   ├── Footer.js
│   │   ├── Form.js
│   │   ├── Header.js
│   │   ├── Options.js
│   │   ├── Result.js
│   │   └── Table.js
│   ├── app.js
│   ├── constants.js
│   └── utils.js
├── index.html
├── package.json
└── README.md

```

- `public` this contains the static files (images, stylesheets) that can be used by our `index.html` file
- `src` this contains all of our JavaScript code
  - `api` this contains the fetch functions that will get the API data that we need
  - `components` all the separate parts of the page that we need to render
  - `app.js` this is the main function that generates the page

## Brand

The brand I based my design off of is [Adyen](https://www.adyen.com/)

## Backlog

Below is a list of my must haves and nice to haves for this project.

The APIs I used are :

- [Exchangerate.host](https://exchangerate.host/) (main)
- [QuickChart](https://quickchart.io/) (for charts)

### Must-Haves

> these are necessary for basic usability

- [x] A user can get the latest exchange rate for a selected currency
      in his preferred base currency
- [x] A user can convert any amount from one currency to any other available currency

### Nice-to-Haves

> if time, add more features!

- [x] A user can view the historical data (e.g. day, month, year) as a chart
- [x] A user can store currency rates in a table
