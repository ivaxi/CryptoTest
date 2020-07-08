import { ICurrencyValue } from "./currencyValue"

export interface ICryptocurrency  {
	id: number
	name: string
	symbol: string
	slug: string
	is_active: number
	first_historical_data: string
	last_historical_data: string
	platform: IPlatform
  }
  
export  interface IPlatform {
	id: number
	name: string
	symbol: string
	slug: string
	token_address: string
  }


  export interface ICurrencyDetail {
	currencyData?: ICurrencyValue
	currencyHistoryData?: ICurrencyValue
	currencyOHLCVData?: ICurrencyValue
	
}