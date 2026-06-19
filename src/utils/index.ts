const getModeFromStorage = (storageOption: string = "localStorage", storageKey: string) => {
  if (storageOption && storageKey) {
    if (storageOption === "localStorage") {
      return window && window.localStorage ? localStorage.getItem(storageKey) : null;
    } else {
      return window && window.sessionStorage ? sessionStorage.getItem(storageKey) : null;
    }
  }
};

const setModeToStorage = (
  storageOption: string = "localStorage",
  storageKey: string,
  mode: string,
) => {
  if (storageOption && storageKey && mode) {
    if (storageOption === "localStorage") {
      return window && window.localStorage ? localStorage.setItem(storageKey, mode) : null;
    } else {
      return window && window.sessionStorage ? sessionStorage.setItem(storageKey, mode) : null;
    }
  }
};

const initializeMediaFeature = function (callback: Function) {
  callback();
};

const removeLocalStorageData = () => localStorage.clear();

const capitalize = (str: string) => `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;

export {
  getModeFromStorage,
  setModeToStorage,
  initializeMediaFeature,
  removeLocalStorageData,
  capitalize,
};
