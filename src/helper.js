//get data from local storage
export const fetchStorageData = ({key}) => {
    return JSON.parse(localStorage.getItem(key)) ?? [];
  };
//set data from local storage
export const setLocalStorage = ({key, value}) => {
    return localStorage.setItem(key, JSON.stringify(value));
}