export const fetchData = async (pathname) => {
  const URL = "https://api.exchangerate.host";
  const res = await fetch(`${URL}/${pathname}`);
  const data = await res.json();

  return data;
};

export const fetchChart = async (chart) => {
  const quickChart = `https://quickchart.io/chart?c=`;

  const chartString = JSON.stringify(chart);
  const query = quickChart + chartString;

  const { url } = await fetch(query);
  return url;
};
