import { fetchData } from "../api/index.js";

export const createOptions = async () => {
  const { symbols } = await fetchData("symbols");

  const currencies = Object.keys(symbols);

  let options = "";
  for (const currency of currencies) {
    options += String.raw`
              <option value="${currency}">${currency}</option>
              `;
  }

  return options;
};
