import { createForm, initHandleSubmit } from "./components/Form.js";
import { createOptions } from "./components/Options.js";
import { SUBMIT_BTN_ID } from "./constants.js";

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

  // Get all currencies and create options elements
  const optionsTemplate = await createOptions();
  document.getElementById("from").innerHTML += optionsTemplate;
  document.getElementById("to").innerHTML += optionsTemplate;
};

window.addEventListener("load", app);
