import { fetchChart } from "../api/index.js";

export const createChart = async () => {
  const quickChart = `https://quickchart.io/chart?c=`;
  const chart = {
    type: "line",
    data: {
      labels: [2012, 2013, 2014, 2015, 2016],
      datasets: [{ label: "USD", data: [120, 60, 50, 180, 120] }],
    },
  };

  const chartString = JSON.stringify(chart);
  console.log(chartString);

  const query = quickChart + chartString;

  console.log(query);

  const url = await fetchChart(query);
  console.log(url);

  return String.raw`
<div class="row shadow p-1 mb-5">
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
        id="btnradio1"
        autocomplete="off"
        checked
      />
      <label class="btn btn-outline-primary" for="btnradio1">1W</label>

      <input
        type="radio"
        class="btn-check"
        name="btnradio"
        id="btnradio2"
        autocomplete="off"
      />
      <label class="btn btn-outline-primary" for="btnradio2">1M</label>

      <input
        type="radio"
        class="btn-check"
        name="btnradio"
        id="btnradio3"
        autocomplete="off"
      />
      <label class="btn btn-outline-primary" for="btnradio3">1Y</label>
    </div>
  </div>
  <div><img class="img-fluid" src="${url}" /></div>
</div>
  `;
};
