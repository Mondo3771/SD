//local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setData = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};
