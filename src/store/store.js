import { createStore } from 'vuex'

let cartLocal = window.localStorage.getItem('cart');
let cartTotalLocal = window.localStorage.getItem('cartTotal');
let subTotalLocal = window.localStorage.getItem('subTotal');
let taxTotalLocal = window.localStorage.getItem('taxTotal');
let discountTotalLocal = window.localStorage.getItem('discountTotal');
let totalQuantityLocal = window.localStorage.getItem('totalQuantityLocal');

// Create a new store instance.
export default new createStore({
  state () {
    return {
      cart: cartLocal ? JSON.parse(cartLocal) : [],
      cartTotal: cartTotalLocal ? JSON.parse(cartTotalLocal) : 0,
      subTotal: subTotalLocal ? JSON.parse(subTotalLocal) : 0,
      taxTotal: taxTotalLocal ? JSON.parse(taxTotalLocal) : 0,
      discountTotal: discountTotalLocal ? JSON.parse(discountTotalLocal) : 0,
      totalQuantity: totalQuantityLocal ? JSON.parse(totalQuantityLocal) : 0,
      isLoading: false,
      stockMessage: '',
      products: [],
    }
  },
  mutations: {
    addToCart (state, item) {

      //need this because just passing in item makes state.cart.push think that it is the same item when the page is not refreshed on the client side
      let tempItem = {
        catalogItemId: item.catalogItemId,
        name: item.name,
        id: item.id,
        descr: item.descr,
        price: item.price,
        imgs: item.imgs,
        color: item.color,
        thumbnail: item.thumbnail,
        size: item.size,
        quantity: item.quantity,
      }

      //only adds to cart when the product is not found within the cart
      let found = state.cart.find(product => product.catalogItemId === item.catalogItemId)
      if(!found){
        state.cart.push(tempItem);
      }

    },
    removeFromCart(state,item){
      let found = state.cart.find(product => product.catalogItemId === item.catalogItemId)
      if(found){
        state.cart.splice(state.cart.findIndex(product => product.catalogItemId === item.catalogItemId), 1);
        this.commit('resetStockMessage');
      }
    },
    saveData(state){
      window.localStorage.setItem('cart', JSON.stringify(state.cart));
      window.localStorage.setItem('cartTotal', JSON.stringify(state.cartTotal));
      window.localStorage.setItem('subTotal', JSON.stringify(state.subTotal));
      window.localStorage.setItem('taxTotal', JSON.stringify(state.taxTotal));
      window.localStorage.setItem('discountTotal', JSON.stringify(state.discountTotal));
      window.localStorage.setItem('totalQuantityLocal', JSON.stringify(state.totalQuantity));
    },
    calculateTotalQuantity(state){
      let sum = 0;

      state.cart.forEach(item => {
        sum+=item.quantity
      });

      state.totalQuantity = sum;
    },
    increaseQuanity(state, item){
      //need this because just passing in item makes state.cart.push think that it is the same item when the page is not refreshed on the client side
      let tempItem = {
        catalogItemId: item.catalogItemId,
        name: item.name,
        id: item.id,
        descr: item.descr,
        price: item.price,
        imgs: item.imgs,
        thumbnail: item.thumbnail,
        size: item.size,
        quantity: item.quantity,
      }

      let found = state.cart.find(product => product.catalogItemId === item.catalogItemId)
      if(found){
        found.quantity++;
      }
    },
    decreaseQuanity(state, item){
      //need this because just passing in item makes state.cart.push think that it is the same item when the page is not refreshed on the client side
      let tempItem = {
        catalogItemId: item.catalogItemId,
        name: item.name,
        id: item.id,
        descr: item.descr,
        price: item.price,
        imgs: item.imgs,
        thumbnail: item.thumbnail,
        size: item.size,
        quantity: item.quantity,
      }

      let found = state.cart.find(product => product.catalogItemId === item.catalogItemId)
      if(found){
        if(found.quantity == 1){
          this.commit('removeFromCart', item);
        }
        else{
          found.quantity--;
          this.commit('resetStockMessage');
        }
      }
    },
    resetCart(state){
      state.cart = [];
      state.cartTotal = 0;
      state.subTotal = 0;
      state.taxTotal = 0;
      state.discountTotal = 0;
      state.totalQuantity = 0;
      this.commit('saveData')
    },
    isLoading(state, bool){
      state.isLoading = bool;
    },
    noMoreStock(state, product){
      state.stockMessage = 'You cannot add more of ' + product.name + ' Size ' + product.size;
    },
    resetStockMessage(state){
      state.stockMessage = '';
    },
    preLoadProducts(state, products){
      state.products = products;
    }
  },
  actions: {
    async calculateTotal({commit, state}){
      //changes the loading state to true so the frontend can process this as a spinner
      commit('isLoading', true)

      const body = JSON.stringify(state.cart);
      let calculateTotalResponse = await fetch('https://us-central1-vessels-clothing.cloudfunctions.net/calculateTotal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      //because of promises, to be able to read to response body, you have to first convert the response to json, then access the result
      let order = (await calculateTotalResponse.json()).result;
      let total = (+order.order.totalMoney.amount)/100;
      let taxTotal = (+order.order.totalTaxMoney.amount)/100;
      let discountTotal = (+order.order.totalDiscountMoney.amount)/100
      let subTotal = total+discountTotal-taxTotal;


      state.cartTotal = total;
      state.taxTotal = taxTotal;
      state.subTotal = subTotal;
      state.discountTotal = discountTotal;
      
      commit('isLoading', false);
      commit('calculateTotalQuantity');
      commit('saveData');
    },
    async hasEnoughStock({commit, state}, item){
      //need this because just passing in item makes state.cart.push think that it is the same item when the page is not refreshed on the client side
      let tempItem = {
        catalogItemId: item.catalogItemId,
        name: item.name,
        id: item.id,
        descr: item.descr,
        price: item.price,
        imgs: item.imgs,
        thumbnail: item.thumbnail,
        size: item.size,
        quantity: item.quantity,
      }

      let found = state.cart.find(product => product.catalogItemId === item.catalogItemId);
      if(found){
        try{
          commit('isLoading', true);
          
          const body = JSON.stringify({"id" : found.catalogItemId});
        
          let getInventoryResponse = await fetch('https://us-central1-vessels-clothing.cloudfunctions.net/getSingleStock', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body,
          });

          //because of promises, to be able to read to response body, you have to first convert the response to json, then access the result
          //also converts the string array to numbers
          let convertData = (await getInventoryResponse.json()).result;

          //converts the returned array into an a single item stock
          let returnedStock = (+convertData[0].quantity);

          //if there is enough stock to add another item to the cart
          if(found.quantity+1 <= returnedStock){
            //resets the message back to null
            commit('resetStockMessage');
            commit('increaseQuanity', item);
            //when increasing the quantity of a product, we only need to call calculate quantity here.
            this.dispatch('calculateTotal');
          }
          else{
            //sets a message to be displayed on frontend
            commit('noMoreStock', found);
            commit('isLoading', false);
          }
        }
        catch(error){
          console.log(error)
        }

      }
    }
  },
})