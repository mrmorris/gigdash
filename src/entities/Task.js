export default class {
  constructor(id, name, customerName, destination, items = []) {
    this.id = id;
    this.name = name;
    this.customerName = customerName;
    this.items = items;
    this.isComplete = false;
    this.destination = destination;
  }
}
