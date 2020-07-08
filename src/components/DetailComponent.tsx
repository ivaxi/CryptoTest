import React from "react"

import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"

import { ICurrencyValue, ICurrencyPair } from '../models/currencyValue'
import { ICurrencyDetail } from '../models/currency'

const useStyles = makeStyles({
	table: {
		minWidth: 650
	},
	tableImage: {
		height: 50
	},
	imageSrc: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundSize: "cover",
		backgroundPosition: "center 40%"
	}
})


interface IDetailComponentProps {
	currencyDetail: ICurrencyDetail
}


const DataRow = (props: { description: string, valueKey: keyof ICurrencyValue, currencyData: ICurrencyValue }) => {
	const { currencyData, valueKey, description } = props
	const value = currencyData[valueKey]
	return (<TableRow  >
		<TableCell align="left">{description}</TableCell>
		<TableCell component="th" align="left" scope="row">{value}</TableCell>
	</TableRow>)
}
const QuotesDataRow = (props: { description: string, valueKey: keyof ICurrencyPair, currencyData: ICurrencyPair }) => {
	const { currencyData, valueKey, description } = props
	return (<TableRow  >
		<TableCell align="left">{description}</TableCell>
		<TableCell component="th" align="left" scope="row">{currencyData[valueKey]}</TableCell>
	</TableRow>)
}


export const DetailComponent = (props: IDetailComponentProps) => {
	const classes = useStyles()
	const { currencyDetail } = props

	const currencyData = currencyDetail.currencyData
	if (currencyData == undefined) return <div>not loaded yet</div>


	return (

		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="Details table" size="small">
				<TableHead>
					<TableRow>
						<TableCell align="left"></TableCell>
						<TableCell align="left"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>

					<DataRow valueKey={'id'} description={'The unique CoinMarketCap ID for this cryptocurrency.'} currencyData={currencyData} />
					<DataRow valueKey={'name'} description={'The name of this cryptocurrency.'} currencyData={currencyData} />
					<DataRow valueKey={'symbol'} description={'The ticker symbol for this cryptocurrency.'} currencyData={currencyData} />
					<DataRow valueKey={'slug'} description={'The web URL friendly shorthand version of this cryptocurrency name.'} currencyData={currencyData} />
					<DataRow valueKey={'cmc_rank'} description={'The cryptocurrencys CoinMarketCap rank by market cap.'} currencyData={currencyData} />
					<DataRow valueKey={'num_market_pairs'} description={'The number of active trading pairs available for this cryptocurrency across supported exchanges.'} currencyData={currencyData} />
					<DataRow valueKey={'circulating_supply'} description={'The approximate number of coins circulating for this cryptocurrency.'} currencyData={currencyData} />
					<DataRow valueKey={'total_supply'} description={'The approximate total amount of coins in existence right now (minus any coins that have been verifiably burned).'} currencyData={currencyData} />
					<DataRow valueKey={'market_cap_by_total_supply'} description={'The market cap by total supply.'} currencyData={currencyData} />
					<DataRow valueKey={'max_supply'} description={'The expected maximum limit of coins ever to be available for this cryptocurrency.'} currencyData={currencyData} />
					<DataRow valueKey={'date_added'} description={'Timestamp (ISO 8601) of when this cryptocurrency was added to CoinMarketCap.'} currencyData={currencyData} />
					<DataRow valueKey={'tags'} description={'Tags.'} currencyData={currencyData} />
					<DataRow valueKey={'last_updated'} description={'Timestamp (ISO 8601) of the last time this cryptocurrencys market data was updated.'} currencyData={currencyData} />
					{currencyData.quote && currencyData.quote["USD"] && (
						<React.Fragment>
							<QuotesDataRow valueKey={'price'} description={'Price in the specified currency.'} currencyData={currencyData.quote["USD"]} />
							<QuotesDataRow valueKey={'volume_24h'} description={'Rolling 24 hour adjusted volume in the specified currency.'} currencyData={currencyData.quote["USD"]} />
							<QuotesDataRow valueKey={'volume_24h_reported'} description={'Rolling 24 hour reported volume in the specified currency.'} currencyData={currencyData.quote["USD"]} />
							<QuotesDataRow valueKey={'volume_7d'} description={'Rolling 7 day adjusted volume in the specified currency.'} currencyData={currencyData.quote["USD"]} />
							<QuotesDataRow valueKey={'volume_7d_reported'} description={'Rolling 7 day reported volume in the specified currency.'} currencyData={currencyData.quote["USD"]} />
							<QuotesDataRow valueKey={'volume_30d'} description={'Rolling 30 day adjusted volume in the specified currency.'} currencyData={currencyData.quote["USD"]} />
							<QuotesDataRow valueKey={'volume_30d_reported'} description={'Rolling 30 day reported volume in the specified currency.'} currencyData={currencyData.quote["USD"]} />
							<QuotesDataRow valueKey={'market_cap'} description={'Market cap in the specified currency.'} currencyData={currencyData.quote["USD"]} />
							<QuotesDataRow valueKey={'percent_change_1h'} description={'1 hour change in the specified currency.'} currencyData={currencyData.quote["USD"]} />
							<QuotesDataRow valueKey={'percent_change_24h'} description={'24 hour change in the specified currency.'} currencyData={currencyData.quote["USD"]} />
							<QuotesDataRow valueKey={'percent_change_7d'} description={'7 day change in the specified currency.'} currencyData={currencyData.quote["USD"]} />
							<QuotesDataRow valueKey={'last_updated'} description={'Timestamp (ISO 8601) of when the conversion currencys current value was referenced.'} currencyData={currencyData.quote["USD"]} />
						</React.Fragment>
					)}
					
				</TableBody>
			</Table>

		</TableContainer >

	)
}


