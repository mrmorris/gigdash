export default class {
  constructor(id, name, customerName, items = []) {
    this.id = id;
    this.name = name;
    this.customerName = customerName;
    this.items = items;
    this.isComplete = false;
  }
}