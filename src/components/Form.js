import { fetchData } from "../api/index.js";
import {
  FROM_ID,
  TO_ID,
  AMOUNT_ID,
  SUBMIT_BTN_ID,
  SWITCH_CURRENCIES_BTN_ID,
  RESULT_ID,
} from "../constants.js";

export const createForm = () => {
  return String.raw`
 <form>
  <div class="mb-3">
    <label for="amount" class="form-label">Amount</label>
    <input type="text" class="form-control" id=${AMOUNT_ID} value="1.00" aria-describedby="" />
  </div>
  <div class="mb-3">
    <label class="form-label">From</label>
    <select id=${FROM_ID} class="form-select" aria-label="Default select example">
      <option selected>Select a currency</option>
    </select>
  </div>
  <div class="mb-3">
    <button id=${SWITCH_CURRENCIES_BTN_ID} type="button" class="btn btn-secondary btn-round">
    </button>
  </div>
  <div class="mb-3">
    <label class="form-label">To</label>
    <select id=${TO_ID} class="form-select" aria-label="Default select example">
      <option selected>Select a currency</option>
    </select>
  </div>
  <div class="collapse mb-3" id="collapseResult">
    <div id=${RESULT_ID} class="card card-body">
    </div>
  </div>
  <a
    href="#"
    id = ${SUBMIT_BTN_ID}
    type="button"
    class="btn btn-primary col-12"
  >
    Submit
</a>
</form>
    `;
};

const handleSwitchCurrencies = (event) => {
  if (event.target?.id === SWITCH_CURRENCIES_BTN_ID) {
    const fromElement = document.getElementById(FROM_ID);
    const toElement = document.getElementById(TO_ID);

    [fromElement.value, toElement.value] = [toElement.value, fromElement.value];
  }
};

export const initHandleSubmit = () => {
  const myCollapse = document.getElementById("collapseResult");
  const bsCollapse = new bootstrap.Collapse(myCollapse, {
    toggle: false,
  });

  const handleSubmit = async (event) => {
    if (event.target?.id === SUBMIT_BTN_ID) {
      event.preventDefault();

      const amount = document.getElementById(AMOUNT_ID).value;

      if (!amount) {
        return;
      }

      // Create query and fetch result
      const fromCurrency = document.getElementById(FROM_ID).value;
      const toCurrency = document.getElementById(TO_ID).value;
      const query = `convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;

      const { result } = await fetchData(query);
      document.getElementById(
        RESULT_ID
      ).innerHTML = String.raw`<h1>${result.toFixed(2)}</h1>`;

      bsCollapse.show();
    }
  };

  return handleSubmit;
};

document.addEventListener("click", handleSwitchCurrencies);
