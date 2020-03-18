import { computed, decorate, observable } from "mobx";
import { AsyncStorage } from "react-native";

class CartStore {
  items = [];
  //  this is being called on handleAdd.CoralDetail  //
  saveCart = async () => {
    let myJSON = JSON.stringify(this.items);
    await AsyncStorage.setItem("myData", myJSON);
  };

  fetchCart = async () => {
    try {
      let newItems = await AsyncStorage.getItem("myData");
      newItems = JSON.parse(newItems);
      cartStore.items = newItems;
    } catch (err) {
      console.log(err);
    }
  };

  addItemToCart = item => {
    const itemExist = this.items.find(_item => _item.coral === item.coral);
    if (itemExist) {
      itemExist.quantity += item.quantity;
      itemExist.total += item.total;
    } else this.items.push(item);
    console.log("Items", this.items);
  };

  removeItemFromCart = async item => {
    this.items = this.items.filter(_item => _item !== item);
    this.asyncStorage();
  };

  checkoutCart = () => {
    this.items = [];
  };

  get quantity() {
    let quantity = 0;
    this.items.forEach(item => (quantity += item.quantity));
    return quantity;
  }
}

decorate(CartStore, {
  items: observable,
  quantity: computed
});

const cartStore = new CartStore();
export default cartStore;