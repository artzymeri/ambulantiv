import { makeAutoObservable, runInAction } from "mobx";

class StateStorage {
  cartItems =
    JSON.parse(
      localStorage.getItem(
        `clientId:${localStorage.getItem("userId")}/cartProducts`
      )
    ) || [];

  constructor() {
    makeAutoObservable(this);
  }

  async updateCartItems() {
    // Wait for the local storage update
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

const stateStorage = new StateStorage();
export default stateStorage;
