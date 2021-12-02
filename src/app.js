import { createForm } from "./components/Form.js";
import { createOptions } from "./components/Options.js";

const app = async () => {
  const app = document.getElementById("app");

  // Create form element
  const formTemplate = createForm();

  // Add form element to app
  app.innerHTML += formTemplate;

  // Get all currencies and create options elements
  const optionsTemplate = await createOptions();
  document.getElementById("from").innerHTML += optionsTemplate;
  document.getElementById("to").innerHTML += optionsTemplate;
};

window.addEventListener("load", app);
