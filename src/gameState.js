import {SETTING_INVENTORY_LIMIT} from './constants';

const tasks = [];
const inventory = {};
const reviews = [];
let currentLocation = { name: 'nowhere' };
let currentTask;

export const addTask = (task) => {
  tasks.push(task);
};

export const getTasks = () => {
  return tasks;
};

export const getIncompleteTasks = () => {
  return tasks.filter((task) => !task.isComplete);
};

export const completeTask = (task) => {
  // find the task in our tasks array
  task.isComplete = true;
};

export const getInventory = () => {
  return inventory;
};

export const addInventoryItem = (item) => {
  let itemCount = Object.values(inventory).reduce((acc, curr) => acc + curr, 0);
  if (itemCount < SETTING_INVENTORY_LIMIT) {
    inventory[item] = inventory[item] ? inventory[item] + 1 : 1;
  }
};

export const removeInventoryItem = (item) => {
  if (!inventory[item]) {
    return;
  }
  inventory[item]--;
  if (!inventory[item]) {
    delete inventory[item];
  }
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

export const getReviews = () => {
  return reviews;
};

export const addReview = (review) => {
  reviews.push(review);
};
