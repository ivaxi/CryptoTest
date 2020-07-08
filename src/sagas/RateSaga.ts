import autobind from "autobind-decorator"
import { all, AllEffect, call, CallEffect, fork, ForkEffect, put, PutEffect, select, SelectEffect, takeLatest, take, race, delay } from "redux-saga/effects"

import { getType } from "typesafe-actions"

import { RateApi, getCurrencyMap, IQuotesRequest, IDetailsRequest, IMapRequest } from '../api/RateApi'
import { BaseSaga } from "./BaseSaga"

import * as appActionCreators from "../redux/modules/appActionCreators"
import * as rateActionCreators from "../redux/modules/ratesActionCreators"

import { Application } from '../models/appplication'
import { ICryptocurrency } from '../models/currency'
import { ICurrencyValue } from '../models/currencyValue'

import { isDetailPoolingStartedSelector, DetailsRequestSelector, MapRequestSelector, MapDataSelector, getDetailsFromList, isListPoolingStartedSelector, getDetailsFromListBySymbol } from '../selectors/rateSelectors'
import { Maybe } from '../helpers/generics'



export class RateSaga extends BaseSaga {
	@autobind
	public *initRates({ payload }: ReturnType<any>): IterableIterator<CallEffect<any> | ForkEffect<any> | CallEffect<Maybe<ICryptocurrency[]>> | PutEffect<any> | SelectEffect | AllEffect<CallEffect<Application>>> {
		try {

			yield put(rateActionCreators.loadCurrencyMap.setPending(null))

			const currencyMap: Maybe<ICryptocurrency[]> = yield call(RateApi.getCurrencyMap, payload)
			const quotesParams = getQuotesParams(currencyMap)
			if (currencyMap) {
				yield put(rateActionCreators.loadCurrencyMap.setFulfilled(currencyMap))
			} else {
				throw ({ message: "Cant load currency map" })
			}

			if (quotesParams) {
				yield fork(this.loadCurrencyValues)
			}

			return currencyMap

		} catch (e) {
			yield put(rateActionCreators.loadCurrencyMap.setRejected(null, e.message))
			yield put(appActionCreators.errorApp(e.toString()))
		}
	}
	@autobind
	public *loadCurrencyValues(): IterableIterator<CallEffect<any> | CallEffect<Maybe<ICurrencyValue[]>> | PutEffect<any> | SelectEffect | AllEffect<CallEffect<Application>>> {
		try {

			const currencyMap: Maybe<ICryptocurrency[]> = yield select(MapDataSelector)
			const quotesParams = getQuotesParams(currencyMap)
			yield put(rateActionCreators.loadRates.setPending(null))
			if (quotesParams) {
				const ratesLatest = yield call(RateApi.getRate, quotesParams)
				yield put(rateActionCreators.loadRates.setFulfilled(ratesLatest))
			}
			return undefined

		} catch (e) {
			yield put(rateActionCreators.loadRates.setRejected(null, e.message))
			yield put(appActionCreators.errorApp(e.toString()))
		}
	}
	@autobind
	public *loadCurrencyValue({ payload }: ReturnType<any>): IterableIterator<CallEffect<any> | CallEffect<Maybe<ICurrencyValue[]>> | PutEffect<any> | SelectEffect | AllEffect<CallEffect<Application>>> {
		try {

			const request: IDetailsRequest = payload
			const apiRequest: IQuotesRequest = { id: request.id ? [request.id] : [], symbols: request.symbol ? [request.symbol]: [] }
			const currencyValue: Maybe<ICurrencyValue> = yield call(RateApi.getRate, apiRequest)
			if (currencyValue) {
				const indexKey = request.id ? payload.id : request.symbol
				request.id = currencyValue!.id
				
				yield put(rateActionCreators.updateDetailsRequest(request))
				yield put(rateActionCreators.setDetailsCurrencyData(currencyValue[indexKey]))
			}

			return currencyValue

		} catch (e) {			
			yield put(appActionCreators.errorApp(e.toString()))
		}
	}

	@autobind
	public *getCapitalizationHistory(payload: ReturnType<any>): IterableIterator<PutEffect<any> | CallEffect<Maybe<ICurrencyValue>>> {
		try {

			const request: IDetailsRequest = payload
			yield put(rateActionCreators.loadHistoryData.setPending(null))
			const currencyCapitalizationHist: Maybe<ICurrencyValue> = yield call(RateApi.getCapitalizationHistorycal, request)

			if (currencyCapitalizationHist) {
				yield put(rateActionCreators.loadHistoryData.setFulfilled(currencyCapitalizationHist))
			}

			return currencyCapitalizationHist as Maybe<ICurrencyValue>

		} catch (e) {
			yield put(appActionCreators.errorApp(e.toString()))
			yield put(rateActionCreators.loadHistoryData.setRejected(null, e.message))
		}
	}
	@autobind
	public *getOHLCVHistorycal(payload: ReturnType<any>): IterableIterator<PutEffect<any> | CallEffect<Maybe<ICurrencyValue>>> {
		try {

			const request: IDetailsRequest = payload
			yield put(rateActionCreators.loadOHLCVHistorycalData.setPending(null))
			const currencyOHLCVHistorycal: Maybe<ICurrencyValue> = yield call(RateApi.getOHLCVHistorycal, request)

			if (currencyOHLCVHistorycal) {
				yield put(rateActionCreators.loadOHLCVHistorycalData.setFulfilled(currencyOHLCVHistorycal))
			}

			return currencyOHLCVHistorycal as Maybe<ICurrencyValue>

		} catch (e) {
			yield put(appActionCreators.errorApp(e.toString()))
			yield put(rateActionCreators.loadOHLCVHistorycalData.setRejected(null, e.message))
		}
	}

	@autobind
	public *getRateDetail({ payload }: ReturnType<any>): IterableIterator<CallEffect<any> | ForkEffect<ICurrencyValue> | SelectEffect | PutEffect<any> | CallEffect<Maybe<ICurrencyValue>> | AllEffect<CallEffect<ICurrencyValue>>> {
		try {
			const request: IDetailsRequest = payload
			let currencyValue: Maybe<ICurrencyValue>
			if(request.id) {
				currencyValue= yield select(getDetailsFromList, request.id)
			} else {
				currencyValue= yield select(getDetailsFromListBySymbol, request.symbol)
			}

			if(currencyValue){
				yield put(rateActionCreators.setDetailsCurrencyData(currencyValue))
			}

			const isListPooling = yield select(isListPoolingStartedSelector)

			if (!currencyValue || !isListPooling) {
				currencyValue = yield call(this.loadCurrencyValue, {payload: request})
			}
			
			yield fork(this.getCapitalizationHistory, payload)
			yield fork(this.getOHLCVHistorycal, payload)

			return currencyValue
		} catch (e) {
			yield put(appActionCreators.errorApp(e.toString()))
		}
	}

	@autobind
	public *refresher(payload: ReturnType<any>): IterableIterator<CallEffect<string> | ForkEffect<any> | CallEffect<CallEffect<any>> | PutEffect<any> | SelectEffect | AllEffect<CallEffect<Application>>> {
		while (true) {
			try {
				const isDetailPoolig = yield select(isDetailPoolingStartedSelector)
				if (isDetailPoolig) {
					const detailsRequest = yield select(DetailsRequestSelector)
					yield fork(this.getRateDetail, { payload: detailsRequest })
				}
				const isListPoolig = yield select(isListPoolingStartedSelector)
				if(isListPoolig){
					yield fork(this.loadCurrencyValues)
				}
				yield delay(30000)
			} catch (e) {
				yield put(rateActionCreators.stopPooling())
				yield put(appActionCreators.errorApp(e.toString()))
			}
		}
	}

	public *pollWatch() {
		while (true) {

			const action = yield take(rateActionCreators.startPooling().type)
			yield race([call(this.refresher, action.payload), take(rateActionCreators.stopPooling().type)])
		}
	}
	@autobind
	protected *registerListeners(): IterableIterator<ForkEffect> {
		yield takeLatest(getType(rateActionCreators.initRates), this.initRates)
		yield takeLatest(getType(rateActionCreators.getDetails), this.getRateDetail)
		yield takeLatest(getType(rateActionCreators.setMapRequestParams), this.initRates)
		yield takeLatest(getType(rateActionCreators.startPooling), this.refresher)
	}
}



const getQuotesParams = (currencies: Maybe<ICryptocurrency[]>): IQuotesRequest => {

	if (currencies) {
		return { id: currencies?.map(c => c.id) }
	} else {
		return { id: [] }
	}
}
