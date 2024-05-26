//get data from local storage
export const fetchStorageData = ({key}) => {
    return JSON.parse(localStorage.getItem(key));
  };
//set data from local storage
export const setLocalStorage = ({key, value}) => {
    return localStorage.setItem(key, JSON.stringify(value));
}

// delete data in local storage by key
export const deleteStorage = ({key}) => {
  return localStorage.removeItem(key);
}
// delete all data in local storage
export const clearStorage = () => {
  return localStorage.clear();
}

// Time taken on a task is stored in seconds
// This function converts the time to hours, minutes and seconds
export const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
};

// Date in database is stored as datetime
// e.g 09:09:2009T13:00:00
export const formatDate = (date) => {
  const temp = date.split("T")[0];
  return temp;
};