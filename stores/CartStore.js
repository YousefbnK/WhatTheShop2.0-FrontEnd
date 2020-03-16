import { computed, decorate, observable } from "mobx";
import { AsyncStorage } from "react-native";

class CartStore {
  items = [];

  asyncStorig = async () => {
    let myJSON = JSON.stringify(this.items);
    console.log("my data: ", myJSON);
    await AsyncStorage.setItem("myData", myJSON);
  };

  fetchAsyncStorig = async () => {
    try {
      let newItems = await AsyncStorage.getItem("myData");
      newItems = JSON.parse(newItems);
      this.items.push(newItems);
    } catch (err) {
      console.log(err);
    }
  };

  addItemToCart = item => {
    const itemExist = this.items.find(_item => _item.coral === item.coral);
    if (itemExist) itemExist.quantity += item.quantity;
    else this.items.push(item);
  };

  removeItemFromCart = item => {
    this.items = this.items.filter(_item => _item !== item);
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
cartStore.fetchAsyncStorig();

export default cartStore;
