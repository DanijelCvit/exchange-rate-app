# Exchange rate calculator

## Description

You can view a live demo here: [DEMO](https://danijelcvit.github.io/exchange-rate-app/)

<p align="center"><img src="./public/exchange-app.gif" ></p>

The goal of this project was to build a small exchange rate app. The user is able to convert any amount from one currency into another currency based on the current rate. Also it's possible to save the conversion rate into a table. Finally some historical data (day, month, etc.) can be shown as a chart.

## Usage

To run this project locally you will need to open `index.html` in your browser using a local server. LiveServer, `http-server`, `study-lenses`, or any other local static server will work.

## Structure

This project uses the following folder structure:

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

## APIs

Below is a list of my must haves and nice to haves for this project.

The APIs I used are :

- [Exchangerate.host](https://exchangerate.host/) (main)
- [QuickChart](https://quickchart.io/) (for charts)

## License

&copy; DanijelCvit 2021
