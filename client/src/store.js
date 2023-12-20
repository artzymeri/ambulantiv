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

  async getDistributorActiveOrders() {
    const res = await axios.get(
      `http://localhost:8080/getordersfromdistributor/${localStorage.getItem(
        "companyname"
      )}`
    );
    this.distributorActiveOrders = res.data;
  }
}

const stateStorage = new StateStorage();
export default stateStorage;
