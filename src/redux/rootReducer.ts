import {CombinedState, combineReducers, Reducer} from "redux"
import {router5Reducer} from "redux-router5"
import {IStore} from "./IStore"
import { ratesReducer } from "./modules/ratesModule"
import { applicationReducer } from "./modules/appModule"

const rootReducer: Reducer<CombinedState<IStore>> = combineReducers<IStore>({
  appState: applicationReducer,
  rateState: ratesReducer,  
  router: router5Reducer
})

export default rootReducer
