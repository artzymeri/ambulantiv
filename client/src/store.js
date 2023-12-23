import { makeAutoObservable, observable, runInAction } from "mobx";
import axios from "axios";
import socketIOClient, { io } from "socket.io-client";

class StateStorage {
  cartItems = [];

  distributorActiveOrders = observable([]);

  testNumber = 1;

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
    // if (typeof localStorage !== "undefined") {
    const res = await axios.get(
      `http://localhost:8080/getactiveordersfromdistributor/${localStorage.getItem(
        "companyname"
      )}`
    );
    this.distributorActiveOrders = res.data;
    // }
  }

  //   setupSocketConnection() {
  //     const socket = io("http://localhost:8080", {
  //       withCredentials: true,
  //     });

  //     socket.on("orderCreated", (newOrder) => {
  //       // Use a try-catch block to handle any errors during the asynchronous call
  //       try {
  //         runInAction(async () => {
  //           console.log("artiiii");
  //           await this.getDistributorActiveOrders();
  //         });
  //       } catch (error) {
  //         console.error("Error updating distributor active orders:", error);
  //       }
  //     });
  //   }
}

const stateStorage = new StateStorage();
export default stateStorage;
