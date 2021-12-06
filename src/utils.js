import { fetchData, fetchChart } from "./api/index.js";
import { CHART_SPINNER_ID, IMG_CHART_ID } from "./constants.js";

const DATASET_SIZE_MAX = 31;
const DATASET_DIVIDER = 12;

export const calcDates = (interval) => {
  const currentDate = new Date();
  const endDate = currentDate.toLocaleDateString("ja-JP");

  const prevDate = currentDate.getDate() - interval;
  currentDate.setDate(prevDate);
  const startDate = currentDate.toLocaleDateString("ja-JP");

  return [startDate, endDate];
};

export const createChartData = async (
  startDate,
  endDate,
  fromCurrency,
  toCurrency
) => {
  // Get chart data
  const query = `timeseries?start_date=${startDate}&end_date=${endDate}&base=${fromCurrency}&symbols=${toCurrency}`;
  const { rates } = await fetchData(query);

  // Destructure date strings and set to short form
  let labels = Object.keys(rates).map((date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  );

  // Destructure rate values and set precision
  let data = Object.values(rates).map((value) => value[toCurrency]);

  if (data.length > DATASET_SIZE_MAX) {
    data = data.filter((value, index) => index % DATASET_DIVIDER === 0);
    labels = labels.filter((value, index) => index % DATASET_DIVIDER === 0);
  }

  const chart = {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: `${toCurrency}`,
          backgroundColor: "rgba(255, 255, 255, 0)",
          borderColor: "rgba(32, 48, 76, 1)",
          data: data,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: `${fromCurrency} to ${toCurrency}`,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              // suggestedMin/Max will always make sure the data fits.
              // Use 'min' and 'max to force the axis range.
            },
          },
        ],
      },
    },
  };

  return chart;
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
