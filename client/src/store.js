import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

class StateStorage {
  cartItems = [];

  distributorActiveOrders = [];

  constructor() {
    makeAutoObservable(this);
    this.initializeCartItems();
    this.getDistributorActiveOrders();
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

  async getDistributorActiveOrders() {
    if (typeof localStorage !== "undefined") {
      const res = await axios.get(
        `http://localhost:8080/getactiveordersfromdistributor/${localStorage.getItem(
          "companyname"
        )}`
      );
      this.distributorActiveOrders = res.data;
    }
  }
}

const stateStorage = new StateStorage();
export default stateStorage;
