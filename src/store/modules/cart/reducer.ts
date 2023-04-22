import { Reducer } from "@reduxjs/toolkit";
import { ActionTypes, ICartItem, ICartState } from "./types";
import { useSelector } from "react-redux";
import { IState } from "../..";
import { produce } from "immer"


const INITIAL_STATE: ICartState= {
  items: [],
  failedStockCheck: []
}

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {


    return produce(state, draft => {
      switch(action.type) {
          case ActionTypes.addProductToCartSuccess: {
            
            const { product } = action.payload

            const productInCartIndex = draft.items.findIndex(item => item.product.id === product.id)

            if(productInCartIndex >= 0){
              draft.items[productInCartIndex].quantity++
            }else{
              draft.items.push({
                  product,
                  quantity: 1,
              });
            }
            break;
            
          }
          case ActionTypes.addProductToCartFailure: {
            console.log('failure', action.payload)
            draft.failedStockCheck.push(action.payload.productId)
            break
          }

          default: {
            return draft
          }
      }
  })
  
};

export default cart