import { IDetailsRequest, IMapRequest } from './../api/RateApi'
import { IStore } from "../redux/IStore"
import { ICurrencyDetail, ICryptocurrency } from '../models/currency'
import { ICurrencyValue } from '../models/currencyValue'



 
export const isListPoolingStartedSelector = (state: Pick<IStore, "rateState">): boolean => {
  return state.rateState.listPoolingStarted
} 

export const isDetailPoolingStartedSelector = (state: Pick<IStore, "rateState">): boolean => {
	return state.rateState.currencyDetail != undefined && state.rateState.detailPoolingStarted
  } 

export const DetailsSeleted = (state: Pick<IStore, "rateState">): ICurrencyDetail | undefined => {
	return state.rateState.currencyDetail
} 

export const getDetailsFromList = (state: Pick<IStore, "rateState">, id: number): ICurrencyValue | undefined => {
	const idSelected = state.rateState.currencyDetailRequest?.id
	return idSelected != undefined ? state.rateState.rates[idSelected] : undefined
} 
export const getDetailsFromListBySymbol = (state: Pick<IStore, "rateState">, symbol: string | undefined): ICurrencyValue | undefined => {
	const propsArray = Object.values(state.rateState.rates)
	const rate = propsArray.find(r => r.symbol == symbol)
	return rate != undefined ? rate : undefined
} 

export const DetailsRequestSelector = (state: Pick<IStore, "rateState">): IDetailsRequest | undefined => {
	return state.rateState.currencyDetailRequest
} 

export const MapRequestSelector = (state: Pick<IStore, "rateState">): IMapRequest | undefined => {
	return state.rateState.currencyMapRequest
} 

export const MapDataSelector = (state: Pick<IStore, "rateState">): ICryptocurrency[]  => {
	return state.rateState.currencies
} 