import { fetchChart } from "../api/index.js";
import { FROM_ID, TO_ID } from "../constants.js";
import { updateChart } from "../utils.js";

export const createChart = async (chart) => {
  try {
    const url = await fetchChart(chart);

    return String.raw`
<div id="chart" class="row shadow p-1 mb-5 text-center">
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
        id="7"
        autocomplete="off"
        checked
      />
      <label class="btn btn-outline-primary" for="7">1W</label>

      <input
        type="radio"
        class="btn-check"
        name="btnradio"
        id="30"
        autocomplete="off"
      />
      <label class="btn btn-outline-primary" for="30">1M</label>

      <input
        type="radio"
        class="btn-check"
        name="btnradio"
        id="365"
        autocomplete="off"
      />
      <label class="btn btn-outline-primary" for="365">1Y</label>
    </div>
  </div>
  <div><img id="img-chart" class="img-fluid" src="${url}" /></div>
</div>
  `;
  } catch (error) {
    console.log(error);

    return String.raw`
    <div id="chart" class="row shadow p-1 mb-5 text-center">
      <p class="mt-3"><i class="fas fa-chart-line fa-5x"></i></p>
      <p class="text-danger">Something wen't wrong: couldn't fetch chart</p>       
    </div>
      `;
  }
};

const handleRangeSelect = (e) => {
  if (e.target?.id === "7" || e.target?.id === "30" || e.target?.id === "365") {
    const chartElement = document.getElementById("chart");
    const fromCurrency = document.getElementById(FROM_ID).value;
    const toCurrency = document.getElementById(TO_ID).value;

    updateChart(chartElement, fromCurrency, toCurrency);
  }
};

document.addEventListener("change", handleRangeSelect);
