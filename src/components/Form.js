import { createChart } from "./Chart.js";
import {
  FROM_ID,
  TO_ID,
  AMOUNT_ID,
  SUBMIT_BTN_ID,
  SWITCH_CURRENCIES_BTN_ID,
  RESULT_ID,
  SHOW_RESULT,
  SAVE_BTN_ID,
} from "../constants.js";
import { calcDates, createChartData, updateChart } from "../utils.js";
import { createResult } from "./Result.js";
import { addTableRow, createTable, deleteTableRow } from "./Table.js";

export const createForm = () => {
  return String.raw`
 <form class="mt-3 row shadow p-3 mb-5">
  <div class="mb-3 col-md-3">
    <label for="amount" class="form-label fw-bold">Amount</label>
    <div class="input-group input-group-lg">
      <input
        type="text"
        class="form-control form-input-lg"
        id="${AMOUNT_ID}"
        value="1.00"
        aria-describedby=""
      />
    </div>
  </div>
  <div class="mb-3 col-md-4">
    <label class="form-label fw-bold">From</label>
    <select
      id="${FROM_ID}"
      class="form-select form-select-lg"
      aria-label="Default select example"
    >
    </select>
  </div>
  <div
    class="
      mb-3
      col-md-1
      d-flex
      justify-content-left justify-content-md-center
      align-items-end
      btn-container
    "
  >
    <button
      id="${SWITCH_CURRENCIES_BTN_ID}"
      type="button"
      class="
        btn btn-secondary btn-lg
        rounded-circle
        btn-round
        d-flex
        justify-content-center
        align-items-center
      "
    >
      <i class="fas fa-exchange-alt fa-rotate-90"></i>
    </button>
  </div>
  <div class="mb-3 col-md-4">
    <label class="form-label fw-bold">To</label>
    <select
      id="${TO_ID}"
      class="form-select form-select-lg"
      aria-label="Default select example"
    >
    </select>
  </div>
  <div class="mb-3 collapse col-12" id=${SHOW_RESULT}>
    <div id="${RESULT_ID}" class="card card-body"></div>
  </div>
  <div class="mb-3 col-12 position d-flex justify-content-end">
    <button
      id="${SUBMIT_BTN_ID}"
      type="submit"
      class="btn btn-primary btn-lg col-12 col-md-2"
    >
      Submit
    </button>
    <button
      id="${SAVE_BTN_ID}"
      type="button"
      class="btn btn-hidden btn-secondary btn-lg col-12 col-md-2"
    >
      Save
    </button>
  </div>
</form>
    `;
};

export const handleSwitchCurrencies = () => {
  console.log("hello");
  const fromElement = document.getElementById(FROM_ID);
  const toElement = document.getElementById(TO_ID);

  [fromElement.value, toElement.value] = [toElement.value, fromElement.value];
};

export const initHandleSubmit = () => {
  const myCollapse = document.getElementById(SHOW_RESULT);
  const bsCollapse = new bootstrap.Collapse(myCollapse, {
    toggle: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amount = document.getElementById(AMOUNT_ID).value;
    const fromCurrency = document.getElementById(FROM_ID).value;
    const toCurrency = document.getElementById(TO_ID).value;

    if (!amount) {
      return;
    }

    // Hide submit button, show save button

    // Create result element
    await createResult(fromCurrency, toCurrency, amount);

    // Show result element
    if (!bsCollapse._element.classList.contains("show")) {
      bsCollapse.show();
    }

    // Update existing chart or create new one
    const app = document.getElementById("app");
    const chartElement = document.getElementById("chart");

    if (chartElement) {
      await updateChart(chartElement, fromCurrency, toCurrency);
    } else {
      const [startDate, endDate] = calcDates(7);

      const chart = await createChartData(
        startDate,
        endDate,
        fromCurrency,
        toCurrency
      );

      const chartTemplate = await createChart(chart);
      app.insertAdjacentHTML("beforeend", chartTemplate);
    }

    // Update or create history table
    const tableElement = document.querySelector("table");
    if (!tableElement) {
      const tableTemplate = createTable();
      app.insertAdjacentHTML("beforeend", tableTemplate);
      document
        .querySelectorAll("table tbody tr")
        .forEach((row) => row.addEventListener("click", deleteTableRow));
    }

    // Use this value to check if data has been submitted
    saveChanges();
  };

  return handleSubmit;
};

// Story any changes to local storage
const saveChanges = () => {
  const amountElement = document.getElementById(AMOUNT_ID);
  const fromElement = document.getElementById(FROM_ID);
  const toElement = document.getElementById(TO_ID);

  const data = {
    amount: amountElement.value,
    fromCurrency: fromElement.value,
    toCurrency: toElement.value,
  };

  const storedData = JSON.stringify(data);

  localStorage.setItem("exchangeData", storedData);
};
