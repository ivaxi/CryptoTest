
import {applyMiddleware, compose, createStore, Middleware, Store} from "redux"
import {router5Middleware} from "redux-router5"
import createSagaMiddleware, {END, Task} from "redux-saga"
import {Router} from "router5"


import {IStore} from "./IStore"

import rootReducer from "./rootReducer"

interface IExtendedStore extends Store<Partial<IStore>> {
  close: () => void
  runSaga: (rootSaga: any) => Task
}

export function configureStore(router: Router, initialState?: Partial<IStore>): IExtendedStore {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares: Middleware[] = [
    router5Middleware(router),
    sagaMiddleware
  ]

  
  const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares))
  
  return {
    ...store,
    close: () => store.dispatch(END),
    runSaga: sagaMiddleware.run
  }
}
