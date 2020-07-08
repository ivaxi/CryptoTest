
import autobind from "autobind-decorator"
import { all, AllEffect, call, CallEffect, fork, ForkEffect, put, PutEffect, select, SelectEffect, takeLatest, delay, spawn } from 'redux-saga/effects'
import { getType } from "typesafe-actions"
import { BaseSaga } from "./BaseSaga"

import * as appActionCreators from "../redux/modules/appActionCreators"
import * as ratesActionCreators from "../redux/modules/ratesActionCreators"

import { Application } from '../models/appplication'
import { routeDetailsId, currentRouteSelector } from '../selectors/routeSelectors'

import { State, NavigationOptions } from "router5"
import { Maybe } from '../helpers/generics'
import { IDetailsRequest } from '../api/RateApi'
import { INavigationData } from '../redux/modules/appActionCreators'

export class ApplicationSaga extends BaseSaga {
	@autobind
	public *createApp(): IterableIterator<CallEffect<string> | ForkEffect<any> | PutEffect<any> | SelectEffect | AllEffect<CallEffect<Application>>> {
		try {

			yield spawn(this.startPooling)

		} catch (e) {
			yield put(appActionCreators.errorApp(e.toString()))
		}
	}

	@autobind
	public *startPooling(): IterableIterator<CallEffect<string> | PutEffect<any> | SelectEffect | AllEffect<CallEffect<Application>>> {
		try {

			yield delay(30000)
			yield put(ratesActionCreators.startPooling())

		} catch (e) {
			yield put(appActionCreators.errorApp(e.toString()))
		}
	}
	
	@autobind
	public *navigationSaga({payload}:any): IterableIterator<CallEffect<string> | PutEffect<any> | SelectEffect | AllEffect<CallEffect<Application>>> {
		try {
			const previousRouteData: Maybe<State> = payload.previousRoute
			const newRouteData: Maybe<State> = payload.route
			const newRoute = (newRouteData as Maybe<State>)
			const previousRoute = (previousRouteData as Maybe<State>)

			if (newRoute?.path != previousRoute?.path) {
				if (newRoute?.name == "detailPage") {

					const detailsSymbol = newRoute.params.param					
					
					const currencyRequest: IDetailsRequest = {
						startDate: new Date('2019-08-17T00:04:01.000Z'),
						endDate: new Date('2019-08-30T18:49:02.000Z'),
						symbol: detailsSymbol
					}
					yield put(ratesActionCreators.getDetails(currencyRequest))					
					yield put(ratesActionCreators.stopListPooling())
					yield put(ratesActionCreators.startDetailPooling())
				} else {
					
					yield put(ratesActionCreators.stopDetailPooling())
					yield put(ratesActionCreators.initRates({ start: 1, limit: 20 }))
					yield put(ratesActionCreators.startListPooling())
				}
			}


		} catch (e) {
			yield put(appActionCreators.errorApp(e.toString()))
		}
	}

	@autobind
	public *setAppError(action: any): IterableIterator<PutEffect<any>> {
		yield put(appActionCreators.errorLogApp(action.payload))
	}

	@autobind
	protected *registerListeners(): IterableIterator<ForkEffect> {

		yield takeLatest(getType(appActionCreators.navigateActionStart), this.navigationSaga)
		yield takeLatest(getType(appActionCreators.createApp), this.createApp)
		yield takeLatest(getType(appActionCreators.errorApp), this.setAppError)
	}
}
