import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { CartItems } from '../models/cartItems';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(car:Car){
    let item = CartItems.find(c => c.car.id === car.id);
    if(item){
      item.quantity += 1;
    }else{
      let cartItem = new CartItem();
      cartItem.car = car;
      cartItem.quantity = 1;
      CartItems.push(cartItem);
    }
  }

  removeFromCart(car: Car){
    let itemIndex : number = CartItems.findIndex(c => c.car.id === car.id);
    if(itemIndex !== -1){
      CartItems.splice(itemIndex, 1)
    }
  }

  list():CartItem[]{
    return CartItems;
  }
}
