import { makeAutoObservable, runInAction } from "mobx";

class StateStorage {
  cartItems = [];

  testNumber = 1;

  constructor() {
    makeAutoObservable(this);
    this.initializeCartItems();
  }

  initializeCartItems() {
    if (typeof localStorage !== "undefined") {
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
    if (typeof localStorage !== "undefined") {
      await new Promise((resolve) => setTimeout(resolve, 0));

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
