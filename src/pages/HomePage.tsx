import React, { useState } from "react"
import { connect } from "react-redux"
import { createSelector } from "reselect"
import { stylesheet } from "typestyle"
import { IStore } from "../redux/IStore"
import { IRateState } from "../redux/modules/ratesModule"
import { ConnectedLink } from "react-router5"

import Backdrop from "@material-ui/core/Backdrop"
import CircularProgress from "@material-ui/core/CircularProgress"

import Paper from "@material-ui/core/Paper"
import { getRoutes } from "../routes/routes"
import { Dispatch } from 'redux'

import * as rateActionCreators from "../redux/modules/ratesActionCreators"
import { CurrencyTable } from '../components/CurrencyTable'
import { ICryptocurrency } from '../models/currency'

import clsx from 'clsx'
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'

import IconButton from '@material-ui/core/IconButton'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import { DetailsPage } from "./DetailsPage"
import { IDetailsRequest, IMapRequest } from '../api/RateApi'


const drawerWidth = 500
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		title: {
			flexGrow: 1,
		},
		hide: {
			display: 'none',
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
		},
		drawerPaper: {
			width: drawerWidth,
		},
		drawerHeader: {
			display: 'flex',
			alignItems: 'center',
			padding: theme.spacing(0, 1),
			// necessary for content to be below app bar
			...theme.mixins.toolbar,
			justifyContent: 'flex-start',
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			marginRight: -drawerWidth,
		},
		contentShift: {
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginRight: 0,
		},
	}),
)


interface IStateToProps {
	rateState: IRateState
	currencies: ICryptocurrency[]
	mapRequest: IMapRequest
}
interface IDispatchToProps {
	getDetails: (detailsRequest: IDetailsRequest) => void
	startPooling: () => void
	setMapParams: (mapRequest: IMapRequest) => void
	clearDetails: () => void
}

interface IProps extends IStateToProps, IDispatchToProps { }

const HomePage = (props: IProps) => {

	const { currencies, setMapParams, mapRequest, getDetails, clearDetails } = props
	
	const classes = useStyles()
	const theme = useTheme()
	const [open, setOpen] = React.useState(false)
	const [selected, setSelected] = React.useState<number | undefined>(undefined)

	const handleDrawerClose = () => {
		clearDetails()
		setOpen(false)
		setSelected(undefined)
	}
	const onPagingChanged = (params: {start: number, limit: number}) => {
		setMapParams(params)
	}
	const onCurrencySelected = (id: number) => {

		const currencySelected = id != undefined

		setSelected(id)
		if(currencySelected){
			//old dates used for sandbox old data snapshot
			const currencyRequest: IDetailsRequest = {
				startDate: new Date('2019-08-17T00:04:01.000Z'),
				endDate: new Date('2019-08-30T18:49:02.000Z'),
				id: id
			}		
			getDetails(currencyRequest)
		}
		setOpen(currencySelected)
	}

	return (
		<div className={classes.root}>
			<main className={clsx(classes.content, { [classes.contentShift]: open })}>
				<Paper elevation={3}>
					<CurrencyTable
						onPaging={onPagingChanged}
						start={mapRequest.start}
						limit={mapRequest.limit}
						currencies={currencies}
						selectedId={selected}
						onItemSelected={onCurrencySelected}
					/>
				</Paper>
			</main>

			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="right"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronRightIcon />
					</IconButton>
				</div>
				<Divider/>
				<DetailsPage isShort={true}></DetailsPage>
			</Drawer>
		</div >
	)

}


function mapStateToProps(state: Pick<IStore, "rateState">): IStateToProps {
	return {
		rateState: state.rateState,
		currencies: state.rateState.currencies,
		mapRequest: state.rateState.currencyMapRequest,
	}
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchToProps {
	return {
		startPooling: () => dispatch(rateActionCreators.startListPooling()),
		getDetails: (detailsRequest: IDetailsRequest) => dispatch(rateActionCreators.getDetails(detailsRequest)),
		setMapParams: (mapRequest: IMapRequest) => dispatch(rateActionCreators.setMapRequestParams(mapRequest)),
		clearDetails: () => dispatch(rateActionCreators.detailsClear()),
	}
}


const connected = connect(mapStateToProps, mapDispatchToProps)(HomePage)
export { connected as HomePage, HomePage as UnconnectedHomePage, mapStateToProps }
