import { ICurrencyValue } from './currencyValue'
import { DateTime } from 'luxon'
export const convertDataToStockItem = (currencyValue: ICurrencyValue, asset: string = 'USD'): StockItem[] => {
	let stockItems: StockItem[] = []
	const quotes = currencyValue.quotes
	for (let q of quotes) {
		let data = q.quote[asset]
		let item = new StockItem()
		item.date = DateTime.fromISO(data.timestamp).toJSDate() 
		item.open = data.open
		item.high = data.high
		item.low = data.low
		item.close = data.close
		item.volume = data.volume
		stockItems.push(item)	  
	}	
	return stockItems
}

export class StockItem {
  public open?: number
  public close?: number
  public high?: number
  public low?: number
  public volume?: number
  public date?: Date
 
}
