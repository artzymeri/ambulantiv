import { makeAutoObservable, runInAction } from "mobx";

class StateStorage {
  cartItems = [];

  constructor() {
    makeAutoObservable(this);
    this.initializeCartItems();
  }

  initializeCartItems() {
    if (typeof window !== "undefined") {
      // Check if running on the client side
      const storedCartItems =
        JSON.parse(
          localStorage.getItem(
            `clientId:${localStorage.getItem("userId")}/cartProducts`
          )
        ) || [];

      runInAction(() => {
        this.cartItems = storedCartItems;
      });
    }
  }

  async updateCartItems() {
    // Wait for the local storage update
    await new Promise((resolve) => setTimeout(resolve, 0));

    if (typeof window !== "undefined") {
      // Check if running on the client side
      runInAction(() => {
        this.cartItems =
          JSON.parse(
            localStorage.getItem(
              `clientId:${localStorage.getItem("userId")}/cartProducts`
            )
          ) || [];
      });
    }
  }
}

const stateStorage = new StateStorage();
export default stateStorage;
