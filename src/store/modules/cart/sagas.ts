import {all, call, select, takeLatest, put} from 'redux-saga/effects'
import { addProductToCartFailure, addProductToCartRequest, addProductToCartSuccess } from './actions'
import { IState } from '../..';
import { AxiosResponse } from 'axios';
import api from '../../../services/api';
import { ActionTypes } from './types';
// takelatest considera o ultimo clique, e descarta os anteriores caso o usuario clique em comprar...
// varias vezes
type checkProductStockRequest = ReturnType<typeof addProductToCartRequest>

interface IStockResponse {
    id: number
    quantity: number
}

function* checkProductStock({ payload }: checkProductStockRequest) {
    const {product} = payload;

    const currentQuantity: number = yield select((state: IState) =>  {
        return state.rootReducer.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0
    })

    const availableStockResponse: AxiosResponse<IStockResponse> = yield call(
        api.get,
        `stock/${product.id}`
    );

    if(availableStockResponse.data.quantity > currentQuantity){
        console.log('deu certo')
        yield put(addProductToCartSuccess(product))
    }else{
        console.log('sem estoque')
        yield put(addProductToCartFailure(product.id));

    }

    // console.log(availableStockResponse);

}

export default all([
    takeLatest(ActionTypes.addProductToCartRequest, checkProductStock)
])