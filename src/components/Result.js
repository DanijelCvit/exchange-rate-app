import { RESULT_ID } from "../constants.js";
import { fetchData } from "../api/index.js";

export const createResult = async (fromCurrency, toCurrency, amount) => {
  const query = `convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;
  try {
    const { result } = await fetchData(query);

    // Add value to result element
    document.getElementById(
      RESULT_ID
    ).innerHTML = String.raw`<h1>${result.toPrecision(8)}</h1>`;
  } catch (error) {
    console.log(error);
    document.getElementById(
      RESULT_ID
    ).innerHTML = String.raw`<h4 class="text-danger text-center">Couldn't fetch currencies</h4>`;
  }
};
