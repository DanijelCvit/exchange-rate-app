# Exchange rate calculator

## Description

[DEMO](https://danijelcvit.github.io/exchange-rate-app/)

The goal of this project will be to build a small exchange rate app. The user should be able to track the latest currency values expressed in their selected base currency (e.g. most recent value of the 1 EUR expressed in USD). Also it should be possible to convert any amount from one currency into another currency based on the current rate. Finally some historical data (day, month, etc.) could be shown as a chart.

## Brand

The brand I will be basing my design off of will be [Adyen](https://www.adyen.com/)

## Backlog

Below is a list of my must haves and nice to haves for this project.
The APIs I will be using are :

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
- [ ] A user can create a list of currencies to track, which are shown when the app is loaded

### Would-be-cool

> Cool ideas that are outside the scope of this project

- [ ] Subscribe to email alerts for specific exchange rates\*

\* This could be implemented with something like express server + nodemailer + mailtrap
