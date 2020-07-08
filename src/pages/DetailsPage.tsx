import * as React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"

import { Button, CircularProgress } from "@material-ui/core"
import { DetailComponent } from "../components/DetailComponent"

import { IStore } from "../redux/IStore"
import { ICurrencyDetail } from "../models/currency"
import Backdrop from '@material-ui/core/Backdrop'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { stylesheet } from 'typestyle'
import ChartComponent from '../components/ChartComponent'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			flexWrap: 'wrap',
			'& > *': {
				margin: theme.spacing(1),
				flex: '1 0 auto',
				height: theme.spacing(16),
			},
		},
		container: {
			marginTop: '10px'
		}
	}),
)

interface IStateToProps {
	currencyDetail?: ICurrencyDetail
	currencyDetailLoaded: boolean

}

interface IProps extends IStateToProps {
	isShort?: boolean
 }

const DetailsPage = (props: IProps) => {

	const { currencyDetail, isShort } = props
	const classes = useStyles()

	if (!currencyDetail) {
		return (<div>Loading...</div>)
	} else {

		return (
			<div className={classes.container}>
				<Paper elevation={1} >
					<div className={classes.root}>
						<Paper elevation={1} >
							<Typography variant="h3" >
								{currencyDetail.currencyData?.symbol}
							</Typography>
							<Typography variant="h6" gutterBottom>
								{currencyDetail.currencyData?.name}
							</Typography>
						</Paper>
						<Paper elevation={1} >
							<Typography variant="h6" >Price</Typography>
							{currencyDetail.currencyData?.quote["USD"].price}
						</Paper>
						<Paper elevation={1} >
							<Typography variant="h6" >Volume</Typography>
							{currencyDetail.currencyData?.quote["USD"].volume_24h}
						</Paper>
						<Paper elevation={1} >
							<Typography variant="h6" >Capitalization</Typography>
							{currencyDetail.currencyData?.quote["USD"].market_cap}
						</Paper>
						<Paper elevation={1} >
							<Typography variant="h6" >Price change 24H</Typography>
							{currencyDetail.currencyData?.quote["USD"].percent_change_24h}
						</Paper>

					</div>
				</Paper>
				{currencyDetail.currencyOHLCVData && (
					<ChartComponent data={currencyDetail.currencyOHLCVData}></ChartComponent>
				)}

				{!isShort && currencyDetail.currencyData && (
					<DetailComponent currencyDetail={currencyDetail} />
				)}
			</div>
		)
	}

}

function mapStateToProps(state: Pick<IStore, "rateState">): IStateToProps {
	return {
		currencyDetail: state.rateState.currencyDetail,
		currencyDetailLoaded: state.rateState.historyDetailLoaded
	}
}

const connected = connect(mapStateToProps)(DetailsPage)
export { connected as DetailsPage, mapStateToProps, DetailsPage as UnconnectedDetailsPage }
