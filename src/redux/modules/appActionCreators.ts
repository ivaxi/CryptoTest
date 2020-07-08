import { createAction } from "typesafe-actions"
import { State } from 'router5'

export interface INavigationData {
	route: State,
	previousRoute: State
}

export const createApp = createAction("APP/CREATE")()
export const navigateActionStart = createAction("@@router5/TRANSITION_START")<INavigationData>()


export const navigateAction = createAction("@@router5/TRANSITION_START")<INavigationData>()
export const setStatus = createAction("APP/SET_STATUS")<string>()

export const errorApp = createAction("APP/ERROR")<string>()
export const errorLogApp = createAction("APP/ERROR_LOG")<string>()


