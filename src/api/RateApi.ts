

import { apiConfig } from '../config/api-config'
import { ICryptocurrency } from '../models/currency'
import { number } from 'prop-types'
import {DateTime} from 'luxon'
import { ICurrencyValue } from '../models/currencyValue'
export interface IMapRequest {
	start: number
	limit: number
}

export interface IQuotesRequest {
	id?: Array<number>
	symbols?: Array<string>
}
export interface IHistoricalVolueRequest{
	symb: string
}

export interface IDetailsRequest{
	id?: number
	startDate: Date
	endDate: Date
	symbol?: string

}

export const getCurrencyMap = async (params: IMapRequest): Promise<ICryptocurrency[]> => {

	const options = getCoinsConfig()
	const apiEndpoint = "/map"
	const baseApi = apiConfig.baseApi
    return await fetch(`${baseApi}${apiEndpoint}?start=${params.start}&limit=${params.limit}`, options).then((res) => res.json()).then(json => json.data)
}

export const getRate = async (params: IQuotesRequest): Promise<ICurrencyValue[]> => {
	const options = getCoinsConfig()
	const apiEndpoint = "/quotes/latest"
	const baseApi = apiConfig.baseApi
	const idPart = params.id && params.id.length > 0 ? `id=${params.id.join(",")}` : `symbol=${params.symbols ? params.symbols.join(","): ''}`
    return await fetch(`${baseApi}${apiEndpoint}?${idPart}`, options).then((res) => res.json()).then(json => json.data)
}
export const getCapitalizationHistorycal = async (params: IDetailsRequest): Promise<ICurrencyValue> => {
	const options = getCoinsConfig()
	const apiEndpoint = "/quotes/historical"
	const api = apiConfig.sandboxApi
	const startDate = DateTime.fromJSDate(params.startDate).toMillis()
	const endtDate = DateTime.fromJSDate(params.endDate).toMillis()
	const idPart = params.id ? `id=${params.id}` : `symbol=${params.symbol}`
	
    return await fetch(`${api}${apiEndpoint}?${idPart}&time_start=${startDate}&time_end=${endtDate}&interval=daily`, options).then((res) => res.json()).then(json => json.data)
}
export const getOHLCVHistorycal = async (params: IDetailsRequest): Promise<ICurrencyValue> => {
	const options = getCoinsConfig()
	const apiEndpoint = "/ohlcv/historical"
	const api = apiConfig.sandboxApi
	const startDate = DateTime.fromJSDate(params.startDate).toMillis()
	const endtDate = DateTime.fromJSDate(params.endDate).toMillis()
	const idPart = params.id ? `id=${params.id}` : `symbol=${params.symbol}`
    return await fetch(`${api}${apiEndpoint}?${idPart}&time_start=${startDate}&time_end=${endtDate}&interval=daily&time_period=daily`, options).then((res) => res.json()).then(json => json.data)
}



export const RateApi = {
  getCurrencyMap,
  getRate,  
  getCapitalizationHistorycal,
  getOHLCVHistorycal
}



const getCoinsConfig = () => {
	const requestInit : RequestInit = {
		method: 'GET',
    	redirect: 'follow',
	}
	return requestInit
	
}