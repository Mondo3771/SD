//get data from local storage
export const fetchStorageData = ({key}) => {
    return JSON.parse(localStorage.getItem(key));
  };
//set data from local storage
export const setLocalStorage = ({key, value}) => {
    return localStorage.setItem(key, JSON.stringify(value));
}

export const deleteStorage = ({key}) => {
  return localStorage.removeItem(key);
}

export const clearStorage = () => {
  return localStorage.clear();
}

export const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
};

export const formatDate = (date) => {
  const temp = date.split("T")[0];
  return temp;
};