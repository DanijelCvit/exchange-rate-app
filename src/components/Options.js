import { fetchData } from "../api/index.js";

export const createOptions = async () => {
  const { symbols } = await fetchData("symbols");

  const currencies = Object.entries(symbols);

  let options = "";
  for (const [code, { description }] of currencies) {
    options += String.raw`
                <option value="${code}">${`${code} - ${description}`}</option>
                `;
  }

  return options;
};
