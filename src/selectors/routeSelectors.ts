import { IStore } from "../redux/IStore"
import {State} from "router5"
import { Maybe } from '../helpers/generics'

 
export const routeDetailsId = (state: Pick<IStore, "router">): number => {
  return state.router.route?.params['id']
} 
export const currentRouteSelector = (state: Pick<IStore, "router">): Maybe<State> => {
	return state.router.route
  } 
  