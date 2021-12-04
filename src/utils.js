import { fetchData, fetchChart } from "./api/index.js";

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

export const createChartData = (rates, toCurrency) => {
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

  // Set Y-axis range
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const stepSize = (maxValue - minValue) / 5;

  // Create chart
  const chart = {
    type: "line",
    data: {
      labels: labels,
      datasets: [{ label: toCurrency, data: data }],
      options: {
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                min: minValue,
                max: maxValue,
                stepSize: 2000,
              },
            },
          ],
        },
      },
    },
  };

  return chart;
};

export const updateChart = async (chartElement, currencies) => {
  const chartRange = chartElement.querySelectorAll("input[type='radio']");
  const [selectedRange] = [...chartRange].filter((input) => input.checked);

  const [startDate, endDate] = calcDates(parseInt(selectedRange.id));

  // Get chart data
  const { fromCurrency, toCurrency } = currencies;
  const query = `timeseries?start_date=${startDate}&end_date=${endDate}&base=${fromCurrency}&symbols=${toCurrency}`;
  const { rates } = await fetchData(query);

  const chart = createChartData(rates, toCurrency);
  const url = await fetchChart(chart);
  const imgElement = app.querySelector("img");
  imgElement.src = url;
};
