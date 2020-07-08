import { IDetailsRequest } from './../../api/RateApi'
import { ActionType, getType } from "typesafe-actions"
import { IBaseState } from "./baseModule"
import * as ratesActionCreators from "./ratesActionCreators"
import { ICryptocurrency, ICurrencyDetail } from '../../models/currency'
import { ICurrencyValue } from '../../models/currencyValue'
import { IMapRequest } from '../../api/RateApi'

export interface IRateState extends IBaseState {
	rates: ICurrencyValue[]
	currencies: ICryptocurrency[]
	currencyMapRequest: IMapRequest
	currencyDetail?: ICurrencyDetail
	currencyDetailRequest?: IDetailsRequest
	mapLoaded: boolean
	mapPending: boolean
	historyDetailLoaded: boolean
	historyDetailPending: boolean
	historyOHLCVDetailLoaded: boolean
	historyOHLCVDetailPending: boolean
	poolingStarted: boolean
	listPoolingStarted: boolean
	detailPoolingStarted: boolean
}


const initialState: IRateState = {
	rates: [],
	currencies: [],
	currencyMapRequest: { start: 1, limit: 20 },
	currencyDetail: { currencyData: undefined, currencyHistoryData: undefined },
	currencyDetailRequest: undefined,
	error: "",
	loaded: false,
	pending: false,
	mapLoaded: false,
	mapPending: false,
	historyDetailLoaded: false,
	historyDetailPending: false,
	historyOHLCVDetailLoaded: false,
	historyOHLCVDetailPending: false,
	poolingStarted: false,
	detailPoolingStarted: false,
	listPoolingStarted: false
}

export function ratesReducer(
	state: IRateState = initialState,
	action: ActionType<typeof ratesActionCreators>
): IRateState {
	switch (action.type) {

		//CURRENCY MAP

		case getType(ratesActionCreators.startListPooling):
			return {
				...state,
				listPoolingStarted: true
			}

		case getType(ratesActionCreators.stopListPooling):
			return {
				...state,
				listPoolingStarted: false
			}
		//CURRENCY MAP

		case getType(ratesActionCreators.initRates):
			return {
				...state,
				currencyMapRequest: action.payload
			}
		case getType(ratesActionCreators.setMapRequestParams):
			return {
				...state,
				currencyMapRequest: action.payload
			}
		case getType(ratesActionCreators.loadCurrencyMap.setPending):
			return {
				...state,
				mapPending: true,
				mapLoaded: false
			}
		case getType(ratesActionCreators.loadCurrencyMap.setFulfilled):
			return {
				...state,
				currencies: action.payload ? action.payload : [],
				error: "",
				mapLoaded: true,
				mapPending: false
			}
		case getType(ratesActionCreators.loadCurrencyMap.setRejected):
			return {
				...state,
				error: action.message ? action.message : "not specified",
				mapLoaded: true,
				mapPending: false
			}

		// CURRENCY QUOTES
		case getType(ratesActionCreators.loadRates.setPending):
			return {
				...state,
				pending: true
			}
		case getType(ratesActionCreators.loadRates.setFulfilled):
			return {
				...state,
				rates: action.payload ? action.payload : [],
				error: "",
				loaded: true,
				pending: false
			}
		case getType(ratesActionCreators.loadRates.setRejected):
			return {
				...state,
				error: action.message ? action.message : "not specified",
				loaded: true,
				pending: false
			}

		//CURRENCY DETAIL

		
		case getType(ratesActionCreators.stopDetailPooling):
			return {
				...state,
				detailPoolingStarted: false
			}

		case getType(ratesActionCreators.updateDetailsRequest):
				return {
					...state,
					currencyDetailRequest: action.payload ? action.payload: undefined,
				}
	

		case getType(ratesActionCreators.getDetails):
			return {
				...state,
				currencyDetailRequest: action.payload,
			}
		case getType(ratesActionCreators.setDetailsCurrencyData):
			const detailsPayloadData: ICurrencyValue | undefined = action.payload ? action.payload : undefined
			const currencyDetailData: ICurrencyDetail = { ...state.currencyDetail, currencyData: detailsPayloadData }

			return {
				...state,
				currencyDetail: currencyDetailData,				
				detailPoolingStarted: true
			}


		case getType(ratesActionCreators.detailsClear):
			return {
				...state,
				currencyDetail: { currencyData: undefined, currencyHistoryData: undefined, currencyOHLCVData: undefined },
				currencyDetailRequest: undefined,
				detailPoolingStarted: false,
				historyDetailLoaded: false,
				historyDetailPending: false
			}

		case getType(ratesActionCreators.loadHistoryData.setPending):
			const currencyDetailClean: ICurrencyDetail = { ...state.currencyDetail, currencyHistoryData: undefined }
			return {
				...state,
				currencyDetail: currencyDetailClean,
				detailPoolingStarted: false,
				historyDetailLoaded: false,
				historyDetailPending: true

			}
		case getType(ratesActionCreators.loadHistoryData.setFulfilled):
			const payloadData: ICurrencyValue | undefined = action.payload ? action.payload : undefined
			const currencyDetail: ICurrencyDetail = { ...state.currencyDetail, currencyHistoryData: payloadData }
			return {
				...state,
				currencyDetail: currencyDetail,
				error: "",
				detailPoolingStarted: true,
				historyDetailLoaded: true,
				historyDetailPending: false
			}
		case getType(ratesActionCreators.loadHistoryData.setRejected):
			return {
				...state,
				error: action.message ? action.message : "not specified",
				detailPoolingStarted: false,
				historyDetailLoaded: true,
				historyDetailPending: false
			}

		// HLCVHistorycalData
		case getType(ratesActionCreators.loadOHLCVHistorycalData.setPending):
			{
				
				return {
					...state,
					detailPoolingStarted: false,
					historyOHLCVDetailLoaded: false,
					historyOHLCVDetailPending: true
				}

			}
		case getType(ratesActionCreators.loadOHLCVHistorycalData.setFulfilled):
			{
				const payloadData: ICurrencyValue | undefined = action.payload ? action.payload : undefined
				const currencyDetail: ICurrencyDetail = { ...state.currencyDetail, currencyOHLCVData: payloadData }
				return {
					...state,
					currencyDetail: currencyDetail,
					error: "",
					detailPoolingStarted: true,
					historyOHLCVDetailLoaded: true,
					historyOHLCVDetailPending: false
				}
			}
		case getType(ratesActionCreators.loadOHLCVHistorycalData.setRejected):
			return {
				...state,
				error: action.message ? action.message : "not specified",
				detailPoolingStarted: false,
				historyOHLCVDetailLoaded: true,
				historyOHLCVDetailPending: false
			}
		default:
			return state
	}
}
