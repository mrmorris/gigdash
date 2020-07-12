import { SETTING_INVENTORY_LIMIT } from './constants';
import Review from './entities/Review';
import { addNotification } from './lib/Notifications';
import * as C from './constants';

const tasks = [];
const inventory = {};
const reviews = [];
let currentLocation = { name: C.NEIGHBORHOOD_OLNEYVILLE };
let currentTask;
let points = 6;

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
  // deplete inventory
  task.items.forEach((item) => {
    removeInventoryItem(item);
  });

  task.isComplete = true;

  // review
  addReview(new Review(task.positiveReview, task.customerName, 5));
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
  inventory[item]--;
  if (inventory[item] <= 0) {
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
  if (review.rating > 0) {
    points++;
  } else {
    points--;
  }
};

export const canCompleteTask = (task) => {
  const location = getCurrentLocation();

  const itemsRequired = {};
  task.items.forEach((item) => {
    if (!itemsRequired[item]) {
      itemsRequired[item] = 0;
    }
    itemsRequired[item]++;
  });

  return (
    location &&
    task.destination === location.name &&
    Object.entries(itemsRequired).every(([item, count]) => {
      return inventory[item] >= count;
    })
  );
};

export const getStars = () => {
  return Math.ceil(points / 2);
};

export const hasFailed = () => {
  return points <= 0;
};
