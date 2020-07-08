import { RouterState } from "redux-router5"
import { IRateState } from "./modules/ratesModule"
import { IAppState } from "./modules/appModule"


export interface IStore {
  appState: IAppState
  rateState: IRateState  
  router: RouterState
}
