import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './modules/rootReducer';
import { ICartState } from './modules/cart/types';
import { composeWithDevTools} from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './modules/rootSaga';

export interface IState{
    rootReducer: {
        
        cart: ICartState
    }
}

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware]
export const store = configureStore({
    reducer: {
        rootReducer,
    },
    devTools: true,
    middleware: middlewares,
});

sagaMiddleware.run(rootSaga)

