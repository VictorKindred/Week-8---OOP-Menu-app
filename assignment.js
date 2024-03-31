class Pizza {
  constructor(name, toppings) {
    this.name = name;
    this.toppings = toppings;
  }
  describe() {
    return `${this.name} ordered ${this.toppings} on their pizza.`;
  }
}

class Order {
  constructor(name) {
    this.name = name;
    this.pizzas = [];
  }

  addPizza(pizza) {
    if (pizza instanceof Pizza) {
      this.pizzas.push(pizza);
    } else {
      throw new Error(
        `You can only add an instance of Pizza. Argument is not a pizza: ${pizza}`
      );
    }
  }

  //? The order description  will change depending on how many pizzas they ordered
  describe() {
    if (this.pizzas.length === 1) {
      return `${this.name} ordered a pizza with ${this.pizzas[0].toppings.join(
        ", "
      )}.`;
    } else {
      //? If Pizzas > 1, we will get x amount of pizzas/orders with their respective toppings 
      let orderDescription = `${this.name} ordered ${this.pizzas.length} pizzas with:\n`;
      this.pizzas.forEach((pizza, index) => {
        orderDescription += `  - Pizza ${index + 1}: ${pizza.toppings.join(
          ", "
        )}\n`;
      });
      return orderDescription;
    }
  }
}

class Menu {
  constructor() {
    this.orders = [];
    this.selectedOrder = null;
  }

  start() {
    let selection = this.showMainMenuOptions();

    while (selection != 0) {
      switch (selection) {
        case "1":
          this.createOrder();
          break;
        case "2":
          this.viewOrdersByName();
          break;
        case "3":
          this.addToppings();
          break;
        case "4":
          this.removeToppings();
          break;
        case "5":
          this.displayOrders();
          break;
        default:
          selection = 0;
      }
      selection = this.showMainMenuOptions();
    }
    alert("Please come again!");
  }

  showMainMenuOptions() {
    return prompt(`
      0) Exit 
      1) Create new order 
      2) View orders by name 
      3) Add toppings
      4) Remove toppings 
      5) Display all orders 
      `);
  }

  createOrder() {
    //? 1) Create new order */
    let name = prompt("Who is this order for?:"); /* Name gets assigned */
    let existingOrder = this.orders.find((order) => order.name === name);
    if (existingOrder) {
      /* If an order for x name already exists, */
      let toppings = prompt("Enter toppings separated by commas:");
      let pizza = new Pizza(existingOrder.name, toppings.split(","));
      existingOrder.addPizza(pizza);
      alert("Toppings added to existing order successfully.");
    } else {
      let toppings = prompt("Enter toppings separated by commas:");
      let pizza = new Pizza(name, toppings.split(","));
      let order = new Order(name);
      order.addPizza(pizza);
      this.orders.push(
        order
      ); //? Pushes the order for this person into the array of total orders */
      alert("New order created successfully.");
    }
  }

  viewOrdersByName() {
    //? 2) View orders by name */
    let name = prompt(
      "Enter the name to view orders:"
    ).toLowerCase(); //? toLowerCase makes it so we can input the name and not be case sensitive while still looking for exact spellings */
    let ordersByName = this.orders.filter(
      (order) => order.name.toLowerCase() === name
    ); //? Instead of looking for index, I chose to look for name because it makes more sense and it would be hard keeping track of the index. The filter searches for the exact name for order */
    let orderString = "";
    ordersByName.forEach((order, index) => {
      orderString += `Order ${index + 1}: ${order.describe()}\n`;
    });
    alert(orderString || "No orders found for this name.");
  }

  addToppings() {
    let name = prompt("Whose order would you like to add toppings to?");
    let order = this.orders.find((order) => order.name === name);
    if (order) {
      //?If the name is found, */
      let toppings = prompt("Enter toppings:");
      let toppingsArray = toppings.split(",");
      order.pizzas.forEach((pizza) => {
        pizza.toppings =
          pizza.toppings.concat(
            toppingsArray
          ); //? The toppings are added together */
      });
      alert("Toppings added successfully.");
    } else {
      alert("Order not found.");
    }
  }

  //? REMOVE TOPPINGS */
  removeToppings() {
    let name = prompt(
      "Whose order do you want to remove toppings from?"
    ).toLowerCase();
    let order = this.orders.find((order) => order.name.toLowerCase() === name);
    if (order) {
      let toppingsToRemove = prompt("Enter toppings to remove:");
      toppingsToRemove = toppingsToRemove.split(",");
      order.pizzas.forEach((pizza) => {
        pizza.toppings = pizza.toppings.filter(
          (topping) =>
            !toppingsToRemove.includes(
              topping.trim().toLowerCase()
            ) //? makes sure toppings are case insensitive and also any extra spaces are removed */
        );
      });
      alert("Toppings removed successfully.");
    } else {
      alert("Order not found.");
    }
  }

  displayOrders() {
    let orderString = "";
    this.orders.forEach((order, index) => {
      orderString += `Order ${index + 1}: ${order.describe()}\n`;
    });
    alert(orderString || "No orders made.");
  }
}

const menu = new Menu();
menu.start();

