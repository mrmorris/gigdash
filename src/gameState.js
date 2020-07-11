const tasks = [];
const inventory = [];

let currentLocation;
let currentTask;

export const addTask = (task) => {
  tasks.push(task);
};

export const getTasks = () => {
  return tasks;
};

export const completeTask = () => {

};

export const getInventory = () => {
  return inventory;
};

export const getCurrentLocation = () => {
  return currentLocation;
};

export const setCurrentLocation = (location) => {
  currentLocation = location;
};


export const getCurrentTask = () => {
  return currentTask;
};

export const setCurrentTask = (task) => {
  currentTask = task;
};