import { createChart } from "./components/Chart.js";
import {
  createForm,
  handleSwitchCurrencies,
  initHandleSubmit,
} from "./components/Form.js";
import { createOptions } from "./components/Options.js";
import { SUBMIT_BTN_ID, SWITCH_CURRENCIES_BTN_ID } from "./constants.js";

const app = async () => {
  const app = document.getElementById("app");

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
  document.getElementById("from").innerHTML += optionsTemplate;
  document.getElementById("to").innerHTML += optionsTemplate;

  // Show chart
  const chartTemplate = await createChart();

  // Append to app
  app.innerHTML += chartTemplate;
};

window.addEventListener("load", app);
