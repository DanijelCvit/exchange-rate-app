const URL = "https://api.exchangerate.host/";

export const fetchData = async (query) => {
  const res = await fetch(`${URL}/${query}`);
  const data = await res.json();

  return data;
};
