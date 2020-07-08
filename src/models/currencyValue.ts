
export interface ICurrencyValue {
	[key: string]: number | string | Quote | IHisotricalQuote[] | string[] 
	id: number
	name: string
	symbol: string
	slug: string
	is_active: number
	is_fiat: number
	circulating_supply: number
	total_supply: number
	max_supply: number
	date_added: string
	num_market_pairs: number
	cmc_rank: number
	last_updated: string
	tags: string[]
	platform?: any
	quote: Quote
	quotes: IHisotricalQuote[]
  }

export interface IHisotricalQuote {
	time_open: Date	
	time_close: Date
	quote: Quote
}

 export interface Quote {
	[key: string]: ICurrencyPair
  }
  
export interface ICurrencyPair {
	price: number
	volume_24h: number
	volume_24h_reported: number
  	volume_7d: number
  	volume_7d_reported: number
  	volume_30d: number
  	volume_30d_reported: number	
  	market_cap: number	
  	percent_change_1h: number	
  	percent_change_24h: number	
  	percent_change_7d: number	
	last_updated: Date
	open: number
	high: number
	low: number
	close: number
	volume: number
	timestamp: string
  }

  
