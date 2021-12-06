import { fetchChart } from "../api/index.js";
import {
  CHART_ID,
  CHART_SPINNER_ID,
  FROM_ID,
  IMG_CHART_ID,
  INPUT_MONTH_ID,
  INPUT_WEEK_ID,
  INPUT_YEAR_ID,
  TO_ID,
} from "../constants.js";
import { calcDates, createChartData } from "../utils.js";

export const createChart = async (chart) => {
  try {
    const url = await fetchChart(chart);

    return String.raw`
<div id=${CHART_ID} class="row shadow p-1 mb-5 text-center">
  <div
    class="btn-toolbar d-flex justify-content-center mb-3"
    role="toolbar"
    aria-label="Toolbar with button groups"
  >
    <div id="range" class="btn-group me-2" role="group" aria-label="First group">
      <input
        type="radio"
        class="btn-check"
        name="btnradio"
        id=${INPUT_WEEK_ID}
        autocomplete="off"
        checked
      />
      <label class="btn btn-outline-primary" for="7">1W</label>

      <input
        type="radio"
        class="btn-check"
        name="btnradio"
        id=${INPUT_MONTH_ID}
        autocomplete="off"
      />
      <label class="btn btn-outline-primary" for="30">1M</label>

      <input
        type="radio"
        class="btn-check"
        name="btnradio"
        id=${INPUT_YEAR_ID}
        autocomplete="off"
      />
      <label class="btn btn-outline-primary" for="365">1Y</label>
    </div>
  </div>
  <div class="position-relative">
  <img id="${IMG_CHART_ID}" class="img-fluid" src="${url}" />
  <div id=${CHART_SPINNER_ID} class="visually-hidden d-flex justify-content-center position-absolute top-50 start-50">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</div>
</div>
  `;
  } catch (error) {
    console.log(error);

    return String.raw`
    <div id=${CHART_ID} class="row shadow p-1 mb-5 text-center">
      <p class="mt-3"><i class="fas fa-chart-line fa-5x"></i></p>
      <p class="text-danger">Something wen't wrong: couldn't fetch chart</p>       
    </div>
      `;
  }
};

export const updateChart = async (chartElement, fromCurrency, toCurrency) => {
  const chartRange = chartElement.querySelectorAll("input[type='radio']");
  const [selectedRange] = [...chartRange].filter((input) => input.checked);

  const [startDate, endDate] = calcDates(parseInt(selectedRange.id));

  // Show loading spinner while chart is being updated
  const chartSpinner = document.getElementById(CHART_SPINNER_ID);
  chartSpinner.classList.toggle("visually-hidden");

  // Make old image lighter
  const imgElement = document.getElementById(IMG_CHART_ID);
  imgElement.classList.add("opacity-25");

  const chart = await createChartData(
    startDate,
    endDate,
    fromCurrency,
    toCurrency
  );
  const url = await fetchChart(chart);

  // Hide loading spinner again
  chartSpinner.classList.toggle("visually-hidden");

  // Restore opacity again
  imgElement.classList.remove("opacity-25");

  imgElement.src = url;
};

const handleRangeSelect = (e) => {
  if (
    e.target?.id === INPUT_WEEK_ID ||
    e.target?.id === INPUT_MONTH_ID ||
    e.target?.id === INPUT_YEAR_ID
  ) {
    const chartElement = document.getElementById(CHART_ID);
    const fromCurrency = document.getElementById(FROM_ID).value;
    const toCurrency = document.getElementById(TO_ID).value;

    updateChart(chartElement, fromCurrency, toCurrency);
  }
};

document.addEventListener("change", handleRangeSelect);
