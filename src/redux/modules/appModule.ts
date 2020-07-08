import {ActionType, getType} from "typesafe-actions"
import {IBaseState} from "./baseModule"
import * as applicationActionCreators from "./appActionCreators"

export interface IAppState extends IBaseState {
  status: string
  
}

const initialState: IAppState = {
	status: "init",
	error: "",
	loaded: false,
	pending: false
}

export function applicationReducer(
  state: IAppState = initialState,
  action: ActionType<typeof applicationActionCreators>
): IAppState {
  switch (action.type) {
    case getType(applicationActionCreators.setStatus):
      return {
		...state,
		status: action.payload
      }
	case getType(applicationActionCreators.errorLogApp):
		return {
		  ...state,
		  error: action.payload
		}
		
    default:
      return state
  }
}
