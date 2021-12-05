import {
  createForm,
  initHandleSubmit,
  handleSwitchCurrencies,
  handleSave,
  hideSubmit,
} from "./components/Form.js";
import { createOptions } from "./components/Options.js";
import {
  AMOUNT_ID,
  SAVE_BTN_ID,
  SUBMIT_BTN_ID,
  SWITCH_CURRENCIES_BTN_ID,
} from "./constants.js";
import { createHeader } from "./Header.js";

const app = async () => {
  const app = document.getElementById("app");

  // Create header
  const headerTemplate = createHeader();

  // Add header to app
  app.innerHTML += headerTemplate;

  // Create form element
  const formTemplate = createForm();

  // Add form element to app
  app.innerHTML += formTemplate;

  // Add event handler to submit button
  const handleSubmit = initHandleSubmit();
  document
    .getElementById(SUBMIT_BTN_ID)
    .addEventListener("click", handleSubmit);

  // Add event handler to switch currencies button
  document
    .getElementById(SWITCH_CURRENCIES_BTN_ID)
    .addEventListener("click", handleSwitchCurrencies);

  // Get all currencies and create option elements
  const optionsTemplate = await createOptions();

  const fromElement = document.getElementById("from");
  const toElement = document.getElementById("to");

  fromElement.innerHTML += optionsTemplate;
  toElement.innerHTML += optionsTemplate;

  // Initialize any local storage data
  const storedData = localStorage.getItem("exchangeData");
  if (storedData) {
    const data = JSON.parse(storedData);

    fromElement.value = data.fromCurrency;
    toElement.value = data.toCurrency;
    document.getElementById(AMOUNT_ID).value = data.amount;

    document.getElementById(SUBMIT_BTN_ID).click();
  }
};

window.addEventListener("load", app);
