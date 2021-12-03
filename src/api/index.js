const URL = "https://api.exchangerate.host/";

export const fetchData = async (pathname) => {
  const res = await fetch(`${URL}/${pathname}`);
  const data = await res.json();

  return data;
};
