import { fetchData } from "../api/index.js";
import { createChart } from "./Chart.js";
import {
  FROM_ID,
  TO_ID,
  AMOUNT_ID,
  SUBMIT_BTN_ID,
  SWITCH_CURRENCIES_BTN_ID,
  RESULT_ID,
  SHOW_RESULT,
} from "../constants.js";

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
      <option selected>Select a currency</option>
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
      <option selected>Select a currency</option>
    </select>
  </div>
  <div class="mb-3 collapse col-12" id=${SHOW_RESULT}>
    <div id="${RESULT_ID}" class="card card-body"></div>
  </div>
  <div class="mb-3 col-12 text-end">
    <button
      id="${SUBMIT_BTN_ID}"
      type="submit"
      class="btn btn-primary btn-lg col-12 col-md-2"
    >
      Submit
    </button>
  </div>
</form>
    `;
};

export const handleSwitchCurrencies = () => {
  console.log("switch");
  const fromElement = document.getElementById(FROM_ID);
  const toElement = document.getElementById(TO_ID);

  [fromElement.value, toElement.value] = [toElement.value, fromElement.value];
};

export const initHandleSubmit = () => {
  const myCollapse = document.getElementById(SHOW_RESULT);
  const bsCollapse = new bootstrap.Collapse(myCollapse, {
    toggle: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const amount = document.getElementById(AMOUNT_ID).value;
    const fromCurrency = document.getElementById(FROM_ID).value;
    const toCurrency = document.getElementById(TO_ID).value;

    if (
      !amount ||
      fromCurrency === "Select a currency" ||
      toCurrency === "Select a currency"
    ) {
      return;
    }

    // Create query and fetch result
    const query = `convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;

    const { result } = await fetchData(query);
    document.getElementById(
      RESULT_ID
    ).innerHTML = String.raw`<h1>${result.toFixed(2)}</h1>`;

    bsCollapse.show();

    // Fetch chart
    const chart = {
      type: "line",
      data: {
        labels: [2012, 2013, 2014, 2015, 2016],
        datasets: [{ label: "USD", data: [120, 60, 50, 180, 120] }],
      },
    };
    // const chartQuery = "";
    const chartTemplate = await createChart(chart);
    document
      .getElementById("app")
      .insertAdjacentHTML("beforeend", chartTemplate);
  };

  return handleSubmit;
};
