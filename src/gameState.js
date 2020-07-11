const tasks = [];
const inventory = {
  'apple': 0,
  'vodka': 0,
  'milk': 0,
};

let currentLocation;
let currentTask;

export const addTask = (task) => {
  tasks.push(task);
};

export const getTasks = () => {
  return tasks;
};

export const completeTask = (task) => {
  // find the task in our tasks array
  task.isComplete = true;
};

export const getInventory = () => {
  return inventory;
};

export const addInventoryItem = (item) => {
  inventory[item]++;
};

// @todo - prevent going below 0?
export const removeInventoryItem = (item) => {
  inventory[item]--;
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