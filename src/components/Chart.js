import { fetchChart } from "../api/index.js";

export const createChart = async (chart) => {
  const url = await fetchChart(chart);

  return String.raw`
<div id="chart" class="row shadow p-1 mb-5 text-center">
  <div
    class="btn-toolbar d-flex justify-content-center mb-3"
    role="toolbar"
    aria-label="Toolbar with button groups"
  >
    <div class="btn-group me-2" role="group" aria-label="First group">
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
  <div><img class="img-fluid" src="${url}" /></div>
</div>
  `;
};
