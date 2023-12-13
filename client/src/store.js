// store.js
import { makeAutoObservable } from "mobx";

class StateStorage {
  cartItems = JSON.parse(localStorage.getItem("cartProducts"));

  constructor() {
    makeAutoObservable(this);
  }

  async updateCartItems() {
    // Wait for the local storage update
    await new Promise((resolve) => setTimeout(resolve, 0));

    this.cartItems = JSON.parse(localStorage.getItem("cartProducts"));
  }
}

const stateStorage = new StateStorage();
export default stateStorage;
