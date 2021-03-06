import { FROM_ID, RATE_ID, RESULT_ID, TO_ID } from "../constants.js";
import { fetchData } from "../api/index.js";

export const createResult = async (fromCurrency, toCurrency, amount) => {
  const query = `convert?from=${fromCurrency}&to=${toCurrency}&amount=${Math.abs(
    amount
  )}`;
  try {
    let { result } = await fetchData(query);

    result = result * (amount / Math.abs(amount));

    // Style fractions after first 2 decimals to grey
    const roundedResult = result.toPrecision(8);
    const [integer, fraction = "00"] = roundedResult.split(".");
    let fractionRight = fraction.slice(2);
    let fractionLeft = fraction.slice(0, 2);

    if (fractionLeft === "00") {
      fractionLeft = fraction;
      fractionRight = "";
    }

    const exchangeRate = roundedResult / amount;
    const inverseExchangeRate = (1 / exchangeRate).toPrecision(8);

    localStorage.setItem("rate", exchangeRate);

    // Find name of from currency
    const optionsFrom = document
      .getElementById(FROM_ID)
      .querySelectorAll("option");
    const currencyFrom = [...optionsFrom].find(
      (currency) => currency.value === fromCurrency
    );

    // Find name of to currency
    const optionsTo = document.getElementById(TO_ID).querySelectorAll("option");
    const currencyTo = [...optionsTo].find(
      (currency) => currency.value === toCurrency
    );

    const [, currencyFromText] = currencyFrom.textContent.split(/-(.+)/);
    const [, currencyToText] = currencyTo.textContent.split(/-(.+)/);
    let multipleFromCurrencies = "";
    let multipleToCurrencies = "";
    let pluralTo = "";
    let pluralFrom = "";

    +amount !== 1 ? (multipleFromCurrencies = "s") : multipleFromCurrencies;
    roundedResult !== 1 ? (multipleToCurrencies = "s") : multipleToCurrencies;
    exchangeRate !== 1 ? (pluralTo = "s") : pluralTo;
    inverseExchangeRate !== 1 ? (pluralFrom = "s") : pluralFrom;

    const footer =
      Math.abs(amount) > 1
        ? String.raw`<p id=${RATE_ID} class="fs-6">1 ${currencyFromText} = ${exchangeRate}${
            currencyToText + pluralTo
          }<br/>
        1 ${currencyToText} = ${inverseExchangeRate}${
            currencyFromText + pluralFrom
          }</p>`
        : String.raw`
        <p id=${RATE_ID} class="fs-6">1 ${currencyToText} = ${inverseExchangeRate}${
            currencyFromText + pluralFrom
          }</p>`;

    // Add value to result element
    document.getElementById(RESULT_ID).innerHTML = String.raw`
    <p>${amount}${currencyFromText + multipleFromCurrencies} =</p>
    <h1>${integer}.${fractionLeft}<span class="text-secondary">${fractionRight}</span>${
      currencyToText + multipleToCurrencies
    }</h1>
    ${footer}
    `;
  } catch (error) {
    console.log(error);
    document.getElementById(
      RESULT_ID
    ).innerHTML = String.raw`<h4 class="text-danger text-center">Couldn't fetch currencies</h4>`;
  }
};
