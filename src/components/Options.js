import { fetchData } from "../api/index.js";

export const createOptions = async () => {
  let options = "";

  try {
    const { symbols } = await fetchData("symbols");

    const currencies = Object.entries(symbols);

    for (const [code, { description }] of currencies) {
      options += String.raw`
                <option value="${code}">${`${code} - ${description}`}</option>
                `;
    }
  } catch (error) {
    // console.log(error);

    options = String.raw`
      <option value="error" selected>Failed to get symbols</option>
    `;
  }
  return options;
};
