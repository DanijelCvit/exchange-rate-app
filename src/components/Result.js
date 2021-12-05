import { FROM_ID, RESULT_ID, TO_ID } from "../constants.js";
import { fetchData } from "../api/index.js";

export const createResult = async (fromCurrency, toCurrency, amount) => {
  const query = `convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;
  try {
    const { result } = await fetchData(query);

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

    const [, currencyFromText] = currencyFrom.textContent.split("-");
    const [, currencyToText] = currencyTo.textContent.split("-");

    const footer =
      amount > 1
        ? String.raw`<p class="fs-6">1 ${currencyFromText} = ${exchangeRate}${currencyToText}<br/>
        1 ${currencyToText} = ${inverseExchangeRate}${currencyFromText}</p>`
        : String.raw`
        <p class="fs-6">1 ${currencyToText} = ${inverseExchangeRate}${currencyFromText}</p>`;

    // Add value to result element
    document.getElementById(RESULT_ID).innerHTML = String.raw`
    <p>${amount}${currencyFromText} =</p>
    <h1>${integer}.${fractionLeft}<span class="text-secondary">${fractionRight}</span></h1>
    ${footer}
    `;
  } catch (error) {
    console.log(error);
    document.getElementById(
      RESULT_ID
    ).innerHTML = String.raw`<h4 class="text-danger text-center">Couldn't fetch currencies</h4>`;
  }
};